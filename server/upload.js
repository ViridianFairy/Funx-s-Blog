const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const router = express.Router();
router.post("/api/upload/avatar", (req, res) => {
   var form = new formidable.IncomingForm()
   form.uploadDir = path.join(__dirname,'myblog','avatar')
   form.maxFieldsSize = 1024 * 1024
   form.keepExtensions = true
   form.parse(req,(err,fields,file)=>{
      var filePath = ""
      // if(file.tmpFile){
      //    filePath = file.tmpFile.path
      // }
      filePath = file.path
   })
   var targetDir = path.join(__dirname, '../../static/uploads');
   if (!fs.existsSync(targetDir)) {
     fs.mkdir(targetDir);
   }
   var fileExt = filePath.substring(filePath.lastIndexOf('.'));
   //判断文件类型是否允许上传  
   if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
     var err = new Error('此文件类型不允许上传');
     res.json({
       code: -1,
       message: '此文件类型不允许上传'
     });
   } else {
     //以当前时间戳对上传文件进行重命名  
     var fileName = new Date().getTime() + fileExt;
     var targetFile = path.join(targetDir, fileName);
     //移动文件  
     fs.rename(filePath, targetFile, function (err) {
       if (err) {
         console.info(err);
         res.json({
           code: -1,
           message: '操作失败'
         });
       } else {
         User.update({
           username: req.cookies.username
         }, {
           avatar: fileName
         }, (err2, doc2) => {

           //上传成功，返回文件的相对路径  
           // var fileUrl = '/static/upload/' + fileName;
           res.json({
             code: 0,
             fileUrl: fileName
           });
         })

       }
     });
});
module.exports = router;