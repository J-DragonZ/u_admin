<template>
  <div>
    <el-dialog
      :title="info.isadd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="list_show"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
        <el-button type="primary" @click="roleAdd" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert.js";
import { role_add, role_one, role_updata } from "../../../utils/http.js";
export default {
  props: ["info", "list_show"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    // 关闭弹框
    cancel() {
      if (!this.info.isadd) {
        this.empit();
        // 清空复选框数据
        this.$refs.tree.setCheckedKeys([]);
      }
      this.info.isshow = false;
    },
    // 清空输入框
    empit() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    // 添加角色管理
    roleAdd() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      role_add(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 弹框消失
          this.cancel();
          // 清空数据
          this.empit();
          // 清空复选框数据
          this.$refs.tree.setCheckedKeys([]);
          // 刷新页面
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      role_one({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
          this.user.id = id;
          console.log(this.user);
        }
      });
    },
    updata() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      role_updata(this.user).then((res) => {
        this.cancel();
        this.empit();
        // 清空复选框数据
        this.$refs.tree.setCheckedKeys([]);
        // 刷新页面
        this.$emit("init");
      });
    },
  },
};
</script>

<style>
</style>