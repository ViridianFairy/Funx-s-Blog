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
      <div id="timeChart" ref="timeChart"></div>
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
         },
         quantTextIn(i){
            this.quantText[i].animateTo({
               style:{
                  opacity:1,
               }
            }, 120, 'cirlularOut')
            this.quantCircle[i].animateTo({
               style:{
                  shadowBlur:8,
                  shadowOffsetY:2,
               }
            }, 120, 'cirlularOut')
         },
         quantTextOut(i){
            this.quantText[i].animateTo({
               style:{
                  opacity:0
               }
            }, 120, 'cirlularOut')
            this.quantCircle[i].animateTo({
               style:{
                  shadowBlur:0,
                  shadowOffsetY:0,
               }
            }, 120, 'cirlularOut')
         },
      },
      data() {
         return {
            zr: null,
            categories: [],
            pieData: [],
            pieColor: ['#FFB876', '#FFD476', '#FF8076', '#899CD6',"#7CC4EC","#FF9966","#FF6666"],
            sector:[],
            openAnimate:false,
            timers:[],
            zr2:null,
            quantText:[],
            quantCircle:[],
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
            //开始
         }).catch(e => { });
         /////////
         this.$http.post("/category-time").then(res => {          
            var d = new Date()
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            this.timers = res.data;
            // this.timers = [ 
            // { year: 2019, month: 6, quant: 5 },
            // { year: 2019, month: 7, quant: 10 },
            // { year: 2019, month:8, quant: 11 },
            //    { year: 2019, month: 9, quant: 1 },
            //    { year: 2019, month: 10, quant: 2 },  
            // ]
            this.zr2 = zrender.init(this.$refs.timeChart)
            this.zr2.add(new zrender.Line({
               shape:{
                  x1:2,y1:170,x2:2,y2:20
               },
               style:{
                  lineWidth:3,stroke:"#FFEFE0"
               },cursor:'normal'
            }))
            this.zr2.add(new zrender.Line({
               shape:{
                  x1:2,y1:170,x2:170,y2:170
               },
               style:{
                  lineWidth:3,stroke:"#FFEFE0"
               },cursor:'normal'
            }))
            
            var maxX = 165,perX = 38
            for(let i=this.timers.length-1;i>=0;i--){
               var j = this.timers.length - i -1;
               console.log(maxX - perX*j)
               if(i!=this.timers.length-1){
                  var line = new zrender.Line({
                     shape:{
                        x1:maxX - perX*(j-1), y1: 170 - 170*this.timers[i+1].quant/15,
                        x2:maxX - perX*(j), y2: 170 - 170*this.timers[i].quant/15, percent:0
                     },
                     style:{
                        stroke:'#FFECDD',
                        lineWidth:3,
                     },z:0,cursor:'normal'
                  })
                  this.zr2.add(line)
                  line.animateTo({
                     shape:{
                        percent:1
                     }
                  },100,100*(j+0.5),'quartincInOut')
               }
               var circle = new zrender.Circle({
                  shape:{
                     cx:maxX - perX*j, cy:170 - 170*this.timers[i].quant/15 , r:6
                  },
                  style:{
                     fill:'#FF8076',
                     stroke:'rgb(255, 239, 224)',
                     lineWidth:3,
                     shadowColor: 'rgb(72, 76, 77, 0.45)',
                  },z:5,cursor:'normal',
                  onmouseover:()=>{
                     this.quantTextIn(i)
                  },
                  onmouseout:()=>{
                     this.quantTextOut(i)
                  },
               })
               this.zr2.add(circle)
               var text = new zrender.Text({
                  position:[maxX - perX*j+2,170 - 170*this.timers[i].quant/15 -20],
                  style:{
                     text:this.timers[i].quant+'篇',
                     fontSize:'12',
                     textAlign:'center',
                     textFill:'#FF8076',
                     opacity:0
                  },z:5,cursor:'normal'
               })
               this.zr2.add(text)
               this.quantText.unshift(text)
               this.quantCircle.unshift(circle)
               this.zr2.add(new zrender.Text({
                  position:[maxX - perX*j,180],
                  style:{
                     text:this.timers[i].month+'月',
                     fontSize:'14',
                     textAlign:'center',
                     textFill:'#FF8076',
                     opacity:(this.timers[i].month==month&&this.timers[i].year==year)?1:0.3
                  },z:5,cursor:'normal'
               }))
            }
            return;

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
   #labelChart, #timeChart{
      width: 180px;
      height: 16rem;
      margin: 0 auto;
   }
   #timeChart{
      width: 185px;
      height:18rem;
   }
   .block{
      width:0.7rem;
      height: 2rem;
      display: inline-block;
      margin-right: 0.2rem;
      vertical-align: -0.4rem;
      transition: 0.2s all cubic-bezier(0.230, 1.000, 0.320, 1.000);
   }
   .label-text {
      width: 12.5rem;
      margin: 0.5rem auto;
      font-size: 1.5rem;
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