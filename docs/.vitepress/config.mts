import { defineConfig } from 'vitepress'
import { sharedConfig } from './config/share'
import { zhConfig } from './config/zh'
import { enConfig } from './config/en'
import { buildStandalonePages } from './config/shared/standalone'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...sharedConfig,
  buildEnd: buildStandalonePages,
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
