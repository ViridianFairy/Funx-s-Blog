<template>
   <div id="big">
   <div id="input-wrapper" v-if="status==0">
      <input v-model="stuid" placeholder="学号">
      <input v-model="password" placeholder="密码" type="password">
      <button class="green" @click="init()">开始</button>
   </div>
   <div class="progress" v-if="status==1">
		<div class="progress-done" :style="{width:progress+'%'}"></div>
	</div>
   <div id="chat">
      <transition-group name="msg">
         <div class="chat-item" v-for="item in chatData" :key="item">
         {{item}}
         </div>
      </transition-group>
   </div>
   </div>
</template>

<script>
   import io from 'socket.io-client'
   export default {
      name: "poker", 
      data(){
         return {
            status:0,
            progress:0,
            stuid:'',
            password:'',
            teas:[],
            chatData:[],
         }
      },
      methods:{
         chatSend(){
            this.socket.emit('chat',{
               name:this.$store.state.login.user,
               msg:this.chatMsg,
            })
         },
         init(){
            this.status = 1;
            this.socket = io(`${require('../../config').baseURL}:3000`)
            var socket = this.socket
            socket.on('connect',e =>{
               socket.emit('init',{
                  stuid:this.stuid,
                  password:this.password,
               })
            })
            socket.on('message',(data)=>{
               console.log(data.msg)
               if(data.bar){
                  this.progress = data.bar
               }
               if(Array.isArray(data.msg)){
                  this.chatData.push(`处理${data.msg[0]}，剩余${parseInt(data.msg.length/2)}条`)
               }else{
                  this.chatData.push(data.msg)
               }
            })
         }
      },
      mounted(){

      },
      created(){
         
      }
   };

</script>

<style lang="scss" scoped>
   #big{
      margin:2rem 0;
   }
   #input-wrapper{
      display: flex;
      justify-content: space-around;
      // flex-direction: column;
      max-width: 70rem;
      margin: 0 auto;
      
   }
   #chat{
      max-width: 30rem;
      margin: 0 auto;
      margin-top: 2rem;
   }
   .chat-item{
      color:rgb(137, 137, 137);
      font-size: 1.5rem;
   }
   .progress {
   
	background-color: rgba(100, 100, 100, 0.2);
	border-radius: 5px;
	position: relative;
	margin: 0 auto;
	height: 10px;
   width: 25rem;
   margin-top: 2rem;
}
   .progress-done {
	background: linear-gradient(to left, rgb(242, 112, 156), rgb(255, 148, 114));
	box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156);
	border-radius: 5px;
	height: 10px;
	width: 0;
	transition: width 1s ease 0.3s;
}
   .msg-enter-active {
      transition: all 0.25s cubic-bezier(0.165, 0.840, 0.440, 1.000);
   }
   .msg-leave-active {
      transition: all 0.25s;
   }
   .msg-enter,
   .msg-leave {
      transform: translateX(30px);
      opacity: 0;
   }
</style>
