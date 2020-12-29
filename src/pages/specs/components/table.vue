<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 规格编号 -->
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <!-- 规格名称 -->
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>
      <!-- 规格属性 -->
      <el-table-column prop="catename" label="规格属性" sortable width="330">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.attrs" :key="index">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status === 1"
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
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      specsList: "specs/specsList",
    }),
    // 删除
    del(id) {
      specs_del({ id: id }).then((res) => {
        if (res.data.code == 200) {
          // 提示删除成功
          successAlert(res.data.msg);
          // 刷新页面
          this.specsList();
        }
      });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.specsList();
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>