<template>
   <div id="bezier">
      <canvas id="main" ref="main" width="320" height="320"></canvas>
      <div class="code" ref="code">
         {{msg}}
      </div>
   </div>
</template>

<script>
   import zrender from 'zrender/dist/zrender.min'
   export default {
      name: "bezier",
      methods: {
         refresh(){
            console.log("开始了")
            //if(this.timer) return;
            function limit(pos){
               if(pos<= 8 ) return 8;
               if(pos>= 320 - 8) return (320 - 8)
               return pos
            }
            this.timer = setInterval(()=>{
               this.msg = `${this.p1.position[0]},${this.p1.position[1]}`
               this.p1.attr({
                  position:[
                     limit(this.p1.position[0]),
                     limit(this.p1.position[1]),
                  ]})
               this.p2.attr({
                  position:[
                     limit(this.p2.position[0]),
                     limit(this.p2.position[1]),
                  ]})
               this.curve.attr({
                  shape:{
                     cpx1:this.p1.position[0],
                     cpy1:this.p1.position[1],
                     cpx2:this.p2.position[0],
                     cpy2:this.p2.position[1],
                  }})
               this.l1.attr({
                  shape:{
                     x2:this.p1.position[0],
                     y2:this.p1.position[1],
                  }})
               this.l2.attr({
                  shape:{
                     x2:this.p2.position[0],
                     y2:this.p2.position[1],
                  }})
               //修正拖动点
               
               this.refreshMsg();
            },16.6)
         },
         clearRefresh(e){
            console.log("down")
            clearInterval(this.timer)
            //this.timer = null;
            //性能优化
         },
         refreshMsg(){
            this.msg = `${this.p1.position[0]},${this.p1.position[1]}`
            this.code = ``
         }
      },
      data() {
         return {
            obj_point:{  //通用样式封装
               draggable:true,
               style:{
                  stroke:'rgb(251,254,250)',
                  lineWidth:4,
               },
               shape:{ rx:0 , ry:0 , r:6 },
            },
            obj_line:{
               style:{
                  stroke:'rgb(251,254,250)',
                  lineWidth:4,
               },
            },
            zr:null,p1:null,p2:null,l1:null,l2:null,curve:null
            ,timer:null,msg:"",code:""
         };
      },
      
      mounted() {
         //开始初始化！
         this.zr = zrender.init(this.$refs.main)
            this.obj_point.position = [60,260]
         this.p1 = new zrender.Circle(this.obj_point)
         this.p1.on('mousedown',this.refresh)
         this.p1.on('mouseup',this.clearRefresh)
            this.obj_point.position = [260,60]
         this.p2 = new zrender.Circle(this.obj_point)
         this.p2.on('mousedown',this.refresh)
         this.p2.on('mouseup',this.clearRefresh)
         //
            this.obj_line.shape = {x1:60,y1:260,x2:60,y2:260}
         this.l1 = new zrender.Line(this.obj_line)
            this.obj_line.shape = {x1:260,y1:60,x2:60,y2:260}
         this.l2 = new zrender.Line(this.obj_line)   
            this.zr.add(new zrender.Rect({
               style:{
               stroke:'rgb(251,254,250)',
               lineWidth:4,
               fill:'none'
            },
               shape:{ x:60 ,y:60 , width:200 , height:200 },
               cursor:'normal',
            }))
         this.curve = new zrender.BezierCurve({
            shape:{
               x1:this.p1.position[0],
               y1:this.p1.position[1],
               x2:this.p2.position[0],
               y2:this.p2.position[1],
               cpx1:this.p1.position[0],
               cpy1:this.p1.position[1],
               cpx2:this.p2.position[0],
               cpy2:this.p2.position[1],
            },
            style:{
               stroke:'#6ED8CC',
               lineWidth:4,
               shadowColor:'#6ED8CC',
               shadowOffsetX:0,
               shadowOffsetY:0,
               shadowBlur:1,
            },
            cursor:'normal',
         })
         this.zr.add(this.curve)
         this.zr.add(this.p1)
         this.zr.add(this.p2)
         this.zr.add(this.l1)
         this.zr.add(this.l2)
         this.refreshMsg();
      },
      watch:{
         
      }
   };

</script>

<style scoped>
   canvas {
      background-color: #EDF0F5;
   }
</style>
 <!-- 构造函数封装对象laji
     function Bezier(){
      var zr = zrender.init(document.getElementById('main'))
      var obj_point = {
         draggable:true,
         style:{ fill:'blue'},
         shape:{ rx:0 , ry:0 , r:6 },
      }
      var obj_line = {
         style:{ fill:'blue'},
      }
      var timer;
      var a = ()=>{
         timer = setInterval(()=>{
         console.log(this.p1.position[0]+","+this.p1.position[1])
         this.curve.attr({
            shape:{
               cpx1:this.p1.position[0],
               cpy1:this.p1.position[1],
               cpx2:this.p2.position[0],
               cpy2:this.p2.position[1],
            }})
         this.line1.attr({
            shape:{
               x2:this.p1.position[0],
               y2:this.p1.position[1],
            }})
         this.line2.attr({
            shape:{
               x2:this.p2.position[0],
               y2:this.p2.position[1],
            }})
            zr.refresh()
         
         },16.6)
      }
      var b = ()=>{

         clearInterval(timer)
      }
      //两个圆点
      obj_point.position = [60,260]
      this.p1 = new zrender.Circle(obj_point)
      this.p1.on('mousedown',a)
      this.p1.on('mouseup',b)
      obj_point.position = [260,60]
      this.p2 = new zrender.Circle(obj_point)
      this.p2.on('mousedown',a)
      this.p2.on('mouseup',b)
      obj_line.shape = {x1:60,y1:260}
      this.line1 = new zrender.Line(obj_line)
      obj_line.shape = {x1:260,y1:60}
      this.line2 = new zrender.Line(obj_line)
      zr.add(this.line1)
      zr.add(this.line2)
      this.bgDraw(zr,this.p1,this.p2)
   }
   Bezier.prototype.bgDraw = function(zr,p1,p2){
      zr.add(new zrender.Rect({
         style:{ fill:'none' , stroke:'red' },
         shape:{ x:60 ,y:60 , width:200 , height:200 },
         cursor:'normal',
      }))
      this.curve = new zrender.BezierCurve({
         shape:{
            x1:this.p1.position[0],
            y1:this.p1.position[1],
            x2:this.p2.position[0],
            y2:this.p2.position[1],
            cpx1:this.p1.position[0],
            cpy1:this.p1.position[1],
            cpx2:this.p2.position[0],
            cpy2:this.p2.position[1],
         }
      })
      zr.add(this.curve)
      zr.add(p1)
      zr.add(p2)
   }
 -->
 <!--开始用的 roughjs+ ai path实现 import rough from 'roughjs/dist/rough.umd'
 export default {
    name: "bezier",
    data() {
       return {

       };
    },
    mounted() {
       bezier()
    },
 };
 function bgDraw(can){
     can.path("M248.5,276.5h20v-7l19,7-19,6v-6Z",{fill:'green'})
    can.path("M49.5,77.5v-20h-6l7-19,6,19h-7v20Z",{fill:'green'})
     can.path("M248,78V276H50V78H248m1-1H49V277H249V77Z",{fill:'red'})
 }
 function bezier() {
    const can = rough.canvas(document.getElementById('main'))
    bgDraw(can)
    var v1 = {x:0,y:0}
    var v2 = {x:0,y:0}
    
 } -->