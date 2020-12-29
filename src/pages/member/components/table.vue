<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <!-- 用户编号 -->
      <el-table-column prop="uid" label="用户编号" sortable width="180">
      </el-table-column>
      <!-- 昵称 -->
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <!-- 手机号 -->
      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
          <el-button type="primary" size="small" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>

<style>
</style>