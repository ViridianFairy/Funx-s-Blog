<template>
   <div id="demo-wrapper">
      <snake></snake>
      <!-- <snake></snake> -->
   </div>
</template>

<script>
   import snake from './Collections/snake.vue'
   export default {
      name: "collection",
      components: {snake},
      data() {
         return {

         };
      }
   };
</script>

<style scoped>
   #demo-wrapper{
      margin: 0 auto
   }
   @media screen and (max-width: 768px) {
      .home-item {
         padding-left: 1rem;
         padding-right: 1rem;
      }

      .home-item>img {
         height: 6rem;
         width: 10rem;
         margin-left: 0.5rem;
      }
   }
</style>