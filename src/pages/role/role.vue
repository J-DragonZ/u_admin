<template>
  <div>
    <el-button type="primary" @click="open">添加</el-button>
    <v-table
      :table_list="table_list"
      @init="init"
      @edit="edit($event)"
    ></v-table>
    <v-show
      :info="info"
      :list_show="list_show"
      @init="init"
      ref="show"
    ></v-show>
  </div>
</template>

<script>
import vTable from "./components/table.vue";
import vShow from "./components/show.vue";
import { menu_list, role_list } from "../../utils/http.js";
export default {
  components: {
    vTable,
    vShow,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list_show: [],
      table_list: [],
    };
  },
  methods: {
    open() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.show.getOne(id);
    },
    init() {
      role_list().then((res) => {
        if (res.data.code === 200) {
          this.table_list = res.data.list;
        }
      });
    },
  },
  mounted() {
    menu_list().then((res) => {
      if (res.data.code === 200) {
        this.list_show = res.data.list;
      }
    });
    this.init();
  },
};
</script>

<style>
</style>