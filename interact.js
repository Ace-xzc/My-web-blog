// ===========================================
// 文件：script.js
// 功能：健身网站的交互脚本
// 包含：滚动动画效果、主题切换
// ===========================================

// 等待 HTML 文档完全加载后再执行 JavaScript
// 这是为了避免在页面元素还没加载时就尝试操作它们
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // 1. 滚动动画效果
    // 功能：当卡片进入视口时，触发淡入动画
    // ===========================================
    
    // 获取页面中所有 class 为 "card" 的元素
    const cards = document.querySelectorAll('.card');
    
    // 创建 IntersectionObserver 实例
    // 这是一个浏览器 API，用于观察元素是否进入/离开视口
    const observer = new IntersectionObserver((entries) => {
        // 遍历所有被观察到的元素
        entries.forEach(entry => {
            // 如果元素进入视口（在屏幕上可见）
            if (entry.isIntersecting) {
                // 设置元素完全不透明（显示出来）
                entry.target.style.opacity = 1;
                // 将元素移动回原始位置（从下方移上来）
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1  // 阈值设为 0.1，表示元素 10% 可见时触发
    });
    
    // 为每个卡片元素设置初始状态并开始观察
    cards.forEach(card => {
        // 初始状态：完全透明（隐藏）
        card.style.opacity = 0;
        // 初始位置：向下偏移 20 像素
        card.style.transform = 'translateY(20px)';
        // 设置过渡动画效果
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // 开始观察这个卡片元素
        observer.observe(card);
    });
    
    // ===========================================
    // 2. 深色/浅色主题切换
    // 功能：根据用户系统偏好自动切换主题
    // ===========================================
    
    // 检测用户是否偏好深色模式
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    // 定义更新主题的函数
    function updateThemeIcon() {
        // 检查用户是否偏好深色模式
        const isDark = prefersDarkScheme.matches;
        // 根据偏好设置文档的 data-theme 属性
        // CSS 会根据这个属性应用不同的样式
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
    
    // 监听主题偏好变化
    // 当用户在系统设置中切换深色/浅色模式时，自动更新网站主题
    prefersDarkScheme.addListener(updateThemeIcon);
    
    // 页面加载时立即执行一次，设置初始主题
    updateThemeIcon();
});