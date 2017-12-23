import Vue from 'vue'
import Vuex from 'vuex'

/*
*@des 导入需要的模块
*/
import HeaderStore from './headerStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        HeaderStore
    }
})
