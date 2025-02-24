// migrateData.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 载入 service account 密钥文件（确保文件路径正确）
const serviceAccount = require('./parkingcheck-83318-firebase-adminsdk-fbsvc-3287954aa7.json');

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 读取 parkingData.json 文件
const dataPath = path.join(__dirname, 'parkingData.json');
fs.readFile(dataPath, 'utf8', async (err, data) => {
  if (err) {
    console.error('读取数据文件出错：', err);
    return;
  }

  try {
    const parkingData = JSON.parse(data);

    // 遍历每条记录，上传到 Firestore 的 "parkingLots" 集合中
    for (const parking of parkingData) {
      // 使用 parking.id 作为文档 ID（转换为字符串）
      const docRef = db.collection('parkingLots').doc(String(parking.id));
      await docRef.set(parking);
      console.log(`Parking lot ${parking.id} added.`);
    }

    console.log('数据迁移完成！');
    process.exit(0);
  } catch (error) {
    console.error('数据解析或上传出错：', error);
    process.exit(1);
  }
});
