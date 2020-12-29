<template>
  <el-button type="danger" size="small" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("你确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("delete");
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>