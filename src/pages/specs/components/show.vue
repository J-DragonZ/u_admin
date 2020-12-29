<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 规格名称 -->
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>

        <!-- 规格属性 -->
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item, index) in addAttrs"
          :key="index"
        >
          <div class="line">
            <el-input v-model="item.value" class="inp"></el-input>
            <el-button
              type="primary"
              class="btn"
              v-if="index == 0"
              @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" class="btn" v-else @click="delAttr(index)"
              >删除</el-button
            >
          </div>
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
        <el-button type="primary" @click="add" v-if="info.isadd"
          >确 定</el-button
        >
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert.js";
import { specs_add, specs_one, specs_updata } from "../../../utils/http.js";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      // 定义传递的数组变量
      addAttrs: [{ value: "" }],
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      specsList: "specs/specsList",
    }),
    //  关闭提示框
    cancel() {
      this.info.isshow = false;
    },
    // 清空数据
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.addAttrs = [{ value: "" }];
    },
    // 新增商品规格
    addAttr() {
      this.addAttrs.push({ value: "" });
    },
    // 删除新增属性
    delAttr(index) {
      this.addAttrs.splice(index, 1);
    },
    // 添加功能
    add() {
      // 赋值给attrs正确的值
      this.user.attrs = JSON.stringify(this.addAttrs.map((item) => item.value));
      // 发送请求
      specs_add(this.user).then((res) => {
        if (res.data.code == 200) {
          // 提示成功
          successAlert(res.data.msg);
          // 弹框消失
          this.cancel();
          // 清空数据
          this.empty();
          // 刷新页面
          this.specsList();
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      specs_one({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.addAttrs = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    // 修改
    updata() {
      this.user.attrs = JSON.stringify(this.addAttrs.map((item) => item.value));
      specs_updata(this.user).then((res) => {
        if (res.data.code == 200) {
          // 提示成功
          successAlert(res.data.msg);
          // 弹框消失
          this.cancel();
          // 清空数据
          this.empty();
          // 刷新页面
          this.specsList();
        }
      });
    },
  },
};
</script>

<style scoped>
.line {
  display: flex;
}
.btn {
  width: auto;
}
.inp {
  flex-grow: 1;
}
</style>