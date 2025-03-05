const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Judgetime判断是否在是上课的日期内
 * - semester 1: 15/09 ~ 23/12
 * - semester 2: 01/02 ~ 31/05
 */
function isSemesterPeriod(now) {
    const year = now.getFullYear();
    const semester1Start = new Date(year, 8, 15);  // 15 September
    const semester1End   = new Date(year, 11, 23); // 23 December
    const semester2Start = new Date(year, 1, 1);   // 1 February
    const semester2End   = new Date(year, 4, 31);  // 31 May

    return (now >= semester1Start && now <= semester1End) || (now >= semester2Start && now <= semester2End);
}

/**
 * 30mins/run ,update parking data:ava 定时任务：每30分钟执行一次，更新停车场 available
 */
exports.updateParkingAvailability = onSchedule(
    {
        schedule: "every 30 minutes",
        timeZone: "Europe/Dublin", 
    },
    async (event) => {
        const now = new Date();
        const db = admin.firestore();

        // 1. Judge Semester 判断是否在学期内
        const inSemester = isSemesterPeriod(now);

        // 2. Get current time 获取当前时间 (HH:MM)
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const currentTimeStr = `${hh}:${mm}`;

        try {
            // get ParkingLots data 数据
            const snapshot = await db.collection("parkingLots").get();
            if (snapshot.empty) {
                console.log("No Find Parking data");
                return null;
            }

            const batch = db.batch();
            let updateCount = 0;

            snapshot.forEach((docSnap) => {
                const carparkId = docSnap.id;
                const data = docSnap.data();

                // skip update if user mannual update in 1 hour 如果用户在1小时内更新过，跳过
                if (data.lastUserUpdate) {
                    const lastUserDate = data.lastUserUpdate.toDate();
                    const diffMins = (now - lastUserDate) / (60 * 1000);
                    if (diffMins < 60) {
                        console.log(`Skip ${carparkId}Because ${diffMins.toFixed(1)} mins befor update already`);
                        return;
                    }
                }

                // Choose  schedule（学期 or 假期）
                const scheduleArray = inSemester ? data.scheduleSemester : data.scheduleHoliday;
                if (!scheduleArray || scheduleArray.length === 0) {
                    return;
                }

                // Treaversal 遍历时间表，匹配当前时间
                for (const rule of scheduleArray) {
                    const { start, end, available } = rule;
                    if (currentTimeStr >= start && currentTimeStr < end) {
                        // 仅当 available 发生变化时更新
                        if (data.available !== available) {
                            const docRef = db.collection("parkingLots").doc(carparkId);
                            batch.update(docRef, { available });
                            updateCount++;
                            console.log(`Update ${carparkId} => ${available} (Period ${start}-${end}, semester=${inSemester})`);
                        } else {
                            console.log(`${carparkId} No need Update, Already Lasted data`);
                        }
                        break; // 匹配到规则后跳出循环
                    }
                }
            });

            // submit 提交批量更新
            if (updateCount > 0) {
                await batch.commit();
                console.log(`Update finish，Total Update ${updateCount} Parking`);
            } else {
                console.log("No need update this time");
            }
            return null;
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    }
);

