<template>
  <div id="wrapper">
     <h1>关于</h1>
     <transition name="init">
         <h2 @click="">{{msgList[msgId]}}</h2>
     </transition>
     <div id="sky"></div>
     <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>  
export default {
  name: 'About',
  methods: {
     changeMsg(){
        if(++this.msgId == this.msgList.length)
            this.msgId = 0;
     }
  },
  data() {  
    return {
      src:"/funx.html",
      msgId:0,
      msgList:[
         "我觉得没有什么好关于的",
         "vue-cli全家桶 node.js lottie-web.js",
      ],
    }
  },mounted() {
      
  },
 }
</script>

<style scoped>
   #wrapper{
      margin: 0 auto 2rem auto;
      text-align: center;
      color:rgb(48, 134, 137);
      background-image: radial-gradient(rgba(223, 246, 203, 0.097) 0%, rgba(48, 194, 243, 0.111) 20%, rgba(48, 194, 243, 0) 70%);
   }
   h1{
      font-size: 4rem;
      margin: 0.5rem 0 0.5rem 0;
   }
   h2{
      font-size: 2.5rem;
      margin: 0.5rem 0 0 0;
   }
   h3{
      font-size: 1.7rem;
      font-weight:normal;
      margin:0.2rem 0;
      color:rgba(176, 176, 176, 0.694);
   }
   iframe{
      width:70rem;
      height:50rem;
      margin:0 auto;
   }
   #later-info{
      opacity: 0;
      
   }
   @media screen and (max-width: 768px) {
      .home-item {
         padding-left: 1rem;
         padding-right: 1rem;
      }
      /* iframe{
         width:35rem;
         height:50rem;
      } */
     
   }
   .init-enter-active {
      transition: all 0.2s;
   }
   .init-leave-active {
      transition: all 0.2s;
   }
   .init-enter,
   .init-leave {
      opacity: 0;
   }
</style>

