<template>
   <div>
      <div class="home-item">
         <div id="title">{{msg}}</div>
         <!--<div id="msgTog">{{msgTog}}</div>-->
      </div>
      <div class="home-item" v-for="label in categories">
         <div @click="$router.push('/category?label='+label.label)" class="label-wrapper">
            <img class="label-img" src="../assets/Common/label-blue.svg">
            <span class="label">{{label.label}} 标签：</span>
         </div>
         <div v-for="item in label.data">
            <div class="item-wrapper">
               <div class="item-time">{{item.time}}</div>
               <p class="item-title" @click="$router.push('/read?id=' + item._id)">{{item.title}}</p>              
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: "category",
      components: {},
      data() {
         return {
            categories: [],
            msg:"",
            msgTog:"",
            type:0
         };
      },
      created() {
         this.refresh();
      },
      methods: {
         refresh(){
            var label = this.$route.query.label
            this.$http
            .post("/category")
            .then(res => { 
               this.msg="按标签分类："
               //this.msgTog="切换至 按时间分类"
               if(label)
                  for(let i in res.data)
                     if(res.data[i].label == label){
                        var a = [];
                        a.push(res.data[i]);
                        res.data = a;
                        console.log(res.data)
                        this.msg=`筛选${a[0].label}标签的文章`
                        break;
                     }                
               this.categories = res.data;
            })
            .catch(e => {});
         }
      },
   };
</script>

<style scoped>
   p{
      margin:0.7rem 0 0.3rem 0;
   }
   .home-item {
      font-size: 1.6rem;
      padding: 1.4rem;
      padding-left: 4rem;
      padding-bottom: 2.5rem;
      height: 100%;
      position: relative;
      border-bottom: 1px dashed #d9d9d900;
   }
   .label-img {
      height: 2.5rem;
      width: 2.5rem;
      position: relative;
      margin-bottom: 0.5rem;
      margin-top: -0.5rem;
   }
   .label-wrapper{
      display: inline-block;
   }
   .label-wrapper:hover{
      cursor: pointer;
   }
   .label-wrapper:hover .label-img{
      filter: invert(0.08)
   }
   .label-wrapper:hover .label{
      color:rgb(176, 134, 87);
   }
   .label{
      margin-left:0.7rem;
      font-size: 1.9rem;
      font-weight: bold;
      color:rgb(149, 118, 83);
      vertical-align:0.8rem;
      margin-bottom: 0.5rem;
      margin-top: -0.5rem;
      user-select: none;
      
   }
   #title{
      font-size: 2.5rem;
      font-weight: bold;
      color:rgb(65, 149, 168);
      margin-left: 2.2rem;
      position: relative;
      margin-top: 0.4rem;
      display: inline-block;
   }
   #title::before {
      left: -2.4rem;
      top: -0.4rem;
      position: absolute;
      content: "";
      width: 1rem;
      height: 4rem;
      background-color: #4aacc2;
   }
   #msgTog{
      margin-top: 0.8rem;
      float:right;
      font-weight: bold;
      color:rgb(103, 160, 173);
      border:1px solid rgb(173, 206, 214);
      background-color: rgb(255, 255, 255);
      border-radius: 0.6rem;
      padding:0.5rem 1rem;

   }
   .item-title{
      display: block;
      color:rgb(51, 51, 51);
      overflow: hidden;
      font-size: 1.6rem;
      height:2rem;
   }
   .item-time{
      user-select: none;
      font-size: 1.5rem;
      float: right;
      color:rgb(150, 150, 150);
      /* padding-bottom: 4.1rem; */
      margin-bottom: 0rem;
      margin-left: 1rem;
   }
   .item-wrapper:hover .item-title{
      cursor: pointer;
      
      color:#976530;  
      cursor: pointer;
      user-select: none;
   }
   .item-wrapper:hover .item-time{
      color:rgb(114, 114, 114); 
   }
   .item-wrapper:hover{
      border-bottom: 1px dotted rgba(155, 126, 93, 0.361);  
      color:#976530; 
   }
   .item-wrapper{
      
      border-bottom: 1px dotted rgba(155, 126, 93, 0.15);
   }

   
   /*
   -------------------------------------------
   -------------------------------------------
   -------------------------------------------
   */
   @media screen and (max-width: 768px) {
      .home-item {
         padding-left: 1rem;
         padding-right: 1rem;
      }
     
   }
</style>
