import terser from "@rollup/plugin-terser";
import type { ViteDevServer } from "vite";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import AutoFrontmatter from "vitepress-plugin-auto-frontmatter";
import { AnnouncementPlugin } from "vitepress-plugin-announcement";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { ImagePreviewPlugin } from "vitepress-plugin-image-preview";
import Permalink from "vitepress-plugin-permalink";
import { qrcode } from "vite-plugin-qrcode";
import { customIcon } from "../../theme/utils/customIcon";
import { IndexPermalinkCompat } from "../../theme/plugins/Index-permalink-compat-plugin";
import { demoAlias } from "./context";

export const viteConfig = {
    resolve: { alias: demoAlias },
    build: { chunkSizeWarningLimit: 2000 },
    ssr: {
        noExternal: [
            "dayjs",
            "@nolebase/vitepress-plugin-enhanced-readabilities",
            "@nolebase/ui",
            "@nolebase/vitepress-plugin-highlight-targeted-heading",
            "@nolebase/vitepress-plugin-inline-link-preview",
        ],
    },
    optimizeDeps: {
        exclude: [
            "@nolebase/vitepress-plugin-enhanced-readabilities/client",
            "vitepress",
            "@nolebase/vitepress-plugin-inline-link-preview/client",
        ],
    },
    plugins: [
        {
            name: 'standalone-clock-route',
            configureServer(server: ViteDevServer) {
                server.middlewares.use(async (req, res, next) => {
                    if (/^\/clock(?:\?|$)/.test(req.url || '')) {
                        res.writeHead(302, { Location: (req.url || '').replace('/clock', '/clock/') });
                        res.end();
                        return;
                    }
                    if (/^\/clock\/(?:index\.html)?(?:\?|$)/.test(req.url || '')) {
                        try {
                            const source = await readFile(resolve(server.config.root, 'clock/index.html'), 'utf8');
                            const html = await server.transformIndexHtml('/clock/index.html', source);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/html; charset=utf-8');
                            res.end(html);
                        } catch (error) {
                            next(error);
                        }
                        return;
                    }
                    next();
                });
            },
        },
        AutoFrontmatter({
            pattern: "**/*.md",
            transform: (frontmatter, fileInfo) => {
                const isAboutPage = /^(?:zh\/)?about\/index\.md$/.test(fileInfo.relativePath.replaceAll("\\", "/"));

                const transformed = {
                    ...frontmatter,
                    encrypt: frontmatter.encrypt ?? false,
                    ...(frontmatter.permalink || isAboutPage
                        ? {}
                        : { permalink: `/pages/${(Math.random() + Math.random()).toString(16).slice(2, 8)}` }),
                };
                if (frontmatter.encrypt !== undefined && (frontmatter.permalink || isAboutPage)) return;
                return Object.keys(transformed).length ? transformed : undefined;
            },
        }),
        AnnouncementPlugin({
            title: "公告",
            duration: 2,
            mobileMinify: true,
            body: [
                { type: "text", content: "👇 文章中 emoji 详解 👇" },
                { type: "text", content: "🌱 ➡️ 了解", style: "" },
                { type: "text", content: "🔥 ➡️ 熟悉", style: "" },
                { type: "text", content: "🎯 ➡️ 掌握", style: "" },
                { type: "text", content: "💾 ➡️ 过时", style: "" },
            ],
        }),
        qrcode(),
        ImagePreviewPlugin(),
        terser(),
        groupIconVitePlugin({ customIcon }) as any,
        Permalink({ ignoreList: [/^(?:zh\/)?about(?:\/|$)/] }),
        IndexPermalinkCompat(),
    ],
    server: { port: 51703, strictPort: false },
};

