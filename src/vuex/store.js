import Vue from "vue"
import Vuex from "vuex"
import headerImg from "@/assets/img/user.jpg";
import * as getItem from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        currentUser:null,
        isLogin:false,
        avatar:headerImg,
        nickname:"",
        account_number:"",
        token:""
     
    },
    getItem,
    mutations,
    actions
})
export default store;