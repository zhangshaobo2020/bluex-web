<template>
  <el-checkbox
      @change="onChange"
      @pointerdown.native.stop
      v-model="value"
      true-label="true"
      false-label="false"
      :disabled="doesInputConnected()"
      v-show="!doesInputConnected()"></el-checkbox>
</template>

<script>

export default {
  name: "BooleanInput",
  props: ["data"],
  computed: {
    value: {
      get() {
        return String(this.data.value);
      },
      set() {
      },
    },
  },
  methods: {
    toBool(str) {
      return String(str).toLowerCase() === "true";
    },
    onChange(val) {
      this.data.onChange(this.toBool(val));
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
  }
}
</script>

<style></style>