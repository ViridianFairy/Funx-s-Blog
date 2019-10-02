<template>
   <div id="z">
      <div id="bg-navi">
         <div id="navi">
            <img src="../assets/Navi/logo.svg" v-if="" />
            <div class="navi-item right phone" @click="phonePull">
               <img src="../assets/Navi/48icon_Drafts.svg" />
            </div>
            <transition name="slide-fade">
               <div
                  class="navi-item no"
                  v-if="tog"
                  @click="$router.push('/home');id=1;"
                  :class="{active:1==id}"
               >
                  <img src="../assets/Navi/48icon_Home.svg" />
                  <p>主页</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div
                  class="navi-item"
                  v-if="tog"
                  @click="$router.push('/category');id=2;"
                  :class="{active:2==id}"
               >
                  <img src="../assets/Navi/48icon_Read.svg" />
                  <p>目录</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div
                  class="navi-item"
                  v-if="tog"
                  @click="$router.push('/collection');id=3;"
                  :class="{active:3==id}"
               >
                  <img src="../assets/Navi/48icon_Favorite.svg" />
                  <p>收藏</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div
                  class="navi-item"
                  v-if="tog"
                  @click="$router.push('/demo');id=4;"
                  :class="{active:4==id}"
               >
                  <img src="../assets/Navi/48icon_Category.svg" />
                  <p>Demo</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div
                  class="navi-item"
                  v-if="tog"
                  @click="$router.push('/about');id=5;"
                  :class="{active:5==id}"
               >
                  <img src="../assets/Navi/48icon_Message.svg" />
                  <p>关于</p>
               </div>
            </transition>

            <transition name="slide-fade">
               <div
                  class="navi-item right login-wrapper"
                  v-if="tog"
                  @click="loginTog=!loginTog"
                  ref="loginButton"
               >
                  <img
                     src="../assets/Navi/48icon_Userok.svg"
                     v-if="loginState>=1"
                     style="margin-right:0"
                  />
                  <p
                     v-if="loginState>=1"
                     style="font-size: 1.5rem;color:#09822c;"
                  >
                     已登录
                  </p>
                  <img
                     src="../assets/Navi/48icon_User.svg"
                     v-if="loginState<1"
                     style="margin-right:0"
                  />
                  <p
                     v-if="loginState<1"
                     style="font-size: 1.5rem;color:#7d7d7d;"
                  >
                     未登录
                  </p>
                  <transition name="login">
                     <div class="triangle" v-if="loginTog"></div>
                  </transition>
                  <transition name="login">
                     <div
                        class="login "
                        v-if="loginTog&&loginState==0"
                        @click.stop
                     >
                        <div></div>
                        <div
                           class="header"
                           style="font-weight: bold"
                           id="login-msg"
                        >
                           {{ login.msg }}
                        </div>
                        <div>
                           <img
                              src="../assets/Navi/user2.svg"
                              class="icn"
                           /><input
                              placeholder="用户名"
                              maxlength="10"
                              v-model="login.user"
                           />
                        </div>
                        <div>
                           <img
                              src="../assets/Navi/pwd2.svg"
                              class="icn"
                           /><input
                              placeholder="密码"
                              type="password"
                              maxlength="16"
                              v-model="login.pwd"
                           />
                        </div>
                        <button @click="loginIn(true)">登录</button>
                        <button @click="loginState=-1">点此注册</button>
                     </div>
                  </transition>
                  <transition name="login">
                     <div
                        class="login sign"
                        v-if="loginTog&&loginState==-1"
                        @click.stop
                     >
                        <div></div>
                        <div
                           class="header"
                           style="font-weight: bold"
                           id="sign-msg"
                        >
                           {{ sign.msg }}
                        </div>
                        <img id="avatar" :src="sign.avatar" />
                        <div>
                           <span
                              ><img
                                 src="../assets/Navi/user2.svg"
                                 class="icn"/></span
                           ><input
                              v-model="sign.user"
                              maxlength="10"
                              placeholder="推荐使用汉字用户名"
                           />
                        </div>
                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input
                              maxlength="16"
                              v-model="sign.pwd"
                              type="password"
                              placeholder="3~16位的密码"
                           />
                        </div>
                        <div>
                           <img
                              src="../assets/Navi/quote.svg"
                              class="icn"
                           /><input
                              v-model="sign.quote"
                              maxlength="20"
                              placeholder="个性签名"
                           />
                        </div>
                        <div
                           class="header"
                           style="margin:0.2rem auto;font-size: 1.6rem"
                        >
                           个人头像（可选）
                        </div>
                        <div>
                           <img
                              src="../assets/Navi/upload.svg"
                              class="icn"
                           /><input v-model="sign.avatar" />
                        </div>
                        <button class="green" @click="signIn">
                           注册并登录
                        </button>
                        <button @click="loginState=0">返回</button>
                     </div></transition
                  >
                  <transition name="login">
                     <div
                        class="login logined"
                        v-if="loginTog&&loginState==1"
                        @click.stop
                     >
                        <div></div>
                        <div
                           class="header"
                           style="color:#4c875d;font-weight: bold"
                        >
                           您已登录
                        </div>
                        <img
                           id="avatar"
                           :src="this.$store.state.login.avatar"
                        />
                        <div
                           class="logined-user"
                           style="text-align: center;font-size: 1.8rem;font-weight: bold;color:#303030"
                        >
                           {{ this.$store.state.login.user }}
                        </div>

                        <div
                           class="header"
                           style="margin:-0.5rem 0;font-size: 1.4rem;color:rgb(205, 148, 94)"
                        >
                           <img
                              class="icn"
                              style="margin:0 0.4rem 0 0;width:2rem;vertical-align:-0.6rem"
                              src="../assets/Navi/looknum.svg"
                           />{{ $store.state.login.lookNum }}
                           <img
                              class="icn"
                              style="margin:0 0.4rem;width:2rem;vertical-align:-0.6rem"
                              src="../assets/Navi/saynum.svg"
                           />{{ $store.state.login.lookNum }}
                        </div>
                        <div
                           style="line-height: 1.5;text-align: center;color:#525252;min-height:3.8rem;margin-left:1.5rem;margin-right:1.5rem;"
                        >
                           {{ this.$store.state.login.quote }}
                        </div>

                        <button @click="toMutate">修改资料</button>
                        <button class="red" @click="quit">退出用户</button>
                     </div></transition
                  >
                  <transition name="login">
                     <div
                        class="login mutate"
                        v-if="loginTog&&loginState==2"
                        @click.stop
                     >
                        <div></div>
                        <div class="header" style="font-weight: bold">
                           修改个人资料
                        </div>
                        <img id="avatar" :src="mutate.avatar" />
                        <div
                           class="logined-user"
                           style="text-align: center;font-size: 1.8rem;font-weight: bold;color:#303030"
                        >
                           {{ this.$store.state.login.user }}
                        </div>

                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input
                              type="password"
                              maxlength="16"
                              v-model="mutate.old"
                              placeholder="旧密码"
                           />
                        </div>
                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input
                              type="password"
                              maxlength="16"
                              v-model="mutate.new"
                              placeholder="新密码"
                           />
                        </div>
                        <div class="header">若不修改密码，以上可留空</div>
                        <div>
                           <img
                              src="../assets/Navi/quote.svg"
                              class="icn"
                           /><input v-model="mutate.quote" />
                        </div>
                        <div>
                           <img
                              src="../assets/Navi/upload.svg"
                              class="icn"
                           /><input v-model="mutate.avatar" />
                        </div>

                        <button class="green" @click="mutateIn">
                           保存修改
                        </button>
                        <button @click="loginState=1">返回</button>
                     </div></transition
                  >
               </div>
            </transition>
            <transition name="slide-fade">
               <div class="navi-other right" v-if="tog">
                  <input placeholder="今天你吃了什么" slot="svg" />
                  <button slot="p">搜索</button>
               </div>
            </transition>
         </div>
      </div>
   </div>
</template>

<script>
   /*if(window.screen.width<=960){
      v.tog==false;
   }*/
   export default {
      name: "navi",
      components: {},
      methods: {
         phonePull() {
            if (this.tog == true && this.loginTog == true) {
               this.loginTog = false;
               setTimeout(() => {
                  this.tog = !this.tog;
               }, 150);
            } else {
               this.tog = !this.tog;
            }
         },
         loginIn(msg) {
            this.$http
               .post("/login-in", this.login)
               .then(res => {
                  if (res.data.success == 1) {
                     this.$emit("triggerLogin");
                     this.Cookies.set("_id", res.data._id);
                     this.$getUserInfo();
                     this.loginState = 1;
                     if (msg == true) this.$alert(res.data.msg, "true");
                     setTimeout(() => {
                        this.$refs.loginButton.click();
                     }, 850);
                  } else if (res.data.success == 0) {
                     this.$alert(res.data.msg, "false");
                     //tips
                  }
               })
               .catch();
         },
         quit() {
            this.$emit("triggerLogin");
            this.loginState = 0;
            this.Cookies.set("_id", "");
            this.$store.state.login.user = "";
            this.$store.state.login.quote = "";
            this.$store.state.login.avatar = "";
            this.$store.state.login.sayNum = 0;
            this.$store.state.login.lookNum = 0;
            this.$alert("您已经退出", "tips");
         },
         signIn() {
            this.$http
               .post("/sign", this.sign)
               .then(res => {
                  //alert(res.data.success+"-"+res.data.msg);
                  if (res.data.success == 1) {
                     this.login.user = this.sign.user;
                     this.login.pwd = this.sign.pwd;
                     this.$alert(res.data.msg, "true");
                     this.loginIn(false);
                     //this.loginTog = false;
                     setTimeout(() => {
                        this.tog = false;
                     }, 75);
                  } else if (res.data.success == 0) {
                     this.$alert(res.data.msg, "false");
                     //tips
                  }
               })
               .catch();
         },
         toMutate() {
            this.loginState = 2;
            this.mutate.old = "";
            this.mutate.new = "";
            this.mutate.quote = this.$store.state.login.quote;
            this.mutate.avatar = this.$store.state.login.avatar;
            this.mutate.user = this.$store.state.login.user;
         },
         mutateIn() {
            this.$http
               .post("/mutate", this.mutate)
               .then(res => {
                  if (res.data.success == 1) {
                     this.$getUserInfo();
                     this.loginState = 1;
                     this.$alert(res.data.msg, "true");
                  } else if (res.data.success == 0) {
                     this.$alert(res.data.msg, "false");
                     //tips
                  }
               })
               .catch();
         }
      },
      data() {
         return {
            tog: true,
            id: 1,
            login: {
               msg: "登录到Funx",
               user: "",
               pwd: ""
            },
            sign: {
               msg: "注册为FunX用户",
               user: "",
               pwd: "",
               quote: "",
               avatar: "http://i1.fuimg.com/700071/e96370d70f7b03ad.jpg"
            },
            mutate: {
               user: "",
               old: "",
               new: "",
               quote: "",
               avatar: ""
            },
            loginTog: false,
            loginState: 0
         };
      },
      created() {
         if (document.body.clientWidth <= 768) {
            this.tog = false;
         }
         this.$getUserInfo();
         var cookie = this.Cookies.get("_id");
         if (cookie && cookie != "") {
            this.loginState = 1;
         }
         //棒棒的空白点击 移动端要复杂很多
         document.addEventListener("click", event => {
            function jud(dad, child) {
               if(!child) 
                  return false;
               if(!dad)
                  return true;
               if (dad == child || dad.contains(child)) return true;
               return false;
            }
            var area = document.querySelector(".login");
            var extra = document.querySelector(".login-wrapper");
            var navi = document.querySelector("#bg-navi");
            var phone= document.querySelector(".phone");
            var t = event.target;
            //我干tmd草
            if (t==null) return;
            if (document.body.clientWidth <= 768) {
               //console.log(navi+"-"+t);
               if (jud(navi, t)||jud(phone,t)){

                     return;
                  }else{
                     this.loginTog = false;
                     setTimeout(() => {
                        this.tog = false;
                     }, 50);
                     return;
                  }
               if (area == null ) return;
               if (jud(area, t) || jud(extra, t)) {
                  
               } else {
                  if (jud(navi, t)) {
                     this.$refs.loginButton.click();
                     return;
                  } else {
                     this.loginTog = false;
                     return;
                  }
               }
               
            } else {
               if (jud(area, t) || jud(extra, t)) {
                  //
               } else {
                  this.$refs.loginButton.click();
               }
            }
         });
      },
      watch: {
         tog(val) {
            var a = document.getElementById("bg-navi");
            var b = document.getElementById("navi");
            if (val == true) {
               a.style.maxHeight = "40rem";
               b.style.maxHeight = "40rem";
            } else {
               a.style.maxHeight = "4.4rem";
               b.style.maxHeight = "4.4rem";
            }
         }
      }
   };
</script>

<style scoped>
   #z {
      position: relative;
      z-index: 500;
   }
   #bg-navi {
      top: 0;
      width: 100%;
      position: fixed;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.25);
      transition: 0.3s all;
      max-height: 6rem;
   }
   #navi {
      margin: 0 auto;
      padding-bottom: 0.2rem;
      padding-top: 0.2rem;
      max-width: 130rem;
      transition: 0.3s all;
      max-height: 6rem;
   }
   #navi > img {
      padding-top: 0.5rem;
      height: 4rem;
      float: left;
      vertical-align: middle;
      display: table-cell;
      margin-right: 3rem;
      margin-left: 3rem;
      transition: 0.2s all;
   }
   .navi-item {
      padding-top: 1rem;
      padding-bottom: 1.1rem;
      float: left;
      user-select: none;
      color: #373737;
      position: relative;
      text-align: center;
      transition: 0.2s all;
      width: 10rem;
   }
   #navi .right {
      float: right;
   }
   .navi-item > img {
      width: 28px;
      height: 28px;
      filter: invert(30%);
      margin-right: 0.5rem;
   }
   .navi-item p {
      margin: 0;
      display: inline;
      color: inherit;
      font-size: 1.8rem;
      vertical-align: 0.5rem;
   }

   .navi-item:hover {
      color: #5e5e5e;
      cursor: pointer;
   }
   .navi-item::after {
      opacity: 1;
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0.6rem;
      width: 0%;
      height: 0.3rem;
      background-color: #a8b2b7;
      transition: all 0.2s;
   }
   .navi-item:hover::after {
      width: 70%;
      left: 16%;
   }
   .active {
      color: #2bbbdc;
   }
   .active::after {
      background-color: #2bbbdc;
      width: 70%;
      left: 16%;
   }
   .active:hover {
      color: #13abcd;
   }
   .active img {
      filter: invert(0);
   }
   .navi-other {
      padding-top: 0.5rem;
      user-select: none;
      color: #7d7d7d;
      position: relative;
      text-align: center;
      transition: 0.2s all;
      width: 28rem;
   }
   .navi-other input {
      width: 15rem;
      margin-top: -2rem;
      margin-right: 1rem;
   }
   .navi-other button {
      margin-right: -2rem;
   }
   .phone {
      display: none;
   }
   @media screen and (max-width: 1200px) {
      #navi > img {
         margin-right: 1rem;
         margin-left: 2rem;
      }
      .navi-item {
         width: 8.4rem;
      }
      .navi-other {
         width: 20rem;
         margin-right: 1rem;
      }
      .navi-other input {
         width: 11rem;
      }
   }
   /*
   登录界面！
   */

   .login {
      overflow: hidden;
      transform: translate(-75%, 2rem);
      position: fixed;
      z-index: 10001;
      width: 26rem;
      height: 18.5rem;
      background-color: rgb(255, 255, 255);
      border-color: 1px solid antiquewhite;
      border-radius: 0.4rem;
      box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
   }
   .login:hover {
      cursor: default;
   }
   .triangle::after {
      content: "";
      right: 4.5rem;
      top: 4.1rem;
      position: absolute;
      border-width: 9px;
      border-style: solid;
      border-color: transparent rgb(198, 198, 198) transparent transparent;
      transform: rotate(90deg);
   }
   .login div:not(.header) {
      margin: 1rem 0.5rem;
      text-align: left;
      font-size: 1.5rem;
   }
   .login input {
      width: 70%;
   }
   .login button {
      margin: 0.3rem 1rem;
   }
   .header {
      font-size: 1.8rem;
      margin: 1.4rem auto;
      text-align: center;
      color: #555555;
   }
   .sign {
      height: 36.25rem;
   }
   /* .sign div {
       white-space 
   } */
   .logined {
      height: 26rem;
   }
   .mutate {
      height: 40.5rem;
   }

   .icn {
      width: 2.5rem;
      vertical-align: -0.75rem;
      margin-right: 0.5rem;
      margin-left: 0.8rem;
   }
   #sign-msg {
      transition: 0.3s all;
   }
   #avatar {
      margin: 0 auto;
      text-align: center;
      width: 5.5rem;
      height: 5.5rem;
      border-radius: 50%;
      margin: -0.5rem 0;
      border: 2px solid rgb(250, 209, 170);
   }
   .login-wrapper {
      position: relative;
   }
   @media screen and (max-width: 970px) and (min-width: 768px) {
      .navi-other {
         height: 4rem;
         width: 0rem;
         visibility: hidden;
      }
      .navi-other input {
         display: none;
      }
      .navi-other button {
         display: none;
      }
   }
   @media screen and (max-width: 768px) {
      .navi-item,
      .navi-other {
         display: block;
         float: none;
         padding-left: 2rem;
         text-align: left;
      }
      /* .navi-other{
         
      } */
      .navi-other {
         padding-bottom: 1rem;
      }
      #navi .navi-item:not(.phone):not(.no):not(.login-wrapper)::before {
         content: "";
         position: absolute;
         width: 40rem;
         height: 0.1rem;
         left: 0;
         top: 0;
         background-color: #e5ecf0;
      }
      #navi .right:not(.phone) {
         float: none;
      }
      .phone {
         display: block;
         margin-right: 1.5rem;
         width: 3rem;
         padding-left: 0;
         margin-left: 2rem;
      }
      .phone::after {
         opacity: 0;
      }
      .navi-item:hover::after,
      .navi-other:hover::after,
      .phone:hover::after {
         width: 0;
      }
      .active::after {
         background-color: #2bbbdc;
         display: none;
      }
      .navi-item {
         padding-top: 0.8rem;
         padding-bottom: 0.2rem;
      }
      #navi > img {
         padding-top: 0.5rem;
         height: 3rem;
         float: left;
         vertical-align: middle;
         display: table-cell;
         margin-left: 2rem;
         transition: 0.2s all;
         padding-bottom: 1rem;
      }
      #bg-navi,
      #navi {
         max-height: 40rem;
      }
      #navi .login-wrapper {
         position: absolute;
         right: 5rem;
         top: 0;
         text-align: center;
      }
      .login {
         transform: translate(-55%, 2rem);
      }
   }
   .slide-fade-enter-active {
      transition: all 0.2s ease-in-out;
   }
   .slide-fade-leave-active {
      transition: all 0.2s ease-in-out;
   }
   .slide-fade-enter,
   .slide-fade-leave-to {
      transform: translateX(15px);
      opacity: 0;
   }
   .login-enter-active {
      transition: all 0.4s;
   }
   .login-leave-active {
      transition: all 0.2s;
   }
   .login-enter,
   .login-leave-to {
      height: 0;
      opacity: 0.75;
   }
</style>
