<template>
   <div id="edit-wrapper">
      <span id="title-text">标题：</span>
      <input id="title" v-model="article.title" />
      <button @click="save" v-if="isAdmin">
         {{saveText}}
      </button>
      <p id="label">
         标签：
         <a v-for="myLabel,id in article.label">
            {{ myLabel }}<button @click="deleteLabel(id)">×</button>
         </a>
         <input v-model="labelText" placeholder="添加标签" />
         <button @click="addLabel">+</button>
         <span id="pic">
               文章封面图：<input v-model="article.image" placeholder="输入外链" />
               <img :src="article.image">
            </span>
      </p>
     
      <div id="editor" ref="editor"></div>
   </div>
</template>
<script>
   import E from "wangeditor";
   export default {
      name: "edit",
      components: {},
      data() {
         return {
            article: {},
            isAdmin:0,
            labelText:"",
            saveText:"保存"
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
            this.article.label = ["JavaScript"]
            this.article.image = ""
            var editor = new E(this.$refs.editor);
            editor.create();
               editor.txt.html(this.article.body);
               document.getElementsByClassName(
                  "w-e-text-container"
               )[0].style.height = window.innerHeight - 230 + "px";
               this.saveText = "新增"
            return;
         }
         this.$http
            .post("/article", { _id: id })
            .then(res => {
               this.article = res.data[0];
               //vuex
               this.$store.state.title = this.article.title;
               //vuex

               if (res.data._id == "-1") {
                  this.article.title = "1";
               }
               var editor = new E(this.$refs.editor);
               editor.customConfig.onchange = html => {
                  this.article.body = html;
                  this.editorContent = html;
               };
               editor.create();
              // console.log(this.article.body);
               editor.txt.html(this.article.body);
              // console.log("插入结束");
               //迫不得已，这个库太垃圾了了
               document.getElementsByClassName(
                  "w-e-text-container"
               )[0].style.height = window.innerHeight - 230 + "px";
            })
            .catch();
      },
      methods: {
         addLabel() {
            if (this.labelText == "") return;
            this.article.label.push(this.labelText);
         },
         deleteLabel(id) {
            this.article.label.splice(id, 1);
         },
         save() {
            console.log(this.article)
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
      width: calc(100% - 16rem);
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
      width: 15rem;
      font-size: 1.2rem;
   }
   #pic img{
      background-color: #e7e7e709;
      width:calc(5rem * 1.67);
      height: 5rem;
      vertical-align: middle;
      margin-top: -0.75rem;
      margin-bottom: -0.75rem;
      margin-left: 1.5rem;
      border-color:transparent;
   }
</style>
