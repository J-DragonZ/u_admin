<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img !== 'null'"
            :src="$pre + scope.row.img"
            alt=""
            class="img"
          />
        </template>
      </el-table-column>
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
import { cate_del } from "../../../utils/http.js";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    // 接受状态层的变量
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    // 接受状态层的方法
    ...mapActions({
      cateList: "cate/cateList",
    }),

    // 删除
    del(id) {
      cate_del({ id: id }).then((res) => {
        if (res.data.code === 200) {
          // 成功提示框
          successAlert(res.data.msg);
          // 刷新页面
          this.cateList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.cateList();
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