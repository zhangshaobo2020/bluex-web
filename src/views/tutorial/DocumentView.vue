<template>
  <div class="about">
    <el-card class="box-card">
      <h1>1 快速入门</h1>

      <h4>1.1 技术选型</h4>
      <p>java8 + spring-boot 2.7.x + vue.js v2</p>

      <h4>1.2 HelloWorld</h4>
      <p>①.进入"在线调试"菜单，在画布的空白部分按下右键，会出现节点菜单面板。</p>
      <p>②.点击"Java常见类型->String->打印到控制台"，会将一个Print节点添加到画布。</p>
      <p>③.连接"单次触发"节点与"Print"节点的Exec引脚。</p>
      <p>④.在"Print"节点的"Str"输入框中，输入"Hello World!"。</p>
      <p>⑤.点击左上角的"运行测试"按钮，此时在下方的"控制台输出"中，你将观察到有字符串被打印。</p>
      <img src="../../assets/pictures/1-1-001.png" alt=""/>

      <h1>2 基本功能</h1>

      <h4>2.1 数据类型</h4>
      <p>
        ①.支持任意的Java类型，但是需要注意：使用包装类型代替原始类型（也就是Integer代替int使用）。后面讲到实现的时候会说明原因。</p>
      <p>②.常用的数据类型会用不同颜色标注。</p>
      <img src="../../assets/pictures/2-1-001.png" alt=""/>
      <p>
        ③.本系统具有严格的类型检查，不同的数据类型节点之间不能直接连接。除非使用类型转换，或者向上转为Object类型（Object是所有类的超类）。</p>
      <p>④.常用的数据类型例如Boolean、Integer、LocalDateTime等，可以通过前端的checkbox、input等组件赋予具体的值。</p>
      <p>⑤.节点中的参数连接支持多级，一个节点的输入可能来自另一个节点的输出，而那个节点的输入可能又来自其他的节点。</p>
      <img src="../../assets/pictures/2-1-002.png" alt=""/>
      <p>⑥.支持用户扩展自定义类型，包括Class类和Enum枚举，将在后面的注解系统讲到。</p>

      <h4>2.2 控制流节点</h4>
      <p>①.内置常见的流程节点，Branch、While、ForLoop等。</p>
      <p>②.循环节点支持自动回跳，无需再次手动连接到循环起点。</p>
      <p>③.Switch节点需要配合Enum枚举使用。</p>
      <img src="../../assets/pictures/2-2-001.png" alt=""/>

      <h4>2.3 执行节点 和 非执行节点</h4>
      <p>①.你可能已经注意到了，根据是否有执行引脚，节点可以被分为两类。</p>
      <p>
        ②.执行节点：例如"Branch分支"就带有"Exec"的执行引脚。执行节点明确控制何时被调用并依赖执行顺序，有副作用（例如可以改变参数的值）。
      </p>
      <p>③.非执行节点：没有执行引脚，无副作用，只用于计算或返回数据（如 Getter、纯运算）。
        当有节点需要其输出数据时，会自动调用该纯函数，且每个连接都会触发一次执行。
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下示例中，执行了5次循环，每次打印出来的随机整数的值都可能是不同的。</p>
      <img src="../../assets/pictures/2-3-001.png" alt=""/>

      <h4>2.4 函数节点的注册</h4>
      <p>①.在本系统中，是通过注解系统来注册节点的。我们来看一个简单的示例。</p>
      <img src="../../assets/pictures/2-4-001.png" alt=""/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <img src="../../assets/pictures/2-4-002.png" alt=""/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        左边是一个比较整数大小的节点。他是被右边的Java代码渲染出来的。
        我们能看到，它有一个@BluexFunction注解，标记它会被注册成一个节点，executable = false代表它不是一个执行节点，所以没有执行引脚。
        在参数列表部分，有两个被INPUT包装的参数Num1和Num2，所以节点左侧会有两个同名的输入参数引脚。
        另外有一个被OUTPUT包装的参数Ret，所以节点右侧会有一个同名的输出参数引脚。
        至此，一个最简单的函数节点就完成了。
        注意到，这里的参数是被INPUT和OUTPUT进行包装过的，所以对参数的操作需要以用.value的形式进行。
      </p>
      <p>②.系统内置大量这样的函数节点，涵盖了Java的常见操作：基本数据类型的操作、数据库支持、Spring支持等。</p>
      <p>③.如何进行用户自定义的函数节点的实现呢，非常简单，请看以下示例。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先新建一个TestFunctions类，在上面用@BluexFunctionLib进行注解。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在类中新建一个GetMonthAndDay方法，在上面用@BluexFunction进行注解。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进行方法的实现：返回今天是几月几号。</p>
      <img src="../../assets/pictures/2-4-003.png" alt=""/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在添加完这个类之后，重启应用，你就可以观察到前端的节点系统中就有这个函数了。</p>
      <img src="../../assets/pictures/2-4-004.png" alt=""/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进行下简单的测试，输出确实与预计的相符，没有任何问题。</p>
      <img src="../../assets/pictures/2-4-005.png" alt=""/>
    </el-card>
  </div>
</template>
<script setup lang="ts">
</script>