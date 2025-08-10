<template>
  <el-date-picker
      style="width: 100px"
      @input="onChange"
      @pointerdown.native.stop
      v-model="value"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      :disabled="doesInputConnected()"
      v-show="!doesInputConnected()">
  </el-date-picker>
</template>

<script>
export default {
  name: "DateInput",
  props: ["data"],
  computed: {
    value: {
      get() {
        return this.data.value;
      },
      set() {
      },
    },
  },
  methods: {
    onChange(val) {
      this.data.onChange(val);
    },
    doesInputConnected() {
      for (const connection of this.data.editor.getConnections()) {
        if (
            connection.target === this.data.nodeId &&
            connection.targetInput === this.data.inputId
        ) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style></style>