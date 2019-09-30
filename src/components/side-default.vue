<template>
   <div>
      <img src="../assets/Common/avatar.png" />
      <slot name="info">
         <h1>ViridianFairy<img src="../assets/Common/male.svg"></img></h1>
         <p>别看我，我害羞，求你了</p>
         <div id="me">
               <img class="disable" src="../assets/Common/zhihu-line.svg">             
               <img class="able" src="../assets/Common/bilibili-line.svg" 
               @click="$refs.bilibili.click()">            
               <img class="disable" src="../assets/Common/github-fill.svg">
               <img class="disable" src="../assets/Common/qq-line.svg">
               <a href="https://space.bilibili.com/29177789" target="_blank" ref="bilibili"></a>
         </div>
      </slot>
   </div>
</template>

<script>
   export default {
      name: "About",
      data() {
         return {};
      }
   };
</script>
<style scoped>
   div > img {
      width: 8.5rem;
      height: 8.5rem;
      margin: 1.7rem auto 1.0rem auto;
      display: block;
      border-radius: 50%;
      border: 1px solid #b4b4b4;
   }
   h1 {
      text-align: center;
      margin:0.8rem 0;
      padding-left:0.4rem;
   }
   p {
      margin:0.4rem 0;
      text-align: center;
      font-size: 1.5rem;
      white-space: pre-wrap;
   }
   h1 + p{
      margin-bottom: 1rem;
   }
   h1 img{
      width:2.5rem;
      vertical-align: middle;
   }
   #me{
      margin:0 2.5rem;
      display: flex;
   }
   #me img{
      width:3rem;
      height:3.5rem;
      padding-bottom: 1rem;
      border: none;
      transition: 0.2s all;
   }
   #me .able{
      transition: 0.5s all;
      transform: translate(0, 0);
      
   }
   #me .able:hover{
      cursor: pointer;
      animation: loading 0.5s cubic-bezier(0.600, -0.280, 0.735, 0.045) infinite;
      animation-fill-mode : both;
   }
   #me .disable{
      width:3rem;
      transition: 0.1s all;
   }
   #me .disable:hover{
      cursor: not-allowed;
      filter:invert(40%) 
   }
   @keyframes loading {
      0% {
         transform: translate(0, 0)scaleY(0.8);
      }
      60% {
         transform: translate(0, -1.5rem)scaleY(1.05);
         
      }
      100% {
         transform: translate(0, 0);
      }
   }
   /*
<div class="intro bihu">
            <img src="../assets/Common/zhihu-line.svg">
            <p>谢邀，
人在铁岭，刚下拖拉机</p>
         </div>
         <div class="intro b">
            <img src="../assets/Common/bilibili-line.svg">
            <p>死宅，
是上帝创造最恶心的生物</p>
         </div>
         <div class="intro g">
            <img src="../assets/Common/github-fill.svg">
            <p>大型，
同性 ♂指导和交友社区。</p>
         </div>
         <div class="intro q">
            <img src="../assets/Common/qq-line.svg">
            <p>9102年了，
这个叫QQ的还没倒闭？</p>
         </div>



   .intro img{
      float:left;
      width:2.5rem;
      border:0px solid rgb(185, 185, 185);
      border-radius: 50%;
      margin:0;
      
   }
   .intro{
      width: calc(85%);
      padding:0 2rem;
      margin:0 auto 1rem auto;
      transition: 0.2s all;
   }
   .intro p{
      z-index:-1;
      position: relative;
      vertical-align: middle;
      text-align: left;
      margin-left:3.5rem;
      border:2px solid rgb(130, 195, 255);
      line-height: 1.5;
      color:rgb(61, 61, 61);
      font-size: 1.5rem;
      border-radius: 0.4rem;
      padding:0.5rem;
      box-shadow:-1px 0px 5px 0px rgb(130, 195, 255);
      
   }
   .intro p::after{
      content: "";
      left:-1.2rem;
      top:0.6rem;
      position: absolute;
      border-width: 6px;
      border-style: solid;
      border-color: transparent rgb(130, 195, 255) transparent transparent;
      transform: rotate(0deg); 
   }
   .b img{
      float:right;
      border-color:rgb(253, 198, 209);
   }
   .b p{
      box-shadow:-1px 0px 5px 0px rgb(253, 198, 209);
      border-color:rgb(253, 198, 209);
      margin-right:3.5rem;
      margin-left:0;
   }
   .b p::after{
      transform: rotate(180deg);
      left:16.7rem;
      top:0.6rem;
      border-color: transparent rgb(255, 190, 203) transparent transparent;
   }
   .g img{
      border-color:rgb(91, 91, 91);
   }
   .g p{
      box-shadow:-1px 0px 5px 0px rgb(174, 174, 174);
      border-color:rgb(123, 123, 123);
   }
   .g p::after{
      border-color: transparent rgb(128, 128, 128) transparent transparent;
   }
   .q img{
      float:right;
      border-color:rgb(248, 216, 146);
   }
   .q p{
      margin-right:3.5rem;
      margin-left:0;
      box-shadow:-1px 0px 5px 0px rgb(251, 222, 159);
      border-color:rgb(251, 222, 159);
   }
   .q p::after{
      transform: rotate(180deg);
      left:16.7rem;
      top:0.6rem;
      border-color: transparent rgb(255, 214, 126) transparent transparent;
   }
   .intro:hover{
      cursor: pointer;
      transform: translateX(-0.5rem);
   }
   */
</style>

