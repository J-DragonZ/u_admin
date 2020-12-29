

import { specs_list, specs_count } from "../../utils/http.js"

let state = {
    // 定义初始值
    list: [],
    // 总数
    total: 0,
    // 一页个数
    size: 2,
    // 当前页面
    page: 1
}

let mutations = {
    // 修改初始值
    changeList(state, arr) {
        state.list = arr
    },
    // 修改总数
    changeTotal(state, num) {
        state.total = num
    },
    // 修改当前页
    changePage(state, num) {
        state.page = num
    }
}

let getters = {
    // 导出list
    list(state) {
        return state.list
    },
    // 导出总数
    total(state) {
        return state.total
    },
    // 导出页数
    size(state) {
        return state.size
    }
}

let actions = {
    // 列表页
    specsList(context) {
        specs_list({ page: context.state.page, size: context.state.size }).then(res => {
            if (res.data.code == 200) {
                // 如果删除最后一页最后一个数据,将当前修改为最后页-1.重新获取页面
                if (res.data.list.length == 0 && context.state.page > 1) {
                    context.commit('changePage', context.state.page - 1)
                    // 刷新页面
                    context.dispatch('specsList')
                    return
                }


                // 创建临时变量来更改为正确的数据
                let temp = res.data.list
                temp.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })
                // 将正确的数据赋值给list
                context.commit('changeList', temp)
            }
        })
    },
    // 总数
    specsTotal(context) {
        specs_count().then(res => {
            if (res.data.code == 200) {
                context.commit('changeTotal', res.data.list[0].total)
            }
        })
    },
    // 修改页面
    specsPage(context, num) {
        // 修改当前页
        context.commit('changePage', num)
        // 刷新页面
        context.dispatch('specsList')
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}