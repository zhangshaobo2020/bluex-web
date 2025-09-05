<template>
  <div class="about">
    <el-card class="box-card">
      <h1>1 快速入门</h1>

      <h4>1.1 技术选型</h4>
      <p>Java8 + spring-boot 2.7.x + vue.js v2</p>

      <h4>1.2 HelloWorld</h4>
      <p>①.进入"在线调试工具"菜单，在画布的空白部分按下右键，会出现节点菜单面板。</p>
      <p>②.点击"Java常见类型->String->打印到控制台"，会将一个Print节点添加到画布。</p>
      <p>③.连接"单次触发"节点与"Print"节点的Exec引脚。</p>
      <p>④.在"Print"节点的"Str"输入框中，输入"Hello World!"。</p>
      <p>⑤.点击左上角的"运行测试"按钮，此时在下方的"控制台输出"中，你将观察到有字符串被打印。</p>
      <img src="../../assets/pictures/1-1-001.png" alt=""/>

      <h1>2 功能介绍</h1>

      <h4>2.1 数据类型</h4>
      <p>①.支持任意的Java类型，但是需要注意：使用包装类型代替原始类型（也就是Integer代替int使用）。后面讲到具体实现的时候会说明原因。</p>
      <p>②.常用的数据类型会用不同颜色标注。</p>
      <img src="../../assets/pictures/2-1-001.png" alt=""/>
      <p>③.本系统具有严格的类型检查，不同的数据类型节点之间不能直接连接。除非使用类型转换，或者向上转为Object类型（Object是所有类的超类）。</p>
      <p>④.常用的数据类型例如Boolean、Integer、LocalDateTime等，可以通过前端的checkbox、input等组件赋予具体的值。</p>
      <p>⑤.节点中的参数连接支持多级，一个节点的输入可能来自另一个节点的输出，而那个节点的输入可能又来自其他的节点。</p>
      <img src="../../assets/pictures/2-1-002.png" alt=""/>
      <p>⑥.支持用户扩展自定义类型，包括Class类和Enum枚举，将在后面的注解系统讲到。</p>

      <h4>2.2 控制节点</h4>
      <p>①.内置常见的流程节点，Branch、While、ForLoop等。</p>
      <p>②.循环节点支持自动回跳，无需再次手动连接到循环起点。</p>
      <p>③.Switch节点需要配合Enum枚举使用。</p>
      <img src="../../assets/pictures/2-2-001.png" alt=""/>
    </el-card>
  </div>
</template>
<script setup lang="ts">
</script>