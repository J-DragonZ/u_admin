import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { errorAlert } from './alert.js'


// 开发环境
let baseUrl = '/api'
Vue.prototype.$pre = 'http://localhost:3000'

// 生产环境  打包上线
// let baseUrl = ''
// Vue.prototype.$pre = ''

// 响应拦截
axios.interceptors.response.use(res => {
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }

    if (!res.data.list) {
        res.data.list = []
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

// post 上传文件
function formData(obj) {
    let data = new FormData()
    for (let key in obj) {
        data.append(key, obj[key])
    }
    return data
}

// ----------------------------------------------
// 菜单添加
export let menu_add = (user) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 菜单列表
export let menu_list = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        params: {
            istree: true
        }
    })
}

// 菜单删除
export let menu_del = (obj) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify(obj)
    })
}

// 菜单获取一条
export let menu_one = (obj) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        params: obj
    })
}

// 菜单修改
export let menu_updata = (obj) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(obj)
    })
}

// ----------------------------------------------------
// 角色列表
export let role_list = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get'
    })
}

// 角色添加
export let role_add = (user) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 角色删除
export let role_del = (obj) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: obj
    })
}

// 角色获取一条
export let role_one = (obj) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        params: obj
    })
}

// 角色修改
export let role_updata = (user) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

// ------------------------------------
// 管理员添加
export let manage_add = (user) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 管理员总数
export let manage_count = () => {
    return axios({
        url: baseUrl + '/api/usercount',
    })
}

// 管理员列表(分页)
export let manage_paging = (obj) => {
    return axios({
        url: baseUrl + '/api/userlist',
        params: obj
    })
}

// 管理员删除
export let manage_del = (obj) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: qs.stringify(obj)
    })
}

// 管理员获取一条数据
export let manage_one = (obj) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        params: obj
    })
}

// 管理员修改
export let manage_edit = (obj) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: qs.stringify(obj)
    })
}
// ---------------商品分类------------------------

// 商品分类添加
export let cate_add = (user) => {
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: formData(user)
    })
}

// 商品分类列表
export let cate_list = (obj) => {
    return axios({
        url: baseUrl + '/api/catelist',
        params: obj
    })
}

// 商品分类获取一条
export let cate_one = (obj) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        params: obj
    })
}

// 商品分类修改
export let cate_updata = (obj) => {
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: formData(obj)
    })
}

// 商品分类删除
export let cate_del = (obj) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: qs.stringify(obj)
    })
}

// -------------------轮播图管理---------------------

// 轮播图添加
export let banner_add = (user) => {
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data: formData(user)
    })
}

// 轮播图列表
export let banner_list = () => {
    return axios({
        url: baseUrl + '/api/bannerlist',
    })
}

// 轮播图获取 {id:id}
export let banner_one = (obj) => {
    return axios({
        url: baseUrl + '/api/bannerinfo',
        params: obj
    })
}

// 轮播图修改 {id:id,...user}
export let banner_updata = (user) => {
    return axios({
        url: baseUrl + '/api/banneredit',
        method: 'post',
        data: formData(user)
    })
}

// 轮播图删除 {id:id}
export let banner_del = (obj) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        data: qs.stringify(obj)
    })
}

// -----------会员管理-----------------------

// 会员列表
export let member_list = () => {
    return axios({
        url: baseUrl + '/api/memberlist'
    })
}

// 会员获取一条  {uid:uid}
export let member_one = (obj) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        params: obj
    })
}

// 会员修改
export let member_updata = (user) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

// ---------------商品规格------------------

// 商品规格添加 
export let specs_add = (user) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 商品规格总数(用于计算分页)
export let specs_count = () => {
    return axios({
        url: baseUrl + '/api/specscount'
    })
}

// 商品规格列表(分页) {size:--,page:--}
export let specs_list = (obj) => {
    return axios({
        url: baseUrl + '/api/specslist',
        params: obj
    })
}

// 商品规格获取一条 {id:id}
export let specs_one = (obj) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        params: obj
    })
}

// 商品规格修改 {id:id,...}
export let specs_updata = (user) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 商品规格删除 {id:id}
export let specs_del = (obj) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: obj
    })
}

// ----------------------------------------