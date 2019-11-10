<template>
   <div>
      <div class="home-item">
         <div id="title">{{msg}}</div>
         <!--<div id="msgTog">{{msgTog}}</div>-->
      </div>
      
      <div class="home-item"  v-if="mode=='search'">
            <div class="label-wrapper" v-if="categories.length!=0">
               <img class="label-img" src="../assets/Common/label-blue.svg">
               <span class="label" >找到{{categories.length}}条内容：</span>
            </div>
            <div class="item-wrapper" v-for="item in categories">
               <div class="item-time">{{item.time}}</div>
               <p class="item-title" @click="$router.push('/read?id=' + item._id)">{{item.title}}</p>
            </div>
      </div>

      <div id="no-reviews" v-if="mode=='search'&&categories.length==0">
         <div id="no-reviews-body">
            <img src="../assets/Common/nodata.svg" />
            <span>好伤心，什么也没搜到哦...</span>
         </div>
      </div>

      <div class="home-item" v-for="label,i in categories" v-if="mode=='label'">
         <div @click="$router.push('/category?label='+label.label)" class="label-wrapper">
            <img class="label-img" src="../assets/Common/label-blue.svg">
            <span class="label" >{{label.label}}：</span> <!--:style="{color:pieColor[i]}"-->
         </div>
         <div class="item-wrapper" v-for="item in label.data">
               <div class="item-time">{{item.time}}</div>
               <p class="item-title" @click="$router.push('/read?id=' + item._id)">{{item.title}}
                  <span class="time-labels" v-for="label in item.label">·{{label}}</span>
               </p>
            </div>
      </div>

      <div class="home-item">
            <div class="item-wrapper" v-for="item in categories" v-if="mode=='time'">
               <div class="item-time">{{item.time}}</div>
               <p class="item-title" @click="$router.push('/read?id=' + item._id)">{{item.title}}
                  <span class="time-labels" v-for="label in item.label">·{{label}}</span>
               </p>
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
            msg: "",
            msgTog: "",
            mode: 'label',
            // pieColor: ['#FFB876', '#FFD476', '#FF8076', '#899CD6',"#7CC4EC","#FF9966","#FF6666"],
            pieColor: ['#0E6BA8', '#248AD4', '#85B7FC', '#C6CEFF',"#009292","#02DEC5","#016072"],
         };
      },
      created() {
         this.refresh();
      },
      methods: {
         refresh() {
            var label = this.$route.query.label
            var search = this.$route.query.search
            var type = this.$route.query.type
            if (search) {
               this.$http
                  .post("/category-search",{search})
                  .then(res => {
                     this.msg = `搜索：${search}`
                     //this.msg = `搜索到以下内容`
                     this.mode='search'
                     this.categories = res.data;
                  })
            } else if(!type && !label){
                this.$http
                  .post("/category-time-all")
                  .then(res => {
                     this.msg = "时间目录："
                     this.mode = "time"
                     this.categories = res.data;
                  })
                  .catch(e => { });
            }else{
               this.$http
                  .post("/category-label")
                  .then(res => {
                     this.msg = "标签目录："
                     if (label)
                        for (let i in res.data)
                           if (res.data[i].label == label) {
                              var a = [];
                              a.push(res.data[i]);
                              res.data = a;
                              this.mode='label'
                              this.msg = `${a[0].label}标签目录`
                              break;
                           }
                           //console.log(res.data)
                     this.categories = res.data;
                  })
                  .catch(e => { });
            }
            
         }
      }
   };
</script>

<style scoped>
   p {
      margin: 0.7rem 0 0.3rem 0;
   }

   .home-item {
      font-size: 1.6rem;
      padding: 1.4rem;
      padding-left: 4rem;
      padding-bottom: 0.5rem;
      height: 100%;
      position: relative;
      border-bottom: 1px dashed #d9d9d900;
   }

   .label-img {
      height: 1.8rem;
      width: 1.8rem;
      position: relative;
      margin-bottom: 0.5rem;
      margin-top: -0.5rem;
   }

   .label-wrapper {
      display: inline-block;
   }

   .label-wrapper:hover {
      cursor: pointer;
   }

   .label-wrapper:hover .label-img {
      filter: invert(0.08)
   }

   .label-wrapper:hover .label {
      color: rgb(61, 134, 150);
   }

   .label {
      margin-left: 0.7rem;
      font-size: 1.8rem;
      font-weight: normal;
      color: #4195A8;
      vertical-align: 0.8rem;
      margin-bottom: 0.5rem;
      margin-top: -0.5rem;
      user-select: none;

   }

   #title {
      font-size: 2.5rem;
      font-weight: bold;
      color: rgb(65, 149, 168);
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
      color:rgb(255, 239, 224)
   }

   #msgTog {
      margin-top: 0.8rem;
      float: right;
      font-weight: bold;
      color: rgb(103, 160, 173);
      border: 1px solid rgb(173, 206, 214);
      background-color: rgb(255, 255, 255);
      border-radius: 0.6rem;
      padding: 0.5rem 1rem;

   }
   #no-reviews-body {
      margin-top: -3rem;
      text-align: center;
   }
   #no-reviews-body img{
      width: 15rem;
      height: 15rem;
      opacity: 0.35;
   }
   #no-reviews-body span{
      vertical-align:6rem;
      margin-left: 1.5rem;
      font-size: 1.5rem;
      color:#ccc;
   }
   .item-title {
      display: block;
      color: #373738;
      overflow: hidden;
      font-size: 1.6rem;
      height: 2rem;
      font-weight: bold;
      letter-spacing: 0.03rem;
   }
   .time-labels{
      font-size: 1.2rem;
      color: rgb(150, 150, 150);
      font-weight: normal;
      margin-right: 0.5rem;
   }
   .item-time {
      user-select: none;
      font-size: 1.5rem;
      float: right;
      color: rgb(150, 150, 150);
      /* padding-bottom: 4.1rem; */
      margin-bottom: 0rem;
      margin-left: 1rem;
   }

   .item-wrapper:hover .item-title {
      cursor: pointer;

      color: #685e53;
      cursor: pointer;
      user-select: none;
   }

   .item-wrapper:hover .item-time {
      color: rgb(114, 114, 114);
   }

   .item-wrapper:hover {
      border-bottom: 1px solid rgba(155, 126, 93, 0.15);
      color: #615b55;
   }

   .item-wrapper {
      margin-bottom: 0.8rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid rgba(155, 126, 93, 0.07);
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