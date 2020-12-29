<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @delete="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert.js";
import { menu_del } from "../../../utils/http.js";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      menu_del({ id: id }).then((res) => {
        if (res.data.code === 200) {
          // 成功提示框
          successAlert(res.data.msg);
          // 刷新页面
          this.$emit("init");
        }
      });
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