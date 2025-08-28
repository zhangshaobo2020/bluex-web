<template>
  <div style="width: 100%; height: calc(100% - 40px);">
    <el-form ref="form" :model="job" label-width="120px" size="small" style="width: 40%;">
      <el-form-item>
        <el-button
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="submitJob"
            style="float: right;"
        >
          提交
        </el-button>
      </el-form-item>
      <el-form-item label="任务编号">
        <el-input v-model="job.jobNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="job.jobName"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input type="textarea" v-model="job.jobDesc" :rows="8"></el-input>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-select v-model="job.jobType" placeholder="请选择" style="width: 100%">
          <el-option
              v-for="item in jobTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--CRON定时任务-->
      <template v-if="job.jobType === 'A'">
        <el-form-item label="CRON表达式">
          <el-input v-model="job.cronExpression"></el-input>
        </el-form-item>
      </template>
      <!--本地文件系统监听-->
      <template v-if="job.jobType === 'B'">
        <el-form-item label="文件监听路径">
          <el-input v-model="job.filePath"></el-input>
        </el-form-item>
      </template>
      <!--HTTP请求-->
      <template v-if="job.jobType === 'C'">
        <el-form-item label="请求方式">
          <el-select v-model="job.httpMethod" placeholder="请选择" style="width: 100%">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL映射">
          <el-input v-model="job.httpUrlMapping"></el-input>
        </el-form-item>
      </template>
      <!--WebSocket侦听-->
      <template v-if="job.jobType === 'D'"></template>
      <!--MQ消息队列-->
      <template v-if="job.jobType === 'E'"></template>
    </el-form>
  </div>
</template>

<script>
import * as JobApi from "@/api/bluex/JobApi";
import {jobTypes} from "@/core/JobTypes";

export default {
  name: "JobDetailView",
  data() {
    return {
      job: {
        jobNo: undefined,
        jobName: undefined,
        jobDesc: undefined,
        jobType: undefined,
        cronExpression: undefined,
        filePath: undefined,
        httpMethod: undefined,
        httpUrlMapping: undefined,
      },
      jobTypeOptions: jobTypes,
    };
  },
  created() {
    this.jobNo = this.$route.query.jobNo;
  },
  mounted() {
    if (this.jobNo) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      JobApi.jobDetail({jobNo: this.jobNo})
          .then(({data}) => {
            this.job = data;
            loading.close();
          })
          .catch(() => {
            loading.close();
          });
    }
  },
  methods: {
    async submitJob() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const {data} = await JobApi.jobSubmit({...this.job});
      this.job = data;
      loading.close();
    },
  },
};
</script>

<style></style>