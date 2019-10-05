<template>
   <div id="big-wrapper">
      <div class="item">
         <div class="title">贝塞尔曲线可视化</div>
         <Bezier></Bezier>
      </div>
      
   </div>
</template>

<script>
   import Bezier from './Collections/bezier'
   export default {
      name: "collection",
      components: {Bezier},
      data() {
         return {
            
         };
      }
   };
</script>

<style scoped>
   .item{
      font-size: 1.6rem;
      padding: 1.4rem;
      padding-left: 4rem;
      padding-bottom: 0.5rem;
      height: 100%;
      position: relative;
      border-bottom: 1px dashed #d9d9d900;
   }
   .item .title {
      font-size: 2rem;
      font-weight: bold;
      color: rgb(65, 149, 168);
      margin-left: 2.2rem;
      position: relative;
      margin-top: 0.4rem;
      margin-bottom: 0.9rem;
   }
   .item .title::before {
      left: -2.0rem;
      top: 0.1rem;
      position: absolute;
      content: "";
      width: 0.6rem;
      height: 2.5rem;
      background-color: #4aacc2;
   }
   @media screen and (max-width: 768px) {
      .home-item {
         padding-left: 1rem;
         padding-right: 1rem;
      }
      .home-item > img {
         height: 6rem;
         width: 10rem;
         margin-left: 0.5rem;
      }
   }
</style>
