<template>
  <div class="table">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 商品编号 -->
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <!-- 商品名称 -->
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <!-- 商品价格 -->
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <!-- 市场价格 -->
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <!-- 图片 -->
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
      <!-- 是否新品 -->
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.isnew === 1"
            >是</el-button
          >
          <el-button type="info" size="small" v-else>否</el-button>
        </template>
      </el-table-column>
      <!-- 是否热卖 -->
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.ishot === 1"
            >是</el-button
          >
          <el-button type="info" size="small" v-else>否</el-button>
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
      <el-table-column label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @delete="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="goodsPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { goods_del } from "../../../utils/http.js";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      goodsList: "goods/goodsList",
      goodsTotal: "goods/goodsTotal",
      goodsPage: "goods/goodsPage",
    }),
    // 删除
    del(id) {
      goods_del({ id: id }).then((res) => {
        if (res.data.code == 200) {
          // 提示删除成功
          successAlert(res.data.msg);
          // 刷新总数
          this.goodsTotal();
          // 刷新页面
          this.goodsList();
        }
      });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.goodsList();
    this.goodsTotal();
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
img {
  width: 80px;
  height: 80px;
}
</style>