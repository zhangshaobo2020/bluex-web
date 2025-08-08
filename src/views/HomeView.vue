<template>
  <div class="home">
    <pre class="readme-info">
项目简介：

本项目借鉴了 Unreal Engine 的蓝图可视化编程理念，致力于构建一套高可拓展节点逻辑执行系统

🧩 后端实现：
- 基于 Java 构建核心执行引擎
- 支持流程控制、函数调用、自动回跳机制、异步事件委托
- 函数通过“注解”进行注册，参数通过“包装器”显式声明，自动通过反射进行注入和调用
- 支持 Java 基本数据类型以及用户自定义类型，并将其暴露给前端
- 可选增强: 基于 Groovy 的运行时脚本编译与执行

🎨 前端架构：
- 使用 Vue 2 + Rete.js v2 构建节点图可视化编辑器
- 支持节点拖拽、连接、动态参数编辑，兼容复杂的图结构展示与交互

🎯 适用场景：
- 自动化流程引擎
- 工作流编辑器
- 低代码开发平台

本系统旨在结合前后端优势，打造一套可用于生产的 Java 可视化蓝图框架。
    </pre>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.readme-info {
  background-color: #f9f9f9;
  padding: 1em;
  border-radius: 8px;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 28px;
}
</style>