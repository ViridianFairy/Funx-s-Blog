<template>
   <div id="poker" :style="{width:width+'px',height:height+'px'}">
      <div id="chat-wrapper">
         
         
         <div id="chat" ref="chat">
            <transition-group name="msg"><div class="chat-item" v-for="item in chatData" :key="item.date">
               {{item.name}}：{{item.msg}}<span class="time"> {{item.date}}</span>
            </div></transition-group>
         </div>
         <input v-model='chatMsg' @keydown.enter="chatSend();chatMsg=''">
         <div class="chat-num">当前在线：{{playerNum}}人</div>
      </div>
      <transition-group name="poker">
         <div class='poker' v-for="(p,index) in pokerData" :style="getPokerStyle(p,index)" 
            :key="String(p)+index"></div>
      </transition-group>
   </div>
</template>

<script>
   import io from 'socket.io-client'
   export default {
      name: "poker", 
      data(){
         return {
            width:0,
            height:0,
            chatData:[],
            pokerData:[],
            chatMsg:'',
            socket:null,
            playerNum:0,
         }
      },
      
      methods:{
         chatSend(){
            this.socket.emit('chat',{
               name:this.$store.state.login.user,
               msg:this.chatMsg,
            })
         },
         getPokerStyle(p,index){
            return {
               backgroundPosition: `${-3-98*p[0]}px ${-3-129*p[1]}px`,
               left: `${260+(96*0.45)*index}px`,
            }
         },
         push(msg){
            function getTinyTime(){
               var _d = new Date()
               var a = []
               a[0] = _d.getHours()
               a[1] = _d.getMinutes()
               a[2] = _d.getSeconds()
               for(let i=0;i<=2;i++){
                  if(a[i]<9) a[i] = '0'+a[i]
               }
               return `${a[0]}:${a[1]}:${a[2]}`
            }
            if(msg.playerNum)
               this.playerNum = msg.playerNum
            if(msg.type=='System' && !msg.name)
               msg.name = '【系统】' 
            this.chatData.push({
               name:msg.name,
               msg:msg.msg,
               date:getTinyTime(),
               type:msg.type,
            })
            this.$nextTick(()=>{
               this.$refs.chat.scrollTop = this.$refs.chat.offsetHeight
            })
            
         },
         init(){
            this.socket = io(`${require('../../config').baseURL}:3000`)
            var socket = this.socket
            socket.on('connect',e =>{
               setTimeout(()=>{
                  socket.emit('login',{
                     name:this.$store.state.login.user
                  })
               },150)
            })
            socket.on('message',data=>{
               this.push(data)
            })
            socket.on('wash',data=>{
               let timer = setInterval(()=>{
                  if(!data.length){
                     timer = null
                     return;
                  }
                  let a = data.shift()
                  this.pokerData.push(a)
               },16.67*3)
            })
         }
         
      },
      mounted(){
         if(this.$store.state.login.user)
            this.init()
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
   input{
      margin-top: 0.75rem;
      color:white;
      font-size: 1.4rem;
      border: 1px solid #c9eef6;
      border-radius: 0.5rem;
      padding: 0.6rem 0.8rem;
      background-color: rgba(240, 255, 255, 0.05);
      -webkit-transition: 0.2s all;
      transition: 0.2s all;
      &:focus{
         background-color: rgba(240, 255, 255, 0.15);
      }
   }
   #poker{
      background-image:url('../../assets/Poker/bg3.jpg');
      background-repeat: no-repeat;
      margin:0 auto;
   }
   #chat-wrapper{
      position: absolute;
      left: 4%;
      bottom: 10%;
      font-size: 1.4rem;
      #chat{
          height:165px;
          width:210px;
          overflow: scroll;
          &::-webkit-scrollbar{
             display: none;
          }
      }
      .chat-item{
         color:rgb(219, 219, 219);
      }
      .chat-num{
         margin-top: 0.3rem;
         color:rgba(221, 221, 221, 0.611);
      }
      .time{
         font-size: 1.2rem;
         color:rgba(161, 161, 161, 0.583);
      }
   }
   .poker{
      position: absolute;
      width:calc(100px);
      height:calc(130px);
      top:75%;
      background-image: url('../../assets/Poker/card.png');

      transition: 0.15s all;
      transform: scale(0.9);
      &:hover{
         filter: brightness(0.92)
      }
      &:active{
         filter: brightness(0.84)
      }
   }
   .poker-enter-active {
      transition: all 0.25s cubic-bezier(0.165, 0.840, 0.440, 1.000);
   }
   .poker-leave-active {
      transition: all 0.25s;
   }
   .poker-enter,
   .poker-leave {
      transform: translateY(30px);
      opacity: 0;
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
