<template>
  <el-card class="box-card">
    <el-button
        type="danger"
        plain
        icon="el-icon-plus"
        @click="toAdd"
    >新增
    </el-button>
    <el-table
        :data="tableData"
        size="small"
        stripe
        border
        style="width: 100%; margin-top: 20px;"
        max-height="600"
    >
      <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
      ></el-table-column>
      <el-table-column
          align="center"
          prop="taskNo"
          label="任务编号"
          width="200"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="taskName"
          label="任务名称"
          width="200"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="taskDesc"
          label="任务描述"
          width="400"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          width="200"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="updateTime"
          label="更新时间"
          width="200"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="250">
        <template slot-scope="{ row }">
          <el-button
              type="success"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="toEdit(row.taskNo)"
          >编辑
          </el-button>
          <el-button
              type="info"
              size="mini"
              plain
              icon="el-icon-view"
              @click="toExport(row.taskNo)"
          >导出为JSON
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50]"
        :page-size="pagination.size"
        :total="pagination.total"
        :current-page="pagination.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import * as ManagementApi from "@/api/bluex/ManagementApi";

export default {
  name: "TaskListView",
  data() {
    return {
      tableData: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0,
      },
    }
  },
  activated() {
    console.log("activated")
    this.toQuery();
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.size = val;
      this.toQuery();
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.toQuery();
    },
    toQuery() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      ManagementApi
          .taskList({...this.pagination})
          .then(({data}) => {
            this.tableData = data.records;
            this.pagination.total = data.total;
            loading.close();
          })
          .catch(() => {
            loading.close();
          });
    },
    toAdd() {
      this.$router.push("/management/taskDetailView");
    },
    toEdit(taskNo) {
      this.$router.push("/management/taskDetailView?taskNo=" + taskNo);
    },
    toExport(taskNo) {
      console.log(taskNo);
    }
  }
};
</script>

<style scoped>
</style>