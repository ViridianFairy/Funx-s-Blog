<template>
  <div id="wrapper">
     <h1>关于</h1>
     <h2>我觉得没有什么好关于的</h2>
     <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>  
export default {
  name: 'About',
  data() {  
    return {
      src:"/funx.html"
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
      
   }
   h1{
      font-size: 4rem;
      margin: 1.5rem 0;
   }
   h2{
      font-size: 2.5rem;
      margin: 1.5rem 0;
   }
   iframe{
      width:70rem;
      height:50rem;
   }
</style>

