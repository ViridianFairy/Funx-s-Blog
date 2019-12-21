const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Time = require('./commonFunc.js')
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
router.post("/api/disk/uploadPublic",(req,res)=>{
   var form = new formidable.IncomingForm()
   form.encoding = 'utf-8'
   form.maxFieldsSize = 1024 * 1024 * 100
   form.keepExtensions = true
   form.parse(req, (err, fields, files) => {
      form.uploadDir = '../../resource/junk' + fields.pos
      console.log(files.file.path)
      fs.access(form.uploadDir + '/'+fields.name,(err)=>{
         if(err){
            fs.rename(files.file.path, form.uploadDir + '/'+fields.name,(err) => {
               if (err) throw err;
                  res.send({success:1})
               return;
            })
         }else{
            res.send({success:0,msg:"上传失败：存在重名文件！"})
            return;
         }
      })
   })
})

router.post('/api/disk/rename',(req,res)=>{
   var path = '../../resource/junk' + req.body.pos +'/'
   fs.access( path+req.body.rename,(err)=>{
      if(err){
         fs.rename(path+req.body.name, path+req.body.rename,function(error){
            res.send({success:1});
            return;
        })
      }else{
         res.send({success:0,msg:"存在重名文件"});
         return;
      }
   });
})
router.post('/api/disk/createFold',(req,res)=>{
   // var jump = false;
   var i;
   (function loop(i){
      var path = '../../resource/junk' + req.body.pos +'/文件夹' + (i==0?'':String(i))
      fs.mkdir(path,function(error){ // 
         if(error){
             console.log(error);
             loop(++i);
         }else{
            // if(jump) return
            res.send({success:1});
            // jump = true
            return;
         }
      })
    })(0)
})
router.post('/api/disk/getPublic',(req,res)=>{
   function timeSort(a,b){
      if(a.isFile && !b.isFile)
         return 1
      else if(!a.isFile && b.isFile)
         return -1
      return b.time - a.time;
   }
   var pathName = '../../resource/junk' + req.body.pos
   fs.readdir(pathName,(err,files)=>{
      var data = [];
      if (err) throw err;
      (function iter(i){
         if(i==files.length){
            data.sort(timeSort)
            data.forEach((v)=>{
               let desp = v.name.split('.')
               v.format = desp[desp.length-1]
            })
            res.send({
               pos:"/",
               data:data,
            });
            return;
         }
         fs.stat(path.join(pathName,files[i]),(err,info)=>{
            if(1){ //info.isFile()
               let obj = {
                  isFile:info.isFile(),
                  name:files[i],
                  size:String(Math.ceil(info.size/1024)).replace(/\B(?=(?:\d{3})+\b)/g, ',') + ' KB',
                  time:info.atime,
                  changeTime:Time.getFuzzyTime(info.atime),
               }
               data.push(obj)
               iter(i+1)
            }
         })
      })(0)
   })
})
module.exports = router;