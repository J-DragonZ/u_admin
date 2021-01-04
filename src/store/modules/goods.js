

import { goods_list, goods_count } from "../../utils/http.js"

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
    goodsList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        goods_list(params).then(res => {
            if (res.data.code == 200) {
                // 如果删除最后一页最后一个数据,将当前修改为最后页-1.重新获取页面
                if (res.data.list.length == 0 && context.state.page > 1) {
                    context.commit('changePage', context.state.page - 1)
                    // 刷新页面
                    context.dispatch('goodsList')
                    return
                }
                // 将正确的数据赋值给list
                context.commit('changeList', res.data.list)
            }
        })
    },
    // 总数
    goodsTotal(context) {
        goods_count().then(res => {
            if (res.data.code == 200) {
                context.commit('changeTotal', res.data.list[0].total)
            }
        })
    },
    // 修改页面
    goodsPage(context, num) {
        // 修改当前页
        context.commit('changePage', num)
        // 刷新页面
        context.dispatch('goodsList')
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}