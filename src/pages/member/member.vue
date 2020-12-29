<template>
  <div>
    <v-table :list="list" @edit="edit($event)"></v-table>
    <v-show :info="info" ref="show" @init="init"></v-show>
  </div>
</template>

<script>
import vTable from "./components/table.vue";
import vShow from "./components/show.vue";
import { member_list } from "../../utils/http.js";
export default {
  components: {
    vTable,
    vShow,
  },
  data() {
    return {
      info: {
        isshow: false,
      },
      list: [],
    };
  },
  methods: {
    init() {
      member_list().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(uid) {
      this.$refs.show.getOne(uid);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>