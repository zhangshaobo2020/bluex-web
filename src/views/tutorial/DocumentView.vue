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
      <img src="../../assets/pictures/1-1-001.png" alt="" style="max-width:100%; height:auto;"/>

      <h1>2 基本功能</h1>

      <h4>2.1 数据类型</h4>
      <p>
        ①.支持任意的Java类型，但是需要注意：使用包装类型代替原始类型（也就是Integer代替int使用）。后面讲到实现的时候会说明原因。</p>
      <p>②.常用的数据类型会用不同颜色标注。</p>
      <img src="../../assets/pictures/2-1-001.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        ③.本系统具有严格的类型检查，不同的数据类型节点之间不能直接连接。除非使用类型转换，或者向上转为Object类型（Object是所有类的超类）。</p>
      <p>④.常用的数据类型例如Boolean、Integer、LocalDateTime等，可以通过前端的checkbox、input等组件赋予具体的值。</p>
      <p>⑤.节点中的参数连接支持多级，一个节点的输入可能来自另一个节点的输出，而那个节点的输入可能又来自其他的节点。</p>
      <img src="../../assets/pictures/2-1-002.png" alt="" style="max-width:100%; height:auto;"/>
      <p>⑥.支持用户扩展自定义类型，包括Class类和Enum枚举，将在后面的注解系统讲到。</p>

      <h4>2.2 控制流节点</h4>
      <p>①.内置常见的流程节点，Branch、While、ForLoop等。</p>
      <p>②.循环节点支持自动回跳，无需再次手动连接到循环起点。</p>
      <p>③.Switch节点需要配合Enum枚举使用。</p>
      <img src="../../assets/pictures/2-2-001.png" alt="" style="max-width:100%; height:auto;"/>

      <h4>2.3 执行节点 和 非执行节点</h4>
      <p>①.你可能已经注意到了，根据是否有执行引脚，节点可以被分为两类。</p>
      <p>
        ②.执行节点：例如"Branch分支"就带有"Exec"的执行引脚。执行节点明确控制何时被调用并依赖执行顺序，有副作用（例如可以改变参数的值）。
      </p>
      <p>③.非执行节点：没有执行引脚，无副作用，只用于计算或返回数据（如 Getter、纯运算）。
        当有节点需要其输出数据时，会自动调用该纯函数，且每个连接都会触发一次执行。
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下示例中，执行了5次循环，每次打印出来的随机整数的值都可能是不同的。</p>
      <img src="../../assets/pictures/2-3-001.png" alt="" style="max-width:100%; height:auto;"/>

      <h4>2.4 函数节点的注册</h4>
      <p>①.在本系统中，是通过Java代码(Groovy代码)来注册节点的。我们来看一个简单的示例。</p>
      <img src="../../assets/pictures/2-4-001.png" alt="" style="max-width:100%; height:auto;"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <img src="../../assets/pictures/2-4-002.png" alt="" style="max-width:100%; height:auto;"/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        左边是一个比较整数大小的节点。他是被右边的Java代码渲染出来的。
        我们能看到，它有一个@BluexFunction注解，标记它会被注册成一个节点，executable = false代表它不是一个执行节点，所以没有执行引脚。
        在参数列表部分，有两个被INPUT包装的参数Num1和Num2，所以节点左侧会有两个同名的输入参数引脚。
        另外有一个被OUTPUT包装的参数Ret，所以节点右侧会有一个同名的输出参数引脚。
        至此，一个最简单的函数节点就完成了。
        注意到，这里的参数是被INPUT和OUTPUT进行包装过的，所以对参数的操作需要以用.value的形式进行。
        此外这也是为什么需要使用包装类型替代原始类型的原因（Java 泛型只能使用引用类型）。
      </p>
      <p>②.系统内置大量这样的函数节点，涵盖了Java的常见操作：基本数据类型的操作、数据库支持、Spring支持等。</p>
      <p>③.如何进行用户自定义的函数节点的实现呢，非常简单，请看以下示例。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先新建一个TestFunctions类，在上面用@BluexFunctionLib进行注解。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在类中新建一个GetMonthAndDay方法，在上面用@BluexFunction进行注解。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进行方法的实现：返回今天是几月几号。</p>
      <img src="../../assets/pictures/2-4-003.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在添加完这个类之后，重启应用，你就可以观察到前端的节点系统中就有这个函数了。</p>
      <img src="../../assets/pictures/2-4-004.png" alt="" style="max-width:100%; height:auto;"/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进行下简单的测试，输出与预计的相符。</p>
      <img src="../../assets/pictures/2-4-005.png" alt="" style="max-width:100%; height:auto;"/>

      <h1>3 进阶功能</h1>

      <h4>3.1 用户自定义类型</h4>
      <p>①.除了Java内置的数据类型之外，本系统支持用户自定义Class类型。来看以下的这个例子。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先新建一个TestUser类，在上面用@BluexClass进行注解。</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;之后可以在TestUser类中，像写一般的Java代码一样，补充Field、Getter和Setter。当然如果使用Lombok当然也是OK的。</p>
      <img src="../../assets/pictures/3-1-001.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在添加完这个类之后，重启应用，你就可以观察到前端的节点系统中就有这个类和相关的辅助函数了。</p>
      <img src="../../assets/pictures/3-1-002.png" alt="" style="max-width:100%; height:auto;"/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接下来我们来简单测试一下，使用构造函数创建一个对象，并将它打印出来。</p>
      <img src="../../assets/pictures/3-1-003.png" alt="" style="max-width:100%; height:auto;"/>
      <p>②.除了Class类型之外，也支持Enum类型的定义，接下来看这个例子。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先新建一个Gender类，在上面用@BlueEnum进行注解。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Gender类中补充枚举值。</p>
      <img src="../../assets/pictures/3-1-004.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在添加完这个类之后，重启应用，你就可以观察到前端的节点系统中就有这个枚举类了。</p>
      <img src="../../assets/pictures/3-1-005.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这个创建出来的枚举类型也可以像其他枚举类型一样，直接被其他类使用。现在让我们在上面的TestUser类中添加一个Gender属性。</p>
      <img src="../../assets/pictures/3-1-006.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修改完这个类之后，重启应用，你就可以观察到前端的节点系统也自动更新了。</p>
      <img src="../../assets/pictures/3-1-007.png" alt="" style="max-width:100%; height:auto;"/>

      <h4>3.2 注解和反射系统</h4>
      <p>
        ①.你已经接触到了三大核心注解@BluexFunction、@BluexClass和@BluexEnum的使用。
        接下来我将简述背后的工作原理：应用启动时，扫描被注解的类，依赖于java的反射机制，获取类名、方法名、方法参数等关键信息。
        随后封装为节点系统所需要的"元信息"，并进行注册。前端拿到对应"元数据"之后，自动渲染出各种节点。</p>

      <h4>3.3 事件委托概念和基本使用</h4>
      <p>①.到目前为止，你应该已经基本了解了如何使用这套可视化编程系统，以及能够自定义类、枚举、函数。</p>
      <p>
        ②.接下来我将讲述另一块非常重要的内容，那就是事件委托的概念。我们前面所学的，其实就是通过可视化节点实现了编程（程序怎么运行）。
        那么事件委托就决定了程序什么时候运行，以及运行的时候所携带的参数。</p>
      <p>
        ③.考虑一个问题，我编写了一个打印"HelloWorld!"的程序，但是页面上点击一次"运行测试"他才运行一次，这不是我想要的。
        我希望每隔一秒钟触发一次程序，也就是我们常说的通过cron表达式来驱动程序的运行。</p>
      <p>
        ④.接下来我们来实现这个功能。首先新建一个程序，这里我们使用"事件委托->CronJob"。
        这个节点自带一个回调的Now参数，代表当前时间。然后做一个简单的打印操作。</p>
      <img src="../../assets/pictures/3-3-001.png" alt="" style="max-width:100%; height:auto;"/>
      <p>⑤.接下来我们去新建一个任务，然后去绑定我们刚刚创建好的程序。</p>
      <img src="../../assets/pictures/3-3-002.png" alt="" style="max-width:100%; height:auto;"/>
      <p>⑥.最后我们去注册这个任务。</p>
      <img src="../../assets/pictures/3-3-003.png" alt="" style="max-width:100%; height:auto;"/>
      <p>⑥.现在就能在日志里看到每隔一秒被打印一次的时间了。</p>
      <img src="../../assets/pictures/3-3-004.png" alt="" style="max-width:100%; height:auto;"/>

      <h4>3.4 更多的事件委托类型</h4>
      <p>①.除了以上的cron类型任务外，系统还内置了若干种适用于不同场景的事件委托类型。</p>
      <img src="../../assets/pictures/3-3-005.png" alt="" style="max-width:100%; height:auto;"/>
      <p>②.它们分别是：</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单次触发：用于进行测试模拟，或者手动触发一次的操作，无回调参数。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定时任务：根据cron表达式进行触发。回调参数为当前时间（LocalDateTime类型）。</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文件系统监听：根据给定的文件目录进行监听。回调参数为文件（File类型）和操作类型（新增、修改、删除）。</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MQ消息监听：根据给定的MQ队列进行监听，支持ibmmq、activemq、rabbitmq等。回调参数为消息（String类型）。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTTP请求监听：注册一个url-mapping，也就是我们常用的RequestMapping。
        回调参数为HttpServletRequest和HttpServletResponse。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WebSocket消息监听：与HTTP请求监听类似，只不过这个是基于websocket的。
        回调参数为WebSocketSession和WebSocketMessage。</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oracle表监听器：指定一张数据表进行监听，监听数据行上的增删改操作。
        回调参数为操作类型（新增、修改、删除）和主键。</p>

      <p>③.事件委托的原理都是差不多的，后续也很容易进行自定义的扩展。接下来我再举一个HTTP请求监听的例子：</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先新增一个程序，主要内容是"获取request中的Msg参数，在它前面拼上"你好啊，"，并将其写入到Response"。</p>
      <img src="../../assets/pictures/3-3-006.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接下来我们去新增一个Http监听任务，在里面绑定我们刚刚创建好的程序，并设置一个URL映射。</p>
      <img src="../../assets/pictures/3-3-007.png" alt="" style="max-width:100%; height:auto;"/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;然后我们注册这个任务。</p>
      <img src="../../assets/pictures/3-3-008.png" alt="" style="max-width:100%; height:auto;"/>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最后我们打开Postman进行测试。这样我们就完成了一个简单的Http请求处理。</p>
      <img src="../../assets/pictures/3-3-009.png" alt="" style="max-width:100%; height:auto;"/>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当然了，实际的业务需求可能复杂得多，需要操作数据库，调用外部接口，写回Response的可能是个JSON而不是简单的文本。
        但是没有关系，本系统是全部支持的，你完全可以通过将业务拆成不同的小模块，再通过前面提到的@BluexFunction暴露给节点系统。
        之后就可以在前端，根据业务逻辑对节点进行编排了。
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外还有一点，任务不但可以随时进行注册，也还能进行注销，事件委托都是动态的。</p>
      <img src="../../assets/pictures/3-3-010.png" alt="" style="max-width:100%; height:auto;"/>

      <h4>3.5 Groovy脚本支持（可选）</h4>
      <p>你可能想说，我每次新增或者修改BluexFunction之类的，还需要重新打包部署，是不是太麻烦了。
        或者我要在线上直接对程序进行修改，有没有办法。
      </p>
      <p>本系统还引入了对Groovy的支持，方便你在运行时对程序做一些修改。但是这个会存在一定的风险，需要使用者自己权衡。</p>
      <p>首先我们新建一个脚本。</p>
      <img src="../../assets/pictures/3-5-001.png" alt="" style="max-width:100%; height:auto;"/>
      <p>然后注册它。</p>
      <img src="../../assets/pictures/3-5-002.png" alt="" style="max-width:100%; height:auto;"/>
      <p>最后你就能在节点系统中找到他了，并且也能像使用Java节点一样使用它，两者没有区别。</p>
      <img src="../../assets/pictures/3-5-003.png" alt="" style="max-width:100%; height:auto;"/>
    </el-card>
  </div>
</template>