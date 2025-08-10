<template>
  <el-select
      style="width: 100px"
      @change="onChange"
      @pointerdown.native.stop
      v-model="value"
      clearable
      :disabled="doesInputConnected()"
      v-show="!doesInputConnected()"
  >
    <el-option
        v-for="item in data.properties.enumOptions"
        :key="item"
        :label="item"
        :value="item">
    </el-option>
  </el-select>
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