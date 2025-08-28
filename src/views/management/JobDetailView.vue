<template>
  <div style="width: 100%; height: calc(100% - 40px);">
    <el-form ref="form" :model="form" label-width="120px" size="small" style="width: 30%;">
      <el-form-item label="任务编号">
        <el-input v-model="form.jobNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="form.jobName"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input type="textarea" v-model="form.jobDesc" :rows="8"></el-input>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-select v-model="form.jobType" placeholder="请选择" style="width: 100%">
          <el-option
              v-for="item in jobTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--CRON定时任务-->
      <template v-if="form.jobType === 'A'">
        <el-form-item label="CRON表达式">
          <el-input v-model="form.cronExpression"></el-input>
        </el-form-item>
      </template>
      <!--本地文件系统监听-->
      <template v-if="form.jobType === 'B'">
        <el-form-item label="文件监听路径">
          <el-input v-model="form.filePath"></el-input>
        </el-form-item>
      </template>
      <!--HTTP请求-->
      <template v-if="form.jobType === 'C'">
        <el-form-item label="请求方式">
          <el-select v-model="form.httpMethod" placeholder="请选择" style="width: 100%">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL映射">
          <el-input v-model="form.httpUrlMapping"></el-input>
        </el-form-item>
      </template>
      <!--WebSocket侦听-->
      <template v-if="form.jobType === 'D'"></template>
      <!--MQ消息队列-->
      <template v-if="form.jobType === 'E'"></template>
    </el-form>
  </div>
</template>

<script>
import * as JobApi from "@/api/bluex/JobApi";

export default {
  name: "JobDetailView",
  data() {
    return {
      form: {
        jobNo: undefined,
        jobName: undefined,
        jobDesc: undefined,
        jobType: undefined,
        cronExpression: undefined,
        filePath: undefined,
        httpMethod: undefined,
        httpUrlMapping: undefined,
      },
      jobTypeOptions: [
        {
          value: 'A',
          label: 'CRON定时任务'
        },
        {
          value: 'B',
          label: '文件系统监听'
        },
        {
          value: 'C',
          label: 'HTTP请求'
        },
        {
          value: 'D',
          label: 'WebSocket侦听'
        },
        {
          value: 'E',
          label: 'MQ消息队列'
        }
      ],
    };
  },
  created() {
    this.jobNo = this.$route.query.jobNo;
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    if (this.jobNo) {
      JobApi.jobDetail({jobNo: this.jobNo})
          .then(({data}) => {
            this.job = data;
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
    async submitJob(job) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const {data} = await JobApi.jobSubmit({
        job: {...job}
      });
      this.job = data;
      loading.close();
    },
  },
};
</script>

<style></style>