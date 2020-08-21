<template>
   <transition name="slide-fade">
      <div id="app" v-show="mainShow">
         <transition name="init">
            <navi @triggerLogin="refresh" v-show="naviShow"></navi>
         </transition>
         <div id="seize"></div>
         <div id="path-big-wrapper">
            <div id="path-wrapper">
               <nowpath></nowpath>
            </div>
         </div>
         <div id="home-big-wrapper">
            <div id="home-wrapper" :class="{about:expand}">
               <transition name="public-slide">
                  <router-view
                     name="left"
                     :key="key"
                     v-if="leftShow"
                  ></router-view>
               </transition>
            </div>
            <transition name="compress">
               <div id="home-side" v-if="!expand">
                  <transition name="init">
                     <router-view name="right" :key="key"></router-view>
                  </transition>
               </div>
            </transition>
         </div>
         <transition name="slide-fade">
            <router-view name="bottom" :key="key"></router-view>
         </transition>
         <div id="footer" v-show="footShow">
            {{footText}}<br />
         </div>
      </div>
   </transition>
</template>

<script>
   import nowpath from "./components/nowpath";
   import navi from "./components/navi";
   export default {
      name: "app",
      components: {
         navi,
         nowpath,
      },
      data() {
         return {
            leftShow: true,
            mainShow: false,
            footShow: false,
            naviShow: false,
            expand: false,
            footText:"©1998-2019 JiaLiDun, Inc. All rights reserved 鲁ICP备19053264号-1"
         };
      },
      computed: {
         key() {
            return this.$route.path + Math.random();
         }
      },
      methods: {
         cutTitle(a) {
            var len = 0;
            var i = 0;
            for (i = 0; i < a.length; i++) {
               if (a.charCodeAt(i) > 127 || a.charCodeAt(i) == 94) {
                  len += 2;
               } else {
                  len++;
               }
               if (len >= 34) {
                  return a.slice(0, i - 1).concat("..");
               }
            }
            return a;
         },
         refresh() {
            //暂时..不考虑更新左边
            // this.leftShow = false;
            // this.$nextTick(() => {
            //    this.leftShow = true;
            // });
         },
         //抽离路径改变，进而渲染nowpath路径栏
         //因为初始化无法通过watch监听
         changePath(to) {
            this.expand = false; //一般都是要渲染的啦
            let MAX = 3; //除了根外，撑死不过3个
            switch (to.path) {
               case "/home":
                  this.$store.state.path = [{ name: "主页", link: "/home" }];
                  break;
               case "/read":
                  //console.log("准备写入path");
                  this.$store.state.path.splice(1, MAX, {
                     name: this.cutTitle(this.$store.state.title),
                     link: "/read?id=" + this.$route.query.id
                  });
                  break;
               case "/category":
                  this.$store.state.path = [{ name: "分类目录", link: "/category" }];
                  break;
               case "/collection":
                  this.$store.state.path = [{ name: "收藏", link: "/collection" }];
                  break;
               // case "/demo":
               //    this.expand = true;
               //    this.$store.state.path = [{ name: "Demo", link: "/demo" }];
               //    switch(location.hash){
               //       case '#snake':
               //          this.$store.state.path.splice(2,0,{name:"SnakeGame", link: "/demo#snake"})
               //          break;
               //       case '#poker':
               //          this.$store.state.path.splice(2,0,{name:"PokerGame", link: "/demo#poker"})
               //          break;
               //       case '#disk':
               //          this.$store.state.path.splice(2,0,{name:"网盘", link: "/demo#disk"})
               //          break;
               //    }
               //    break;
               case "/demo":
                  this.expand = true;
                  this.$store.state.path = [{ name: "Demo", link: "/demo" }];
                  break;
               case "/demo/snake":
                  this.expand = true;
                  this.$store.state.path.splice(2,0,{name:"SnakeGame", link: "/demo/snake"})
                  break;
               case "/demo/daily":
                  this.expand = true;
                  this.$store.state.path.splice(2,0,{name:"Daily", link: "/demo/daily"})
                  break;
               case "/demo/gossip":
                  this.expand = true;
                  this.$store.state.path.splice(2,0,{name:"gossip", link: "/demo/gossip"})
                  break;
               case "/demo/disk":
                  this.expand = true;
                  this.$store.state.path.splice(2,0,{name:"网盘", link: "/demo/disk"})
                  break;
               case "/404":
                  this.expand = true;
                  this.$store.state.path = [{ name: "404", link: "/404" }];
                  break;
               case "/about":
                  this.expand = true;
                  this.$store.state.path = [{ name: "关于", link: "/about" }];
                  break;
               case "/edit":
                  this.expand = true;
                  this.$store.state.path.splice(1,MAX,{
                        name: this.cutTitle(this.$store.state.title),
                        link: "/read?id=" + this.$route.query.id},
                     {
                        name: "编辑模式",
                        link: "/edit?id=" + this.$route.query.id}
                  );
                  break;
               default: {
                  this.path = [{ name: "主页", link: "/home" }];
               }
            }
         }
      },
      watch: {
         $route(to) {
            this.changePath(to);
         },
         "$store.state.title":function(val){
            this.$set(this.$store.state.path,1,{name:this.cutTitle(val)})
         }
      },
      created() {
         setTimeout(() => {
            this.changePath({ path: this.$route.path });
            this.footShow = true;
         }, 0);
      },
      mounted() {
         document.getElementById('appLoading').remove()
         this.mainShow = true;
         setTimeout(() => {
            this.naviShow = true;
         }, 200);
      }
   };
</script>

<style>
   /*-------------------------------------
   公共的样式库
-------------------------------------*/
   input,
   textarea {
      font-size: 1.4rem;
      border: 1px solid #c9eef6;
      border-radius: 0.5rem;
      padding: 0.8rem 1.2rem;
      background-color: rgba(240, 255, 255, 0.361);
      transition: 0.2s all;
   }
   input:focus,
   textarea:focus {
      background-color: rgba(0, 203, 203, 0.04);
      outline: none;
   }
   /**/
   button {
      background-color: #2bbbdc;
      outline: none;
      border: none;
      border-radius: 4px;
      color: white;
      padding: 1rem 2rem;
      transition: 0.2s all;
   }
   button:hover {
      background-color: rgb(41, 173, 202);
      cursor: pointer;
      user-select: none;
   }
   /**/
   ul {
      list-style: none;
   }
   .info-i {
      width: 1.8rem;
      vertical-align: -0.5rem;
      margin-right: 0.3rem;
   }
   .green {
      background-color: #34b759;
   }
   .green:hover {
      background-color: #30a852;
   }
   .simp-green {
      background-color: #7acd92;
   }
   .simp-green:hover {
      background-color: #4cbb6c;
   }
   .red {
      background-color: #c74343;
   }
   .red:hover {
      background-color: rgb(183, 54, 54);
   }
   .simp-orange {
      background-color: #b7ac34;
   }
   .simp-orange:hover {
      background-color: #30a852;
   }
   .simp-blue {
      background-color: rgb(149, 220, 236);
   }
   .simp-blue:hover {
      background-color: rgb(120, 208, 228);
   }
   /*-------------------------------------
   路由包裹
-------------------------------------*/
   #home-big-wrapper {
      margin: 0 auto;
      max-width: 120rem;
      display: flex;
      justify-content: space-around;
      position: relative;
   }
   #home-wrapper {
      transition: 0.3s ease-out;
      border: 1px solid #f1f1f1;
      border-top: none;
      box-shadow: -5px 0px 5px -5px rgba(50, 50, 50, 0.15),
         5px 0px 5px -5px rgba(50, 50, 50, 0.15);
      width: 75%;
      display: inline-block;
      padding-top: 0.5rem;
      background-color: rgba(255, 255, 255, 0.632);
   }
   #home-side {
      /* position: relative; */
      transition: 0.4s ease-out;
      height: 100%;
      width: 20%;
      border: 1px solid #f1f1f1a7;
      border-top: none;
      box-shadow: -5px 0px 5px -5px rgba(50, 50, 50, 0.15),
         5px 0px 5px -5px rgba(50, 50, 50, 0.15);
      padding-top: 0.5rem;
      padding-bottom: 1.5rem;
      background-color: rgba(255, 255, 255, 0.389);
   }
   #path-big-wrapper {
      margin: 0 auto;
      max-width: 120.5rem;
      display: flex;
      justify-content: space-around;
      background-color: rgba(255, 0, 0, 0);
   }
   #path-wrapper {
      border: 1px solid #f1f1f1;
      width: 95%;
      border-top: none;
      border-bottom: none;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.396);
      padding-left: 2.5rem;
      box-shadow: -5px 0px 5px -5px rgba(50, 50, 50, 0.15),
         5px 0px 5px -5px rgba(50, 50, 50, 0.15);
   }
   #footer {
      color: rgb(213, 221, 226);
      font-size: 1rem;
      text-align: center;
      margin: 0.8rem auto 0.8rem 1rem;
   }
   .public-slide-enter-active {
      transition: all 0.45s ease-in-out;
   }
   .public-slide-leave-active {
      transition: all 0.15s ease-in-out;
   }
   .public-slide-enter{
      transform: translateX(15px);
      opacity: 0;
   }
   .public-slide-leave-to{
      transform: translateX(-15px);
      opacity: 0;
   }
   /*-------------------------------------
   重置和补丁
-------------------------------------*/
   *{
      font-family:'Microsoft YaHei','arial'
   }
   body {
      margin: 0;
      padding: 0;
      background-image: url("assets/Common/gplaypattern_@2X.png");
   }

   a {
      text-decoration: none;
   }
   ul,
   ol {
      padding: 0;
      margin: 0;
   }
   #seize {
      height: 5.7rem;
   }
   .about{
      width: 97.5% !important; /*迫不得已了*/
   }
   .fixed{
      position: fixed;

   }
   @media screen and (max-width: 768px) {
      #home-side {
         display: none;
      }
      #home-wrapper {
         padding-top: 0;
         width: 95%;
      }
      #seize {
         height: 4.5rem;
      }
      #path-wrapper {
         background-color: #ffffff73;
         padding-left: 0.5rem;
         box-shadow: none;
         border: none;
      }
   }

   .slide-fade-enter-active {
      transition: all 0.2s ease-in;
   }
   .slide-fade-leave-active {
      transition: all 0.2s ease-in;
   }
   .slide-fade-enter,
   .slide-fade-leave {
      transform: translateY(1rem) translateZ(0);
      opacity: 0;
   }
   .init-enter-active {
      transition: all 0.2s;
   }
   .init-leave-active {
      transition: all 0.2s;
   }
   .init-enter,
   .init-leave {
      opacity: 0;
   }
   .compress-enter-active,.compress-leave-active {
      transition: all 0.5s;
   }
   .compress-enter,
   .compress-leave {
      opacity: 0;
      width:0;
   }
   
   
</style>
