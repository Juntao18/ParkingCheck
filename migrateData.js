const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// service account 密钥文件
const serviceAccount = require('./parkingcheck-83318-firebase-adminsdk-fbsvc-3287954aa7.json');

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 读取 parkingData.json 
const dataPath = path.join(__dirname, 'parkingData.json');
fs.readFile(dataPath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Reading data Error读取数据文件出错：', err);
    return;
  }

  try {
    const parkingData = JSON.parse(data);

    // 遍历每条记录，上传到 Firestore 的 "parkingLots" 集合中
    for (const parking of parkingData) {
      // parking.id 作为文档 ID
      const docRef = db.collection('parkingLots').doc(String(parking.id));
      await docRef.set(parking);
      console.log(`Parking lot ${parking.id} added.`);
    }

    console.log('Data Update success 数据迁移完成！');
    process.exit(0);
  } catch (error) {
    console.error('data analysis or uploading error数据解析或上传出错：', error);
    process.exit(1);
  }
});
