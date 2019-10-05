const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const saslprep = require("saslprep")
const Time = require("./commonFunc");
mongoose.connect("mongodb://myblog:731016@106.15.200.151:27017/MyBlog",{
   useNewUrlParser: true,
   useUnifiedTopology: true 
});
 
const Article = mongoose.model("Article",new mongoose.Schema({
   title: String,
   body: String,
   time: Object,
   image: String,
   label: Array,
   lookNum: Number,
   sayNum: Number,
   author: String},
   {collection: "Article"})
);
const User = mongoose.model("User",new mongoose.Schema({
   time:Object,
   user: String,
   pwd: String,
   type: String,
   quote: String,
   lookNum: Number,
   sayNum: Number,
   avatar: String},{
   collection: "Account"})
);
const Review = mongoose.model("Review",new mongoose.Schema({
   _id:String,
   user_id_obj: {type:String,ref:User},
   reply_id_obj: {type:String,ref:User},
   article_id:String,
   dad_id: String,
   thumbNum: Number,
   body: String,
   time: Object},
   {collection: "Review"})
);
router.get('/test',(req,res)=>{
   res.send("test!")
})
router.post("/api/article", (req, res) => {
   Article.find({_id:req.body._id}, function(err, data) {
      if (typeof data == "undefined" || data.length == 0) {
         res.send([
            {
               title: "该文章不存在！",
               body: ``,
               time: "2333/2/23",
               image: "",
               label: [],
               lookNum: -1,
               sayNum: 0,
               author: "admin"
            }
         ]);
         return;
      }
     // 处理用户
      if(typeof req.body.user_id!="undefined")
         User.findOne({_id:req.body.user_id},'lookNum',(err_user,data_user)=>{
            if(data_user != null){
               var a = data_user.lookNum + 1 ;
               User.updateOne({_id:data_user._id},{$set:{lookNum:a}},err=>{if(err) throw err})
            }
         })
     // 处理用户
      data[0].lookNum++;
      Article.updateOne(
         {_id: data[0]._id},
         {
            $set: {lookNum: data[0].lookNum}
         },
         err => {
            if (err) throw err;
         }
      );
      data[0].time = Time.getTime(data[0].time);
      (async function(){
            data[0].sayNum = await new Promise(resolve =>{
               Review.countDocuments({article_id:data[0]._id},(err_r,count)=>{
                  resolve(count)
               })    
            })
         res.send(data);
      })()
      return;
   });
});
router.post("/api/article-save", (req, res) => {
   User.findOne({_id:req.body.user_id},(err_u,data_u)=>{
      if(data_u.type!="admin"){
         res.send({success:0,msg:"不要瞎鸡儿乱点，求你了！"})
         return;
      }else{
            req.body = req.body.article;
            Article.updateOne(
         {_id: req.body._id},
         {
            $set: {
               title: req.body.title,
               body: req.body.body,
               image: req.body.image,
               label: req.body.label
            }
         },
         (err, data) => {
            if (err) {
               res.send({success: 0});
               return;
               throw err;
            } else {
               res.send({success: 1});
               return;
            }
         }
         );
      }
      
   })
   
});
router.post("/api/article-delete", (req, res) => {
   Article.deleteOne({_id: req.body._id}, (err, data) => {
      if (err) {
         res.send({success: 0});
         return;
         throw err;
      } else {
         Review.deleteMany({article_id: req.body._id}, (err_r, data_r) => {
            res.send({success: 1, message: "删除文章成功！"});
            return;
         });
      }
   });
});
router.post("/api/articles", (req, res) => {
   Article.find({})
      .sort({time: -1})
      .exec(function(err, data) {
         if (err) console.log(err);
         for (let i of data) {
            i.time = Time.getFuzzyTime(i.time);
         }
         (async function(){
            for(let i of data){
               i.sayNum = await new Promise(resolve =>{
                  Review.countDocuments({article_id:i._id},(err_r,count)=>{
                     resolve(count)
                  })    
               })
               //console.log(i.sayNum)
            }
            res.send(data);
         })()

         
         
         return;
      });
});
router.post("/api/article-new", (req, res) => {
   User.findOne({_id:req.body.user_id},(err_u,data_u)=>{
      if(data_u.type!="admin"){
         res.send({success:0,msg:"不要瞎鸡儿乱点，求你了！"})
         return;
      }else{
          console.log(req.body)
          let date = new Date();
          var article = new Article({
             title: req.body.article.title,
             body: req.body.article.body,
             time: date,
             image: req.body.article.image,
             label: req.body.article.label,
             lookNum: 0,
             sayNum: 0,
             author: "viridian"}
          )
          article.save((err,data)=>{
            console.log(data)
            res.send({success:1,article_id:data._id})
            return;
          })
         //  Article.findOne({time:date},(err,data)=>{
             
            
         //  })
      }
   
   })
});
//用户
router.post("/api/login-in", (req, res) => {
   User.find({user: req.body.user}, function(err, data) {
      if (err) console.log(err);
      if (data.length == 0) {
         res.send({success: 0, msg: "用户不存在！"});
         return;
      } else if (data[0].pwd == req.body.pwd) {
         res.send({success: 1, _id: data[0]._id, msg: "登录成功"});
         return;
      } else {
         res.send({success: 0, msg: "密码错误！"});
         return;
      }
   });
});
router.post("/api/user-info", (req, res) => {
   User.find({_id: req.body._id}, function(err, data) {
      if (typeof data == "undefined" || data.length == 0) {
         res.send({success: 0});
         return;
      } else {
         res.send({
            success: 1,
            user: data[0].user,
            quote: data[0].quote,
            lookNum: data[0].lookNum,
            sayNum: data[0].sayNum,
            avatar: data[0].avatar
         });
         return;
      }
   });
});
router.post("/api/if-admin", (req, res) => {
   User.find({_id: req.body._id}, function(err, data) {
      //console.log("有权限！")
      if (typeof data == "undefined" || data.length == 0) {
         res.send({success: 0});
         return;
      }
      if (data[0].type == "admin") {
         res.send({success: 1});
         return;
      }
      res.send({success: 0});
      return;
   });
});
router.post("/api/sign", (req, res) => {
   User.find({user: req.body.user}, function(err, data) {
      if (data.length == 1) {
         res.send({success: 0, msg: "用户名已经存在！"});
         return;
      }
      var a = req.body.user.length;

      if (a == 0) {
         res.send({success: 0, msg: "用户名不能为空！"});
         return;
      }
      if (a > 10) {
         res.send({success: 0, msg: "用户名需要少于10个字符"});
         return;
      }
      a = req.body.pwd.length;
      if (a < 3) {
         res.send({success: 0, msg: "密码需要多于3个字符！"});
         return;
      }
      if (a >= 16) {
         res.send({success: 0, msg: "密码需要少于16个字符！"});
         return;
      }
      a = req.body.quote.length;
      if (a > 20) {
         res.send({success: 0, msg: "个性签名需要少于20字符！"});
         return;
      }
      //开始注册
      if (req.body.quote == "") req.body.quote = "这个人骚的一批，以至于ta什么也没有写";
      new User({
         user: req.body.user,
         pwd: req.body.pwd,
         type: "user",
         quote: req.body.quote,
         avatar: req.body.avatar,
         lookNum: 0,
         sayNum: 0,
         time:new Date(),
      }).save();
      res.send({success: 1, msg: "注册并登录成功！"});
      return;
   });
});
router.post("/api/mutate", (req, res) => {
   // console.log(req.body.user+req.body.old);
   User.find({user: req.body.user}, function(err, data) {
      var setObj = {
         quote: req.body.quote,
         avatar: req.body.avatar
      };
      if (req.body.old != "" || req.body.new != "") {
         User.find({user: req.body.user, pwd: req.body.old}, function(errt, datat) {
            if (datat.length == 0) {
               res.send({success: 0, msg: "旧密码错误！"});
               return;
            }
         });
         setObj.pwd = req.body.new;
         a = req.body.new.length;
         if (a < 3) {
            res.send({success: 0, msg: "新密码需要多于3个字符！"});
            return;
         }
         if (a >= 16) {
            res.send({success: 0, msg: "新密码需要少于16个字符！"});
            return;
         }
      }
      a = req.body.quote.length;
      if (a > 20) {
         res.send({success: 0, msg: "个性签名需要少于20字符！"});
         return;
      }
      //开始注册
      // console.log(req.body.user+"-"+req.body.old);
      User.updateOne(
         {user: req.body.user},
         {
            $set: setObj
         },
         (err, data) => {
            if (err) {
               res.send({success: 0, msg: "更新时出错"});
               throw err;
            } else {
               res.send({success: 1, msg: "修改成功！"});
            }
         }
      );
   });
});
//评论
router.post("/api/review", (req, res) => {
   if (req.body.body.trim() == "") {
      res.send({success: 0, msg: "评论内容不能为空哦！"});
      return;
   }
   User.find({_id: req.body.user_id_obj}, function(err, data) {
      var d = new Date();
      if (data.length == 0) {
         res.send({success: 0, msg: "用户不存在！"});
         return;
      } else {
         Review.findOne({article_id: req.body.article_id, user_id_obj: req.body.user_id_obj})
            .sort({time: -1})
            .exec(function(err_r, data_r) {
               if (data_r) {
                  var div = parseInt((d - data_r.time) / 1000);
                  var MAX_SEC = 10;
                  //设了一个间隔时间
                  if (div < MAX_SEC) {
                     res.send({
                        success: 0,
                        msg: `评论太快了，请${MAX_SEC - div}秒后重试`
                     });
                     return;
                  } else {
                     reviewIn();
                  }
               } else {
                  reviewIn();
               }
            });
      }
      function reviewIn() {
         if(typeof req.body.user_id_obj != "undefined")
         User.findOne({_id:req.body.user_id_obj},'sayNum',(err_user,data_user)=>{
            console.log(req.body.user_id_obj+" "+data_user)
            if(data_user != null){
               var a = data_user.sayNum + 1 ;
               console.log(a)
               User.updateOne({_id:data_user._id},{$set:{sayNum:a}},err=>{if(err) throw err})
            }
         })
         new Review({
            _id:Time.getUniqueId(),
            reply_id_obj: req.body.reply_id_obj,
            user_id_obj: req.body.user_id_obj,
            article_id: req.body.article_id,
            dad_id: req.body.dad_id,
            thumbNum: 0,
            body: req.body.body,
            time: d
         }).save();
         res.send({success: 1, msg: "回复成功！"});
         return;
      }
   });
});
router.post("/api/category-label", (req, res) => {
   Article.find({}).sort({time: -1}).exec(function(err, data) {
         let Type = [];
         //预定义
         function hasType(str){
            for(let i of Type)
               if(i.label == str) 
                  return true
            return false
         }
         //预定义
         for(let item of data)
            for(let i of item.label)
               if(!hasType(i)){
                  let typeObj = {
                     label:i,
                     data:[]
                  }
                  Type.push(typeObj)
               }
         //有了所有的type
         for(let item of data){
            item.time = Time.getTime(item.time);
            for(let i of item.label)
               for(let j in Type){
                  if(Type[j].label == i){
                     Type[j].data.push(item)
                  }
               }            
         }
         res.send(Type)
      });
});
router.post("/api/category-search", (req, res) => {
   console.log(req.body.search)
   var title = new RegExp(req.body.search)
   Article.find({title}).sort({time: -1}).exec(function(err, data) {
         for(let i of data){
            i.time = Time.getTime(i.time)
         }
         res.send(data)
         console.log(data);
      });
});
router.post("/api/getReviews", (req, res) => {
   Review.find({article_id: req.body.article_id}).
      populate('reply_id_obj user_id_obj','user avatar')
      .sort({ time: -1 }).exec((err,doc)=>{
         //console.log(doc)
      function getObjById(i){
         for(let j of doc){
            //console.log(j._id +"-"+ i);
            if(j._id == i) return j;
         }
      }
      function isRoot(i){
         for(let j of root){
            if(i._id == j._id) return true;
         }
         return false;
      }
      let root = [];
      for(let item of doc){
         if(!item.dad_id){
            let obj = {
               _id:item._id,
               body:item.body,
               reply_name:(item.reply_id_obj?item.reply_id_obj.user:""),
               user_id_obj:item.user_id_obj,
               reply_avatar:(item.reply_id_obj?item.reply_id_obj.avatar:""),
               user_name:item.user_id_obj.user,
               user_avatar:item.user_id_obj.avatar,
               time:Time.getFuzzyTime(item.time),
               children:[]
            }
            root.push(obj)
         }
      }
      for(let item of doc){
         if(!item.dad_id) continue;
         let user_name = item.user_id_obj.user;
         let user_avatar = item.user_id_obj.avatar;
         let t = item;
         t = getObjById(t.dad_id);
         let reply_name = (item.reply_id_obj?item.reply_id_obj.user:"");
         let reply_avatar = (item.reply_id_obj?item.reply_id_obj.avatar:"");
         let user_id_obj = item.user_id_obj;
         //console.log(t);
         //找到了爹
         while(!isRoot(t)){
            t = getObjById(t.dad_id);
         }
         //t是祖先根节点
         for(let i in root)
            if(t._id == root[i]._id){
               let obj = {
                  _id:item._id,
                  user_id_obj,
                  body:item.body,
                  reply_name,
                  reply_avatar,
                  user_name,
                  user_avatar,
                  dad_id:item.dad_id,
                  time:Time.getFuzzyTime(item.time),
               }
               root[i].children.push(obj);
               break;
            }
      }
      //console.log(root);
      res.send({success:1,data:root});
   })
});
module.exports = router;