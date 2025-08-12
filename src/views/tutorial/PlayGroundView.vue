<template>
  <div style="width: 100%; height: calc(100% - 40px);">
    <el-button type="warning" @click="saveJson">JSON下载</el-button>
    <el-upload
        ref="upload"
        action=""
        :auto-upload="false"
        :on-change="handleUpdate"
        :show-file-list="false"
        accept=".json"
        style="display: inline-block; margin-left: 10px; margin-right: 10px;">
      <el-button type="warning">JSON导入</el-button>
    </el-upload>
    <el-button type="danger" @click="autoMatchTest">测试</el-button>
    <div style="width: 100%; height: 100%; margin-top: 20px;">
      <div ref="editor" style="height: calc(100% - 150px);"></div>
      <LogConsole/>
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
  name: "PlayGroundView",
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
    async autoMatchTest() {
      const graph = graphViewConverted(this.editor, this.area);
      await BuildApi.autoMatchTest(graph);
    },
  },
};
</script>

<style></style>