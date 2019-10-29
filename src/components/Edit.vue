<template>
   <div id="edit-wrapper">
      <span id="title-text">标题：</span>
      <input id="title" v-model="article.title" />
      
      <button @click="save" v-if="isAdmin">
         {{saveText}}
      </button>
      <img id="pic-img" :src="article.image">
      <p id="label">
         标签：
         <a v-for="(myLabel,id) in article.label" :key=id>{{ myLabel }}
            <button @click="deleteLabel(id)">×</button>
         </a>
         <input v-model="labelText" placeholder="添加标签" />
         <button @click="addLabel">+</button>
         <span id="pic">
               文章封面图：<input v-model="article.image" placeholder="输入外链" @focus="$event.currentTarget.select()"/>
               
            </span>
      </p>
      <div class="editorContainer">
            <markdown 
            :mdValuesP="getRaw"  
            :fullPageStatusP="false" 
            :editStatusP="true" 
            :previewStatusP="true" 
            :navStatusP="true"
            :icoStatusP="true"  
            @childevent="childEventHandler"
            
            ></markdown>
   </div>
   </div>
</template>
<script>
   // import E from "wangeditor";
   // import "wangeditor/release/wangEditor.css";
   import '../css/article.css'
   import markdown from'./markdown.vue'
   // import { log } from 'util';
   export default {
      name: "edit",
      components: {markdown:markdown},
      computed:{
         getRaw(){
            return this.raw;
         }
      },
      data() {
         return {
            article: {},
            isAdmin:0,
            labelText:"",
            saveText:"保存",
            raw:"a",
         };
      },
      created() {
         this.$http
            .post("/if-admin", { _id: this.Cookies.get("_id") })
            .then(res => {
               if (res.data.success == 1) {
                  this.isAdmin = 1;
               }else{
                  alert("别瞎鸡儿乱进，求你了");
                  this.$router.go(-1);
               }
            });
      },
      mounted() {
         var id = this.$route.query.id;
         if(typeof id =="undefined"){
            this.article = {}
            this.article.title = "新的文章"
            this.article.body = `<p>新的内容</p>`
            this.article.label = []
            this.article.image = ""
            
         }
         this.$http
            .post("/article", { _id: id })
            .then(res => {
               this.article = res.data[0];         
               this.raw = this.article.body
               //vuex
               this.$store.state.title = this.article.title;
               //vuex
               if (res.data._id == "-1") {
                  this.article.title = "1";
               }

            })
            .catch();
      },
      methods: {
         childEventHandler:function(res){
                // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
                this.raw=res.mdValue;
         },
         addLabel() {
            if (this.labelText == "") return;
            this.article.label.push(this.labelText);
         },
         deleteLabel(id) {
            this.article.label.splice(id, 1);
         },
         save() {
            this.article.body = this.raw
            if(typeof this.$route.query.id == "undefined"){
               this.$http
               .post("/article-new", {
                  article:this.article,
                  user_id:this.Cookies.get("_id")
               })
               .then(res => {
                  if (res.data.success == 1) {
                     this.$alert("添加新文章成功！",'true');
                     this.$router.push("/read?id=" + res.data.article_id);
                  }
               })
               .catch();
               return;
            }
            this.$http
               .post("/article-save",{
                  article:this.article,
                  user_id:this.Cookies.get("_id")
               })
               .then(res => {
                  if (res.data.success == 1) {
                     this.$alert("编辑成功！",'true');
                     this.$router.push("/read?id=" + this.article._id);
                  }
               })
               .catch();
         }
      }
   };
</script>

<style scoped>
   #edit-wrapper {
      padding: 1.5rem 2rem 2rem 2rem;
   }
   p:nth-of-type(1) img {
      vertical-align: -0.3rem;
      width: 1.8rem;
      display: inline-block;
      margin-right: 0.4rem;
   }
   p:nth-of-type(1) a {
      color: #b1c1c8;
      margin-right: 1rem;
   }
   h1 {
      font-size: 2.5rem;
   }
   p {
      line-height: 1.3;
      font-size: 1.4rem;
   }
   #title-text {
      font-size: 1.8rem;
   }
   #title {
      font-weight: bold;
      color: rgb(53, 57, 70);
   }
   input {
      font-size: 1.8rem;
      width: calc(100% - 31.7rem);
   }
   p span {
      color: grey;
   }
   #editor {
      overflow: hidden;
      font-size: 15px;
   }
   .w-e-text-container,
   .w-e-text {
      height: 1000px;
   }
   button {
      vertical-align: 0.2rem;
      margin-left: 1rem;
   }
   /*
   */
   #label{
      /* display: inline-block;
      width: auto; */
   }
   .editContainer{
      height:15rem;
   }
   #label input {
      width: 7rem;
      font-size: 1.4rem;
      padding: 0.3rem 0.6rem;
   }
   #label button {
      vertical-align: 0.1rem;
      width: 1.8rem;
      font-size: 1.4rem;
      padding: 0.1rem 0rem;
      margin: 0;
      margin-right: 3rem;
      margin-left: 0.5rem;
   }
   #label a button {
      margin-right: 0.5rem;
      background-color: rgb(243, 136, 136);
   }
   #pic input {
      width: calc(100% - 70rem);
      font-size: 1.2rem;
   }
   #pic-img{
      background-color: #e7e7e709;
      width:15rem;
      height: 10rem;
      vertical-align: middle;
      margin-top: -2.5rem;
      margin-bottom: -0.75rem;
      margin-left: 0.5rem;
      border-radius: 6px;
      border: 1px solid #dbdbdb;
      float:right;
      opacity: 0;
      transition: 0.2s all;
   }
   #pic-img:hover{
      opacity: 1;
   }
   @media screen and (max-width: 768px) {
      #pic-img{
         width:7.5rem;
         height: 5rem;
      }
   }
</style>
