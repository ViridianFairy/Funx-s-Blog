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
   receiveLoginState(state,v){
      state.loginState = v  // -1  0  1  2  3
   },
   articleLoaded(state){
      state.read.linksBool = !state.read.linksBool 
   },
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
   }
const vuex = new Vuex.Store({
   state,
   mutations
});
export default vuex;
