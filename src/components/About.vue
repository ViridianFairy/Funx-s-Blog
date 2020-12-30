<template>
  <div id="wrapper">
      <h1>关于...</h1>
      <h2 @click="jump">
         点击跳转：项目GitHub地址
      </h2>
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
      <!--<div class="item" style="margin-bottom:1.5rem ;"><h2>
         <img src="../assets/About/overall.svg" class="icn" style="width: 3.1rem">
         Vue-cli Vue-router Vuex Nodejs Express
      </h2></div>-->
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
	  jump(){
		  window.open("https://github.com/ViridianFairy/Funx-s-Blog")
	  },
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
         {
				ver:"",time:"2019.9.26",body:[
            "第一版",
         ]},
         {ver:"",time:"2019.10.7",body:[
            "第二版",
         ]},
         {ver:"",time:"2019.11.8",body:[
            "懒加载 暂时搁置",
         ]},
         {ver:"",time:"2019.12.2",body:[
            "增加网盘",
         ]},
         {ver:"",time:"2020.2.5",body:[
            "网盘图片瀑布墙",
         ]},
         {ver:"",time:"2020.3.x",body:[
            "考研，项目结束",
         ]},
      ]
    }
  },mounted() {
      
  },
 }
</script>

<style lang='scss' scoped>
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
      color:rgb(102, 159, 161);
      border:none;
      &::before{
         content: '';
      }
      &:hover{
         color:rgb(96, 145, 147);
      }
   }
   h3{
      font-size: 1.4rem;
      font-weight:normal;
      margin:0.2rem 0;
      color:rgb(185, 185, 185);
      &:hover{
         color:rgb(147, 147, 147);
      }
   }
   iframe{
      width: 70rem;
      height: 55rem;
      margin:0 auto 3rem auto;
      transform-origin: 0 0 0;
      transition: all 0.2s;
      &:hover{
         filter: drop-shadow(1px 1px 4px rgb(187, 187, 187))
      }
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

