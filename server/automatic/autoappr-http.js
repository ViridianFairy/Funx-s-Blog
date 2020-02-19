const express = require("express");
const router = express.Router();

const wsServer = require('http').createServer(require("express")())
const io = require('socket.io')(wsServer)
io.on('connection',(socket)=>{
   console.log('连接！')
   io.send({
      msg:'连接成功...',    
   })
   io.on('init',doc=>{
      doc.stuid && (data.stuid = doc.stuid)
      doc.password && (data.password = doc.password)
      
   })
})
module.exports = {
   router,
   server:wsServer,
}