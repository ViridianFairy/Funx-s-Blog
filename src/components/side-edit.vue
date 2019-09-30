<template>
   <div>
      <div id="side-button-wrapper">
         <!--<button @click="$router.go(-1)">返回</button>-->
      </div>
      <ul>
         <li v-for="item in articles" @click="">
            {{ item.title }}
         </li>
      </ul>
   </div>
</template>

<script>
   export default {
      name: "About",
      data() {
         return {
            articles: []
         };
      },
      methods: {
         
      },
      mounted() {
         this.$http
            .post("/articles")
            .then(res => {
               this.articles = res.data;
               //console.log(this.articles);
            })
            .catch();
      }
   };
</script>

<style scoped>
   img {
      width: 10rem;
      margin: 1.7rem auto;
      display: block;
      border-radius: 50%;
      border: 1px solid #b4b4b4;
   }
   h1 {
      text-align: center;
   }
   p {
      text-align: center;
      font-size: 1.5rem;
   }
   #side-button-wrapper {
      display: flex;
      justify-content: space-around;
   }
   ul {
      margin: 1rem;
   }
   li {
      color: rgb(91, 91, 91);
      background-color: rgba(245, 245, 245, 0.694);
      margin: 0.5rem 0 0.5rem 0;
      font-size: 1.4rem;
      padding: 0.3rem 0.8rem 0.3rem 0.8rem;
      border-radius: 0.4rem;
      transition: 0.2s all;
   }
   li:hover {
      cursor: pointer;
      background-color: #d9d9d9;
      color: rgb(36, 36, 36);
   }
   /*
   <button @click="save" :disabled="article.lookNum<0">
            保存并返回
         </button>*/
</style>
