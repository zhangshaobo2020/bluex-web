<template>
  <div style="width: 100%; height: calc(100% - 40px);">
    <el-form
        ref="form"
        :model="script"
        label-width="120px"
        size="small"
        style="width: 80%; padding-top: 20px;">
      <el-form-item>
        <el-button
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="submitScript"
            style="float: right;"
        >
          提交
        </el-button>
      </el-form-item>
      <div style="height: 800px; overflow-y: scroll;">
        <el-form-item label="脚本编号">
          <el-input v-model="script.scriptNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="脚本名称">
          <el-input v-model="script.scriptName"></el-input>
        </el-form-item>
        <el-form-item label="脚本描述">
          <el-input type="textarea" v-model="script.scriptDesc" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="脚本内容">
          <monaco-editor v-model="script.scriptContent"></monaco-editor>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor'
import * as ScriptApi from "@/api/bluex/ScriptApi";

export default {
  name: "ScriptDetailView",
  components: {
    MonacoEditor
  },
  data() {
    return {
      script: {
        scriptNo: null,
        scriptName: null,
        scriptDesc: null,
        scriptContent: null,
      },
    };
  },
  created() {
    this.scriptNo = this.$route.query.scriptNo;
  },
  mounted() {
    if (this.scriptNo) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      ScriptApi.scriptDetail({scriptNo: this.scriptNo})
          .then(({data}) => {
            this.script = data;
            loading.close();
          })
          .catch(() => {
            loading.close();
          });
    }
  },
  methods: {
    async submitScript() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const {data} = await ScriptApi.scriptSubmit({...this.script});
      this.script = data;
      loading.close();
    },
  },
};
</script>

<style></style>