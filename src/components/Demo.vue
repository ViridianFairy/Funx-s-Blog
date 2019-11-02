<template>
   <div id="demo-wrapper">
      <div class="demo" v-if="show==0">
         <button class="green" @click="showing(1)">snake</button>
      </div>
      <div class="demo" v-if="show==0">
         <button class="green" @click="showing(2)">poker</button>
      </div>
      <snake v-if="show==1"></snake>
      <poker v-if="show==2"></poker>
   </div>
</template>

<script>
   //import baseURL from '../main'
   import snake from './Collections/snake.vue'
   import poker from './Collections/poker.vue'
   //baseURL.replace(/http/,'ws')
   var baseURL = 'ws://127.0.0.1:3001/api'
   export default {
      name: "collection",
      components: {snake,poker},
      methods:{
         showing(val){
            switch(val){
               case 1:
                  location.hash = '#snake'
                  this.show = 1
                  break;
                case 2:
                  location.hash = '#poker'
                  this.show = 2
                  break;
            }
         }
      },
      data() {
         return {
            show:0
         };
      },
      created(){
         
      },
      mounted(){
        if(location.hash == '#snake'){
            this.showing(1)
         }
         if(location.hash == '#poker'){
            this.showing(2)
         }
      },
      watch:{
         "$store.state.title":function(val){
            this.$set(this.$store.state.path,1,{name:val})
         }
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