import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
   state: {
      path: [
         { name: "主页", link: "/home" }
      ],
      title:"",
      login:{
         user:"",
         quote:"",
         lookNum:0,
         sayNum:0,
         avatar:""
      },
      alertNum:0,
      invalidArticle:false
   }
});
export default store;
