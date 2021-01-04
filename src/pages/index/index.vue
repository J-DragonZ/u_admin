<template>
  <div>
    <el-container class="index">
      <el-aside width="200px">
        <!-- 左侧导航 -->
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userInfo.menus" :key="item.id">
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item :index="item.url" v-else>{{
              item.title
            }}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="box">
            <span>{{ userInfo.username }}</span>
            <el-button type="danger" @click="leave">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.name"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="rou"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    leave() {
      this.changeUser({});
      this.$router.replace("/login");
    },
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style scoped>
.el-aside {
  background-color: #20222a;
}
.el-header {
  background-color: #b3c0d1;
}
.index {
  height: 100vh;
}
.el-menu {
  width: 100%;
}
.rou {
  margin-top: 30px;
}
.box {
  float: right;
  line-height: 60px;
}
.box span {
  font-size: 16px;
  margin-right: 20px;
  font-weight: bold;
}
</style>