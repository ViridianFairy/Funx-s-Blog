<template>
   <div id="review-big-wrapper">
      <div id="review-wrapper">
         <p class="head">说出你的想法</p>
         <div id="user-say">
            <div class="info">
               <img :src="getSayAvatar()" class="say-avatar" />
               <p class="say-name">{{ $store.state.login.user }}</p>
            </div>
            <textarea class="textarea"
               @click="judgeAndSign()"
               :placeholder="$store.state.login.avatar==''?'还没有登录呢':'来说点什么...'"
               v-model="msg">{{ msg }}</textarea><!-- :disabled="$store.state.login.avatar==''|| $store.state.invalidArticle" -->
            <button class="send"
               @click="reviewIn(-1);"
               v-if="!$store.state.invalidArticle"
               :class="{biggrey:$store.state.login.avatar==''}">
               发布评论
            </button>
         </div>
         <p class="head" style="margin-top: 6.5rem">来看看TA们都说了什么</p>
         <div class="say" v-for="i,index in reviews">
            <div class="info">
               <img :src="i.user_avatar" class="p-avatar" />
            </div>
            <p class="p-name">
               {{ i.user_name }}
               <span class="p-time">{{ i.time }}</span>
            </p>
            <div class="p-body">
               {{ i.body }}
                <div class="nest-wrapper" v-if="i.children.length!=0">
                  <p class="nest" v-for="j in i.children">
                     <img :src="j.user_avatar"><span class="n-name">{{j.user_name}}</span>
                     <span class="n-default" v-if="judgeSon(j,i)">回复</span>
                     <img :src="j.reply_avatar" v-if="judgeSon(j,i)">
                     <span class="n-name" v-if="judgeSon(j,i)">{{j.reply_name}}</span>：{{j.body}}
                     <br>&nbsp
                     <span class="n-reply" :class="{grey:$store.state.login.avatar==''}" @click="smallBox(index,j)">回复</span><span class="n-time">{{j.time}}</span>
                  </p>
               </div> 
               <br v-if="i.children.length==0">
               <!--没登录的话，按钮是灰色的-->
               <span class="reply" :class="{grey:$store.state.login.avatar==''}" @click="smallBox(index,i)">
               <img src="../assets/Common/say.svg" />回复</span>
               <transition name="stretch">                          
                  <div class="n-box" v-if="replyShow[index]&&$store.state.login.avatar!=''">
                     <textarea class="textarea n-textarea" :placeholder="replyHolder[index]" v-model="replyMsg[index]"></textarea>
                     <button class="send" @click="reviewIn(index)">回复</button>
                  </div>
             </transition>
            </div>
         </div>
         <div id="no-reviews" class="say" v-if="reviews.length==0">
            <div id="no-reviews-body">
               <img src="../assets/Common/nodata.svg" />
               <span>评论？现在还没有哦</span>
            </div>
         </div>
      </div>
      <div id="white"></div>
   </div>
</template>

<script>
   export default {
      name: "review",
      methods: {
         judgeAndSign(){
            if (this.$store.state.login.avatar!='') return
            setTimeout(()=>{
               this.$store.commit('receiveLoginState',-1)
               this.$store.commit('receiveLoginTog',true)
            },10)
         },
         judgeSon(son,father){
            if(son.dad_id == father._id) return false;
            return true;
         },
         smallBox(index,reviewObj){
            if (this.$store.state.login.avatar ==''){
               setTimeout(()=>{
                  this.$store.commit('receiveLoginState',-1)
                  this.$store.commit('receiveLoginTog',true)
               },10)
               return
            }
            var _id = reviewObj._id;
            if(_id == this.replyData[index]._id){
               var value = this.replyShow[index] = !this.replyShow[index];
               this.replyShow.splice(index,1,value);
               return;
            }
            this.replyData[index]._id = _id;
            this.replyData[index].user_id_obj = reviewObj.user_id_obj;
            this.replyShow.splice(index,1,true);
            var body = reviewObj.body;
            var name = reviewObj.user_name;
            
            this.replyHolder.splice(index,1,`回复${name}的“${body}”`);
         },
         getSayAvatar() {
            if (this.$store.state.login.user == "")
               return require("../assets/Common/no-avatar.png");
            return this.$store.state.login.avatar;
         },
         reviewIn(index) {
            if (this.$store.state.login.avatar ==''){
               setTimeout(()=>{
                  this.$store.commit('receiveLoginState',-1)
                  this.$store.commit('receiveLoginTog',true)
               },10)
               return
            }
            var dad_id,reply_id_obj,body;
            if(index == -1){
               dad_id = "";
               reply_id_obj = this.Cookies.get("_id") //这么写不好
               body = this.msg;
            }else{
               dad_id = this.replyData[index]._id;
               reply_id_obj = this.replyData[index].user_id_obj;
               body=this.replyMsg[index]
            }
            var obj = {
               body,
               user_id_obj: this.Cookies.get("_id"),
               article_id: this.$route.query.id,
               dad_id,
               reply_id_obj
            };
            this.$http.post("/review", obj).then(res => {
               if (res.data.success == 1) {
                  this.$alert(res.data.msg, "true");
                  this.refreshReview();
                  this.msg = "";
               } else {
                  this.$alert(res.data.msg, "false");
               }
            });
         },
         //封装一个获取某篇文章的全部评论
         refreshReview() {
            var obj = {
               article_id: this.$route.query.id
            };
            this.$http.post("/getReviews", obj).then(res => {
               if (res.data.success == 1) {
                  
                  this.reviews = res.data.data;
                  for(let j of res.data.data){
                     this.replyShow.push(false);
                     this.replyHolder.push("");
                     this.replyMsg.push("");
                     this.replyData.push({
                        _id:"",
                        user_id_obj:""
                     })
                  }
               }
            });
         }
      },
      data() {
         return {
            reviews: [],
            msg: "",
            nMsg:"",
            replyShow:[],
            replyHolder:[],
            replyMsg:[],
            replyData:[]

         };
      },
      mounted() {
         this.refreshReview();
      }
   };
</script>

<style scoped>
   .head {
      font-size: 2.2rem;
      margin-top: 0.5rem;
      font-weight: bold;
      position: relative;
      margin-left: 2rem;
   }
   .head::after {
      left: -2rem;
      top: -0.5rem;
      position: absolute;
      content: "";
      width: 1rem;
      height: 4rem;
      background-color: #4aacc2;
   }
   #review-big-wrapper {
      margin: 3rem auto 0 auto;
      max-width: 120rem;
      display: flex;
      justify-content: space-around;
   }
   #review-wrapper {
      overflow: hidden;
      color: rgb(84, 84, 84);
      margin: 0rem 0rem;
      border: 1px solid #f1f1f1;
      box-shadow: -5px 0px 5px -5px rgba(50, 50, 50, 0.15),
         5px 0px 5px -5px rgba(50, 50, 50, 0.15);
      width: calc(75% - 6rem);
      display: inline-block;
      padding: 2rem 2rem 2rem 4rem;
      background-color: rgba(255, 255, 255, 0.349);
      height: 100%;
   }
   #white {
      height: 2rem;
      width: 20%;
      border-top: none;
      padding-top: 0.5rem;
      padding-bottom: 1.5rem;
   }
   .send {
      float: right;
      margin-right: 0.4rem;
      margin-top: 0.3rem;
   }
   .say {
      overflow: hidden;
      padding-top: 2rem;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed rgb(217, 217, 217);
   }
   .say-avatar {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      border: 1px solid rgb(138, 227, 246);
   }
   .textarea {
      font-family: "MicroSoft YaHei";
      font-size: 1.6rem;
      resize: none;
      width: calc(100% - 15rem);
      overflow: auto;
      margin-left: 1rem;
      height: 7rem;
   }
   .n-textarea {
      width: calc(100% - 11.5rem);
      resize: none;
      float:left;
      overflow: auto;
      margin:0;
      height: 4rem;
      font-size: 1.5rem;

   }
   .say-name-wrapper {
      width: 6rem;
   }
   .say-name {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      word-wrap: break-word;
      word-break: normal;
      margin-top: 0.1rem;
   }
   .p-avatar {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      border: 1px solid rgb(138, 227, 246);
   }
   .p-name {
      font-size: 1.5rem;
      text-align: left;
      font-weight: bold;
      word-wrap: break-word;
      word-break: normal;
      margin-top: 0.1rem;
      color:rgb(43, 121, 139);;
   }
   .p-time {
      font-size: 1.4rem;
      font-weight: normal;
      margin-left: 1rem;
      color: #aaa;
   }
   .p-body {
      float: left;
      font-size: 1.5rem;
      background-color: rgba(255, 255, 255, 0.389);
      width: calc(100% - 12.5rem);
      margin-top: -0.7rem;
      line-height: 1.7;
   }
   .p-body .reply {
      text-align: right;
      font-size: 1.3rem;
      line-height: 4;
      vertical-align: -1.75rem;
      color: rgb(236, 181, 136);
      margin-right: 2rem;
      font-weight: bold;
      user-select: none;
   }
   .p-body .reply:hover {
      cursor: pointer;
      text-decoration: underline;
      color:rgb(219, 147, 89);
   }
   .p-body .reply img {
      width: 1.8rem;
      vertical-align: -0.4rem;
      margin-right: 0.4rem;
   }
   #user-say {
      width: 100%;
      padding-right: 0rem;
   }
   .info {
      padding-top: 0.5rem;
      margin-left: 1rem;
      float: left;
      width: 10rem;
      text-align: center;
   }
   #no-reviews {
      background-color: rgba(243, 243, 243, 0.034);
      border-bottom: none;
      margin-top: 3.5rem;
      padding: 0rem 0;
      font-size: 1.6rem;
      color: rgb(195, 195, 195);
   }
   #no-reviews-body {
      text-align: center;
   }
   #no-reviews-body img{
      width: 15rem;
      height: 15rem;
      opacity: 0.35;
   }
   #no-reviews-body span{
      vertical-align:6rem;
      margin-left: 1.5rem;
   }
   .nest-wrapper{
      margin-top: 2rem;
      background-color: rgba(185, 229, 251, 0.20);
      padding: 1.2rem 1.6rem 1.2rem 1.5rem;
      padding: 1.2rem 1.6rem 1.2rem 1.5rem;
      margin-bottom: -0.8rem;
   }
   .nest{
      margin: 0.3rem 0;
      font-size: 1.4rem;
   }
   .nest img{
      width:2.5rem;
      height:2.5rem;
      border-radius: 50%;
      vertical-align: -0.8rem;
      margin-left: 0.45rem;
   }
   .nest img:nth-of-type(1){
      margin-left: 0rem;
   }
   .nest .n-name{
      line-height: 1.5;
      vertical-align:0;
      margin-right: 0.45rem;
      margin-left:0.6rem;
      font-weight: bold;
      color:rgb(43, 121, 139);
   }
   .nest .n-reply{
      float:right;
      font-weight: bold;
      color:rgb(229, 166, 113);
      font-size: 1.3rem;
      user-select: none;
   }
   .nest .n-reply:hover{
      cursor: pointer;
      text-decoration: underline;
      color:rgb(227, 146, 78);
   }
   .nest .n-time{
      float:right;
      color:rgb(192, 192, 192);
      margin-right: 1rem;
      font-size: 1.3rem;

   }
   .nest .n-default{
      color:rgb(156, 156, 156);
   }
   .n-box{
      height:6.3rem;
      overflow: hidden;
      margin-bottom: 1.5rem;
   }
   .n-box .send{
      margin-top: 1.9rem;
   }
   /* 还没登陆 按钮不可用 */
  .grey{
      color:#aaa !important;
   }
  .grey:hover{
      color:rgb(130, 130, 130);
      cursor:not-allowed;
   }
   .grey img{
      filter:invert(40%);
   }
   .biggrey{
      color:rgba(255, 255, 255, 0.868) ;
      background-color:rgba(142, 142, 142, 0.673);
   }
   .biggrey:hover{
      color:rgb(215, 215, 215);
      background-color:rgba(108, 108, 108, 0.673);
      cursor:not-allowed;
   }
   @media screen and (max-width: 768px) {
      #review-wrapper {
         width: 87.5%;
         padding:1rem 1.5rem 1rem 1.5rem;
      }
      #white{
         display: none;
      }
      .info{
         width:5rem; 
         margin-right: 1rem;
         margin-left:  0rem;
      }
       .info img{
         width:4.5rem; 
         height:4.5rem; 
         
      } 
      .p-body{
         width: calc(100% - 6rem);
      }
      .textarea{
         width: calc(100% - 10rem);
      }
      .nest img{
         display: none;
      }
      .nest-wrapper{
         padding: 0.6rem 0.8rem 0.6rem 1rem;
      }
      .nest .n-name{
         margin-right: 0;
         margin-left: 0;
      }
      .n-default{
         margin-left:0.2rem;
         margin-right:0.2rem;
      }
   }
   .stretch-enter-active {
      transition: all 0.15s ease-out;
   }
   .stretch-leave-active {
      transition: all 0.15s ease-out;
   }
   .stretch-enter,
   .stretch-leave-to {
      height: 0;
      margin-bottom: 0;
   }
</style>
