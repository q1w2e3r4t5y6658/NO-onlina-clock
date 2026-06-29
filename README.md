# 在线时钟

一个基于 Material Design 3 (MD3) 风格设计的响应式在线时钟应用，支持本地时钟、秒表和倒计时功能。

> **注意**：项目当前存在两种代码形态——`index.html` 为内联版本（包含完整 HTML+CSS+JS），同时也引用了外部 CSS/JS 文件（模块化版本）。关注核心功能时，请以 `js/`、`css/` 下的模块代码为准。

---

## ✨ 功能特性

- **本地时钟**：实时显示当前时间、日期和星期
- **秒表**：精确计时，支持记录多圈（Lap），精度达毫秒级
- **倒计时**：可自定义小时、分钟、秒，结束时有消息提示
- **每日一言**：自动从一言 API 获取并展示名言警句，支持手动刷新
- **历史上的今天**：展示当天发生的历史事件
- **Material Design 3**：自支持浅色/深色模式，UI 精致、动画流畅
- **响应式布局**：自适应桌面与移动端
- **精美的交互细节**：按钮水波纹效果、Tab 切换动画、Snackbar 提示、GitHub 链接悬停提示等

---

## 🚀 快速开始

本项目为纯前端静态页面，无需构建步骤，直接打开 `index.html` 即可使用。

```bash
# 方式一：直接打开
double-click index.html

# 方式二：使用本地服务器
npx http-server .
```

---

## 🧩 项目结构 & 核心代码说明

```
NO-onlina-clock
├── index.html          # 主入口（含内联完整代码，也引入了外部 CSS）
├── 照片.png             # 项目介绍图片
├── css
│   ├── tokens.css       # MD3 颜色、形状、动效变量（支持暗黑模式）
│   ├── components.css   # 全局样式与各组件布局（卡片、Tab、按钮、输入框等）
│   └── animations.css   # CSS 动画（淡入、滑入、缩放、涟漪等）
└── js
    ├── app.js           # 初始化所有模块，管理 Tab 切换逻辑
    ├── clock.js         # 本地时钟：获取并显示当前时间/日期/星期
    ├── stopwatch.js     # 秒表：开始/暂停/重置/计圈（毫秒级精度）
    ├── countdown.js     # 倒计时：设置时间、开始/暂停/重置
    ├── quote.js         # 每日一言：从 hitokoto API 获取名言
    ├── history.js       # 历史上的今天：获取当天历史事件
    ├── notification.js  # Snackbar 通知组件
    └── ripple.js        # 按钮点击涟漪效果
```

---

### 1. 整体架构

项目采用**纯前端模块化**开发：

- **HTML** (`index.html`)：定义页面骨架和语义结构。
- **CSS** (`css/` 下三个文件)：分离为变量定义、组件样式、动画，结构清晰。
- **JavaScript** (`js/` 下 ES6 Module)：各功能点拆分独立模块，通过 `app.js` 统一调度和初始化。

---

### 2. 核心模块详解

#### `app.js` —— 应用中枢

- 负责初始化所有子模块（`Clock`、`Stopwatch`、`Countdown`、`QuoteService`、`HistoryService`）。
- 管理 Tab 切换：监听 `.tab` 按钮点击，利用 `requestAnimationFrame` + CSS `transition` 实现左右滑动过渡动画。

#### `clock.js` —— 本地时钟

- 使用 `setInterval` 每秒更新时间。
- 调用 `Date` API 获取当前时间、日期、星期，转换为格式化的中文字符串显示。

#### `stopwatch.js` —— 秒表

- 使用 `performance.now()` 实现高精度计时（毫秒级）。
- 利用 `requestAnimationFrame` 实时更新显示，避免 `setInterval` 精度不足问题。
- 支持 **计圈（Lap）** 功能：记录每圈的分段用时和累计总用时。

#### `countdown.js` —— 倒计时

- 用户通过输入框设定小时、分钟、秒。
- 内部统一转换为总秒数，通过 `setInterval` 每秒递减，剩余 0 时触发 `Notification.show` 提示。
- **注意**：`start()` 方法会重新读取输入值作为总时长，已暂停的计时不会暂停后延续；重置将所有输入归零。

#### `quote.js` —— 每日一言

- 请求 [hitokoto.cn](https://v1.hitokoto.cn/) 公共 API。
- 过滤重复语录，失败后展示默认文案。
- 每 30 秒自动刷新，同时底部显示 30 秒倒计时提示。

#### `history.js` —— 历史上的今天

- 请求 `https://jkapi.com/api/history`。
- 解析纯文本响应，正则提取年份和事件。
- 请求失败时展示友好默认提示。

#### `notification.js` —— 轻提示

- 单例封装，通过操作 `className` 控制 Snackbar 的显示/隐藏。
- 支持自定义显示时长（默认 3 秒）。

#### `ripple.js` —— 水波纹效果

- 全局监听 `pointerdown`，在 `.fab`、`.icon-btn`、`.tab`、`.gh-link` 上生成圆形扩散稀释动画。
- 动画结束后自动移除 DOM，避免内存泄漏。

---

### 3. UI & 样式

- **Material Design 3**：`tokens.css` 完整定义了 Light/Dark 两套色彩体系（Primary、Secondary、Tertiary、Surface、Error 等），以及圆角、动效缓动函数。
- **组件规范**：Card、FAB（浮动操作按钮）、Tab、Input、Snackbar 均遵循 MD3 规范，Hover/Active 状态均有对应状态色。
- **响应式**：`components.css` 底部通过 `@media (max-width: 850px)` 和 `@media (max-width: 480px)` 分别处理平板窄屏和手机小屏布局，确保移动体验。
- **无障碍**：`focus-visible` 为键盘导航提供清晰轮廓线；`touch-action: manipulation` 优化移动端触控。

---

## 💡 注意事项 / 后续建议

1. **入口文件双重形态**：当前 `index.html` 中既存在内联的完整 `<script>` 代码，又引入了外部 CSS 文件。建议后续统一入口，只保留一种方式（如使用外部模块化链接）。
2. **API 稳定性**：一言和历史上的今天均依赖第三方免费接口，接口失效时需有降级处理（当前已有默认兜底）。
3. **Tab 动画优化**：当前使用 `translateX` 实现滑动动画，可以考虑在切换期间对 Tab 区域应用 `overflow: hidden` 防止内容溢出跳动。

---

## 📄 许可证

本项目仅供学习交流使用。
