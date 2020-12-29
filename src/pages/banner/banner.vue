<template>
  <div>
    <el-button type="primary" @click="open">添加</el-button>
    <v-table :list="list" @init="init" @edit="edit($event)"></v-table>
    <v-show :info="info" @init="init" ref="show"></v-show>
  </div>
</template>

<script>
import vTable from "./components/table.vue";
import vShow from "./components/show.vue";
import { banner_list } from "../../utils/http.js";
export default {
  components: {
    vTable,
    vShow,
  },
  data() {
    return {
      // 控制弹框开关变量
      info: {
        isshow: false,
        isadd: true,
      },
      // table的列表数据
      list: [],
    };
  },
  methods: {
    // 添加
    open() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 获取列表数据|刷新页面
    init() {
      banner_list().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    // 编辑
    edit(id) {
      // 打开弹框
      this.info.isshow = true;
      // 编辑弹框
      this.info.isadd = false;
      this.$refs.show.getOne(id);
    },
  },
  // 刚进入页面时
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>