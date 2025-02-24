
  const filterMap = {
    'all': ['MU Student', 'Multi-Permit','MU Staff','EV Charge Point','Car Share/Pooling','Restricted','Pay and Display'],
    'visit': ['Pay and Display'],
    'staff': ['MU Staff', 'Multi-Permit'],
    'student': ['MU Student', 'Multi-Permit'],
    'charge': ['EV Charge Point']
  };
  
  // 初始化筛选功能
  function initFilter() {
    // 桌面端按钮
    document.querySelectorAll('.filter-btn:not(#mobile-filter-toggle)').forEach(btn => {
      btn.addEventListener('click', function() {
        filterParking(this.dataset.type);
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // 移动端按钮
    const mobileToggle = document.getElementById('mobile-filter-toggle');
    const dropdown = document.getElementById('filterDropdown');
    
    // 生成移动端菜单
    const mobileItems = ['all','visit', 'staff', 'student', 'charge'].map(type => {
      const item = document.createElement('button');
      item.className = 'filter-item';
      item.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      item.dataset.type = type;
      return item;
    });
  
    mobileItems.forEach(item => {
      item.addEventListener('click', function() {
        filterParking(this.dataset.type);
        dropdown.classList.remove('show');
      });
      dropdown.appendChild(item);
    });
  
    // 切换移动菜单
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
  
    // 点击外部关闭
    document.addEventListener('click', () => dropdown.classList.remove('show'));
  }
  
  // 筛选逻辑
  function filterParking(type) {
    const permits = filterMap[type];
    document.querySelectorAll('.heat-point').forEach(point => {
      const permit = point.dataset.permit;
      point.style.display = permits.includes(permit) ? 'block' : 'none';
    });
  }
  