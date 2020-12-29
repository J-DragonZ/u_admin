<template>
  <div>
    <el-button type="primary" @click="open">添加</el-button>
    <v-table :tableList="tableList" @init="init" @edit="edit"></v-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="currentChange"
    >
    </el-pagination>
    <v-show :info="info" :roleList="roleList" @init="init" ref="show"></v-show>
  </div>
</template>

<script>
import vTable from "./components/table.vue";
import vShow from "./components/show.vue";
import { role_list, manage_count, manage_paging } from "../../utils/http.js";
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
      roleList: [],
      tableList: [],
      // 总数
      total: 0,
      // 页面条数
      size: 2,
      // 当前页
      page: 1,
    };
  },
  methods: {
    open() {
      this.info.isshow = true;
      this.info.isadd = true;
    },

    // 请求管理员总数
    getCount() {
      manage_count().then((res) => {
        if (res.data.code === 200) {
          this.total = res.data.list[0].total;
        }
      });
    },

    // 请求管理员列表(分页)
    getManageList() {
      manage_paging({ size: this.size, page: this.page }).then((res) => {
        if (res.data.code === 200) {
          /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
          if (res.data.list.length == 0 && this.page > 1) {
            this.page--;
            this.getManageList();
            return;
          }

          this.tableList = res.data.list;
        }
      });
    },

    init() {
      // 请求管理员总数
      this.getCount();
      // 请求管理员列表(分页)
      this.getManageList();
    },

    currentChange(ev) {
      this.page = ev;
      this.getManageList();
    },
    edit(uid) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.show.getOne(uid);
    },
  },

  mounted() {
    // 请求角色管理数据
    role_list().then((res) => {
      if (res.data.code === 200) {
        this.roleList = res.data.list;
      }
    });
    // 请求数据
    this.init();
  },
};
</script>

<style>
</style>