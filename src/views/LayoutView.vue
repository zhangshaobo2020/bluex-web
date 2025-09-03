<template>
  <el-container style="height: 100%; border: 2px solid #eee; display: flex;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
          :router="true"
          :default-active="defaultActive">
        <el-menu-item index="/homeView">
          <template slot="title"><i class="el-icon-postcard"></i>主页</template>
        </el-menu-item>
        <el-submenu index="/tutorial">
          <template slot="title"><i class="el-icon-data-board"></i>教程</template>
          <el-menu-item index="/tutorial/introductionView">简介</el-menu-item>
          <el-menu-item index="/tutorial/playGroundView">在线调试工具</el-menu-item>
          <el-menu-item index="/tutorial/apiDocumentView">API文档</el-menu-item>
          <el-menu-item index="/tutorial/aboutView">关于</el-menu-item>
        </el-submenu>
        <el-submenu index="/management">
          <template slot="title"><i class="el-icon-setting"></i>应用</template>
          <el-menu-item index="/management/programPageView">程序管理</el-menu-item>
          <el-menu-item index="/management/jobPageView">任务管理</el-menu-item>
          <el-menu-item index="/management/scriptPageView">脚本管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main style="height: 100%; position: relative; flex: 1;">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import * as MetaApi from "@/api/bluex/MetaApi";

export default {
  name: "LayoutView",
  data() {
    return {}
  },
  computed: {
    defaultActive() {
      return this.$route.fullPath;
    },
  },
  async created() {
    const {data} = await MetaApi.graphDefinition()
    this.$store.commit("overrideGraphDefs", {...data});
  },
  methods: {},
};
</script>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>