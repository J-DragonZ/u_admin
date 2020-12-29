<template>
  <div>
    <el-button type="primary" @click="open">添加</el-button>
    <v-table @edit="edit($event)"></v-table>
    <v-show :info="info" ref="show"></v-show>
  </div>
</template>

<script>
import vTable from "./components/table.vue";
import vShow from "./components/show.vue";
export default {
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    open() {
      this.info.isshow = true;
      this.info.isadd = true;
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
  mounted() {},
};
</script>

<style>
</style>