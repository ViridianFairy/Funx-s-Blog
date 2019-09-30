import Vue from "vue";
import App from "./App";
import router from "./router/router";
import axios from "axios";
import Cookies from "js-cookie";
import store from "./store/store";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
Vue.config.productionTip = false;
//封装

Vue.directive("highlight", function(el) {
   let blocks = el.querySelectorAll("pre code");
   blocks.forEach(block => {
      hljs.highlightBlock(block);
   });
});
Vue.prototype.$http = axios.create({
   baseURL: "http://192.168.31.115:3001/api"
});
Vue.prototype.Cookies = Cookies;
//通过_id存储并拿到当前的用户信息
Vue.prototype.$getUserInfo = function() {
   this.$http
      .post("/user-info", { _id: this.Cookies.get("_id") })
      .then(res => {
         //console.log(res.data);
         if (res.data.success == 1) {
            this.$store.state.login.user = res.data.user;
            this.$store.state.login.quote = res.data.quote;
            this.$store.state.login.avatar = res.data.avatar;
            this.$store.state.login.lookNum = res.data.lookNum;
            this.$store.state.login.sayNum = res.data.sayNum;
            //alert(this.$store.state.login.lookNum+"-"+this.$store.state.login.sayNum)
         } else {
            this.$store.state.login.user = "";
            this.$store.state.login.quote = "";
            this.$store.state.login.avatar = "";
            this.$store.state.login.lookNum = "";
            this.$store.state.login.sayNum = "";
         }
      })
      .catch();
};
//组件构造器 并且挂载
import Alert from "./components/alert";
const alertBox = Vue.extend(Alert);
//Vue.prototype.$alertNum = 0;
Vue.prototype.$alert = function(msg, type) {
   console.log(document.getElementsByClassName('alert').length);
   if (document.getElementsByClassName('alert').length >= 2) return;
   if (type == "") type = "true";
   var a = new alertBox({
      data: {
         msg: msg,
         type: type,
         visible: false
      }
   }).$mount();
   document.body.appendChild(a.$el);
   setTimeout(()=>{
      document.body.removeChild(a.$el);
   },2000)
};
router.afterEach((to,from,next)=>{

   　　　　window,scrollTo(0,0)
   
   　　})
new Vue({
   el: "#app",
   render:h=>h(App),
   router,
   store,
   mounted() {
      //this.$router.replace("/home");
   }
});
// (function() {
//    if (!/mdebug=true/.test(window.location.href)) return;
//    var script = document.createElement("script");
//    script.src = "https://cdn.bootcss.com/eruda/1.2.6/eruda.min.js";
//    script.async = true;
//    document.getElementsByTagName("head")[0].appendChild(script);
//    script.onload = function() {
//       eruda.init();
//    };
// })();
/*
封装一些全局函数
*/
