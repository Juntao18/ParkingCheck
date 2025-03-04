const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * IF semesiter or holiday
 *  - semester 1: 15/09 ~ 23/12
 *  - semester 2: 1/2 ~ 31/5
 */
function isSemesterPeriod(now) {
  const year = now.getFullYear();
  const semester1Start = new Date(year, 8, 15);  // 15 September
  const semester1End   = new Date(year, 11, 23); // 23 December
  const semester2Start = new Date(year, 1, 1);   // first January
  const semester2End   = new Date(year, 4, 31);  // 31 May

  if (now >= semester1Start && now <= semester1End) {
    return true;
  }
  if (now >= semester2Start && now <= semester2End) {
    return true;
  }
  return false;
}

/**
 * 定时任务：每30分钟执行一次，更新停车场 available
 * Update parkingdate per 30 mins 
 */
exports.updateParkingAvailability = functions.pubsub
  .schedule("*/30 * * * *") // 30 mins
  .timeZone("Europe/Dublin")
  .onRun(async (context) => {
    const now = new Date();
    const db = admin.firestore();

    // 1. 判断是否学期Judge whether is it Semesiter
    const inSemester = isSemesterPeriod(now);

    // 2. 当前时间 (HH:MM) 字符串   Current time
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const currentTimeStr = `${hh}:${mm}`;

    try {
      // get doc once all 一次获取所有 ParkingLots 文档
      const snapshot = await db.collection("ParkingLots").get();
      if (snapshot.empty) {
        console.log("Can't Find any doc");
        return null;
      }

      const batch = db.batch();
      let updateCount = 0;

      snapshot.forEach(docSnap => {
        const carparkId = docSnap.id;
        const data = docSnap.data();

        // 检查 lastUserUpdate，若1小时内有用户更新 => 跳过
        if (data.lastUserUpdate) {
          const lastUserDate = data.lastUserUpdate.toDate();
          const diffMins = (now - lastUserDate) / (60 * 1000);
          if (diffMins < 60) {
            console.log(`Skip ${carparkId}, Because ${diffMins.toFixed(1)} mins befor Update already`);
            return; 
          }
        }

        // 根据是否学期，选 schedule
        const scheduleArray = inSemester ? data.scheduleSemester : data.scheduleHoliday;
        if (!scheduleArray || scheduleArray.length === 0) {
          return;
        }

        // 遍历规则，匹配当前时间
        for (const rule of scheduleArray) {
          const { start, end, available } = rule;
          if (currentTimeStr >= start && currentTimeStr < end) {
            // 如果数据库中 available 不同于此，则更新
            if (data.available !== available) {
              const docRef = db.collection("ParkingLots").doc(carparkId);
              batch.update(docRef, { available });
              updateCount++;
              console.log(`Update ${carparkId} => ${available} (Period ${start}-${end}, semester=${inSemester})`);
            } else {
              console.log(`${carparkId} Noneed Update ，Already latest update`);
            }
            break; // 已找到匹配区间, 跳出
          }
        }
      });

      // 提交批量更新
      if (updateCount > 0) {
        await batch.commit();
        console.log(`Update finished, Total Update for ${updateCount} document`);
      } else {
        console.log("No need update this time");
      }
      return null;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  });
