const express = require("express");
const router = express.Router();
const socketio = require('socket.io')
const Model = require('./Model')
const mongoose = require("mongoose");
const Poker = Model.Poker
const wsServer = require('http').createServer(new express())
const io = new socketio(wsServer)
mongoose.connect("mongodb://myblog:731016@106.15.200.151:27017/MyBlog", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
router.post("/api/poker/query", (req, res) => {
   var name = res.data.name
   pokerQuery(name).then((doc) => {
      console.log(doc)
   }).catch(() => {
      pokerNew(name)
   })
})
function pokerQuery(name) {
   return new Promise((resolve, reject) => {
      User.findOne({ name }).then((doc => {
         if (doc) resolve(doc)
         reject()
      }))
   })
}
function pokerNew(name) {
   return new Promise((resolve) => {
      var save = new Poker({
         name,
         pokers: [],
         status: 0,
      }).save()
      save.then((doc) => {
         resolve()
      })
   })
}
var playerNum = 0;
var nameArr = [];
io.on('connection', (client) => {
   client.on('login', (data) => {
      playerNum++;
      io.emit('msg', { msg: `${data.name}加入了群聊`, type: 'System' })
   })
   console.log('socket已连接')
   client.on('disconnect',()=>{
      playerNum--;
      io.emit('msg', { msg: `${data.name}离开了群聊`, type: 'System' })
   })
})
module.exports = {
   router,
   server: wsServer,
}