// Switch menu function 菜单切换逻辑
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

// close info box 点击外部关闭菜单
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// change window close menu 窗口大小变化时自动关闭菜单
window.addEventListener('resize', function() {
    document.getElementById('dropdownMenu').classList.remove('show');
});


// sub-menu 

document.addEventListener('DOMContentLoaded', function() {
    var submenuToggle = document.querySelector('.submenu-toggle');
    var submenuContent = document.querySelector('.submenu-content');
    var submenu = document.querySelector('.submenu');
    
    if (submenuToggle && submenuContent) {
        // 点击时切换 active 状态
        submenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (submenuContent.classList.contains('active')) {
                submenuContent.classList.remove('active');
            } else {
                submenuContent.classList.add('active');
            }
        });
        
        // 鼠标离开子菜单区域时移除 active 状态
        submenu.addEventListener('mouseleave', function() {
            submenuContent.classList.remove('active');
        });
        
        // 点击页面其他地方时也关闭子菜单
        document.addEventListener('click', function(e) {
            if (!submenu.contains(e.target)) {
                submenuContent.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var submenu = document.querySelector('.submenu');
    if (!submenu) return;
    
    var submenuToggle = submenu.querySelector('.submenu-toggle');
    
    // 点击按钮时切换 active 状态（移动端适用）
    submenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        // 切换父容器的 active 类
        submenu.classList.toggle('active');
    });
    
    // 点击页面其他区域时关闭子菜单
    document.addEventListener('click', function(e) {
        if (!submenu.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });
    
    // 可选：在移动端下，离开子菜单区域时也自动关闭
    submenu.addEventListener('mouseleave', function() {
        // 仅在移动端关闭，判断窗口宽度
        if (window.innerWidth <= 500) {
            submenu.classList.remove('active');
        }
    });
});
