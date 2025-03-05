import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

//  Firebase Initial 初始化
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

// Map Variables 地图-相关全局变量 
var SCHOOL_CENTER_X = 1928;
var SCHOOL_CENTER_Y = 2691; 

var MAP_WIDTH = 4000;     
var MAP_HEIGHT = 4800;   

var INIT_SCALE = 0.5;

var scale = INIT_SCALE;
var posX = 0;
var posY = 0;
var isDragging = false;
var startX, startY;
var isPinching = false;
var initialPinchDistance = null;
var initialPinchScale = null;

//Firestore   数据存储，渲染
let parkingData = {};

//根据 parkingData 对象渲染所有热力图点，每次 onSnapshot 有更新时调用
//Render all heat map points according to the parkingData object, called every time onSnapshot is updated
function renderHeatPoints() {
  const container = document.getElementById('map-container');
  if (!container) return;

  // Clean old data 清空旧数据
  container.innerHTML = '';

  // Travel All parkdata，create Heatmap  遍历所有停车场数据，创建热力图点
  Object.values(parkingData).forEach((data) => {
    const heatPoint = createHeatPoint(data);
    container.appendChild(heatPoint);
  });
}

//Create single Heatmap point 创建单个热力图点 DOM
function createHeatPoint(data) {
  const heatPoint = document.createElement('div');
  heatPoint.className = 'heat-point';
  heatPoint.style.left = data.x + 'px';
  heatPoint.style.top = data.y + 'px';
  updateHeatPointColor(heatPoint, data);

  // Click show infomation box 点击后显示信息窗口
  heatPoint.addEventListener('click', function(event) {
    event.stopPropagation();
    showInfoWindow(data, event.clientX, event.clientY);
  });
  heatPoint.dataset.permit = data.permit;

  return heatPoint;
}

// 根据可用率更新热力图点颜色
//Update heatmap point colors based on availability
function updateHeatPointColor(element, data) {
  const ratio = data.available / data.capacity;
  element.style.backgroundColor = ratio > 0.6 ? '#4CAF50'
    : ratio > 0.3 ? '#FFEB3B'
    : '#F44336';
}

/**
 * shows info window 显示信息窗口
 */
function showInfoWindow(data, x, y) {
  closeInfoWindow(); //Close the existing  先关闭已存在的

  const infoWindow = document.createElement('div');
  infoWindow.className = 'info-window';
  infoWindow.innerHTML = `
    <div class="close-button" onclick="closeInfoWindow()">×</div>
    <h3>${data.name}</h3>
    <p>Permit: ${data.permit || 'N/A'}</p>
    <p>All Space: ${data.capacity}</p>
    <p>Available: <span id="available-${data.id}">${data.available}</span></p>
    <button class="update-button" onclick="submitUserUpdate('${data.id}')">Update Available</button>
    <div class="update-container">
        <button class="updateplus" onclick="updatePlus('${data.id}')">➕</button>
        <button class="update-" onclick="updateMinus('${data.id}')">➖</button>
    </div>
    <p>Occupancy: ${Math.round((1 - data.available / data.capacity) * 100)}%</p>
    <button class="direction-button" ${data.gmaps ? '' : 'disabled'}>Directions</button>
  `;

  document.body.appendChild(infoWindow);

  // 定位信息窗口
  //Position information window
  if (window.innerWidth <= 768) {
    // Mobile 移动端：固定底部
    infoWindow.style.left = '0';
    infoWindow.style.right = '0';
    infoWindow.style.top = 'auto';
    infoWindow.style.bottom = '0';
    infoWindow.style.width = '100%';
    infoWindow.style.height = '50%';
    infoWindow.style.margin = '0';
    infoWindow.style.transform = 'none';
  } else {
    // PC端：自适应位置
    adjustInfoPosition(infoWindow, x, y);
  }

  // Google map 为导航按钮添加点击事件
  //Add click events to navigation buttons
  const dirBtn = infoWindow.querySelector('.direction-button');
  if (dirBtn) {
    dirBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      if (data.gmaps) {
        window.open(data.gmaps, '_blank');
      }
    });
  }

  // 延时绑定点击外部关闭信息窗口事件
  //Delay binding click external close information window event

  setTimeout(function() {
    document.addEventListener('click', closeInfoWindow);
  }, 10);
}

//close all windws
function closeInfoWindow() {
  const infoWindows = document.querySelectorAll('.info-window');
  infoWindows.forEach((win) => {
    if (win.parentNode) {
      win.parentNode.removeChild(win);
    }
  });
  document.removeEventListener('click', closeInfoWindow);
}
window.closeInfoWindow = closeInfoWindow; 

// 调整信息窗口位置，确保不超出屏幕
//Adjust the information window position to ensure it does not exceed the screen

function adjustInfoPosition(element, x, y) {
  const rect = element.getBoundingClientRect();
  x = Math.max(10, Math.min(x, window.innerWidth - rect.width - 10));
  y = Math.max(10, Math.min(y, window.innerHeight - rect.height - 10));
  element.style.left = x + 'px';
  element.style.top = y + 'px';
}

//用户更新：弹窗输入新的可用车位数并写入 Firestore
//User update: Enter new available parking spaces in the pop-up window and write to Firestore

window.submitUserUpdate = async function(parkingId) {
  const newAvailable = parseInt(prompt("Enter available parking spaces："), 10);
  if (!isNaN(newAvailable)) {
    try {
      const parkingRef = doc(db, 'parkingLots', parkingId);
      await updateDoc(parkingRef, { available: newAvailable, lastUserUpdate: new Date() });
      alert("successfully updated");
    } catch (error) {
      alert("Update failed:" + error.message);
    }
  } else {
    // alert("Please enter the correct number");
  }
};

//////////+——加减车位
window.updatePlus = async function(parkingId) {
    try {
      // 从全局 parkingData 中获取当前数据
      const currentData = parkingData[parkingId];
      const newAvailable = currentData.available + 1;
      const parkingRef = doc(db, 'parkingLots', parkingId);
      await updateDoc(parkingRef, { available: newAvailable, lastUserUpdate: new Date() });
      alert("+1 Parking space");
    } catch (error) {
      alert("Update failed：" + error.message);
    }
  };
  
  window.updateMinus = async function(parkingId) {
    try {
      // 从全局 parkingData 中获取当前数据
      const currentData = parkingData[parkingId];
      const newAvailable = currentData.available - 1;
      const parkingRef = doc(db, 'parkingLots', parkingId);
      await updateDoc(parkingRef, { available: newAvailable, lastUserUpdate: new Date() });
      alert("-1 Parking space");
    } catch (error) {
      alert("Update failed：" + error.message);
    }
  };
  

// 地图拖拽与缩放逻辑 
//Map drag and zoom logic
function initMapInteraction() {
  const container = document.getElementById('map-container');
  if (!container) return;

  // 鼠标拖拽
  //Mouse drag
  container.addEventListener('mousedown', function(e) {
    if (!isPinching) {
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
      container.style.cursor = 'grabbing';
    }
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging && !isPinching) {
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      applyMapTransform();
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  // 触摸事件（单指拖拽 & 双指缩放）
  //Touch events (single-finger drag & double-finger zoom)

  container.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
      isPinching = true;
      initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
      initialPinchScale = scale;
    } else if (e.touches.length === 1) {
      isPinching = false;
      startX = e.touches[0].clientX - posX;
      startY = e.touches[0].clientY - posY;
    }
  }, { passive: false });

  container.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        
        // 计算两指中心点
        const touchCenterX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const touchCenterY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = container.getBoundingClientRect();
        const pointerX = touchCenterX - rect.left;
        const pointerY = touchCenterY - rect.top;
        
        const prevScale = scale;
        scale = initialPinchScale * (currentDistance / initialPinchDistance);
        
        // 调整平移量，保持两指中心位置固定
        posX = pointerX - (scale / prevScale) * (pointerX - posX);
        posY = pointerY - (scale / prevScale) * (pointerY - posY);
        
        applyMapTransform();
        e.preventDefault();
    } else if (!isPinching && e.touches.length === 1) {
      posX = e.touches[0].clientX - startX;
      posY = e.touches[0].clientY - startY;
      applyMapTransform();
    }
}, { passive: false });


  container.addEventListener('touchend', function(e) {
    if (e.touches.length < 2) {
      isPinching = false;
      initialPinchDistance = null;
      initialPinchScale = null;
    }
  });

  // 鼠标滚轮缩放
  //Mouse wheel zoom
  container.addEventListener('wheel', function(e) {
    e.preventDefault();
    // 获取容器相对于视口的位置Get the position of the container relative to the viewport
    const rect = container.getBoundingClientRect();
    // 计算鼠标在地图容器内的坐标Calculate the coordinates of the mouse within the map container
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    // 保存之前的缩放比例Save the previous zoom ratio
    const prevScale = scale;
    
    // 根据滚轮方向更新缩放比例Update zoom ratio based on scroll wheel direction
    if (e.deltaY > 0) {
      scale *= 0.9;
    } else {
      scale = Math.min(scale * 1.1, 3);
    }
    
    // Adjust the pan amount according to the new zoom level, making sure the pointer position remains unchanged根据新的缩放比例调整平移量，确保指针位置不变
    posX = pointerX - (scale / prevScale) * (pointerX - posX);
    posY = pointerY - (scale / prevScale) * (pointerY - posY);
    
    applyMapTransform();
});

}

function getDistance(touch1, touch2) {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function applyMapTransform() {
  const container = document.getElementById('map-container');
  if (!container) return;

  // Calculate the maximum translation value of the map after zooming in计算放大后地图的最大平移值
  const maxX = (MAP_WIDTH * scale - window.innerWidth) * -1;
  const maxY = (MAP_HEIGHT * scale - window.innerHeight + 60) * -1;

  posX = Math.min(0, Math.max(posX, maxX));
  posY = Math.min(0, Math.max(posY, maxY));

  container.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

 // 缩放按钮事件
 document.getElementById('zoom-in').addEventListener('click', function(e) {
  scale = Math.min(scale * 1.1, 3);
  updateZoomCenter();
  applyMapTransform();
});
document.getElementById('zoom-out').addEventListener('click', function(e) {
  scale = scale * 0.9;
  updateZoomCenter();
  applyMapTransform();
});

function updateZoomCenter() {
  const centerX = SCHOOL_CENTER_X * scale;
  const centerY = SCHOOL_CENTER_Y * scale;
  posX = (window.innerWidth / 2) - centerX;
  posY = (window.innerHeight / 2) - centerY;
}


function setInitialPosition() {
  const centerX = SCHOOL_CENTER_X * scale;
  const centerY = SCHOOL_CENTER_Y * scale;
  posX = (window.innerWidth / 2 - centerX);
  posY = (window.innerHeight / 2 - centerY);
}


window.addEventListener('load', function() {
  setInitialPosition();
  applyMapTransform();
  initMapInteraction();

  // 启动 Firestore monitor 监听
  onSnapshot(collection(db, 'parkingLots'), (snapshot) => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added" || change.type === "modified") {
        parkingData[change.doc.id] = change.doc.data();
      } else if (change.type === "removed") {
        delete parkingData[change.doc.id];
      }
    });
    // Re-render heat map points after data update数据更新后重新渲染热力图点
    renderHeatPoints();
  });

  // 隐藏“Map loading...”提示
  const loadingEl = document.querySelector('.loading');
  if (loadingEl) {
    loadingEl.style.display = 'none';
  }

  // Call the filter function to initialize调用筛选功能初始化
  if (typeof initFilter === 'function') {
    initFilter();
  }
});

