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
    };
  },
  methods: {
    // 打开添加弹框
    open() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.show.getOne(id);
    },
  },
};
</script>

<style>
</style>                                                                           