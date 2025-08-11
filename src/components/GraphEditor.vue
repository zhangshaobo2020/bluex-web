<template>
  <div>
    <el-button type="primary" @click="showJson">JSON</el-button>
    <el-button type="primary" @click="manuallyTriggeredTest">手动触发测试</el-button>
    <el-button type="primary" @click="fileSystemListenerTest">文件系统监听测试</el-button>
    <div style="width: 100%; height: calc(90vh)">
      <div ref="editor" style="height: calc(100% - 200px);"></div>
      <LogConsole style="height: 200px;"/>
    </div>
  </div>
</template>

<script>
import {graphViewConverted, setupEditor} from "@/core/Editor";
import LogConsole from "@/components/tools/LogConsole.vue";
import * as MetaApi from "@/api/bluex/MetaApi";
import * as BuildApi from "@/api/bluex/BuildApi";

export default {
  name: "TestEditor",
  data() {
    return {
      editor: undefined,
      area: undefined
    };
  },
  components: {LogConsole},
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
      console.log(this.editor.getNodes());
      console.log(this.editor.getConnections());
    },
    async manuallyTriggeredTest() {
      const graph = this.convertGraph();
      await BuildApi.manuallyTriggeredTest(graph);
    },
    async fileSystemListenerTest() {
      const graph = this.convertGraph();
      await BuildApi.fileSystemListenerTest(graph);
    },
    convertGraph() {
      return graphViewConverted(this.editor, this.area);
    }
  },
};
</script>

<style></style>