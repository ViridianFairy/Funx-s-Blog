<template>
  <div id="wrapper">
      <h1>关于...</h1>
      <div id="sky"></div>
      <div id="iframe-wrapper" :style={height:iHeight}>
            <iframe :src="src" :style="{transform:'scale('+ long +')'}" frameborder="0"></iframe>
      </div>   
      <div class="item" v-for="item,i in List">
         <h2><img src="../assets/About/list.svg" class="icn"> {{getVer(item.ver,i)}}
             <img src="../assets/About/time.svg" class="icn"> {{item.time}}
         </h2>
         <h3 v-for="unit in item.body">{{unit}}</h3>
      </div>
      <div class="item" style="margin-bottom:1.5rem ;"><h2>
         <img src="../assets/About/overall.svg" class="icn" style="width: 3.1rem">
         vue-cli vue-router vuex nodejs lottie ZRender
      </h2>
      </div>
  </div>
</template>

<script>  
export default {
  name: 'About',
  computed: {
     iWidth(){
         return document.body.clientWidth+'px'
     },
     iHeight(){
         return 550 * this.long+'px'
     },
     long(){
        var a = Number(document.body.clientWidth)/700
        return (a>=1?1:a)
     }
  },
  methods: {
     getVer(v,i){
        if(v!="") return v;
        var a= this.verBase+i
        var str = String((a/100).toFixed(2))
        return str.slice(0, 3) + '.' + str.slice(3)
     }
  },
  data() {  
    return {
      src:"/funx.html",
      verBase:5,
      List:[
         {ver:"",time:"2019.10.06",body:[
            "个人资料：头像上传后立即刷新",
            "关于页面：ae动画增加交互、移动端缩放",
            "大图片改为外链",
         ]},
         {ver:"",time:"2019.10.08",body:[
            "侧边栏：饼图和折线图（echarts是给调参侠用的",
         ]},
         
      ],
    }
  },mounted() {
      
  },
 }
</script>

<style scoped>
   #wrapper{
      overflow: hidden;
      margin: 0 auto 2rem auto;
      text-align: center;
      color:rgb(48, 134, 137);
      background-image: radial-gradient(rgba(223, 246, 203, 0.097) 0%, rgba(48, 194, 243, 0.111) 20%, rgba(48, 194, 243, 0) 70%);
   }
   h1{
      font-size: 4rem;
      margin: 0.5rem 0 0.5rem 0;
   }
   h2{
      font-size: 1.5rem;
      margin: 0.5rem 0 0 0;
      color:rgb(83, 138, 140);
   }
   h3{
      font-size: 1.4rem;
      font-weight:normal;
      margin:0.2rem 0;
      color:rgb(185, 185, 185)
   }
   iframe{
      width: 70rem;
      height: 55rem;
      margin:0 auto 3rem auto;
      transform-origin: 0 0 0;
      
   }
   #iframe-wrapper{
      margin-bottom: 3.25rem;
   }
   .icn{
      width: 2.2rem;
      vertical-align: -0.6rem;
   }
   @media screen and (max-width: 768px) {
      .home-item {
         padding-left: 1rem;
         padding-right: 1rem;
      }
      /* iframe{
         width:35rem;
         height:50rem;
      } */
     
   }
   .init-enter-active {
      transition: all 0.2s;
   }
   .init-leave-active {
      transition: all 0.2s;
   }
   .init-enter,
   .init-leave {
      opacity: 0;
   }
</style>

