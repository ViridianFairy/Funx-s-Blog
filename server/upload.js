const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const router = express.Router();
router.post("/api/upload/avatar", (req, res) => {
   var form = new formidable.IncomingForm()
   form.uploadDir = '../../resource/user_avatars/'
   form.encoding = 'utf-8'
   form.maxFieldsSize = 1024 * 1024
   form.keepExtensions = true
   form.parse(req, (err, fields, files) => {
      var d = form.uploadDir;
      var newName = fields.user_id
      fs.rename(files.file.path, d + newName+'.png',(err) => {
            if (err) throw err;
            var a = d + newName+'.png?a='+ Math.random();
            res.send({path:a})
            return;
         })
   })
})
router.post("/api/transfer/init",(req,res)=>{
   var form = new formidable.IncomingForm()
   form.uploadDir = '../../resource/user_avatars/'
   form.encoding = 'utf-8'
   form.maxFieldsSize = 1024 * 1024 * 100
   form.keepExtensions = true
   form.parse(req, (err, fields, files) => {
      var d = form.uploadDir;
      var newName = fields.user_id
      fs.rename(files.file.path, d + newName+'.png',(err) => {
            if (err) throw err;
            var a = d + newName+'.png?a='+ Math.random();
            res.send({path:a})
            return;
         })
   })
})

module.exports = router;