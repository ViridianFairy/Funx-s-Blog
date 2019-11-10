const mongoose = require("mongoose");
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
   seen:Array,
   finish:Boolean,
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
const Snake = mongoose.model("Snake",new mongoose.Schema({
   user_id_obj: {type:String,ref:User},
   score:Number},
   {collection: "Snake"})
);
const Poker = mongoose.model("Poker",new mongoose.Schema({
   name:String,
   pokers:Array,
   status:Number,
}))
const Bihu = mongoose.model("Bihu",new mongoose.Schema({
   title:String,
   author:String,
   content:String,
   like:String,
}))
// const Poker = mongoose.model("Poker",new mongoose.Schema({
//    user_id_obj:{ type:String,ref:User},
//    beans:Number,
//    totalGames:Number,
//    winGames:Number,
//    exp:Number
// }))
module.exports = {
   Article,
   User,
   Review,
   Snake,
   Poker,Bihu,
}