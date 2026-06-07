import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ? 检查这里！改回你原本的 plugin-react，报错立刻消失

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ?? 动态路径雷达
  base: process.env.GITHUB_ACTIONS === 'true' ? '/my-awesome-site/' : '/',
})