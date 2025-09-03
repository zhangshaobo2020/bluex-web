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
          prop="scriptNo"
          label="脚本编号"
          width="250"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="scriptName"
          label="脚本名称"
          width="200"
      >
      </el-table-column>
      <el-table-column
          align="center"
          prop="scriptDesc"
          label="脚本描述"
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
          min-width="300"
          fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
              type="warning"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="toEdit(row)"
              :disabled="row.rowState === 'Y'"
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
                :disabled="row.rowState === 'Y'"
            >删除
            </el-button>
          </el-popconfirm>
          <el-popconfirm
              title="确定注册吗？"
              @confirm="toRegister(row)"
              style="margin-left: 10px;"
              v-if="row.rowState === 'N'"
          >
            <el-button
                slot="reference"
                type="success"
                size="mini"
                plain
                icon="el-icon-unlock"
            >注册
            </el-button>
          </el-popconfirm>
          <el-popconfirm
              title="确定注销吗？"
              @confirm="toUnregister(row)"
              style="margin-left: 10px;"
              v-if="row.rowState === 'Y'"
          >
            <el-button
                slot="reference"
                type="info"
                size="mini"
                plain
                icon="el-icon-lock"
            >注销
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
import * as ScriptApi from "@/api/bluex/ScriptApi";

export default {
  name: "ScriptPageView",
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
      ScriptApi
          .scriptPage({...this.pagination})
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
      this.$router.push("/management/scriptDetailView");
    },
    toEdit({scriptNo}) {
      this.$router.push("/management/scriptDetailView?scriptNo=" + scriptNo);
    },
    toDelete({scriptNo}) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      ScriptApi
          .scriptDelete({scriptNo})
          .then(() => {
            loading.close();
            this.toQuery()
          })
          .catch(() => {
            loading.close();
          });
    },
    toRegister({scriptNo}) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      ScriptApi
          .scriptRegister({scriptNo})
          .then(() => {
            loading.close();
            this.toQuery()
          })
          .catch(() => {
            loading.close();
          });
    },
    toUnregister({scriptNo}) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      ScriptApi
          .scriptUnregister({scriptNo})
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