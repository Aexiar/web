import { DefaultTheme } from 'vitepress'
import { commonDirectoryName } from '../utils/constant'

// 中文侧边栏
export const zhSidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: '前端开发基础',
      collapsed: true,
      items: [
        { text: '初识 HTML', link: `/01_basic/01_${commonDirectoryName}/` },
        { text: 'HTML 基础', link: `/01_basic/02_${commonDirectoryName}/` },
        { text: '额外知识', link: `/01_basic/03_${commonDirectoryName}/` },
        { text: 'CSS 基础', link: `/01_basic/04_${commonDirectoryName}/` },
        { text: 'CSS 进阶', link: `/01_basic/05_${commonDirectoryName}/` },
        { text: 'CSS 特性', link: `/01_basic/06_${commonDirectoryName}/` },
        { text: 'CSS 盒子模型', link: `/01_basic/07_${commonDirectoryName}/` },
        { text: '额外知识', link: `/01_basic/08_${commonDirectoryName}/` },
        { text: 'CSS 浮动', link: `/01_basic/09_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'JavaScript基础',
      collapsed: true,
      items: [
        { text: '初识 JavaScript', link: `/02_js-basic/01_${commonDirectoryName}/` },
        { text: 'JavaScript 基本语法', link: `/02_js-basic/02_${commonDirectoryName}/` },
        { text: 'JavaScript 流程控制', link: `/02_js-basic/03_${commonDirectoryName}/` },
        { text: 'JavaScript 函数', link: `/02_js-basic/04_${commonDirectoryName}/` },
        { text: 'JavaScript 面向对象', link: `/02_js-basic/05_${commonDirectoryName}/` },
        { text: 'JavaScript 内置类', link: `/02_js-basic/06_${commonDirectoryName}/` },
        { text: 'JavaScript 数组', link: `/02_js-basic/07_${commonDirectoryName}/` },
        { text: 'JavaScript DOM 操作（一）', link: `/02_js-basic/08_${commonDirectoryName}/` },
        { text: 'JavaScript DOM 操作（二）', link: `/02_js-basic/09_${commonDirectoryName}/` },
        { text: 'JavaScript 事件处理', link: `/02_js-basic/10_${commonDirectoryName}/` },
        { text: 'JavaScript BOM 操作', link: `/02_js-basic/11_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'JavaScript高级',
      collapsed: true,
      items: [
        { text: 'JavaScript 中 this 指向', link: `/03_js-leap/01_${commonDirectoryName}/` },
        { text: '浏览器的运行原理', link: `/03_js-leap/02_${commonDirectoryName}/` },
        { text: 'JavaScript 运行原理', link: `/03_js-leap/03_${commonDirectoryName}/` },
        { text: 'JavaScript 内存管理和闭包', link: `/03_js-leap/04_${commonDirectoryName}/` },
        { text: 'JavaScript 函数和对象的增强知识', link: `/03_js-leap/05_${commonDirectoryName}/` },
        { text: 'JavaScript ES5 实现继承', link: `/03_js-leap/06_${commonDirectoryName}/` },
        { text: 'JavaScript ES6 实现继承', link: `/03_js-leap/07_${commonDirectoryName}/` },
        { text: 'JavaScript ES6+（一）', link: `/03_js-leap/08_${commonDirectoryName}/` },
        { text: 'JavaScript ES6+（二）', link: `/03_js-leap/09_${commonDirectoryName}/` },
        { text: 'JavaScript Proxy 和 Reflect', link: `/03_js-leap/10_${commonDirectoryName}/` },
        { text: 'JavaScript Promise', link: `/03_js-leap/11_${commonDirectoryName}/` },
        { text: 'JavaScript 迭代器和生成器', link: `/03_js-leap/12_${commonDirectoryName}/` },
        { text: 'JavaScript 事件循环', link: `/03_js-leap/13_${commonDirectoryName}/` },
        { text: 'JavaScript Storage 和正则表达式', link: `/03_js-leap/14_${commonDirectoryName}/` },
        { text: 'JavaScript 防抖、节流、深拷贝和事件总线', link: `/03_js-leap/15_${commonDirectoryName}/` },
        { text: 'JavaScript 网络编程', link: `/03_js-leap/16_${commonDirectoryName}/` },
      ]
    },
    {
      text: '前端工程化基础',
      collapsed: true,
      items: [
        { text: 'One', link: '/guide/one' },
        { text: 'Two', link: '/guide/two' }
      ]
    },
    {
      text: '项目构建工具',
      collapsed: true,
      items: [
        { text: 'Webpack', link: '/guide/one' },
        { text: 'Vite', link: '/guide/two' }
      ]
    },
    {
      text: 'Vue3全家桶',
      collapsed: true,
      items: [
        { text: '初识Vue3', link: '/guide/one' },
        { text: 'Two', link: '/guide/two' }
      ]
    },
    {
      text: 'TypeScript',
      collapsed: true,
      items: [
        { text: '初识 TypeScript', link: `/07_TypeScript/01_${commonDirectoryName}/` },
        { text: 'TypeScript 语法细节', link: `/07_TypeScript/02_${commonDirectoryName}/` },
        { text: 'TypeScript 面向对象', link: `/07_TypeScript/03_${commonDirectoryName}/` },
        { text: 'TypeScript 泛型编程', link: `/07_TypeScript/04_${commonDirectoryName}/` },
        { text: 'TypeScript 语法扩展', link: `/07_TypeScript/05_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'React18全家桶',
      collapsed: true,
      items: [
        { text: '初识 React', link: `/08_React18/01_${commonDirectoryName}/` },
        { text: 'React 脚手架', link: `/08_React18/02_${commonDirectoryName}/` },
        { text: 'React 组件化开发（一）', link: `/08_React18/03_${commonDirectoryName}/` },
        { text: 'React 组件化开发（二）', link: `/08_React18/04_${commonDirectoryName}/` },
        { text: 'React 组件化开发（三）', link: `/08_React18/05_${commonDirectoryName}/` },
        { text: 'React 组件化开发（四）', link: `/08_React18/06_${commonDirectoryName}/` },
        { text: 'React 的 CSS 解决方案', link: `/08_React18/07_${commonDirectoryName}/` },
        { text: 'React 状态管理（redux）', link: `/08_React18/08_${commonDirectoryName}/` },
        { text: 'React 状态管理二（redux）', link: `/08_React18/09_${commonDirectoryName}/` },
        { text: 'React 路由', link: `/08_React18/10_${commonDirectoryName}/` },
        { text: 'React Hooks（一）', link: `/08_React18/11_${commonDirectoryName}/` },
        { text: 'React Hooks（二）', link: `/08_React18/12_${commonDirectoryName}/` },
      ]
    }
  ],
}