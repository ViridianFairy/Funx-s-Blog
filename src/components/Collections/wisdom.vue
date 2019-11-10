<template>
   <div id="palette">
      <div class="slider">
         <!-- 学校：<input v-model="login.school">
         学号：<input v-model="login.number">
         密码：<input v-model="login.password"> -->
      </div>
   </div>
</template>

<script>
   export default {
      name: "wisdom",
      methods:{
      },
      data(){
         return{
            login:{school:"335",number:"061700150",password:"981219",phone:"18162084058"}
         }
      },
      mounted() {
         this.$http.post("/wisdom/init",this.login).then(res => {
            console.log(res.data)
         });
      }
   };
</script>

<style lang="scss" scoped>
   .slider{
      color:red;
   }
</style>
