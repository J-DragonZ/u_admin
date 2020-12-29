<template>
  <div class="table">
    <el-table :data="table_list" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="480">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert.js";
import { role_del } from "../../../utils/http.js";
export default {
  props: ["table_list"],
  methods: {
    del(id) {
      this.$confirm("你确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          role_del({ id: id }).then((res) => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>