// 菜单切换逻辑
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

// 点击外部关闭菜单
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// 窗口大小变化时自动关闭菜单
window.addEventListener('resize', function() {
    document.getElementById('dropdownMenu').classList.remove('show');
});