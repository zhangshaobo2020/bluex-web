<template>
  <div>
    <!-- 抽屉模拟 -->
    <transition name="slide-up">
      <div
          v-show="drawerVisible"
          class="log-drawer"
          :style="{ height: drawerHeight + 'px' }"
      >
        <!-- 拖动条 -->
        <div
            class="resize-handle"
            @mousedown="startResize"
        ></div>
        <!-- 顶部工具栏 -->
        <div class="drawer-header">
          <span>实时日志</span>
          <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="clearLogs"
          >
            清空
          </el-button>
        </div>
        <!-- 日志内容 -->
        <div class="log-container" ref="logContainer">
          <div
              v-for="(line, index) in logs"
              :key="index"
              :class="['log-line', line.level]"
          >
            {{ line.message }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      logs: [],
      drawerVisible: true,
      drawerHeight: 150,
      isResizing: false,
      startY: 0,
      startHeight: 0
    };
  },
  mounted() {
    // WebSocket
    this.ws = new WebSocket("ws://localhost:9090/api/ws/console");
    this.ws.onmessage = (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        msg = {level: null, message: event.data};
      }
      this.logs.push(msg);
      if (this.logs.length > 1000) this.logs.shift();
      this.$nextTick(() => this.scrollToBottom());
    };

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
    clearLogs() {
      this.logs = [];
    },
    scrollToBottom() {
      const el = this.$refs.logContainer;
      el.scrollTop = el.scrollHeight;
    },
    startResize(e) {
      this.isResizing = true;
      this.startY = e.clientY;
      this.startHeight = this.drawerHeight;
      e.preventDefault();
    },
    onResize(e) {
      if (!this.isResizing) return;
      const dy = this.startY - e.clientY;
      this.drawerHeight = Math.max(150, this.startHeight + dy);
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
  bottom: 0;
  left: 0;
  right: 0;
  background: #4a4a4a;
  border-top: 1px solid #444;
  display: flex;
  flex-direction: column;
  z-index: 200;
}

/* 顶部工具栏 */
.drawer-header {
  background: #3c3c3c;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: bold;
}

/* 拖动条 */
.resize-handle {
  height: 4px;
  background: #e0e0e0;
  cursor: ns-resize;
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
  font-size: 18px;
  line-height: 1.2;
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
