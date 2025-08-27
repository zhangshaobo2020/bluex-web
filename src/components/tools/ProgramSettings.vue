<template>
  <div>
    <!-- 抽屉模拟 -->
    <transition name="slide-left">
      <div
          v-show="drawerVisible"
          class="log-drawer"
          :style="{ width: drawerWidth + 'px' }"
      >
        <!-- 拖动条 -->
        <div
            class="resize-handle"
            @mousedown="startResize"
        ></div>
        <!-- 顶部工具栏 -->
        <div class="drawer-header">
          <span>任务属性</span>
          <el-button
              type="success"
              size="mini"
              icon="el-icon-edit"
              @click="toSubmit"
          >
            提交
          </el-button>
        </div>
        <!-- 表单内容 -->
        <div class="log-container" ref="logContainer">
          <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item label="程序编号">
              <el-input v-model="form.programNo" disabled></el-input>
            </el-form-item>
            <el-form-item label="程序名称">
              <el-input v-model="form.programName"></el-input>
            </el-form-item>
            <el-form-item label="程序描述">
              <el-input type="textarea" v-model="form.programDesc" :rows="8"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: true,
      drawerWidth: 350, // 宽度
      isResizing: false,
      startX: 0,
      startWidth: 0
    };
  },
  props: ["program"],
  computed: {
    form: {
      get() {
        return this.program;
      },
      set() {
      },
    },
  },
  mounted() {
    // 监听鼠标拖动
    window.addEventListener("mousemove", this.onResize);
    window.addEventListener("mouseup", this.stopResize);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.onResize);
    window.removeEventListener("mouseup", this.stopResize);
    this.ws && this.ws.close();
  },
  methods: {
    toSubmit() {
      this.$emit("submitProgram", this.program);
    },
    startResize(e) {
      this.isResizing = true;
      this.startX = e.clientX;
      this.startWidth = this.drawerWidth;
      e.preventDefault();
    },
    onResize(e) {
      if (!this.isResizing) return;
      const dx = this.startX - e.clientX;
      this.drawerWidth = Math.max(200, this.startWidth + dx);
    },
    stopResize() {
      this.isResizing = false;
    }
  }
};
</script>

<style scoped>
/* 抽屉容器 */
.log-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0; /* 改为右侧 */
  background: #d3d3d3;
  border-left: 1px solid #444; /* 改为左边框 */
  display: flex;
  flex-direction: column;
  z-index: 100;
}

/* 顶部工具栏 */
.drawer-header {
  background: #b3b3b3;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: bold;
}

/* 拖动条 */
.resize-handle {
  width: 4px;
  background: #e0e0e0;
  cursor: ew-resize; /* 横向调整 */
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

/* 日志内容 */
.log-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  font-family: monospace;
  color: #fff;
}

.log-line {
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 20px;
  height: 20px;
}

.log-line.INFO {
  color: #9cdcfe;
}

.log-line.WARN {
  color: #ff9800;
}

.log-line.ERROR {
  color: #f44336;
}
</style>
