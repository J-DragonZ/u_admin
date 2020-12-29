<template>
  <div class="show">
    <el-dialog
      :title="info.isadd ? '轮播图添加' : '轮播图修改'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 标题 -->
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" label-width="100px">
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

      <!-- 取消和确定 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, successAlert } from "../../../utils/alert";
import path from "path";
import { banner_add, banner_one, banner_updata } from "../../../utils/http.js";
export default {
  props: ["info"],
  data() {
    return {
      // 发送请求的参数
      user: {
        title: "",
        img: null,
        status: 1,
      },
      // 图片的地址
      imgUrl: "",
    };
  },
  methods: {
    // 关闭弹框
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 清空数据
    empty() {
      // 将图片地址清空
      this.imgUrl = "";
      this.user = {
        title: "",
        img: null,
        status: 1,
      };
    },
    // 修改图片的状态
    changeImg(e) {
      // 保存图片的信息
      let file = e.raw;
      console.log(file);
      // 判断文件大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2MB");
        return;
      }
      // 判断是否是图片
      let arr = [".jpg", ".png", ".gif", "jpeg"];
      let extname = path.extname(file.name);
      if (!arr.some((item) => item == extname)) {
        errorAlert("请上传图片");
        return;
      }
      // 生成图片地址
      this.imgUrl = URL.createObjectURL(file);
      // 将图片信息赋值给发送请求
      this.user.img = file;
    },

    // 轮播图添加
    add() {
      banner_add(this.user).then((res) => {
        if (res.data.code == 200) {
          // 提示添加成功
          successAlert(res.data.msg);
          // 关闭弹框
          this.cancel();
          // 清空数据
          this.empty();
          // 刷新页面
          this.$emit("init");
        }
      });
    },

    // 获取一条数据
    getOne(id) {
      banner_one({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 补id
          this.user.id = id;
          // 将图片赋值给页面
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    // 修改
    updata() {
      banner_updata(this.user).then((res) => {
        if (res.data.code == 200) {
          // 提示成功
          successAlert(res.data.msg);
          // 关闭弹框
          this.cancel();
          // 清空数据
          this.empty();
          // 刷新页面
          this.$emit("init");
        }
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