<template>
  <div>
    <el-dialog
      :title="info.isadd ? '活动添加' : '活动修改'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动期限" label-width="100px">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="getSecond">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in c_list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div>{{ user }}</div>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="getThird">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in thirdArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
        <el-button type="primary" v-if="info.isadd" @click="add"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert.js";
import {
  cate_list,
  goods_list,
  seckill_add,
  seckill_one,
  seckill_updata,
} from "../../../utils/http.js";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 时间数组
      value: [],
      // 二级分类数组
      secondArr: [],
      // 三级商品数组
      thirdArr: [],
    };
  },
  computed: {
    ...mapGetters({
      c_list: "cate/list",
      sk_list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      cateList: "cate/cateList",
      seckillList: "seckill/seckillList",
    }),
    // 当一级分类发生变化时,获取二级分类数据
    getSecond() {
      this.user.second_cateid = "";
      cate_list({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondArr = res.data.list;
        }
      });
    },
    // 当二级分类发生变化时,获取商品数据
    getThird() {
      this.user.goodsid = "";
      goods_list({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.thirdArr = res.data.list;
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      seckill_one({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          cate_list({ pid: this.user.first_cateid }).then((res) => {
            if (res.data.code == 200) {
              this.secondArr = res.data.list;
            }
          });
          goods_list({
            fid: this.user.first_cateid,
            sid: this.user.second_cateid,
          }).then((res) => {
            if (res.data.code == 200) {
              this.thirdArr = res.data.list;
            }
          });
          this.$set(this.value, 0, new Date(Number(this.user.begintime)));
          this.$set(this.value, 1, new Date(Number(this.user.endtime)));
          // 补id
          this.user.id = id;
        }
      });
    },
    // 修改
    updata() {
      this.checkProps().then(() => {
        this.user.begintime = this.value[0].getTime();
        this.user.endtime = this.value[1].getTime();
        seckill_updata(this.user).then((res) => {
          if (res.data.code == 200) {
            // 提示成功
            successAlert(res.data.msg);
            // 弹框消失
            this.cancel();
            // 清空数据
            this.empty();
            // 刷新页面
            this.seckillList();
          }
        });
      });
    },
    //  取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 清空数据
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      // 时间数组
      this.value = [];
      // 二级分类数组
      this.secondArr = [];
      // 三级商品数组
      this.thirdArr = [];
    },
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          errorAlert("活动名称不能为空");
          return;
        }
        if (this.value.length < 2) {
          errorAlert("活动期限不能为空");
          return;
        }
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsid === "") {
          errorAlert("商品不能为空");
          return;
        }
        resolve();
      });
    },
    // 添加
    add() {
      this.checkProps().then(() => {
        this.user.begintime = this.value[0].getTime();
        this.user.endtime = this.value[1].getTime();
        seckill_add(this.user).then((res) => {
          if (res.data.code == 200) {
            // 提示添加成功
            successAlert(res.data.msg);
            // 关闭弹框
            this.cancel();
            // 清空数据
            this.empty();
            // 刷新页面
            this.seckillList();
          }
        });
      });
    },
  },
  mounted() {
    if (this.c_list.length == 0) {
      this.cateList();
    }
  },
};
</script>

<style>
</style>