<template>
<transition name='public-slide' v-if="!loading">
   <div id="big-wrapper">
      <div style="float:right;margin:1rem 1rem -0.7rem 0;color:#ddd;font-size:1.2rem;">
         暂时凑数，来源：知乎收藏热榜，10分钟更新一次。
      </div>
      <!-- <div class="item">
            <div id="no-reviews-body">
               <img src="../assets/Common/nodata.svg" />
               <span>草，这都被你发现了..
               </span>
            </div>
         <Palette></Palette>
      </div> -->
      <article v-for="(bihu,index) in bihus" :key="index" @click="toggle(index)">
         <div class="head">
            <span>{{index+1}}</span>{{bihu.title}}
         </div>
         <transition name="slide-fade">
            <div class="content" v-html="bihu.content" v-if="shows[index]"></div>
         </transition>
         <div class="author">
            <span>作者：{{bihu.author}}</span>
            <span>赞同数：{{bihu.like}}</span>
         </div>
      </article>
   </div>
</transition>
</template>

<script>
   //import Palette from './Collections/palette.vue'
   export default {
      name: "collection",
      components: {},
      data() {
         return {
           loading:true,
           bihus:[],
           shows:[]
         };
      },
      methods:{
         toggle(index){
            for(let i=0;i<this.shows.length;i++){
               this.shows.splice(i,1,false)
            }
            this.shows.splice(index,1,true)
            this.$nextTick(()=>{
               [].forEach.call(document.querySelectorAll('article img'),item=>{
                  item.removeAttribute('width')
                  item.setAttribute('width','70%')
               });
               [].forEach.call(document.querySelectorAll('article p'),item=>{
                  item.setAttribute('style','margin:0.8rem 0')
               })
           })
         }
      },
      mounted() {
        this.$http.post('/collection/init').then(res=>{
           this.bihus = res.data
           this.loading=false
           this.bihus.forEach(()=>{
              this.shows.push(false)
           })
        })
      },
   };
</script>

<style lang="scss" scoped>
   article{
      line-height: 1.65;
      font-size: 1.5rem;
      border-bottom:1px solid rgb(236, 236, 236);
      padding:16px 0;
      margin:0 32px;
      display: flex;
      flex-direction: column;
      width:calc(100% - 32px);
      color: #1a1a1a;
   }
   .author{
      display: flex;
      span{
         margin-right: 2rem;
      }
      span:nth-of-type(2){
         color:#aaa;
      }
   }
   .head{
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      margin-bottom: 0.5rem;
      span{
         margin:0 1rem 0 0;
         color:rgb(239, 149, 32);
      }
   }
   .content{
      width:calc(100% - 50px);
   }
   figure{
      width: 100%;
   }
   @media screen and (max-width: 768px) {
      article{
         margin:0 20px;
      }
      .content{
      width:calc(100% - 20px);
   }
   }
   .slide-fade-enter-active {
      transition: all 0.2s ease-in;
   }
   .slide-fade-leave-active {
      transition: all 0.2s ease-in;
   }
   .slide-fade-enter,
   .slide-fade-leave {
      transform: translateY(1rem) translateZ(0);
      opacity: 0;
   }
</style>
