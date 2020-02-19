<template>
   <div id="nothing">
      <span>页</span>
      <span>面</span>
      <span>不</span>
      <span>见</span>
      <span>了</span>
      <span>...</span>
      <iframe :src="src" frameborder="0"></iframe>
   </div>
</template>

<script>
export default {
  name: 'loading',
  data(){
     return{
        src:'/404.html'
     }
  }
 }
</script>

<style scoped>
  #nothing{
     margin:0 auto;
     font-size: 4rem;
     text-align: center;
     width:100vw;
     height:auto;
     color: rgb(224, 224, 224);
  }
  span{
     margin:0 0.4rem;
  }
  iframe{
     margin:0 auto;
     margin-top: -2rem;
     width:100vw;
     height:60vh;
     max-height:70rem;
  }
</style>