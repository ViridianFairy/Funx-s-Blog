<template>
   <div id="read-wrapper">
      <h1>
         {{ article.title }}
      </h1>
      <p>
         标签：
         <router-link :to="'/category?label='+label" v-for="label in article.label">
            <img src="../assets/Common/label-blue.svg" />{{ label }}
         </router-link>
        
         <button v-if="isAdmin" id="delete" @click="deleteIn" class="red">
            删除
         </button>
         <button
            v-if="isAdmin"
            id="edit"
            @click="$router.push('/edit?id=' + $route.query.id)"
         >
            编辑
         </button>
         <button v-if="isAdmin" id="edit" class="green"
            @click="$router.push('/edit')">
               新增
         </button>
         
      </p>
      <p>
         <span>{{ article.time }}</span>
         <span
            ><img class="info-i" src="../assets/Common/mine.svg" />{{
               article.author
            }}</span
         >
         <span
            ><img class="info-i" src="../assets/Common/browse.svg" />{{
               article.lookNum
            }}</span
         >
         <span
            ><img class="info-i" src="../assets/Common/interactive.svg" />{{
               article.sayNum
            }}</span
         >
      </p>
      <div id="read-body" v-html="article.body" v-highlight></div>
   </div>
</template>
<script>
   export default {
      name: "read",
      components: {},
      methods: {
         refresh() {
            var id = this.$route.query.id;
            this.$http
               .post("/article", { _id: id ,user_id:this.Cookies.get("_id")})
               .then(res => {
                  this.article = res.data[0];
                  //vuex
                  this.$store.state.invalidArticle = false;
                  if(this.article.lookNum == -1)
                     this.$store.state.invalidArticle = true;
                  this.$store.state.title = this.article.title;
                  //vuex
                  

               })
               .catch(e => {});
            this.$http
               .post("/if-admin", { _id: this.Cookies.get("_id") })
               .then(res => {
                  if (res.data.success == 1) {
                     this.isAdmin = 1;
                  }
               });
         },
         deleteIn() {
            var con = confirm(`确定要删除《${this.article.title}》吗？`);
            if (con == true){
               console.log(this.article._id);
               this.$http
               .post("/article-delete", { _id: this.article._id })
               .then(res => {
                  if (res.data.success == 1) {
                     this.$alert(res.data.message,'true')
                     this.$router.go(-1);
                  }
               })
               .catch(e => {});
            }
         }
      },
      data() {
         return {
            article: {},
            isAdmin: 0
         };
      },
      created() {
         this.refresh();
      },
      mounted() {}
   };
</script>

<style scoped>
   #read-wrapper {
      padding: 2.5rem 2.5rem 3rem 4rem;
   }
   #read-wrapper p:nth-of-type(1) img {
      vertical-align: -0.3rem;
      width: 1.8rem;
      display: inline-block;
      margin-right: 0.4rem;
   }
   #read-wrapper p:nth-of-type(1) a {
      color: #b1c1c8;
      margin-right: 1rem;
   }
   #read-wrapper h1 {
      font-size: 2.8rem;
      color: rgb(47, 48, 55);
      margin-bottom: 1rem;
      margin-top: 0rem;
      position: relative;
      line-height: 1.3;
   }
   #read-wrapper p {
      margin: 1rem 0;
      font-size: 1.3rem;
      color: #6c787d;
   }
   #read-wrapper p span {
      font-size: 1.3rem;
      margin-right: 1rem;
      color: #afb2b4;
   }
   #edit {
      float: right;
      margin-right: 1rem;
      padding: 0.6rem 1.2rem;
      margin-top: -0.4rem;
   }
   #delete{
      float:right;
      margin-right: 0rem;
      padding: 0.6rem 1.2rem;
      margin-top: -0.4rem;
   }
   /*
   正文！
   */
   #read-body {
      margin-top: 2.5rem;
      font-size: 1.6rem;
      line-height: 1.8;
      border-top: 1px dashed rgb(217, 217, 217);
      padding-top:0rem;
   }
   #read-body p {
      margin: 0.5rem;
   }
   #read-wrapper h1::before{
      position:relative;
      display: block;
      float:left;
      margin-right: 2rem;
      content: "";
      height:8.2rem;
      width:0.6rem;
      margin-top: 0.6rem;
      margin-bottom: 5rem;
      background-color: #4aacc2;
   }
   
   /**/
   @media screen and (max-width: 768px) {
      #read-wrapper {
         padding-left: 1rem;
         padding-right: 1rem;
      }
      #read-wrapper p:nth-of-type(2) {
         line-height: 1.8;
      }
      #read-body {
         margin-top: 1rem;
      }
      #wrap {
         display: inline;
      }
      #read-wrapper h1::before{
         margin-right: 1.2rem;
      }
   }
</style>
