import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is only needed for the GitHub Pages preview build, where the
// site is served from /Fit-by-Rob-Website/ instead of the domain root.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Fit-by-Rob-Website/' : '/',
}))
