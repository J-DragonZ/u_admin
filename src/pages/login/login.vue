<template>
  <div class="login">
    <div class="content">
      <h3>登录</h3>
      <div class="inp">
        <el-input
          placeholder="请输入账号"
          v-model="user.name"
          clearable
        ></el-input>
      </div>
      <div class="inp">
        <el-input
          placeholder="请输入密码"
          v-model="user.pass"
          clearable
          show-password
        ></el-input>
      </div>
      <el-button type="primary" @click="toIndex">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
      },
    };
  },
  methods: {
    toIndex() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #423a53, #353d5d);
}
.content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
}
.inp {
  margin: 20px;
}
h3 {
  font-size: 24px;
  font-weight: bold;
}
.el-button {
  width: 90%;
}
</style>