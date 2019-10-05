<template>
   <div id="no-reviews" >
      <div id="no-reviews-body">
         <img src="../assets/Common/nodata.svg" />
         <span>草，这都被你发现了..
         </span>
      </div>
   </div>
</template>

<script>
   export default {
      name: "collection",
      components: {},
      data() {
         return {

         };
      }
   };
</script>

<style scoped>
   #no-reviews-body {
      margin-top: 3rem;
      text-align: center;
   }

   #no-reviews-body img {
      width: 15rem;
      height: 15rem;
      opacity: 0.35;
   }

   #no-reviews-body span {
      vertical-align: 6rem;
      margin-left: 1.5rem;
      font-size: 1.5rem;
      color: #ccc;
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