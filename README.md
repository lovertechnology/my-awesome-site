# ? NEXUS LABS - 复合态工业级门户系统

基于 **React 18**、**TypeScript** 和 **Vite** 架构打造的高端数字化企业门户系统。视觉设计深度致敬 DJI (大疆创新) 电影级全屏暗黑视界与 Apple 极简毛玻璃微光顶导管线，底层融入了多项控制工程及单页应用（SPA）的性能优化方案。

---

## ? 核心工程架构与技术亮点

### 1. ? 零依赖轻量化哈希路由引擎 (Hash Router)
放弃了沉重的第三方路由库，纯底层基于原生 JavaScript 的 `hashchange` 事件建立全双工网络雷达监听器。
* 完美攻克了传统单页应用中“地址栏变动、页面不跟随刷新”的经典断片死锁 Bug。
* 完整兼容浏览器的 **上一页/下一页（前进/后退）** 硬件按键动作，支持公网 URL 哈希直达特定页面。

### 2. ?? 跨平台动态智能路径感应雷达 (Dual-Platform CI/CD Environment)
为了在极端不同的公网环境下完美降维打击，在 `vite.config.ts` 中安插了环境感应：
* **GitHub Pages (`github.io`)**：自动识别云端 `GITHUB_ACTIONS` 变量，动态切入 `/my-awesome-site/` 子路径存储盒，攻克了国内原生网络免 VPN 秒开的刚需。
* **Vercel / 本地环境**：自动平滑切回标准根路径 `/`，实现一套源码、两翼齐飞的工业级闭环。

### 3. ?? 严格期类型守卫 (TypeScript Type Safety)
* 引入 `@types/node` 类型片，打通了浏览器 DOM 环境与 Node.js 宿主全局变量（如 `process.env`）的通信壁垒，确保编译期零波浪线、零 Warning 强力 Release。

---

## ?? 本地开发流水线

### 1. 注入依赖
克隆项目到本地后，在根目录下轰入以下命令装载全套开发套件：
```bash
npm install
npm i --save-dev @types/node