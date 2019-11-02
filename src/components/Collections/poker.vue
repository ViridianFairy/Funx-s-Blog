<template>
   <div id="poker" :style="{width:width+'px',height:height+'px'}">
      asf
   </div>
</template>

<script>
   import io from 'socket.io-client'
   export default {
      name: "poker", 
      data(){
         return {
            width:1,
            height:2,
            socket:null,
         }
      },
      mounted(){
         // 不用 socket.io
         this.socket = io('http://127.0.0.1:3000/')
         var socket = this.socket
         socket.on('connection',e =>{
            socket.emit('join',{
               name:'funx'
            })
         })
         socket.on('join-msg',data=>{
            console.log(data.msg)
         })
         
      },
      created(){
         var width = window.innerWidth 
         var height = window.innerHeight
         this.width = width>1260?1260: width 
         this.height = height - 140
      }
   };

</script>

<style lang="scss" scoped>
   #poker{
      margin:0 auto;
      background-color:#aaa;
   }
   
</style>
