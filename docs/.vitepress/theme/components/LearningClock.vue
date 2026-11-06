<script setup lang="ts">
import { computed, ref } from "vue"

type Hand = "hour" | "minute" | "second"
const now = new Date()
const total = ref(
  now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
)
const selected = ref<Hand>("minute")
const dragging = ref<number | null>(null)
const dial = ref<SVGSVGElement>()
let previousAngle = 0
let remainder = 0
const hands = [
  {
    key: "hour" as Hand,
    label: "时针",
    color: "#7955cc",
    length: 76,
    width: 10,
    unit: 120,
  },
  {
    key: "minute" as Hand,
    label: "分针",
    color: "#147caa",
    length: 112,
    width: 7,
    unit: 10,
  },
  {
    key: "second" as Hand,
    label: "秒针",
    color: "#db5260",
    length: 137,
    width: 3,
    unit: 1 / 6,
  },
]
const hour = computed(() => Math.floor(total.value / 3600))
const minute = computed(() => Math.floor(total.value / 60) % 60)
const second = computed(() => total.value % 60)
const pad = (n: number) => String(n).padStart(2, "0")
const display = computed(
  () => `${pad(hour.value)}:${pad(minute.value)}:${pad(second.value)}`,
)
const angles = computed(() => ({
  hour: total.value / 120,
  minute: total.value / 10,
  second: second.value * 6,
}))
function normalize(value: number) {
  total.value = ((value % 86400) + 86400) % 86400
}
function adjustPart(key: Hand, delta: number) {
  normalize(total.value + delta * { hour: 3600, minute: 60, second: 1 }[key])
}
function setPart(key: Hand, event: Event) {
  const value = Number((event.target as HTMLSelectElement).value)
  const parts = { hour: hour.value, minute: minute.value, second: second.value }
  parts[key] = value
  normalize(parts.hour * 3600 + parts.minute * 60 + parts.second)
}
function angle(event: PointerEvent) {
  const rect = dial.value!.getBoundingClientRect()
  return (
    (Math.atan2(
      event.clientX - rect.left - rect.width / 2,
      -(event.clientY - rect.top - rect.height / 2),
    ) *
      180) /
    Math.PI
  )
}
function start(event: PointerEvent, hand = selected.value) {
  if (dragging.value !== null || event.button !== 0) return
  selected.value = hand
  dragging.value = event.pointerId
  previousAngle = angle(event)
  remainder = 0
  dial.value!.setPointerCapture(event.pointerId)
  event.preventDefault()
}
function move(event: PointerEvent) {
  if (dragging.value !== event.pointerId) return
  const next = angle(event)
  const delta = ((next - previousAngle + 540) % 360) - 180
  previousAngle = next
  remainder += delta * hands.find((h) => h.key === selected.value)!.unit
  const step = Math.trunc(remainder)
  remainder -= step
  normalize(total.value + step)
}
function stop(event: PointerEvent) {
  if (dragging.value !== event.pointerId) return
  dragging.value = null
  if (dial.value?.hasPointerCapture(event.pointerId))
    dial.value.releasePointerCapture(event.pointerId)
}
</script>

<template>
  <main class="clock-page">
    <header>
      <span class="eyebrow">一起发现时间的秘密</span>
      <h1>认识时钟</h1>
      <p>动动小手，让时间听你的！</p>
    </header>
    <div class="clock-layout">
      <section class="dial-card" aria-label="互动时钟">
        <svg
          ref="dial"
          class="dial"
          viewBox="0 0 360 360"
          aria-label="可拖动的时钟，使用下方选择框也可调整时间"
          @pointerdown="start($event)"
          @pointermove="move"
          @pointerup="stop"
          @pointercancel="stop"
          @lostpointercapture="stop"
        >
          <circle
            cx="180"
            cy="180"
            r="174"
            fill="var(--vp-c-bg)"
            stroke="var(--vp-c-divider)"
            stroke-width="2"
          />
          <g
            v-for="tick in 60"
            :key="tick"
            :transform="`rotate(${tick * 6} 180 180)`"
          >
            <line
              x1="180"
              y1="17"
              x2="180"
              :y2="tick % 5 === 0 ? 30 : 23"
              :stroke="tick % 5 === 0 ? '#667085' : '#c1c8d3'"
              :stroke-width="tick % 5 === 0 ? 3 : 1.5"
            />
          </g>
          <text
            v-for="n in 12"
            :key="n"
            :x="180 + 132 * Math.sin((n * Math.PI) / 6)"
            :y="180 - 132 * Math.cos((n * Math.PI) / 6)"
            text-anchor="middle"
            dominant-baseline="central"
            class="number"
          >
            {{ n }}
          </text>
          <g
            v-for="hand in hands"
            :key="hand.key"
            :transform="`rotate(${angles[hand.key]} 180 180)`"
            @pointerdown.stop="start($event, hand.key)"
          >
            <line
              x1="180"
              y1="190"
              x2="180"
              :y2="180 - hand.length"
              stroke="transparent"
              stroke-width="28"
              class="hand"
            />
            <line
              x1="180"
              y1="190"
              x2="180"
              :y2="180 - hand.length"
              :stroke="hand.color"
              :stroke-width="hand.width"
              stroke-linecap="round"
              class="hand"
            />
            <circle
              cx="180"
              :cy="180 - hand.length"
              r="7"
              :fill="hand.color"
              class="hand"
            />
          </g>
          <circle
            cx="180"
            cy="180"
            r="9"
            fill="#344054"
            pointer-events="none"
          />
        </svg>
        <div class="hand-tabs" aria-label="选择要拖动的指针">
          <button
            v-for="hand in hands"
            :key="hand.key"
            :aria-pressed="selected === hand.key"
            :style="{ '--hand-color': hand.color }"
            @click="selected = hand.key"
          >
            {{ hand.label }}
          </button>
        </div>
        <p class="hint">
          拖动指针，或选中一种指针后在表盘上转动。<br />指针重叠时，可以先用上方按钮选择。
        </p>
      </section>
      <section class="time-card" aria-label="时间选择">
        <span class="eyebrow">现在的时间是</span
        ><output class="digital">{{ display }}</output>
        <p class="reading">{{ hour }} 时 {{ minute }} 分 {{ second }} 秒</p>
        <div class="time-inputs">
          <div
            v-for="hand in hands"
            :key="hand.key"
            class="time-column"
            :style="{ '--part-color': hand.color }"
          >
            <span class="part-label">{{ hand.label.slice(0, 1) }}</span>
            <div class="stepper">
              <button
                type="button"
                :aria-label="`增加一${hand.key === 'hour' ? '小时' : hand.key === 'minute' ? '分钟' : '秒'}`"
                @click="adjustPart(hand.key, 1)"
              >
                ＋
              </button>
              <select
                :aria-label="`选择${hand.label.slice(0, 1)}`"
                :value="
                  hand.key === 'hour'
                    ? hour
                    : hand.key === 'minute'
                      ? minute
                      : second
                "
                @change="setPart(hand.key, $event)"
              >
                <option
                  v-for="n in hand.key === 'hour' ? 24 : 60"
                  :key="n"
                  :value="n - 1"
                >
                  {{ pad(n - 1) }}
                </option>
              </select>
              <button
                type="button"
                :aria-label="`减少一${hand.key === 'hour' ? '小时' : hand.key === 'minute' ? '分钟' : '秒'}`"
                @click="adjustPart(hand.key, -1)"
              >
                −
              </button>
            </div>
          </div>
        </div>
        <p class="hint">
          点按 ＋ / − 调整，或轻点数字选择时间。使用 24 小时制。
        </p>
        <div class="lesson">
          <h2>时钟小知识</h2>
          <p>🟣 时针短短的：走一大格是 1 小时。</p>
          <p>🔵 分针长长的：走一小格是 1 分钟。</p>
          <p>🔴 秒针细细的：走一小格是 1 秒钟。</p>
          <strong>60 秒 = 1 分钟 · 60 分钟 = 1 小时</strong>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.clock-page {
  font-family: system-ui, sans-serif;
  color-scheme: light;
  --vp-c-text-1: #25324b;
  --vp-c-text-2: #667085;
  --vp-c-brand-1: #7955cc;
  --vp-c-bg: #fff;
  --vp-c-bg-soft: #f7f8fc;
  --vp-c-divider: #e0e5ed;
  background: #fff;
  min-height: 100vh;
  max-width: 1080px;
  margin: auto;
  padding: 40px 24px 64px;
  color: var(--vp-c-text-1);
}
.clock-page * {
  box-sizing: border-box;
}
button,
select {
  font: inherit;
  -webkit-tap-highlight-color: transparent;
}
button {
  cursor: pointer;
  background: transparent;
}
h1,
h2,
p {
  margin: 0;
}
header {
  text-align: center;
  margin-bottom: 32px;
}
.eyebrow {
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
}
h1 {
  font-size: 36px;
  line-height: 1.4;
  margin: 8px 0;
}
header p,
.hint {
  color: var(--vp-c-text-2);
}
.clock-layout {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 28px;
  align-items: center;
}
.dial-card,
.time-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 28px;
  padding: 28px;
  background: var(--vp-c-bg-soft);
}
.dial {
  width: 100%;
  max-width: 440px;
  display: block;
  margin: auto;
  touch-action: none;
  user-select: none;
}
.number {
  font-size: 23px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
}
.hand {
  cursor: grab;
}
.dial:active .hand {
  cursor: grabbing;
}
.hand-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 22px;
}
.hand-tabs button {
  --hand-color: #147caa;
  min-height: 48px;
  padding: 8px 20px;
  border-radius: 14px;
  border: 2px solid var(--hand-color);
  color: var(--hand-color);
  font-weight: 600;
}
.hand-tabs button[aria-pressed="true"] {
  background: var(--hand-color);
  color: white;
}
.hint {
  font-size: 13px;
  line-height: 1.8;
  margin: 16px 0 0;
}
.dial-card .hint {
  text-align: center;
}
.digital {
  display: block;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1.5;
  margin-top: 8px;
}
.reading {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}
.time-inputs select {
  display: block;
  width: 100%;
  min-height: 52px;
  margin-top: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 8px;
  font-size: 22px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.lesson {
  margin-top: 28px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 22px;
}
.lesson h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}
.lesson p {
  font-size: 14px;
  line-height: 2;
}
.lesson strong {
  display: block;
  font-size: 13px;
  margin-top: 12px;
  color: var(--vp-c-brand-1);
}
button:focus-visible,
select:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}
@media (max-width: 700px) {
  .clock-page {
    padding: 24px 16px 40px;
  }
  .clock-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .dial-card,
  .time-card {
    padding: 20px;
  }
  h1 {
    font-size: 30px;
  }
  .digital {
    font-size: 48px;
  }
}
@media (max-width: 360px) {
  .clock-page {
    padding-inline: 10px;
  }
  .dial-card,
  .time-card {
    padding: 14px;
  }
  .hand-tabs button {
    padding-inline: 14px;
  }
}
.time-inputs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: 12px;
}
.time-column {
  --part-color: #7955cc;
  min-width: 0;
  text-align: center;
  color: var(--part-color);
}
.part-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}
.stepper {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg);
}
.stepper button {
  display: block;
  width: 100%;
  min-height: 48px;
  border: 0;
  color: var(--part-color);
  font-size: 24px;
  line-height: 1;
  touch-action: manipulation;
}
.stepper button:active {
  background: var(--vp-c-bg-soft);
}
.stepper select {
  appearance: none;
  text-align: center;
  text-align-last: center;
  min-height: 58px;
  margin: 0;
  border: 0;
  border-radius: 0;
  border-block: 1px solid var(--vp-c-divider);
  font-size: 30px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  padding: 6px;
  width: 100%;
}
@media (max-width: 700px) {
  .clock-page {
    padding: 20px 16px max(24px, env(safe-area-inset-bottom));
  }
  header {
    margin-bottom: 18px;
  }
  header .eyebrow {
    font-size: 12px;
  }
  h1 {
    font-size: 28px;
    margin: 4px 0;
  }
  header p {
    font-size: 14px;
  }
  .clock-layout {
    gap: 16px;
  }
  .dial-card {
    padding: 14px;
    border-radius: 24px;
  }
  .dial {
    max-width: 340px;
  }
  .hand-tabs {
    gap: 8px;
    margin-top: 12px;
  }
  .hand-tabs button {
    flex: 1;
    padding: 8px;
    min-height: 48px;
  }
  .dial-card .hint {
    font-size: 12px;
    margin-top: 10px;
  }
  .time-card {
    padding: 20px;
    border-radius: 24px;
    text-align: center;
  }
  .digital {
    font-size: 44px;
    line-height: 1.2;
    margin-top: 10px;
  }
  .reading {
    font-size: 14px;
    margin: 8px 0 18px;
  }
  .time-inputs {
    gap: 10px;
  }
  .time-card > .hint {
    font-size: 12px;
    margin-top: 12px;
  }
  .lesson {
    text-align: left;
    margin-top: 20px;
    padding-top: 18px;
  }
}
@media (pointer: coarse) {
  .stepper button {
    min-height: 52px;
  }
}
</style>
