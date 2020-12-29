<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 编号 -->
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>
      <!-- 轮播图标题 -->
      <el-table-column prop="title" label="轮播图标题" sortable width="180">
      </el-table-column>
      <!-- 图片 -->
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img != 'null'"
            :src="$pre + scope.row.img"
            alt=""
            class="img"
          />
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
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
import { banner_del } from "../../../utils/http.js";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    // 删除
    del(id) {
      banner_del({ id: id }).then((res) => {
        if (res.data.code == 200) {
          // 删除成功提示框
          successAlert(res.data.msg);
          // 刷新页面
          this.$emit("init");
        }
      });
    },
    // 编辑
    edit(id) {
      // 通知父组件编辑
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.img {
  width: 80px;
  height: 80px;
}
</style>