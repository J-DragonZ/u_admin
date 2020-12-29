import { specs_list } from "../../utils/http.js"


let state = {
    // 定义初始值
    list: []
}

let mutations = {
    // 修改初始值
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
    specsList(context) {
        specs_list({ page: 1, size: 50 }).then(res => {
            if (res.data.code == 200) {
                // 创建临时变量来更改为正确的数据
                let temp = res.data.list
                temp.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })
                // 将正确的数据赋值给list
                context.commit('changeList', temp)
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