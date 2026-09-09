<script setup lang="ts">
import { ArrowRight, Braces, CodeXml, Component, House, LayoutTemplate, MousePointer2, Palette, Sparkles } from '@lucide/vue'
import { withBase } from 'vitepress'

const topics = [
  { number: '01', icon: CodeXml, title: '夯实页面基础', en: 'FOUNDATION', description: '从 HTML、CSS 到 JavaScript，理解浏览器如何组织、呈现与驱动页面。', tags: ['HTML', 'CSS', 'JavaScript'], color: 'coral' },
  { number: '02', icon: Component, title: '掌握现代框架', en: 'FRAMEWORKS', description: '走进组件化与工程化，构建清晰、可靠且易于维护的前端应用。', tags: ['Vue', 'React', 'TypeScript'], color: 'magenta' },
  { number: '03', icon: LayoutTemplate, title: '连接工程实践', en: 'ENGINEERING', description: '串联构建、性能与体验，让每一个页面都经得起真实场景检验。', tags: ['Vite', '性能优化', '工程化'], color: 'gold' },
]

const nodes = [
  { icon: CodeXml, title: '结构语义', detail: 'HTML · DOM', position: 'markup' },
  { icon: Palette, title: '视觉呈现', detail: 'CSS · Layout', position: 'styles' },
  { icon: Braces, title: '交互逻辑', detail: 'JavaScript · TS', position: 'logic' },
  { icon: Component, title: '组件工程', detail: 'Vue · React', position: 'frameworks' },
]

const flowPaths = [
  'M110 96 H174 Q198 96 198 120 V161 Q198 175 218 175 H250',
  'M110 256 H174 Q198 256 198 232 V203 Q198 189 218 189 H250',
  'M310 175 H345 Q370 175 370 151 V120 Q370 96 394 96 H450',
  'M310 189 H345 Q370 189 370 213 V232 Q370 256 394 256 H450',
]
</script>

<template>
  <div class="web-home">
    <section class="web-hero" aria-labelledby="web-title">
      <div class="web-intro">
        <p class="web-eyebrow"><i /> 在这里，连接创意与浏览器</p>
        <h1 id="web-title">走进 WEB 前端的世界<br><span>让想法，跃然屏上。</span></h1>
        <p class="web-description">从第一个标签，到每一次流畅交互。<br>系统学习前端开发背后的标准、技术与工程实践。</p>
        <div class="web-actions">
          <a class="web-secondary" :href="withBase('/')"><House :size="17" />首页</a>
          <a class="web-primary" :href="withBase('/guide')">开启学习之旅<ArrowRight :size="17" /></a>
        </div>
        <div class="web-notes"><span>体系清晰</span><span>体验驱动</span><span>持续实践</span></div>
      </div>

      <div class="web-visual" role="img" aria-label="WEB 前端知识体系：以浏览器为核心，连接 HTML、CSS、JavaScript 与现代框架。">
        <div class="visual-label"><span><i /> THE WEB JOURNEY</span><span>从标签到应用</span></div>
        <div class="web-orbit orbit-one" /><div class="web-orbit orbit-two" />
        <svg class="web-connectors" viewBox="0 0 560 350" fill="none" aria-hidden="true">
          <g v-for="(path, index) in flowPaths" :key="path">
            <path :d="path" />
            <path class="web-flow" :d="path" pathLength="100" :style="{ animationDelay: `${index * -0.8}s` }" />
          </g>
        </svg>
        <div v-for="node in nodes" :key="node.position" class="web-node" :class="node.position">
          <component :is="node.icon" :size="24" :stroke-width="1.6" />
          <strong>{{ node.title }}</strong><small>{{ node.detail }}</small>
        </div>
        <div class="web-core"><MousePointer2 :size="40" :stroke-width="1.4" /><strong>WEB</strong><small>结构 · 样式 · 交互</small></div>
        <div class="visual-caption"><Sparkles :size="14" /> 让每一次交互，都自然抵达用户</div>
      </div>
    </section>

    <div class="web-stack"><span>构建你的技术视野</span><div><b>HTML</b><i /><b>CSS</b><i /><b>JavaScript</b><i /><b>Vue</b><i /><b>React</b></div><span>开放标准 · 无限创意</span></div>

    <section class="web-learning" aria-labelledby="learning-title">
      <div class="learning-heading"><div><p>LEARN · CREATE · SHIP</p><h2 id="learning-title">每一步积累，都让下一次表达更自由</h2></div><span>循序渐进，构建你的前端知识体系</span></div>
      <div class="web-topics">
        <article v-for="topic in topics" :key="topic.number" class="web-topic" :class="topic.color">
          <div class="topic-top"><div class="topic-icon"><component :is="topic.icon" :size="23" :stroke-width="1.7" /></div><span>{{ topic.number }} / {{ topic.en }}</span></div>
          <h3>{{ topic.title }}</h3><p>{{ topic.description }}</p><div class="topic-tags"><span v-for="tag in topic.tags" :key="tag">{{ tag }}</span></div>
        </article>
      </div>
    </section>
    <p class="web-closing"><span />保持好奇，让每一个像素都有意义<span /></p>
  </div>
</template>

<style scoped>
.web-home { --web-text: #302827; --web-muted: #746563; --web-accent: var(--web-primary); --web-line: #ead9d6; --web-surface: rgb(255 255 255 / 78%); max-width: 1200px; margin: 0 auto; padding: clamp(24px, 4vh, 40px) 32px 16px; color: var(--web-text); line-height: 1.5; }
.web-hero { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 48px; padding: 8px 0 clamp(20px, 3vh, 28px); }
.web-eyebrow { display: flex; align-items: center; gap: 10px; margin: 0 0 10px; color: var(--web-accent); font-size: 12px; letter-spacing: 2px; }
.web-eyebrow i, .visual-label i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--web-primary); box-shadow: 0 0 0 4px rgb(230 67 61 / 11%); }
.web-intro h1 { margin: 0; padding: 0; text-align: left; font-size: clamp(30px, 3vw, 40px); line-height: 1.3; letter-spacing: 0; font-weight: 750; }
.web-intro h1::after { display: none; }
.web-intro h1 span { color: var(--web-accent); background: linear-gradient(105deg, #e6433d, #f05a48 56%, #df8b17); background-clip: text; -webkit-text-fill-color: transparent; }
.web-description { margin: 10px 0 14px; color: var(--web-muted); font-size: 15px; line-height: 1.6; }
.web-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.web-actions a { display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 10px 18px; border-radius: 8px; font-size: 13px; line-height: 24px; font-weight: 600; transition: transform .2s, box-shadow .2s; }
.web-actions a:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgb(230 67 61 / 18%); }
.web-actions a:focus-visible { outline: 3px solid var(--web-accent); outline-offset: 4px; }
.web-primary { background: linear-gradient(110deg, #e6433d, #f05a48); color: #fff; }
.web-secondary { border: 1px solid #e8b7b2; background: rgb(230 67 61 / 6%); color: var(--web-accent); }
.web-notes { display: flex; gap: 22px; margin-top: 12px; color: var(--web-muted); font-size: 11px; }
.web-notes span::before { content: '•'; margin-right: 7px; color: #dba093; }
.web-visual { position: relative; width: 100%; aspect-ratio: 560 / 350; background-image: radial-gradient(rgb(201 88 66 / 16%) .8px, transparent .8px); background-size: 18px 18px; }
.visual-label { position: absolute; inset: 0 0 auto; display: flex; justify-content: space-between; color: var(--web-muted); font-size: 9px; letter-spacing: 1.8px; }
.visual-label i { margin-right: 9px; }.visual-label > span:last-child { letter-spacing: 0; }
.web-connectors { position: absolute; inset: 0; width: 100%; height: 100%; stroke: #d7aaa0; stroke-width: 1.2; }
.web-orbit { position: absolute; top: 52%; left: 50%; aspect-ratio: 1; transform: translate(-50%, -50%); border: 1px solid rgb(217 72 38 / 10%); border-radius: 50%; }
.orbit-one { width: 44%; }.orbit-two { width: 60%; }
.web-node { position: absolute; display: flex; width: 23%; height: 25%; flex-direction: column; align-items: center; justify-content: center; gap: 6px; border: 1px solid #e3bbb1; border-radius: 8px; background: var(--web-surface); color: #cf4b2d; }
.web-node strong { color: var(--web-text); font-size: 12px; }.web-node small { color: var(--web-muted); font-size: 9px; }
.markup { left: 2%; top: 15%; }.styles { left: 2%; bottom: 14%; border-color: #e6c56d; color: #a87900; }.logic { right: 2%; top: 15%; border-color: #e5a6bd; color: #c13c68; }.frameworks { right: 2%; bottom: 14%; border-color: #d8a9cd; color: #a9438b; }
.web-core { position: absolute; top: 52%; left: 50%; display: flex; width: 24%; height: 37%; transform: translate(-50%, -50%); flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid #df9e8d; border-radius: 8px; background: linear-gradient(140deg, #fff0eb, #fce8ef); box-shadow: 0 0 0 7px rgb(255 255 255 / 42%), 0 12px 35px rgb(217 72 38 / 11%); color: #d94826; }
.web-core strong { font-size: 20px; letter-spacing: 4px; font-weight: 500; }.web-core small { font-size: 9px; letter-spacing: 1px; }
.visual-caption { position: absolute; bottom: 0; display: flex; width: 100%; align-items: center; justify-content: center; gap: 7px; color: var(--web-muted); font-size: 10px; }
.web-stack { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 12px 0; border-block: 1px solid var(--web-line); color: var(--web-muted); font-size: 11px; }
.web-stack > div { display: flex; align-items: center; gap: 25px; }.web-stack b { font-size: 16px; font-weight: 600; line-height: 24px; letter-spacing: 0; }.web-stack i { width: 3px; height: 3px; border-radius: 50%; background: #d4aca2; }
.web-learning { padding-top: clamp(20px, 3vh, 28px); }.learning-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 18px; }.learning-heading p { margin: 0 0 8px; color: var(--web-accent); font-size: 9px; letter-spacing: 2px; }.learning-heading h2 { margin: 0; padding: 0; border: 0; font-size: 20px; font-weight: 650; line-height: 1.5; letter-spacing: 0; }.learning-heading > span { color: var(--web-muted); font-size: 11px; }
.web-topics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }.web-topic { --topic-color: #cf4b2d; --topic-border: #e3bbb1; --topic-tint: rgb(217 72 38 / 7%); position: relative; overflow: hidden; padding: 20px; border: 1px solid var(--topic-border); border-radius: 8px; background: var(--web-surface); }.web-topic::before { position: absolute; top: 0; right: 18px; left: 18px; height: 2px; content: ''; background: linear-gradient(90deg, var(--topic-color), transparent); opacity: .65; }
.magenta { --topic-color: #b63b76; --topic-border: #e2b5ca; --topic-tint: rgb(182 59 118 / 7%); }.gold { --topic-color: #9a7100; --topic-border: #e2ca87; --topic-tint: rgb(194 142 0 / 8%); }
.topic-top { display: flex; align-items: center; gap: 12px; color: var(--topic-color); }.topic-top > span { font-size: 9px; line-height: 24px; letter-spacing: 1px; }.topic-icon { padding: 7px; border-radius: 8px; background: var(--topic-tint); }.web-topic h3 { margin: 8px 0 5px; font-size: 17px; font-weight: 650; }.web-topic p { margin: 0; color: var(--web-muted); font-size: 11px; line-height: 1.7; white-space: nowrap; }.topic-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }.topic-tags span { padding: 2px 8px; border-radius: 4px; background: var(--topic-tint); color: var(--topic-color); font-size: 10px; line-height: 16px; }
.web-closing { display: flex; align-items: center; justify-content: center; gap: 14px; margin: clamp(18px, 2.5vh, 24px) 0 0; color: var(--web-muted); font-size: 11px; }.web-closing span { width: 24px; height: 1px; background: var(--web-line); }
.web-flow { stroke: var(--web-accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 5 95; animation: web-flow 4s linear infinite; }
.web-core::before { position: absolute; inset: -8px; content: ''; border: 1px solid rgb(217 72 38 / 32%); border-radius: 12px; animation: web-pulse 4s ease-out infinite; pointer-events: none; }
.web-core > svg { animation: web-float 5s ease-in-out infinite; }.visual-label i { animation: web-beacon 3s ease-in-out infinite; }
@keyframes web-flow { to { stroke-dashoffset: -100; } } @keyframes web-pulse { 0% { transform: scale(1); opacity: .65; } 85%, 100% { transform: scale(1.25); opacity: 0; } } @keyframes web-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } } @keyframes web-beacon { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
:global(.is-home-page .Layout:has(.web-home)) { background-image: radial-gradient(ellipse at 72% 18%, rgb(255 208 194 / 24%), transparent 46%), linear-gradient(150deg, rgb(255 235 225 / 70%), transparent 58%), linear-gradient(215deg, rgb(255 246 207 / 42%), transparent 58%); background-size: auto; }
:global(.VPHome:has(.web-home)) { margin-bottom: 0; }:global(.Layout:has(.web-home) .VPFooter) { padding: 16px 24px; }
:global(.dark .web-home) { --web-text: #f6e8e3; --web-muted: #cbb3ab; --web-accent: #ff8062; --web-line: #5a3b35; --web-surface: rgb(49 31 30 / 84%); }
:global(.dark .is-home-page .Layout:has(.web-home)), :global(.dark.is-home-page .Layout:has(.web-home)) { background-image: radial-gradient(ellipse at 70% 18%, rgb(155 48 83 / 22%), transparent 50%), linear-gradient(145deg, rgb(111 52 29 / 28%), transparent 65%); }
:global(.dark .web-home .web-core) { border-color: #9f5b4a; background: linear-gradient(140deg, #572e28, #552b3d); box-shadow: 0 0 0 7px rgb(226 96 66 / 8%); color: #ff9a7f; }
:global(.dark .web-home .web-topic) { --topic-border: #68463f; --topic-color: #f0a38f; }:global(.dark .web-home .magenta) { --topic-border: #6d3c55; --topic-color: #ee9ac1; }:global(.dark .web-home .gold) { --topic-border: #695b32; --topic-color: #e6ca75; }
@media (max-width: 960px) { .web-hero { gap: 24px; }.web-stack > span:last-child, .learning-heading > span { display: none; }.web-stack > div { gap: 18px; }.web-core { gap: 5px; }.web-core svg { width: 32px; } }
@media (max-width: 700px) { .web-home { padding: 32px 24px 20px; }.web-hero { grid-template-columns: 1fr; gap: 36px; padding-bottom: 30px; }.web-intro { text-align: center; }.web-eyebrow, .web-actions, .web-notes { justify-content: center; }.web-intro h1 { text-align: center; font-size: clamp(27px, 6vw, 38px); line-height: 1.4; }.web-description { font-size: 13px; line-height: 1.8; }.web-visual { max-width: 520px; margin: auto; }.web-stack { flex-direction: column; gap: 12px; }.web-stack > div { gap: 12px; }.web-stack b { font-size: 12px; }.web-learning { padding-top: 30px; }.learning-heading h2 { font-size: 18px; }.web-topics { grid-template-columns: 1fr; gap: 14px; }.web-topic { padding: 20px; }.web-topic h3 { font-size: 15px; line-height: 22px; }.web-topic p { line-height: 1.6; }.web-closing { gap: 8px; font-size: 10px; }.web-closing span { width: 12px; }.web-node { gap: 4px; }.web-node > svg { width: 19px; height: 19px; flex-shrink: 0; }.web-node strong { font-size: 10px; line-height: 1.4; }.web-node small { font-size: 7px; line-height: 1.4; white-space: nowrap; }.web-core { gap: 4px; }.web-core > svg { width: 28px; height: 28px; }.web-core strong { font-size: 16px; letter-spacing: 2px; }.web-core small { font-size: 7px; letter-spacing: 0; } }
@media (min-width: 961px) and (max-height: 900px) { .web-home { padding-top: 16px; padding-bottom: 12px; }.web-hero { padding-bottom: 16px; }.web-visual { max-width: 408px; justify-self: end; }.web-intro h1 { font-size: 32px; }.web-eyebrow { margin-bottom: 8px; }.web-description { margin: 12px 0; line-height: 1.7; }.web-actions a { padding: 10px 16px; }.web-notes { margin-top: 8px; }.web-learning { padding-top: 16px; }.learning-heading { margin-bottom: 12px; }.learning-heading h2 { font-size: 18px; }.learning-heading p { margin-bottom: 5px; }.web-topic { padding: 16px; }.web-topic h3 { margin-top: 10px; margin-bottom: 6px; }.web-topic p { margin-bottom: 10px; }.web-closing { margin-top: 18px; }:global(.Layout:has(.web-home) .VPFooter) { padding: 12px 24px; } }
@media (prefers-reduced-motion: reduce) { .web-flow, .web-core::before, .web-core > svg, .visual-label i { animation: none; }.web-flow, .web-core::before { opacity: 0; }.web-actions a { transition: none; }.web-actions a:hover { transform: none; } }
@media (max-width: 700px) { .web-topic p { white-space: normal; } }
</style>
