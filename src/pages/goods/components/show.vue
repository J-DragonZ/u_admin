<template>
  <div class="show">
    <el-dialog
      :title="info.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in list"
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
          <el-select v-model="user.specsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option label="电视" :value="1"></el-option>
            <el-option label="洗衣机" :value="2"></el-option>
            <el-option label="电脑" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <!-- 规格属性 -->
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option label="电视" :value="1"></el-option>
            <el-option label="洗衣机" :value="2"></el-option>
            <el-option label="电脑" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <div>{{ user }}</div>

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
          <textarea cols="30" rows="10"></textarea>
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
import { cate_list } from "../../../utils/http.js";
import { mapGetters, mapActions } from "vuex";
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
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  props: ["info"],
  methods: {
    ...mapActions({
      cateList: "cate/cateList",
    }),
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

    changeImg() {},
    //  关闭提示框
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 清空数据
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
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
          // 刷新总数
          this.specsTotal();
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
  mounted() {
    // 如果状态层没数据,重新请求分类列表数据
    if (this.list.length == 0) {
      this.cateList();
    }
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