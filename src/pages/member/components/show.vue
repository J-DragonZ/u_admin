<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <p class="p">留空则不修改</p>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <!-- 取消和确定 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert.js";
import { member_one, member_updata } from "../../../utils/http.js";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    //   获取一条数据
    getOne(uid) {
      member_one({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //   补uid
          this.user.uid = uid;
        }
      });
    },
    // 修改
    updata() {
      member_updata(this.user).then((res) => {
        if (res.data.code == 200) {
          // 提示成功
          successAlert(res.data.msg);
          // 刷新页面
          this.$emit("init");
        }
      });
    },
    // 取消
    cancel() {
      this.info.isshow = false;
    },
  },
};
</script>

<style scoped>
.p {
  margin-left: 100px;
  margin-bottom: 30px;
}
</style>