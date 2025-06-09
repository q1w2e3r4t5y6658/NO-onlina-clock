# NO-onlina-clock
一个纯前端可在任意浏览器上实现的简易时钟，只有700多行代码   



精确到毫秒：秒表现在显示格式为"分:秒.毫秒"（例如 02:34.567）
计圈功能：每次计圈会显示当前圈的时间和总时间
按钮状态管理：开始/暂停按钮状态切换更流畅
复位功能：完全重置秒表状态

UI: 安卓风格设计
材质设计原则：
圆角卡片式布局
浮动操作按钮（FAB）
阴影和层次感
响应式触摸区域

色彩系统：
使用Material Design规范的颜色
蓝色表示主要操作
绿色表示辅助操作
红色表示危险操作

导航设计：
底部标签栏指示器
平滑的标签切换效果

秒表界面：
大型数字显示
圆形操作按钮
圈数记录卡片式设计
使用等宽字体保证数字对齐

其他：
响应式设计，适配不同屏幕尺寸
优化了倒计时输入界面
世界时钟卡片式布局
整体UI更加简洁现代
这个设计遵循了Material Design指南，提供了类似原生安卓应用的体验，同时修复了秒表功能的问题，使其能够精确到毫秒级别。



实现原理：

1. 核心功能实现
本地时间功能
使用JavaScript的Date对象获取本地时间
setInterval每秒更新显示
使用padStart方法格式化时间显示

秒表功能
使用performance.now()获取高精度时间戳
requestAnimationFrame实现流畅的毫秒级更新
格式化显示：分:秒.毫秒

倒计时功能
使用setInterval每秒更新
输入验证确保时间值有效
倒计时结束播放提示音

世界时钟
使用toLocaleTimeString的timeZone选项
动态生成时区卡片
使用预定义时区列表

安卓风格实现
Material Design原则：卡片、阴影、浮动按钮
响应式布局：使用Flexbox和媒体查询
交互反馈：按钮按下效果、状态变化

下面是部分代码：
颜色：
:root {
    --primary: #4285f4;     /* 主色 */
    --secondary: #34a853;   /* 辅助色 */
    --warning: #fbbc05;     /* 警告色 */
    --danger: #ea4335;      /* 危险色 */
    --background: #f5f5f5;  /* 背景色 */
    --surface: #ffffff;     /* 表面色 */
}

按钮：
.btn {
    border: none;
    border-radius: 50%;      /* 圆形按钮 */
    width: 64px;
    height: 64px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* 阴影效果 */
    transition: all 0.2s;    /* 平滑过渡 */
}

.btn:active {
    transform: scale(0.96);  /* 按下效果 */
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

外部资源引用：

1. Google Fonts
2. Material Icons



下载html直接运行



# NO-onlina-clock (Notes in English)

A simple clock that can be implemented on any browser with a pure front-end, with just over 700 lines of code   



Accurate to the millisecond: The second watch is now displayed in the format "Minutes:Seconds. milliseconds" (e.g. 02:34.567)
Lap function: Each lap will display the current lap time and total time
Button state management: Start/pause button state switching is smoother
Reset Function: Reset the stopwatch state completely

UI: Android style design
Material Design Principles:
Rounded corner card layout
Floating Operation Button (FAB)
Shadows and layering
Responsive touch area

Color system:
Use the colors of the Material Design specification
Blue indicates the main operation
Green indicates an auxiliary operation
Red indicates dangerous operation

Navigation Design:
Bottom tab bar indicator
Smooth tab transitions

Stopwatch Interface:
Large digital display
Circular action buttons
Lap record card design
Use monospaced fonts to ensure that the numbers are aligned

Other:
Responsive design for different screen sizes
The countdown input interface has been optimized
World Clock Card Layout
The overall UI is cleaner and more modern
This design follows Material Design guidelines and provides a native Android app-like experience, while fixing an issue with the stopwatch feature to make it accurate to the millisecond.



How it works:

1. Core function implementation
Local time function
Use JavaScript's Date object to get the local time
setInterval updates the display every second
Use the padStart method to format the time display

Stopwatch function
Use performance.now() to get a high-precision timestamp
requestAnimationFrame for smooth millisecond updates
Format display: minutes: seconds. millisecond

Download the html and run it directly


