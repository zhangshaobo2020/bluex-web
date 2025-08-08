<template>
  <div>
    <el-button type="primary" @click="showJson">JSON</el-button>
    <el-button type="primary" @click="runTest">测试</el-button>
    <div ref="editor" style="width: 100%; height: calc(90vh)"></div>
  </div>
</template>

<script>
import {setupEditor} from "@/core/Editor";
import * as MetaApi from "@/api/bluex/MetaApi";

export default {
  name: "TestEditor",
  data() {
    return {
      editor: undefined,
      area: undefined
    };
  },
  mounted() {
    MetaApi.graphDefinition().then(({data}) => {
      this.$store.commit("overrideGraphDefs", {...data});
      const {editor, area} = setupEditor(this.$refs["editor"]);
      this.editor = editor;
      this.area = area;
    });
  },
  methods: {
    showJson() {
      const json1 = this.editor.getNodes();
      const json2 = this.editor.getConnections();
      console.log(json1);
      console.log("============================");
      console.log(json2);
    },
    async runTest() {
      // const nodes = this.editor.getNodes();
      // const connections = this.editor.getConnections();
      // const {data} = await CompileApi.compileTest({nodes, connections});
      console.log(123456);
    }
  },
};
</script>

<style></style>