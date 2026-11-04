import { build, normalizePath, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// Standalone Vue pages: no Markdown files or separate source directories.
const pages = [
  { route: '/clock', title: '认识时钟', component: 'LearningClock.vue' },
]

const reset = 'html{background:#fff}body{margin:0}*{box-sizing:border-box}'
const moduleId = (route: string) => `virtual:standalone${route}`
const html = (title: string, script: string, styles = '') =>
  `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${reset}</style>${styles}</head><body><div id="app"></div><script type="module" src="${script}"></script></body></html>`

export function standalonePagesPlugin(): Plugin {
  return {
    name: 'standalone-vue-pages',
    resolveId(id) {
      if (pages.some(page => id === moduleId(page.route))) return `\0${id}`
    },
    load(id) {
      const page = pages.find(page => id === `\0${moduleId(page.route)}`)
      if (!page) return
      const component = normalizePath(resolve(import.meta.dirname, '../../theme/components', page.component))
      return `import { createApp } from 'vue'; import Page from ${JSON.stringify(component)}; createApp(Page).mount('#app')`
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const base = server.config.base
        const pathname = (req.url || '').split('?')[0]
        const page = pages.find(page => pathname === `${base}${page.route.slice(1)}` || pathname === `${base}${page.route.slice(1)}.html`)
        if (!page) return next()
        try {
          const source = html(page.title, `${base}@id/__x00__${moduleId(page.route)}`)
          const transformed = await server.transformIndexHtml(pathname, source)
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(transformed)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

export async function buildStandalonePages(site: { srcDir: string; outDir: string; site: { base: string } }) {
  await build({
    configFile: false,
    root: site.srcDir,
    base: site.site.base,
    plugins: [vue(), standalonePagesPlugin(), {
      name: 'standalone-vue-html',
      generateBundle(_, bundle) {
        const styles = Object.values(bundle)
          .filter(file => file.type === 'asset' && file.fileName.endsWith('.css'))
          .map(file => `<link rel="stylesheet" href="${site.site.base}${file.fileName}">`).join('')
        for (const page of pages) {
          const entry = Object.values(bundle).find(file => file.type === 'chunk' && file.isEntry && file.facadeModuleId === `\0${moduleId(page.route)}`)
          if (!entry) throw new Error(`Missing standalone entry: ${page.route}`)
          this.emitFile({ type: 'asset', fileName: `${page.route.slice(1)}.html`, source: html(page.title, `${site.site.base}${entry.fileName}`, styles) })
        }
      },
    }],
    build: {
      outDir: site.outDir,
      emptyOutDir: false,
      rollupOptions: {
        input: Object.fromEntries(pages.map(page => [page.route.slice(1), moduleId(page.route)])),
        output: { entryFileNames: 'assets/standalone-[name]-[hash].js', assetFileNames: 'assets/standalone-[name]-[hash][extname]' },
      },
    },
  })
}
