
import { cate_list } from '../../utils/http.js'

let state = {
    // 初始值
    list: []
}

let mutations = {
    // 修改list
    changeList(state, arr) {
        state.list = arr
    }
}

let getters = {
    // 导出list
    list(state) {
        return state.list
    }
}

let actions = {
    // 处理list逻辑
    cateList(context) {
        cate_list({ istree: true }).then(res => {
            if (res.data.code == 200) {
                context.commit('changeList', res.data.list)
            }
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}