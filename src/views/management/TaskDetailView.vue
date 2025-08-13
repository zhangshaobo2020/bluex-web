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
    <TaskSettings :task="task" @submitTask="submitTask"/>
    <div style="width: 100%; height: 100%; margin-top: 20px;">
      <div ref="editor" style="height: calc(100% - 150px);"></div>
      <LogConsole/>
    </div>
  </div>
</template>

<script>
import {graphViewConverted, loadFromJSON, setupEditor} from "@/core/Editor";
import LogConsole from "@/components/tools/LogConsole.vue";
import TaskSettings from "@/components/tools/TaskSettings.vue";
import * as MetaApi from "@/api/bluex/MetaApi";
import * as BuildApi from "@/api/bluex/BuildApi";
import * as SaveApi from "@/api/bluex/SaveApi";
import * as ManagementApi from "@/api/bluex/ManagementApi";

export default {
  name: "TaskDetailView",
  data() {
    return {
      editor: undefined,
      area: undefined,
      taskNo: undefined,
      task: {}
    };
  },
  components: {LogConsole, TaskSettings},
  async created() {
    this.taskNo = this.$route.query.taskNo;
    if (this.taskNo) {
      const {data} = await ManagementApi.taskDetail({taskNo: this.taskNo});
      this.task = data;
    }
  },
  mounted() {
    MetaApi.graphDefinition().then(({data}) => {
      this.$store.commit("overrideGraphDefs", {...data});
      const {editor, area} = setupEditor(this.$refs["editor"]);
      this.editor = editor;
      this.area = area;
      // 尝试加载JSON
      this.loadJson(JSON.parse(this.task.jsonContent));
    });
  }
  ,
  methods: {
    async submitTask(task) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const {data} = await ManagementApi.taskSubmit({
        task: {...task},
        graph: {...graphViewConverted(this.editor, this.area)}
      });
      this.task = data;
      await this.editor.clear();
      // 尝试加载JSON
      this.loadJson(JSON.parse(this.task.jsonContent));
      loading.close();
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
    }
    ,
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
    }
    ,
    loadJson(savedJSON) {
      loadFromJSON(this.editor, this.area, savedJSON)
    }
    ,
    async autoMatchTest() {
      const graph = graphViewConverted(this.editor, this.area);
      await BuildApi.autoMatchTest(graph);
    }
    ,
  }
  ,
}
;
</script>

<style></style>