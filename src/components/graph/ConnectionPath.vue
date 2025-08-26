<template>
  <svg data-testid="connection">
    <path :d="path" :style="dashStyle"></path>
  </svg>
</template>

<script>
export default {
  name: "connection-path",
  props: ["data", "start", "end", "path"],
  data() {
    return {
      offset: 0, // 动画偏移
    };
  },
  computed: {
    dashStyle() {
      return {
        strokeDasharray: "8 4",  // 8px 实线 + 4px 空白
        strokeDashoffset: this.offset,
      };
    },
  },
  mounted() {
    this.animate();
  },
  methods: {
    animate() {
      setInterval(() => {
        this.offset -= 1; // 每次偏移1像素，数值越大速度越快
      }, 30);
    },
  },
};
</script>

<style lang="scss" scoped>
svg {
  z-index: 999;
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;

  path {
    fill: none;
    stroke-width: 3px;
    stroke: #000000;
    pointer-events: auto;
  }
}
</style>
