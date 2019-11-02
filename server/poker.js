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
router.post("/api/poker/new-user",(req, res)=>{
   var save = new Poker({
      user_id_obj:"abc", //req.body.user_id_obj
      beans:0,
      totalGames:0,
      winGames:0,
      exp:0,
   }).save()
   save.then((doc)=>{
      res.send(doc)
   })
})
var playerNum = 0;
io.on('connection',(socket)=>{
   io.emit('join-msg',{ msg:`新玩家加入，现在一共有${++playerNum}个玩家啦！`})
   socket.on('disconnect',reason=>{
      io.emit('join-msg',{ msg:`退出了，现在只有${--playerNum}个玩家了！`})
   })
})

module.exports = {
   router,
   server:wsServer,
}