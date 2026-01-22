
// 等待 Docsify 渲染完成后再绑定事件
document.addEventListener('DOMContentLoaded', function () {
    const observer = new MutationObserver(() => {
        attachSidebarClickHandler();
    });

    // 监听 sidebar 变化（如页面跳转后重新渲染）
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        observer.observe(sidebar, { childList: true, subtree: true });
        attachSidebarClickHandler(); // 初始绑定
    }
});

function attachSidebarClickHandler() {
    // 移除旧的监听器避免重复绑定
    document.querySelectorAll('.sidebar-nav > ul > li > a').forEach(el => {
        el.removeEventListener('click', handleTopLevelClick);
        el.addEventListener('click', handleTopLevelClick);
    });
}

function handleTopLevelClick(e) {
    const clickedLink = e.target;
    const sidebarNav = document.querySelector('.sidebar-nav');

    if (!sidebarNav) return;

    // 获取所有一级菜单下的子菜单（即二级及以下的 <ul>）
    const allSubMenus = sidebarNav.querySelectorAll(':scope > ul > li > ul');

    allSubMenus.forEach(ul => {
        // 如果这个子菜单属于当前点击的项，则跳过（可选：也可以收起它）
        if (ul.parentElement.querySelector('a') === clickedLink) {
            // 可选行为：
            // 如果你想“切换”当前项（点击展开/收起），保留下面这行
            // 否则，如果你想“总是收起其他，但保持当前展开”，就注释掉
            // ul.style.display = ul.style.display === 'none' ? 'block' : 'none';

            // 更推荐：总是展开当前项（即使之前是展开的）
            ul.style.display = 'block';
        } else {
            // 收起其他所有子菜单
            ul.style.display = 'none';
        }
    });
}
