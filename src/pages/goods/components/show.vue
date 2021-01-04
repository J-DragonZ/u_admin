<template>
  <div class="show">
    <el-dialog
      :title="info.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="info.isshow"
      @closed="cancel"
      @opened="opened"
    >
      <el-form :model="user">
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in c_list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>

        <!-- 价格 -->
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>

        <!-- 市场价格 -->
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
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

        <!-- 商品规格 -->
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecs">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in s_list"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 规格属性 -->
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specsAttr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 是否新品 -->
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>

        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述" label-width="100px">
          <div v-if="info.isshow" id="box"></div>
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
import E from "wangeditor";
import { errorAlert, successAlert } from "../../../utils/alert.js";
import {
  cate_list,
  goods_add,
  goods_one,
  goods_updata,
} from "../../../utils/http.js";
import { mapGetters, mapActions } from "vuex";
import path from "path";
export default {
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "[]", // 后端要的是数组字符串
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 图片地址
      imgUrl: "",
      // 定义二级列表变量
      secondList: [],
      // 定义规格属性的变量
      specsAttr: [],
    };
  },
  computed: {
    ...mapGetters({
      c_list: "cate/list",
      s_list: "specs/list",
    }),
  },
  props: ["info"],
  methods: {
    ...mapActions({
      cateList: "cate/cateList",
      specsList: "specs/specsList",
      goodsList: "goods/goodsList",
      goodsTotal: "goods/goodsTotal",
    }),
    // 打开以后,创建富文本框
    opened() {
      this.editor = new E("#box");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
    // 当一级列表发生变化时,以一级的id重新获取数据
    changeFirst() {
      // 当发生变化时,将二级数据清空
      this.user.second_cateid = "";
      cate_list({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondList = res.data.list;
        }
      });
    },
    // 当商品规格发生变化时,已商品规格的id获取规格属性
    changeSpecs() {
      this.user.specsattr = "";
      let obj = this.s_list.find((item) => item.id == this.user.specsid);
      this.specsAttr = obj ? obj.attrs : [];
    },
    // 上传图片
    changeImg(e) {
      let file = e.raw;
      // 判断文件大小
      if (e.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2MB");
        return;
      }
      // 判断是否是图片
      let arr = [".jpg", ".png", ".gif", ".jpeg"];
      let extname = path.extname(e.name);
      if (!arr.some((item) => item == extname)) {
        errorAlert("请上传图片");
        return;
      }
      // 将图片赋值给图片地址
      this.imgUrl = URL.createObjectURL(file);
      // 将图片赋值给user.img
      this.user.img = file;
    },

    // -----------------------------------------------
    //  关闭提示框
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
        specsname: "",
        attrs: "[]",
        status: 1,
      };
    },
    checkProps() {
      return new Promise((resolve) => {
        // 判断输入框条件
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.user.price === "") {
          errorAlert("商品价格不能为空");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("市场价格不能为空");
          return;
        }
        if (!this.user.img) {
          errorAlert("请上传图片");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("商品描述不能为空");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("商品规格不能为空");
          return;
        }
        if (this.user.specsattr === "") {
          errorAlert("规格属性不能为空");
          return;
        }
        resolve();
      });
    },
    // 添加功能
    add() {
      this.checkProps().then(() => {
        // 将富文本框的值赋值给description
        this.user.description = this.editor.txt.html();
        // 处理数据 后端要数组字符串,但是前段页面绑定的是数组,所以声明一个变量来传参
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        // 发送请求
        goods_add(data).then((res) => {
          if (res.data.code == 200) {
            // 提示成功
            successAlert(res.data.msg);
            // 弹框消失
            this.cancel();
            // 清空数据
            this.empty();
            // 刷新总数
            this.goodsTotal();
            // 刷新页面
            this.goodsList();
          }
        });
      });
    },
    // 获取一条数据
    getOne(id) {
      goods_one({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 重新获取二级分类
          cate_list({ pid: this.user.first_cateid }).then((res) => {
            if (res.data.code == 200) {
              this.secondList = res.data.list;
            }
          });
          // 图片赋值
          this.imgUrl = this.$pre + this.user.img;
          // 规格属性
          let obj = this.s_list.find((item) => item.id == this.user.specsid);
          this.specsAttr = obj ? obj.attrs : [];
          this.user.specsattr = JSON.parse(this.user.specsattr);
          // 给富文本框赋值
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
          // 补id
          this.user.id = id;
        }
      });
    },
    // 修改
    updata() {
      this.checkProps().then(() => {
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        goods_updata(data).then((res) => {
          if (res.data.code == 200) {
            // 提示成功
            successAlert(res.data.msg);
            // 弹框消失
            this.cancel();
            // 清空数据
            this.empty();
            // 刷新页面
            this.goodsList();
          }
        });
      });
    },
  },
  mounted() {
    // 如果状态层没数据,重新请求分类列表数据
    if (this.c_list.length == 0) {
      this.cateList();
    }
    this.specsList(true);
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