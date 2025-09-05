<template>
  <div style="width: 100%; height: calc(100% - 40px);">
    <el-form
        ref="form"
        :model="job"
        label-width="120px"
        size="small"
        style="width: 40%;">
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
      <div style="height: 800px; overflow-y: scroll;">
        <el-form-item label="任务编号">
          <el-input v-model="job.jobNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="job.jobName"></el-input>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input type="textarea" v-model="job.jobDesc" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="程序类型">
          <el-select
              v-model="job.programType"
              placeholder="请选择"
              style="width: 100%"
              @change="onProgramTypeChange">
            <el-option
                v-for="item in programTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定的程序">
          <el-select v-model="job.programNo" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in filteredOptions"
                :key="item.programNo"
                :label="item.programName"
                :value="item.programNo">
            </el-option>
          </el-select>
        </el-form-item>
        <!--CRON定时任务-->
        <template v-if="job.programType === 'CronJob'">
          <el-form-item label="CRON表达式">
            <el-input v-model="job.cronExpression"></el-input>
          </el-form-item>
        </template>
        <!--本地文件系统监听-->
        <template v-if="job.programType === 'FileSystemListenJob'">
          <el-form-item label="文件监听路径">
            <el-input v-model="job.filePath"></el-input>
          </el-form-item>
        </template>
        <!--HTTP请求-->
        <template v-if="job.programType === 'HttpJob'">
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
        <template v-if="job.programType === 'WebSocketJob'">
          <el-form-item label="WebSocket端口">
            <el-input v-model="job.wsEndpoint"></el-input>
          </el-form-item>
        </template>
        <!--MQ消息队列-->
        <template v-if="job.programType === 'MQJob'">
          <el-form-item label="MQ类型">
            <el-select v-model="job.mqDriverName" placeholder="请选择" style="width: 100%">
              <el-option label="ibmmq" value="ibmmq"></el-option>
              <el-option label="activemq" value="activemq"></el-option>
              <el-option label="rabbitmq" value="rabbitmq"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="MQ地址">
            <el-input v-model="job.mqUri"></el-input>
          </el-form-item>
          <el-form-item label="MQ用户名">
            <el-input v-model="job.mqUsername"></el-input>
          </el-form-item>
          <el-form-item label="MQ密码">
            <el-input v-model="job.mqPassword"></el-input>
          </el-form-item>
          <el-form-item label="MQ队列/主题">
            <el-input v-model="job.mqDestinationName"></el-input>
          </el-form-item>
          <el-form-item label="MQ模式">
            <el-radio-group v-model="job.mqPubSubDomain">
              <el-radio :label="'N'">点对点</el-radio>
              <el-radio :label="'Y'">发布/订阅模式</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="MQ队列管理器">
            <el-input v-model="job.mqQueueManager"></el-input>
          </el-form-item>
          <el-form-item label="MQ通道名称">
            <el-input v-model="job.mqChannel"></el-input>
          </el-form-item>
          <el-form-item label="MQ主机和端口">
            <el-input v-model="job.mqConnectionNameList"></el-input>
          </el-form-item>
          <el-form-item label="MQ消息编码类型">
            <el-select v-model="job.mqCcsId" placeholder="请选择" style="width: 100%">
              <el-option label="UTF-8" value="1208"></el-option>
              <el-option label="GBK" value="1386"></el-option>
              <el-option label="GB2312" value="1381"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <!--MQ消息队列-->
        <template v-if="job.programType === 'OracleTableListenerJob'">
          <el-form-item label="数据库类型">
            <el-select v-model="job.dbDriverName" placeholder="请选择" style="width: 100%">
              <el-option label="oracle" value="oracle"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据库连接地址">
            <el-input v-model="job.dbUrl"></el-input>
          </el-form-item>
          <el-form-item label="数据库用户名">
            <el-input v-model="job.dbUsername"></el-input>
          </el-form-item>
          <el-form-item label="数据库密码">
            <el-input v-model="job.dbPassword"></el-input>
          </el-form-item>
          <el-form-item label="数据库实体类">
            <el-select v-model="job.dbEntity" placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in Object.keys(entityDef)"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监听行INSERT">
            <el-radio-group v-model="job.dbListenInsert">
              <el-radio :label="'N'">否</el-radio>
              <el-radio :label="'Y'">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监听行UPDATE">
            <el-radio-group v-model="job.dbListenUpdate">
              <el-radio :label="'N'">否</el-radio>
              <el-radio :label="'Y'">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监听行DELETE">
            <el-radio-group v-model="job.dbListenDelete">
              <el-radio :label="'N'">否</el-radio>
              <el-radio :label="'Y'">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as JobApi from "@/api/bluex/JobApi";
import * as ProgramApi from "@/api/bluex/ProgramApi";
import {programTypes} from "@/core/ProgramTypes";

export default {
  name: "JobDetailView",
  computed: {
    ...mapGetters([
      'entityDef',
    ]),
    filteredOptions() {
      return this.programOptions.filter(
          (item) => item.programType === this.job.programType
      );
    }
  },
  data() {
    return {
      job: {
        jobNo: null,
        jobName: null,
        jobDesc: null,
        programType: null,
        programNo: null,
        cronExpression: null,
        filePath: null,
        httpMethod: null,
        httpUrlMapping: null,
        wsEndpoint: null,
        mqDriverName: "ibmmq",
        mqUri: null,
        mqUsername: null,
        mqPassword: null,
        mqDestinationName: null,
        mqPubSubDomain: null,
        mqQueueManager: null,
        mqChannel: null,
        mqConnectionNameList: null,
        mqCcsId: null,
        dbDriverName: "oracle",
        dbUrl: null,
        dbUsername: null,
        dbPassword: null,
        dbEntity: null,
        dbListenInsert: "Y",
        dbListenUpdate: "Y",
        dbListenDelete: "Y",
      },
      programTypes: programTypes,
      programOptions: []
    };
  },
  created() {
    this.jobNo = this.$route.query.jobNo;
    ProgramApi.programDropdown()
        .then(({data}) => {
          this.programOptions = data;
        })
        .catch(() => {
        });
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
    onProgramTypeChange() {
      this.job.programNo = null;
    },
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