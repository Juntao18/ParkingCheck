// parkingdata-firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_RFkbb9opYta3RgyCfO-RP0pVfcDNB94",
  authDomain: "parkingcheck-83318.firebaseapp.com",
  projectId: "parkingcheck-83318",
  storageBucket: "parkingcheck-83318.firebasestorage.app",
  messagingSenderId: "421752321656",
  appId: "1:421752321656:web:d60ff23bdb5f226e85df8d",
  measurementId: "G-5E42HCJV4B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 用于存储从 Firestore 获取的数据
let parkingData = {};

// 重绘地图：清空地图容器并根据 parkingData 添加热力图点
function initializeMap() {
  const container = document.getElementById('map-container');
  container.innerHTML = '';  // 清空旧数据
  Object.values(parkingData).forEach(function(parking) {
    var heatPoint = createHeatPoint(parking);
    container.appendChild(heatPoint);
  });
}

// 根据停车场数据创建热力图点
function createHeatPoint(data) {
  var heatPoint = document.createElement('div');
  heatPoint.className = 'heat-point';
  heatPoint.style.left = data.x + 'px';
  heatPoint.style.top = data.y + 'px';
  updateHeatPointColor(heatPoint, data);
  // 点击后显示信息窗口
  heatPoint.addEventListener('click', function(event) {
    event.stopPropagation();
    showInfoWindow(data, event.clientX, event.clientY);
  });
  heatPoint.dataset.permit = data.permit;
  return heatPoint;
}

// 根据可用率更新颜色
function updateHeatPointColor(element, data) {
  var ratio = data.available / data.capacity;
  element.style.backgroundColor = ratio > 0.6 ? '#4CAF50' :
                                    ratio > 0.3 ? '#FFEB3B' : '#F44336';
}

// 显示信息窗口，并加入用户更新按钮
function showInfoWindow(data, x, y) {
  closeInfoWindow();
  var infoWindow = document.createElement('div');
  infoWindow.className = 'info-window';
  infoWindow.innerHTML =
    '<div class="close-button" onclick="closeInfoWindow()">×</div>' +
    '<h3>' + data.name + '</h3>' +
    '<p>Permit: ' + (data.permit || 'N/A') + '</p>' +
    '<p>All Space: ' + data.capacity + '</p>' +
    '<p>Available: <span id="available-' + data.id + '">' + data.available + '</span></p>' +
    '<p>Occupancy: ' + Math.round((1 - data.available / data.capacity) * 100) + '%</p>' +
    '<button class="direction-button" ' + (data.gmaps ? '' : 'disabled') + '>Directions</button>';+
    // 按钮：更新数据
    '<button onclick="submitUserUpdate(\'' + data.id + '\')">Update Available</button>';
  document.body.appendChild(infoWindow);
  adjustInfoPosition(infoWindow, x, y);
  // 绑定点击空白处关闭信息窗口
  setTimeout(function() {
    document.addEventListener('click', closeInfoWindow);
  }, 10);
}

function adjustInfoPosition(element, x, y) {
  var rect = element.getBoundingClientRect();
  x = Math.max(10, Math.min(x, window.innerWidth - rect.width - 10));
  y = Math.max(10, Math.min(y, window.innerHeight - rect.height - 10));
  element.style.left = x + 'px';
  element.style.top = y + 'px';
}

function closeInfoWindow() {
  var infoWindows = document.querySelectorAll('.info-window');
  infoWindows.forEach(function(win) {
    win.parentNode.removeChild(win);
  });
  document.removeEventListener('click', closeInfoWindow);
}

// 监听 Firestore 数据实时变化
onSnapshot(collection(db, 'parkingLots'), (snapshot) => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added" || change.type === "modified") {
      parkingData[change.doc.id] = change.doc.data();
    } else if (change.type === "removed") {
      delete parkingData[change.doc.id];
    }
  });
  initializeMap();
});

// 用户反馈更新：弹出输入框更新当前停车场的可用车位数
window.submitUserUpdate = async function(parkingId) {
  var newAvailable = prompt("请输入新的可用车位数：");
  newAvailable = parseInt(newAvailable);
  if (!isNaN(newAvailable)) {
    try {
      const parkingRef = doc(db, 'parkingLots', parkingId);
      await updateDoc(parkingRef, { available: newAvailable, lastUpdated: new Date() });
      alert("数据更新成功！");
    } catch (error) {
      alert("更新失败：" + error.message);
    }
  } else {
    alert("请输入正确的数字！");
  }
};
