<template>
   <div>
      <div class="home-item" v-for="item in articles">
            <router-link :to="'/read?id='+item._id">
               <h1>{{ item.title }}</h1>
            </router-link>
         <img
            @click="$router.push('/read?id=' + item._id)"
            :src="item.image"
            v-if="item.image!=''"
         />
        
         <p class="label">
            <router-link :to="'/category?label='+label" v-for="label in item.label">
               <img src="../assets/Common/label-blue.svg" />{{ label }}
            </router-link>
         </p>
         <p>
            {{ item.body }}<!--| noHtml-->
         </p>
         <p>
            <span>{{ item.time }}</span>
            <span><img class="info-i" src="../assets/Common/mine.svg">{{ item.author }}</span>
            <span><img class="info-i" src="../assets/Common/browse.svg">{{ item.lookNum }}</span>
            <span><img class="info-i" src="../assets/Common/interactive.svg">{{ item.sayNum }}</span>
         </p>
      </div>
   </div>
</template>

<script>
   export default {
      name: "home",
      components: {},
      data() {
         return {
            articles: {}
         };
      },
      created() {
         this.$http
            .post("/articles")
            .then(res => {
               this.articles = res.data;
            })
            .catch(e => {});
      },
      filters: {
         // noHtml(a) {
         //    return a.replace(/<[^>]+>/g, "").replace(/&nbsp/g, "");
         // }
      }
   };
</script>

<style scoped>
   h1{
      margin:0;
   }
   .home-item p {
      line-height: 1.7;
      margin:0;
   }
   .home-item > img {
      height: 10rem;
      float: right;
      width: calc(10rem *1.5);
      border-radius: 4px;
      border: 1px solid #f0f0f0;
      margin-left: 1rem;
      margin-top: 2rem;
      
      
   }
   .home-item > img:hover {
      cursor: pointer;
   }

   .home-item {
      padding: 2rem;
      padding-left: 4rem;
      padding-bottom: 2.5rem;
      border-bottom: 1px dashed #f0f0f0;
      height: 12rem;
   }
   .home-item p:nth-of-type(1) {
      margin: 0.8rem 0;
      font-size: 1.4rem;
   }
   .home-item h1 {
      width: calc(100% - 24rem);
      max-height: 2.6rem;
      overflow: hidden;
      color: #467176;
      transition: 0.1s all;
      margin-left:1.4rem;
      display: inline-block;
   }
   .home-item p a:nth-child(1):before{
      position:relative;
      display: block;
      float:left;
      margin-right: 1.1rem;
      content: "";
      height:4.4rem;
      width:0.4rem;
      margin-top: -2.5rem;
      margin-bottom: 0rem;
      background-color: #4aacc2;
   }
   .home-item h1:hover {
      color: #09626d;
   }
   .home-item p:nth-of-type(1){
      margin: 0.5rem 0;
   }
   .home-item p:nth-of-type(1) img {
      vertical-align: -0.2rem;
      width: 1.2rem;
      display: inline-block;
      margin-right: 0.4rem;
   }
   .home-item p:nth-of-type(1) a {
      color: #b1c1c8;
      margin-right: 1rem;
      font-size: 1.3rem;
   }
   .home-item p:nth-of-type(1) a:hover {
      text-decoration: underline;
   }
   .home-item p:nth-of-type(2) {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #424242;
      max-height: 4.4rem;
   }
   .home-item p:nth-of-type(3) {
      margin-top: 1.1rem;
      font-size: 0.2rem;
      font-size: 1.2rem;
      color: #b4b4b4;
   }
   .home-item p:nth-of-type(3) span {
      margin-right: 1.5rem;
   }
   
   /*
   -------------------------------------------
   -------------------------------------------
   -------------------------------------------
   */
   @media screen and (max-width: 768px) {
      .home-item {
         padding-left: 1rem;
         padding-right: 1rem;
      }
      .home-item > img {
         height: 7rem;
         width: calc(7rem * 1.5);
         margin:0.8rem 0.5rem 0 0.5rem
      }
      .home-item h1 {
         width: 97%;
         margin-left:1.4rem;
         max-height: 2.4rem;
      }
      .label{
         max-height: 2.1rem;
         white-space: nowrap;
      }
      .home-item p:nth-of-type(1) a{
         margin-right: 0.4rem;
      }
   }
</style>
