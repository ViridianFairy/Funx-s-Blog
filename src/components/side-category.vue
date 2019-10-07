<template>
   <div id="wrapper">
      <div id="title">标签分布</div>
      <div id="labelChart" ref="labelChart"></div>
      <transition-group name="chart-fade">
      <div class="label-text" v-for="item,i in categories" 
       @mouseover="animateIn(i)" @mouseout="animateOut(i)" :key="i">
         <span class="block" :style="{backgroundColor:pieColor[i]}" :ref="i"></span>
         {{item.label}} ({{item.data.length}})
      </div>
      </transition-group>
      <div id="title" class="title2">挖坑记录</div>
   </div>
</template>

<script>
   import zrender from 'zrender/dist/zrender.min'
   export default {
      name: "About",
      methods: {
         animateIn(i){
            if(!this.openAnimate) return;
            this.sector[i].animateTo({
                        shape: {
                           r:87
                        },
                        style:{
                           shadowBlur:4,
                           shadowOffsetY:1,
                        }
                     }, 60, 'cirlularOut')
            // this.$refs[i].style.width = "3rem"
            this.$refs[i][0].style.width = "1.4rem"
         },
         animateOut(i){
            if(!this.openAnimate) return;
            this.sector[i].animateTo({
                        shape: {
                           r:80
                        },
                        style:{
                           shadowBlur:0,
                           shadowOffsetY:0,
                        }
                     }, 120, 'cirlularOut')
            this.$refs[i][0].style.width = "0.7rem"
         }
      },
      data() {
         return {
            zr: null,
            categories: [],
            pieData: [],
            pieColor: ['#FFB876', '#FFD476', '#FF8076', '#899CD6',"#7CC4EC","#FF9966","#FF6666"],
            sector:[],
            openAnimate:false
         }
      },
      mounted() {
         this.$http.post("/category-label").then(res => {
            this.categories = res.data;
            this.zr = zrender.init(this.$refs.labelChart)
            var sum = 0;
            var startAngle = []
            var endAngle = []

            for (let i of this.categories) {
               sum += i.data.length
            }
            for (let j in this.categories) {
               this.pieData.unshift({
                  name: this.categories[j].label,
                  value: this.categories[j].data.length / sum
               })
               startAngle.push(0)
               endAngle.push(0)
               startAngle[j] = endAngle[j - 1] / 1000 || 0;
               this.pieData.forEach((v, i) => {
                  endAngle[j] += v.value / 1000
               })
               var sector = new zrender.Sector({
                  position:[10,5],
                  shape: {
                     cx: 80,
                     cy: 80,
                     r: 80,
                     r0: 25,
                     startAngle: startAngle[j], endAngle: endAngle[j],
                  },
                  style: {
                     shadowColor: 'rgb(72, 76, 77, 0.3)',
                     fill: this.pieColor[j],
                     lineWidth:2,
                     stroke:'rgb(255, 239, 224)',
                  },
                  onmouseover: ()=>{
                     this.animateIn(j)
                  },
                  onmouseout:()=>{
                     this.animateOut(j)
                  },
                  cursor:'normal'
               })
               sector.animateTo({
                  shape: {
                     startAngle: (endAngle[j - 1] || 0) * Math.PI * 2 * 1000,
                     endAngle: endAngle[j] * Math.PI * 2 * 1000,
                  }
               }, 700, 'quarticInOut',()=>{
                  this.openAnimate = true;
               })
               //闭包撒
               this.zr.add(sector)
               this.sector.push(sector)
            }
            console.log(this.pieData)
            //开始
         }).catch(e => { });
      },
   };
</script>
<style scoped>
   #title {
      font-size: 2rem;
      font-weight: bold;
      color: rgb(224, 152, 84);
      margin-left: 1.7rem;
      position: relative;
      display: inline-block;
      margin-bottom: 0.7rem;
   }
   .title2{
      margin-top: 1rem;
   }
   #title::before {
      left: -1.9rem;
      top: -0.3rem;
      position: absolute;
      content: "";
      width: 0.7rem;
      height: 3rem;
      background-color: #FFB876;
   }
   #labelChart {
      width: 180px;
      height: 16rem;
      margin: 0 auto;
   }
   .block{
      width:0.7rem;
      height: 2rem;
      display: inline-block;
      margin-right: 0.2rem;
      vertical-align: -0.2rem;
      transition: 0.2s all cubic-bezier(0.230, 1.000, 0.320, 1.000);
   }
   .label-text {
      width: 12.5rem;
      margin: 0.5rem auto;
      font-size: 1.7rem;
      padding-bottom: 0.3rem; 
      color:rgb(125, 107, 94);
   }
   
   #wrapper {
      padding-top: -0.5rem;
   }
   .chart-fade-enter-active {
      transition: all 0.4s ease-out;
   }
   .chart-fade-leave-active {
      transition: all 0.4s ease-out;
   }
   .chart-fade-enter,
   .chart-fade-leave {
      transform: translateX(4rem) translateZ(0);
      opacity: 0;
   }
</style>