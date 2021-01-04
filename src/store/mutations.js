export let state = {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
}

export let getters = {
    userInfo(state) {
        return state.userInfo
    }
}

export let mutations = {
    changeUserInfo(state, obj) {
        state.userInfo = obj
        // 同时存到本地
        if (obj.username) {
            sessionStorage.setItem('userInfo', JSON.stringify(obj))
        } else {
            sessionStorage.removeItem('userInfo')
        }

    }
}