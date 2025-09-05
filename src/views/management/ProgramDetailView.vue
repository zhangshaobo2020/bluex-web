<template>
  <div style="width: 100%; height: calc(100% - 60px);">
    <div style="margin: 10px;">
      <el-button
          size="medium"
          icon="el-icon-video-play"
          type="success"
          @click="autoMatchTest">运行测试
      </el-button>
      <el-button
          size="medium"
          type="primary"
          icon="el-icon-download"
          style="display: inline-block; margin-left: 10px;"
          @click="saveJson">JSON下载
      </el-button>
      <el-upload
          ref="upload"
          action=""
          :auto-upload="false"
          :on-change="handleUpdate"
          :show-file-list="false"
          accept=".json"
          style="display: inline-block; margin-left: 10px;">
        <el-button size="medium" icon="el-icon-upload2" type="info">JSON导入</el-button>
      </el-upload>
    </div>
    <ProgramSettings :program="program" @submitProgram="submitProgram"/>
    <div style="width: 100%; height: 100%;">
      <div ref="editor" style="height: calc(100% - 150px);"></div>
      <LogConsole/>
    </div>
  </div>
</template>

<script>
import {graphViewConverted, loadFromJSON, setupEditor} from "@/core/Editor";
import LogConsole from "@/components/tools/LogConsole.vue";
import ProgramSettings from "@/components/tools/ProgramSettings.vue";
import * as BuildApi from "@/api/bluex/BuildApi";
import * as SaveApi from "@/api/bluex/SaveApi";
import * as ProgramApi from "@/api/bluex/ProgramApi";
import * as MetaApi from "@/api/bluex/MetaApi";

export default {
  name: "ProgramDetailView",
  data() {
    return {
      editor: null,
      area: null,
      programNo: null,
      program: {
        programNo: null,
        programName: null,
        programDesc: null,
        programType: null,
      }
    };
  },
  components: {LogConsole, ProgramSettings},
  async mounted() {
    this.programNo = this.$route.query.programNo;
    const {data} = await MetaApi.graphDefinition()
    await this.$store.commit("overrideGraphDefs", {...data});

    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    const {editor, area} = setupEditor(this.$refs["editor"]);
    this.editor = editor;
    this.area = area;
    // 尝试加载JSON
    if (this.programNo) {
      ProgramApi.programDetail({programNo: this.programNo})
          .then(({data}) => {
            this.program = data;
            this.loadJson(JSON.parse(this.program["jsonContent"]));
            loading.close();
          })
          .catch(() => {
            loading.close();
          });
    } else {
      loading.close();
    }
  },
  methods: {
    async submitProgram(program) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const {data} = await ProgramApi.programSubmit({
        program: {...program},
        graph: {...graphViewConverted(this.editor, this.area)}
      });
      this.program = data;
      await this.editor.clear();
      // 尝试加载JSON
      this.loadJson(JSON.parse(this.program.jsonContent));
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