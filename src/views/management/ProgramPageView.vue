<template>
  <el-card class="box-card">
    <el-button
        type="success"
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
          prop="programNo"
          label="程序编号"
          width="250"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="programName"
          label="程序名称"
          width="200"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="programDesc"
          label="程序描述"
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
      <el-table-column
          align="center"
          prop="action"
          label="操作"
          min-width="200"
          fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
              type="warning"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="toEdit(row)"
          >编辑
          </el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="toDelete(row)"
              style="margin-left: 10px;"
          >
            <el-button
                slot="reference"
                type="danger"
                size="mini"
                plain
                icon="el-icon-delete"
            >删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50]"
        :page-size="pagination.size"
        :total="pagination.total"
        :current-page="pagination.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="float: right; padding: 10px;"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import * as ProgramApi from "@/api/bluex/ProgramApi";

export default {
  name: "ProgramListView",
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
  created() {
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
      ProgramApi
          .programPage({...this.pagination})
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
      this.$router.push("/management/programDetailView");
    },
    toEdit({programNo}) {
      this.$router.push("/management/programDetailView?programNo=" + programNo);
    },
    toDelete({programNo}) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      ProgramApi
          .programDelete({programNo})
          .then(() => {
            loading.close();
            this.toQuery()
          })
          .catch(() => {
            loading.close();
          });
    }
  }
};
</script>

<style scoped>
</style>