<template>
  <div class="show">
    <el-dialog
      :title="info.isadd ? '添加分类' : '编辑分类'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 上级菜单 -->
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value="" label="请选择" disabled></el-option>
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 菜单名称 -->
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="100px" v-if="user.pid !== 0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { cate_add, cate_one, cate_updata } from "../../../utils/http.js";
import { errorAlert, successAlert } from "../../../utils/alert.js";
import { mapActions, mapGetters } from "vuex";
import path from "path";
export default {
  computed: {
    // 接受状态层数据
    ...mapGetters({
      list: "cate/list",
    }),
  },

  props: ["info"],
  data() {
    return {
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  methods: {
    // 接受状态层的方法
    ...mapActions({
      cateList: "cate/cateList",
    }),

    changeImg(e) {
      let file = e.raw;

      // 文件大小验证
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2MB");
        return;
      }

      // 判断是否是图片
      let arr = [".jpg", ".png", ".gif", ".jpeg"];
      let extname = path.extname(file.name);
      if (!arr.some((item) => item === extname)) {
        errorAlert("请上传图片");
        return;
      }

      // 将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);
      // 赋值给user.img
      this.user.img = file;
    },

    cancel() {
      if (!this.info.isadd) {
        this.empit();
      }
      this.info.isshow = false;
    },
    empit() {
      // 清空图片
      this.imgUrl = "";
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.pid === "") {
          errorAlert("上级分类不能为空");
          return;
        }
        if (this.user.catename === "") {
          errorAlert("分类名称不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checkProps().then(() => {
        cate_add(this.user).then((res) => {
          if (res.data.code === 200) {
            // 如果成功 弹出提示框
            successAlert(res.data.msg);
            // 输入页面消失
            this.cancel();
            // 输入页面清空数据
            this.empit();
            // 页面刷新
            this.cateList();
          }
        });
      });
    },
    getOne(id) {
      this.info.isshow = true;
      cate_one({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          // 处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    updata() {
      this.checkProps().then(() => {
        cate_updata(this.user).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empit();
            this.cateList();
          }
        });
      });
    },
  },
};
</script>

<style scoped lang='stylus'>
.show >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.show >>>.el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>