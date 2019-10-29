<template>
   <div id="z">
      
      <div id="bg-navi">
         <div id="navi">
            <img src="../assets/Navi/logo.svg" />
            <div class="navi-item right phone" @click="phonePull">
               <img src="../assets/Navi/48icon_Drafts.svg" />
            </div>
            <transition name="slide-fade">
               <div class="navi-item no" v-if="getPhoneTog" @click="$router.push('/home');id=1;phoneClickClose();" :class="{active:1==id}">
                  <img src="../assets/Navi/48icon_Home.svg" />
                  <p>主页</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div class="navi-item" v-if="getPhoneTog" @click="$router.push('/category');id=2;phoneClickClose();" :class="{active:2==id}">
                  <img src="../assets/Navi/48icon_Read.svg" />
                  <p>目录</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div class="navi-item" v-if="getPhoneTog" @click="$router.push('/collection');id=3;phoneClickClose();" :class="{active:3==id}">
                  <img src="../assets/Navi/48icon_Favorite.svg" />
                  <p>收藏</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div class="navi-item" v-if="getPhoneTog" @click="$router.push('/demo');id=4;phoneClickClose();" :class="{active:4==id}">
                  <img src="../assets/Navi/48icon_Category.svg" />
                  <p style="font-size: 1.6rem">Demo</p>
               </div>
            </transition>
            <transition name="slide-fade">
               <div class="navi-item" v-if="getPhoneTog" @click="$router.push('/about');id=5;phoneClickClose();" :class="{active:5==id}">
                  <img src="../assets/Navi/48icon_Message.svg" />
                  <p>关于</p>
               </div>
            </transition>

            <transition name="slide-fade">
               <div class="navi-item right login-wrapper" v-if="'true'" @click="$store.commit('receiveLoginTog')" ref="loginButton">
                  <img src="../assets/Navi/48icon_Userok.svg" v-if="getLoginState>=1" style="margin-right:0.3rem" />
                  <p v-if="getLoginState>=1" id="userLogin-yes">{{$store.state.login.user | cutUserName}}</p>
                  <img src="../assets/Navi/48icon_User.svg" v-if="getLoginState<1" style="margin-right:0.3rem" />
                  <p v-if="getLoginState<1" style="font-size: 1.5rem;color:#7d7d7d;">
                     未登录
                  </p>
                  <transition name="login">
                     <div class="triangle" v-if="getLoginTog"></div>
                  </transition>
                  <!--开始面板-->
                  <transition name="login">
                     <div class="login " v-if="getLoginTog&&getLoginState==0" @click.stop>
                        <div></div>
                        <div class="header" style="font-weight: bold" id="login-msg">
                           {{ login.msg }}
                        </div> 
                        <div>
                           <img src="../assets/Navi/user2.svg" class="icn" />
                           <input placeholder="用户名" maxlength="10" v-model="login.user" @focus="$event.currentTarget.select()"/>
                        </div>
                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input placeholder="密码" type="password" maxlength="16" v-model="login.pwd" @focus="$event.currentTarget.select()"/>
                        </div>
                        <button @click="loginIn(true)">登录</button>
                        <button @click="$store.commit('receiveLoginState',-1)">点此注册</button>
                     </div>
                  </transition>
                  <transition name="login">
                     <div class="login sign" v-if="getLoginTog&&getLoginState==-1" @click.stop>
                        <div></div>
                        <div class="header" style="font-weight: bold" id="sign-msg">
                           {{ sign.msg }}
                        </div>
                        
                        <!-- <img id="avatar" :src="sign.avatar" /> -->
                        <div>
                           <span><img src="../assets/Navi/user2.svg" class="icn" /></span><input v-model="sign.user"
                              maxlength="10" placeholder="推荐使用汉字用户名" @focus="$event.currentTarget.select()"/>
                        </div>
                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input maxlength="16" v-model="sign.pwd" type="password" placeholder="3~16位的密码" 
                           @focus="$event.currentTarget.select()"/>
                        </div>
                        <div>
                           <!--<img src="../assets/Navi/quote.svg" class="icn" /><input v-model="sign.quote" maxlength="20"
                              placeholder="个性签名" />-->
                        </div>
                        <!-- <div>
                           <img src="../assets/Navi/upload.svg" class="icn" /><input v-model="sign.avatar" />
                        </div> -->
                        <button class="green" @click="signIn">
                           注册并登录
                        </button>
                        <button @click="$store.commit('receiveLoginState',0)">返回</button>
                     </div>
                  </transition>
                  <transition name="login">
                     <div class="login logined" v-if="getLoginTog&&getLoginState==1" @click.stop>
                        <div></div>
                        <div class="header" style="color:#4c875d;font-weight: bold">
                           您已登录
                        </div>
                        <img id="avatar" :src="getAvatar" />
                        <div class="logined-user"
                           style="text-align: center;font-size: 1.8rem;font-weight: bold;color:#303030">
                           {{ this.$store.state.login.user | cutUserName}}
                        </div>

                        <div class="header" style="margin:-0.5rem 0;font-size: 1.4rem;color:rgb(205, 148, 94)">
                           <img class="icn" style="margin:0 0.4rem 0 0;width:2rem;vertical-align:-0.6rem"
                              src="../assets/Navi/looknum.svg" />{{$store.state.login.lookNum>0?$store.state.login.lookNum:textRead}}
                           <img class="icn" style="margin:0 0.4rem;width:2rem;vertical-align:-0.6rem"
                              src="../assets/Navi/saynum.svg" />{{$store.state.login.sayNum>0?$store.state.login.sayNum:textSay}}
                        </div>
                        <div
                           style="line-height: 1.5;text-align: center;color:#525252;min-height:3.8rem;margin-left:1.5rem;margin-right:1.5rem;">
                           {{ this.$store.state.login.quote }}
                        </div>

                        <button @click="toMutate">修改资料</button>
                        <button class="red" @click="quit">退出用户</button>
                     </div>
                  </transition>
                  <transition name="login">
                     <div class="login mutate" v-if="getLoginTog&&getLoginState==2" @click.stop>
                        <div></div>
                        <div class="header" style="font-weight: bold">
                           修改个人资料
                        </div>
                        <img id="avatar" :src="getAvatar" />
                        <div class="logined-user"
                           style="text-align: center;font-size: 1.8rem;font-weight: bold;color:#303030">
                           {{ this.$store.state.login.user }}
                        </div>

                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input type="password" maxlength="16" v-model="mutate.old" placeholder="旧密码" />
                        </div>
                        <div>
                           <img src="../assets/Navi/pwd2.svg" class="icn" />
                           <input type="password" maxlength="16" v-model="mutate.new" placeholder="新密码" />
                        </div>
                        <div class="header">若不修改密码，以上可留空</div>
                        <div>
                           <img src="../assets/Navi/quote.svg" class="icn" />
                           <input v-model="mutate.quote" @focus="$event.currentTarget.select()"/>
                        </div>
                        <div>
                           <img src="../assets/Navi/upload.svg" class="icn" />
                           <div class="upload-wrapper">
                              <input type="file" @change="getFiles" name="avatar" ref="upload"/>
                              <input class="upload-text" disabled :placeholder="fileName">
                              <div class="upload"><button @click="$refs.upload.click()">上传头像</button></div>
                           </div>
                           

                        </div>

                        <button class="green" @click="mutateIn">
                           保存修改
                        </button>
                        <button @click="$store.commit('receiveLoginState',1)">返回</button>
                     </div>
                  </transition>
                  <transition name="login">
                     <div class="login guide" v-if="getLoginTog && getLoginState==3" @click.stop>
                        <div></div>
                        <div class="header" style="color:#4c875d;font-weight: bold;margin-bottom: 0.5rem">
                           已注册完成
                        </div>
                        <div class="header" style="color:#4c875d;font-weight: bold;margin-top: 0.5rem">
                           建议完善个人头像等信息
                        </div>
                        <img id="avatar" :src="getAvatar" />
                        <div class="logined-user"
                           style="text-align: center;font-size: 1.8rem;font-weight: bold;color:#303030">
                           {{ this.$store.state.login.user }}
                        </div>
                        <div>
                           <img src="../assets/Navi/quote.svg" class="icn" />
                           <input placeholder="个性签名" v-model="mutate.quote" @focus="$event.currentTarget.select()"/>
                        </div>
                        
                        <div>
                           <img src="../assets/Navi/upload.svg" class="icn" />
                           <div class="upload-wrapper">
                              <input type="file" @change="getFiles" name="avatar" ref="upload"/>
                              <input class="upload-text" disabled :placeholder="fileName">
                              <div class="upload"><button @click="$refs.upload.click()">上传头像</button></div>
                           </div>
                        </div>
                        <button @click="mutateIn('sign')" class="green">完成</button>
                     </div>
                  </transition>
               </div>
            </transition>
            <transition name="slide-fade">
               <div class="navi-other right" v-if="getPhoneTog">
                  <input placeholder="搜索文章..." v-model="search" />
                  <button @click="searchIn(search)">搜索</button>
               </div>
            </transition>
         </div>
      </div>
   </div>
</template>

<script>
   /*if(window.screen.width<=960){
      v.getPhoneTog==false;
   }*/
   export default {
      name: "navi",
      components: {},
      filters:{
         cutUserName(v){
            var len = 0;
            for(var i=0;i<v.length;i++){
               if (v.charCodeAt(i)>127 || v.charCodeAt(i)==94)
                  len += 2;
               else
                  len ++;
               if(len>=10) return v.substring(0,i).concat('..')
            }
            return v
         }
      },
      computed: {
         getAvatar(){
            //console.log(this.$store.state.login.avatar)
            return this.$store.state.login.avatar;
         },
         getLoginTog(){
            //console.log('拿到数据'+this.$store.state.loginTog)
            return this.$store.state.loginTog
         }, 
         getLoginState(){
            return this.$store.state.loginState
         },
         getPhoneTog(){
            return this.$store.state.phoneTog
         },
      },
      methods: {    
         getFiles(e) {
            e.preventDefault();
            if(e.target.files[0].size >= 1024 * 1024){
               this.$alert("头像文件大于1M啦","false");
               return;
            }
            var formData = new FormData()
            this.fileName = e.target.files[0].name
            formData.append('file', e.target.files[0])
            formData.append('user_id', this.Cookies.get("_id"))
            formData.append('user_name', this.$store.state.login.user)
            var config = {
               headers: { 'Content-Type': 'multipart/form-data' }
            }
            this.$http.post('/upload/avatar', formData, config ).then(res=>{
               this.$store.state.login.avatar = res.data.path;
            })
         },
         phoneClickClose(){
            if (document.body.clientWidth > 768) return;
            this.$store.commit('receiveLoginTog',false)
                  setTimeout(() => {
                     this.$store.commit('receivePhoneTog',false)
                  }, 50);
         },
         clearAllMsg(){
            // this.login.user = ""
            // this.login.pwd = ""
            // this.sign.user = ""
            // this.sign.pwd = ""
         },
         searchIn(msg) {
            if (msg != "") {
               this.$router.push('/category?search=' + msg)
            } else {
               this.$alert('搜索内容不能为空噢！', 'false');
            }
         },
         phonePull() {
            if (this.getPhoneTog == true && this.getLoginTog == true) {
               this.$store.commit('receiveLoginTog',false)
               setTimeout(() => {
                  this.$store.commit('receivePhoneTog')
               }, 150);
            } else {
               this.$store.commit('receivePhoneTog')
            }
         },
         loginIn(msg) {
            this.clearAllMsg()
            this.$http
               .post("/login-in", this.login)
               .then(res => {
                  if (res.data.success == 1) {
                      this.$emit("triggerLogin");
                     this.Cookies.set("_id", res.data._id);
                     this.$getUserInfo();
                     if (msg == true) this.$store.commit('receiveLoginState',1)
                        else this.$store.commit('receiveLoginState',3)
                     if (msg == true) this.$alert(res.data.msg, "true");
                     // setTimeout(() => {
                     //    this.$refs.loginButton.click();
                     // }, 850);
                  } else if (res.data.success == 0) {
                     this.$alert(res.data.msg, "false");
                     //tips
                  }
               })
               .catch();
         },
         quit() {
            this.clearAllMsg()
             this.$emit("triggerLogin");
            this.$store.commit('receiveLoginState',0)
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
                     this.loginIn(false);
                     //this.getLoginTog = false;

                  } else if (res.data.success == 0) {
                     this.$alert(res.data.msg, "false");
                     //tips
                  }
               })
               .catch();
         },
         toMutate() {
            this.$store.commit('receiveLoginState',2)
            this.mutate.old = "";
            this.mutate.new = "";
            this.mutate.quote = this.$store.state.login.quote;
            this.mutate.user = this.$store.state.login.user;
         },
         mutateIn() {
            this.mutate.user = this.$store.state.login.user;
            this.mutate.avatar = this.$store.state.login.avatar;
            this.$http
               .post("/mutate", this.mutate)
               .then(res => {
                  if (res.data.success == 1) {
                     this.$getUserInfo();
                     console.log('话'+this.$store.state.login.quote)
                     this.$store.commit('receiveLoginState',1)
                     this.$alert(res.data.msg, "true");
                  } else if (res.data.success == 0) {
                     this.$alert(res.data.msg, "false");
                     //tips
                  }
               })
               .catch();
         },
         changeBar(val) {
            switch (val) {
               case '/home':
                  this.id = 1;
                  break;
               case '/category':
                  this.id = 2;
                  break;
               case '/collection':
                  this.id = 3;
                  break;
               case '/demo':
                  this.id = 4;
                  break;
               case '/about':
                  this.id = 5;
                  break;
            }
         },
         getScrollDirection(){
            var oldY = this.scrolledY
            var newY = window.scrollY
            this.scrolledY = window.scrollY
            if(newY > oldY) return 'down'
            if(newY < oldY) return 'up'
            
         }
      },
      data() {
         return {
            id: 1,
            login: {
               msg: "登录到Funx",
               user: "",
               pwd: ""
            },
            sign: {
               msg: "仅需两步，注册到Funx",
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
            guide:{
               
            },
            fileName:"还没有上传头像哦",
            search: "",
            textSay: "暂无评论",
            textRead: "暂无阅读",
            scrolledX:0,
            scrolledY:0,
         };
      },
      created() {
         this.changeBar(this.$route.path)
         if (document.body.clientWidth <= 768) {
            this.$store.commit('receivePhoneTog',false)
         }
         this.$getUserInfo();
         var cookie = this.Cookies.get("_id");
         if (cookie && cookie != "") {
            this.$store.commit('receiveLoginState',1)
         }
         //棒棒的空白点击 移动端要复杂很多
         document.addEventListener("click", event => {
            function jud(dad, child) {
               if (!child)
                  return false;
               if (!dad)
                  return true;
               if (dad == child || dad.contains(child)) return true;
               return false;
            }
            var area = document.querySelector(".login");
            var extra = document.querySelector(".login-wrapper");
            var navi = document.querySelector("#bg-navi");
            var phone = document.querySelector(".phone");
            var t = event.target;
            //我干tmd草
            if (t == null) return;
            if (document.body.clientWidth <= 768) {
               //console.log(navi+"-"+t);
               if (jud(navi, t) || jud(phone, t)) {
                  return;
               } else {
                  this.$store.commit('receiveLoginTog',false)
                  setTimeout(() => {
                     this.$store.commit('receivePhoneTog',false)
                  }, 50);
                  return;
               }
               if (area == null) return;
               if (jud(area, t) || jud(extra, t)) {

               } else {
                  if (jud(navi, t)) {
                     this.$refs.loginButton.click();
                     return;
                  } else {
                     this.$store.commit('receiveLoginTog',false)
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
         '$store.state.phoneTog':function(val){
            var a = document.getElementById("bg-navi");
            var b = document.getElementById("navi");
            if (val == true) {
               a.style.maxHeight = "40rem";
               b.style.maxHeight = "40rem";
            } else {
               a.style.maxHeight = "4.4rem";
               b.style.maxHeight = "4.4rem";
            }
         },
         $route: {
            handler(to) {
               this.changeBar(to.path);
            }
         }
      },
      mounted() {
         this.scrolledY = window.scrollY
         
         var timer = null
         var timer_s = null
         window.onresize = ()=>{
            if(timer) return;
            timer = setTimeout(()=>{
               var a = document.body.clientWidth;
            if( a <= 768 ){
               this.$store.commit('receivePhoneTog',false)
               document.getElementById('bg-navi').style.top = "0rem"
            }else{
               this.$store.commit('receivePhoneTog',true)
            }
            timer = null
            },200)
         }
         //global
         document.addEventListener('scroll',(e)=>{
            if(timer_s) return 
            if(document.body.clientWidth <= 768 || window.screen.height > document.body.offsetHeight) return;
            timer_s = setTimeout(()=>{  
               var d = this.getScrollDirection()
               sideLinksScroll(d)
               switch(d){
                  case 'down':
                     document.getElementById('bg-navi').style.top = "-6rem"
                     break;
                  case 'up':
                     document.getElementById('bg-navi').style.top = "0rem"
                     break;
                  default:
                     break;   
               }
               function sideLinksScroll(direction){
                   var a = document.getElementById("links-big-wrapper");
                     if(a){
                        if (window.scrollY <= a.offsetHeight + 100) {
                           a.style.top = "0px";
                        }else{
                           if(direction == 'down')
                              a.style.top = window.scrollY - 90 + "px";
                           if(direction == 'up')
                              a.style.top = window.scrollY - 30 + "px";
                        }
                     }
               }
               
            timer_s = null;
            },150)   
         }); 
      },
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
      transition: 0.3s all cubic-bezier(0.165, 0.840, 0.440, 1.000);
      max-height: 6rem;
   }

   #navi {
      margin: 0 auto;
      padding-bottom: 0.2rem;
      padding-top: 0.2rem;
      max-width: 130rem;
      transition: 0.3s all cubic-bezier(0.165, 0.840, 0.440, 1.000);
      max-height: 6rem;
   }

   #navi>img {
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

   .navi-item>img {
      width: 2.8rem;
      height: 2.8rem;
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
      height: 0.25rem;
      background-color: #a8b2b7;
      transition: all 0.2s;
   }

   .navi-item:hover::after {
      width: 60%;
      left: 21%;
   }

   .active {
      color: #2bbbdc;
   }

   .active::after {
      background-color: #2bbbdc;
      width: 60%;
      left: 21%;
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
      width:27rem;
   }

   .navi-other input {
      width: 15rem;
      margin-right: 1rem;
      margin-top: 0.3rem;
   }

   .navi-other button {
      margin-right: 0rem;
   }

   .phone {
      display: none;
   }

   @media screen and (max-width: 1300px) {
      #navi>img {
         margin-right: 1rem;
         margin-left: 2rem;
      }

      .navi-item {
         width: 8.4rem;
      }

      .navi-other {
         width: 22rem;
         margin-right: 1rem;
      }

      .navi-other input {
         width: 10rem;
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
      height: 18.5rem;
   }
   .guide{
      height: 30rem;
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
      border: 0.2rem solid rgb(250, 209, 170);
   }

   .login-wrapper {
      position: relative;
      width:auto;
      margin-left: 0.8rem;
      margin-right: 0.8rem;
   }
   input[type="file"]{
      opacity: 0;
      position: absolute;
   }
   .upload-wrapper{
      height:3rem;
      margin: 0 !important;
      display: inline-block;
      position: relative;
   }
   .upload{
      margin: 0 !important;
      position: relative;
      color:rgb(255, 214, 175)
   }
   input.upload-text{
      position: absolute;
      width: 17.5rem;
      border: 0.1rem solid rgb(253, 221, 190);
   }
   .upload button{
      margin-top: 0.10rem;
      margin-right: 0;
      margin-left:13.1rem;
      padding: 0.7rem 1rem;
      background-color: #FFB876;
   }
   #userLogin-yes{
      font-size: 1.4rem;
      color:#09822c;
      white-space:nowrap
   }
   @media screen and (max-width: 1070px) and (min-width: 768px) {

      .navi-item {
         font-size: 1.4rem;
         width:8rem;
      }
      .navi-other {
         height: 4rem;
         width:4rem;
         visibility: hidden;
         margin-right: 0;
      }
      .navi-item>img{
         width:2.5rem;
      }
      .navi-other input {
         padding: 0;
         width: 0;
         opacity: 0;
      }

      .navi-other button {
         opacity: 0;
         padding-left:0;
         padding-right: 0
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

      #navi>img {
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