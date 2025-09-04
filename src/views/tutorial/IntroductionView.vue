<template>
  <div class="home">
    <pre class="readme-info">
系统简介

    本项目是一套基于 Java 的可视化编程系统，参考了 Unreal Engine 蓝图（Blueprint） 的节点式逻辑开发模式，旨在提供一个可扩展、强类型、安全的可视化逻辑编辑与执行平台。系统采用 前后端分离架构：前端负责节点与连线的可视化编辑，后端负责逻辑建模、代码生成与运行时执行。

系统架构

    前端：基于 Rete.js 实现节点与连接的可视化编辑，负责图形化展示与交互操作。前端仅保存节点结构和连接关系的 JSON 表达，不涉及逻辑执行。

    后端：基于 Java + Groovy，接收前端传输的 JSON，执行以下任务：

        图解析与拓扑排序：解析节点连接关系，保证执行顺序正确。

        类型检查：基于 TypeDefinition 和 FunctionDefinition，对节点参数进行严格的输入/输出类型校验。

        控制流建模：提供 Branch、While、ForLoop 等控制流节点，支持循环体自动回跳和复杂条件逻辑。

        代码生成与执行：将节点图转换为 Java 和 Groovy 代码，实现动态运行。

核心特性

    强类型系统：
        通过 TypeDefinition 与 FunctionDefinition 描述数据类型和函数签名，确保能够进行严格的类型约束与高质量代码生成。

    统一的控制流执行模型：
        节点执行流采用抽象化的 ControlFlowDefinition 描述，实现自动化的循环体回跳与执行流控制。

    事件与委托机制：
        支持基于委托（Delegate）的事件回调，内置 Cron、Http、WebSocket、FileSystem等多种事件，并且易于扩展。

    动态扩展能力：
        通过注解体系（如 @BluexFunction, @BluexClass, @BluexEnum等），开发者可快速将任意 Java/Groovy 方法包装为节点，扩展系统功能。

应用场景

    数据流处理、任务编排、工作流设计、数据交互与处理、编程教学与模拟。
    </pre>
  </div>
</template>

<script>
export default {
  name: "IntroductionView",
};
</script>

<style scoped>
.readme-info {
  background-color: #f9f9f9;
  padding: 1em;
  border-radius: 8px;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 20px;
}
</style>