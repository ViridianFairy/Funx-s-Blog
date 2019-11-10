const express = require("express");
const router = express.Router();
const Model = require('./Model')
const mongoose = require("mongoose");
const Poker = Model.Poker
const wsServer = require('http').createServer(require("express")())
const io = require('socket.io')(wsServer)
mongoose.connect("mongodb://myblog:731016@106.15.200.151:27017/MyBlog",{
   useNewUrlParser: true,
   useUnifiedTopology: true 
});
router.post("/api/poker/query",(req, res)=>{
   var name = res.data.name
   pokerQuery(name).then((doc)=>{
      console.log(doc)
   }).catch(()=>{
      pokerNew(name)
   })
})
function pokerQuery(name){
   return new Promise((resolve,reject)=>{
      User.findOne({name}).then((doc=>{
         if(doc) resolve(doc)
         reject()
      }))
   })
}
function pokerNew(name){
   return new Promise((resolve)=>{
      var save = new Poker({
         name,
         pokers:[],
         status:0,   
      }).save()
      save.then((doc)=>{
         resolve()
      })
   })
}
var playerNum = 0 //socket begin
var nameArr = []
var table = []
setInterval(()=>{
   //console.log(nameArr)
},500)
io.on('connection',(socket)=>{
   var name = ''
   var pokerData = []
   var wash = null
   socket.on('login',data=>{
      name = data.name
      
      if(nameArr.indexOf(name)!=-1){ //重连
         io.send({
            type:'System',
            msg:`${name}重新连接了！`,
            playerNum,
         })
      }else{
         nameArr.push(name)
         io.send({
            type:'System',
            msg:`${data.name}加入了游戏！`,
            playerNum:++playerNum,
         })
         wash = new Washer()
         io.emit('wash',wash.getAll())
      }
   })

   socket.on('chat',data=>{
      io.send({
         name:data.name,
         msg:data.msg,
      })
   })
   socket.on('disconnect',data=>{
      io.emit('message',{
         type:'System',
         msg:`${name}离开了！`,
         playerNum:--playerNum,
      })
      nameArr.splice(nameArr.indexOf(name),1)
   })
})
function Washer(){
   this.data = []
   for(let i=0;i<=53;i++)
      this.data.push(i)
}
Washer.prototype.getAll = function(){
   var num = 17
   var arr = []
   while(num--){
      let r = (Math.floor((Math.random()*this.data.length)))
      el = this.data[r]
      arr.push(el)
      this.data.splice(r,1)
   }
   arr = arr.map(item=>{
      let x = item%13
      let y = parseInt(item/13)
      let z = redef([x,y])
      return [x,y,(z+1)]
   })
   arr.sort((v1,v2) => {
      return cmp(v1,v2)*(-1)
   })
   return arr
   
}

function redef(item){
   if(item[1]==4 && item[0]==0)
      return 16
   if(item[1]==4 && item[0]==1)
      return 15
   if(item[0]==0) return 13
   if(item[0]==1) return 14
   return item[0]
}
function cmp(a,b){
   a = redef(a)
   b = redef(b)
   return a-b
}
module.exports = {
   router,
   server:wsServer,
}


// router.post("/api/poker/new-user",(req, res)=>{
//    var save = new Poker({
//       user_id_obj:"abc", //req.body.user_id_obj
//       beans:0,
//       totalGames:0,
//       winGames:0,
//       exp:0,
//    }).save()
//    save.then((doc)=>{
//       res.send(doc)
//    })
// })