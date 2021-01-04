<template>
  <div>
    <el-dialog
      :title="info.isadd ? '管理员添加' : '管理员编辑'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 所属角色 -->
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option value="" label="请选择" disabled></el-option>
            <!-- v-for role里面的数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="manageAdd" v-if="info.isadd"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, successAlert } from "../../../utils/alert.js";
import { manage_add, manage_one, manage_edit } from "../../../utils/http.js";
export default {
  props: ["info", "roleList"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    cancel() {
      if (!this.info.isadd) {
        this.empit();
      }
      this.info.isshow = false;
    },
    empit() {
      this.user = {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      };
    },
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.roleid === "") {
          errorAlert("所属角色不能为空");
          return;
        }
        if (this.user.username === "") {
          errorAlert("用户名不能为空");
          return;
        }
        if (this.user.password === "") {
          errorAlert("密码不能为空");
          return;
        }
        resolve();
      });
    },
    manageAdd() {
      this.checkProps().then(() => {
        manage_add(this.user).then((res) => {
          if (res.data.code === 200) {
            // 提示成功
            successAlert(res.data.msg);
            // 关闭弹框
            this.cancel();
            // 清空数据
            this.empit();
            // 刷新页面
            this.$emit("init");
          }
        });
      });
    },
    getOne(uid) {
      manage_one({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 密码为空
          this.user.password = "";
        }
      });
    },
    updata() {
      this.checkProps().then(() => {
        manage_edit(this.user).then((res) => {
          if (res.data.code == 200) {
            //弹成功
            successAlert(res.data.msg);
            //弹框消失
            this.cancel();
            //数据清空
            this.empit();
            //刷新list
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>