
import { seckill_list } from '../../utils/http.js'

let state = {
    list: []
}

let mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}

let getters = {
    list(state) {
        return state.list
    }
}

let actions = {
    seckillList(context) {
        seckill_list().then(res => {
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