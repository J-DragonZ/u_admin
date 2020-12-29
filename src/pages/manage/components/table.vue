<template>
  <div class="table">
    <el-table :data="tableList" border style="width: 100%">
      <!-- 用户编号 -->
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <!-- 用户名 -->
      <el-table-column prop="username" label="用户名" width="280">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @delete="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert.js";
import { manage_del } from "../../../utils/http.js";
export default {
  props: ["total", "tableList"],
  data() {
    return {};
  },
  methods: {
    del(uid) {
      manage_del({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>