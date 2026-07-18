import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run build` (used for Netlify, which serves from the domain root)
// always uses base '/'. The GitHub Pages preview build is served from
// /Fit-by-Rob-Website/ instead, so it uses `npm run build:ghpages`
// (--mode ghpages) to opt into that base path specifically.
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'ghpages' ? '/Fit-by-Rob-Website/' : '/',
}))
