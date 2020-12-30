<template>
   <div id="nothing">
      <div>404 Not Found</div>
      <!-- <span>面</span>
      <span>不</span>
      <span>见</span>
      <span>了</span>
      <span>...</span> -->
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
	  max-width:95rem;
     margin:0 auto;
     font-size: 3.3rem;
     text-align: center;
     /* width:100vw; */
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
	  max-width:95rem;
  }
</style>