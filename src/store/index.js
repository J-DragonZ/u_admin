import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { state, getters, mutations } from './mutations'
import { actions } from './actions'
// 引入
import cate from './modules/cate.js'
import specs from './modules/specs.js'
import goods from './modules/goods.js'
import seckill from './modules/seckill.js'

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    // 注册
    modules: {
        cate,
        specs,
        goods,
        seckill
    }
})