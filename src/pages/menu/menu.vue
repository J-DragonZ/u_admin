<template>
  <div>
    <el-button type="primary" @click="open">添加</el-button>
    <v-table :list="list" @init="init" @edit="edit($event)"></v-table>
    <v-show :info="info" @init="init" :list="list" ref="show"></v-show>
  </div>
</template>

<script>
import vTable from "./components/table.vue";
import vShow from "./components/show.vue";
import { menu_list } from "../../utils/http.js";
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    open() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 请求页面列表
    init() {
      menu_list().then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isadd = false;
      this.$refs.show.getOne(id);
    },
  },
  components: {
    vTable,
    vShow,
  },
  mounted() {
    // 刷新页面
    this.init();
  },
};
</script>

<style>
</style>