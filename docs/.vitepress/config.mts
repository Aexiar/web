import { defineConfig } from 'vitepress'
import { sharedConfig } from './config/share'
import { zhConfig } from './config/zh'
import { enConfig } from './config/en'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...sharedConfig,
  async buildEnd(siteConfig) {
    await build({
      configFile: false,
      root: resolve(siteConfig.srcDir, 'clock'),
      base: `${siteConfig.site.base}clock/`,
      plugins: [vue()],
      build: { outDir: resolve(siteConfig.outDir, 'clock'), emptyOutDir: true },
    })
  },
  locales: { // 多语言
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zhConfig
    },
    // en: {
    //   label: 'English',
    //   lang: 'en',
    //   link: '/en/',
    //   title: 'C/C++',
    //   ...enConfig
    // },
  },
})
