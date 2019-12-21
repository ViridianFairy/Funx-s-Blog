import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const mutations = {
   receiveLoginTog(state,bool){
      if(typeof bool == 'undefined'){
         state.loginTog = !state.loginTog
      }else{
         state.loginTog = bool
      }
   },
   receivePhoneTog(state,bool){
      if(typeof bool == 'undefined'){
         state.phoneTog = !state.phoneTog
      }else{
         state.phoneTog = bool
      }
   },
   isPhoneTog(state,bool){
      state.isPhone = bool
      // console.log(state.isPhone)
   },
   receiveLoginState(state,v){
      state.loginState = v  // -1  0  1  2  3
   },
   articleLoaded(state,title){
      state.read.linksBool = !state.read.linksBool
      state.title = title
   }
}
const state = {
      path: [
         { name: "主页", link: "/home" }
      ],
      title:"",
      read:{
         linksBool:true,
         title:"233",
      },
      login:{
         user:"",
         quote:"",
         lookNum:0,
         sayNum:0,
         avatar:""
      },
      alertNum:0,
      invalidArticle:false,
      loginState:0,
      loginTog:false,
      phoneTog:true,
      isPhone:0,
      snake:{
         screen:0
      }
   }
const vuex = new Vuex.Store({
   state,
   mutations
});
export default vuex;
