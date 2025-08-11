<template>
  <div>
    <!--    <el-button type="primary" @click="printJSON">JSON打印</el-button>-->
    <el-button type="primary" @click="saveJson">JSON下载</el-button>
    <!--    <el-button type="primary" @click="loadJson">JSON导入</el-button>-->
    <el-upload
        ref="upload"
        action=""
        :auto-upload="false"
        :on-change="handleUpdate"
        :show-file-list="false"
        accept=".json"
        style="display: inline-block; margin-left: 10px; margin-right: 10px;">
      <el-button type="primary">JSON导入</el-button>
    </el-upload>
    <!--    <el-button type="primary" @click="manuallyTriggeredTest">手动触发测试</el-button>-->
    <!--    <el-button type="primary" @click="fileSystemListenerTest">文件系统监听测试</el-button>-->
    <el-button type="primary" @click="autoMatchTest">测试</el-button>
    <div style="width: 100%; height: calc(90vh)">
      <div ref="editor" style="height: calc(100% - 200px);"></div>
      <LogConsole style="height: 200px;"/>
    </div>
  </div>
</template>

<script>
import {graphViewConverted, loadFromJSON, setupEditor} from "@/core/Editor";
import LogConsole from "@/components/tools/LogConsole.vue";
import * as MetaApi from "@/api/bluex/MetaApi";
import * as BuildApi from "@/api/bluex/BuildApi";
import * as SaveApi from "@/api/bluex/SaveApi";

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
    printJSON() {
      console.log(this.editor.getNodes());
    },
    saveJson() {
      const graph = graphViewConverted(this.editor, this.area);
      SaveApi.graphFile(graph)
          .then(({response}) => {
            const blob = new Blob([response], {type: 'application/json'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'graph.json'; // 文件名
            document.body.appendChild(a);
            a.click();
            // 清理
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          });
    },
    handleUpdate(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          this.loadJson(jsonData);
          this.$message.success("JSON 文件读取成功！");
        } catch (err) {
          this.$message.error("JSON 文件解析失败！");
        }
      };
      reader.readAsText(file.raw, "utf-8");
    },
    loadJson(savedJSON) {
      loadFromJSON(this.editor, this.area, savedJSON)
    },
    async manuallyTriggeredTest() {
      const graph = graphViewConverted(this.editor, this.area);
      await BuildApi.manuallyTriggeredTest(graph);
    },
    async fileSystemListenerTest() {
      const graph = graphViewConverted(this.editor, this.area);
      await BuildApi.fileSystemListenerTest(graph);
    },
    async autoMatchTest() {
      const graph = graphViewConverted(this.editor, this.area);
      await BuildApi.autoMatchTest(graph);
    },
  },
};
</script>

<style></style>