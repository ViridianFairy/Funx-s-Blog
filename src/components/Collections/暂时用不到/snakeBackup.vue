<template>
   <div id="snake-wrapper" :style="{width:canvas_width+'px'}">
      <!--test-->
      <canvas ref="main" :width="canvas_width" :height="(canvas_height+1)"
       :style="{backgroundColor:colors.canvas}"></canvas>
      <transition name="slide-fade">
      <div ref="cover" id="cover" :style="{width:canvas_width+'px',height:canvas_height+'px'}" v-if="cover==1">
         <div id="wrapper" :style="{top:getPhoneTop}">
            <div class="banner">选择模式</div>
            <p class="title">贪吃蛇</p>
            <div class="login-wrapper" @click="judgeAndSign()">
               <img :src="getSayAvatar()" class="say-avatar" />
               <p>{{getRankText}}</p>
            </div>
            <div class="start-wrapper">
               <div class="choose" @click="start()">
                  <img src="../../assets/Snake/mode1.png">
               </div>
               <div class="choose" @click="start('paint');">
                  <img src="../../assets/Snake/mode2.png">
               </div>
            </div>
            <div class="options-wrapper">
               <div class="option" @click="cover=2;refreshRanks();">
                  <img src="../../assets/Snake/1.svg"><p>排行榜</p>
               </div>
               <div class="option" @click="cover=3">
                  <img src="../../assets/Snake/2.svg"><p>设置</p>
               </div>
               <div class="option" @click="cover=4">
                  <img src="../../assets/Snake/3.svg"><p>帮助</p>
               </div>
            </div>
         </div>
      </div>
      </transition>
      <transition name="slide-fade">
      <div ref="cover" id="cover" :style="{width:canvas_width+'px',height:canvas_height+'px'}" v-if="cover==2">
         <div id="wrapper" :style="{top:getPhoneTop}">
            <div class="banner">排行榜</div>
            <div id="rank-wrapper">
               <div class="rank" v-for="(item,index) in show.ranks" :key="item.user" :class="{bloody:index==0,gold:index==1,yellow:index==2}">
                  <img :src="item.avatar">
                  <div class="rank-bg">
                     <span class="index">no.{{index+1}}</span><br>
                     <span class="user">{{item.user}}</span>
                     <span class="score">{{item.score}}</span>
                  </div>
               </div>
            </div>
            <div id="rank-wrapper" class="rank-user">
               <div class="rank" v-for="(item,index) in show.ranks" :key="item.user" :class="{bloody:index==0,gold:index==1,yellow:index==2}">
                  <div v-if="item.user == $store.state.login.user">
                  <img :src="item.avatar">
                  <div class="rank-bg"  style="margin-right: 0.7rem">
                     <span class="index">no.{{index+1}}</span><br>
                     <span class="user">{{item.user}}</span>
                     <span class="score">{{item.score}}</span>
                  </div>
                  </div>
               </div>
            </div>
            <div class="options-wrapper" style="margin-bottom:-0.7rem;margin-top:0rem;">
               <div class="option" @click="cover=1">
                  <img src="../../assets/Snake/4.svg"><p>返回</p>
               </div>
            </div>
         </div>
      </div>
      </transition>
      <transition name="slide-fade">
      <div ref="cover" id="cover" :style="{width:canvas_width+'px',height:canvas_height+'px'}" v-if="cover==3">
         <div id="wrapper" :style="{top:getPhoneTop}">
            <div class="banner">设置</div>
            <p class="intro" >粒子数量：<input v-model="settings.particularNum" maxlength="2"></p>
            <p class="intro setting-intro">吃到食物时散开的粒子数</p>
            <p class="intro">屏幕分辨率：<input disabled v-model="$store.state.snake.screen" style="width:4.7rem"></p>
            <p class="intro setting-intro">默认自适应，暂时还不能自定义</p>
            <div class="options-wrapper">
               <div class="option" @click="cover=1">
                  <img src="../../assets/Snake/4.svg"><p>返回</p>
               </div>
            </div>
         </div>
      </div>
      </transition>
      <transition name="slide-fade">
      <div ref="cover" id="cover" :style="{width:canvas_width+'px',height:canvas_height+'px'}" v-if="cover==4">
         <div id="wrapper" :style="{top:getPhoneTop}">
            <div class="banner">帮助</div>
            <p class="intro">【WASD】或【方向键】进行控制</p>
            <p class="intro">【创造模式】下左键拖动绘制，右键拖动移除</p>
            <p class="intro">2019.10.22最后更新</p>
            <div class="options-wrapper">
               <div class="option" @click="cover=1">
                  <img src="../../assets/Snake/4.svg"><p>返回</p>
               </div>
            </div>
         </div>
      </div>
      </transition>
      <transition name="slide-fade">
      <div ref="cover" id="cover" :style="{width:canvas_width+'px',height:canvas_height+'px'}" v-if="cover==-1">
         <div id="wrapper" :style="{top:getPhoneTop}">
            <div class="banner" style="backgroundColor:#FF5758">你挂掉了</div>
            <p class="title">{{show.deadText}}</p>
            <p class="title enco" :style="{color:show.encoColor}">{{show.encoText}}</p>
            <div class="login-wrapper">
               <img :src="getSayAvatar()" class="say-avatar" />
               <p>{{getEndText}}</p>
               <p>{{show.extraEndText}}</p>
            </div>
            <div id="rank-wrapper" class="rank-user">
               <div class="rank" v-for="(item,index) in show.ranks" :key="item.user" :class="{bloody:index==0,gold:index==1,yellow:index==2}">
                  <div v-if="item.user == $store.state.login.user">
                  <img :src="item.avatar">
                  <div class="rank-bg"  style="margin-right: 0.7rem">
                     <span class="index">no.{{index+1}}</span><br>
                     <span class="user">{{item.user}}</span>
                     <span class="score">{{item.score}}</span>
                  </div>
                  </div>
               </div>
            </div>
            <div class="options-wrapper" style="margin-top:0.5rem">
               <div class="option" @click="cover=1">
                  <img src="../../assets/Snake/4.svg"><p>返回</p>
               </div>
               <div class="option" @click="start()">
                  <img src="../../assets/Snake/5.svg"><p>再战一局</p>
               </div>
            </div>
         </div>
      </div>
      </transition>
      <transition name="fade">
         <div id="cover-beyond" :style="{width:canvas_width+'px',height:canvas_height+'px'}"
          v-if="cover>0"></div>
      </transition>
      <transition name="fade">
         <div id="cover-beyond" :style="{width:canvas_width+'px',height:canvas_height+'px',
          backgroundColor:'rgba(255, 87, 88, 0.15)'}" v-if="cover==-1"></div>
      </transition>
      <div id="button-wrapper">
         <div style="display:inline-block">
            <button @click="toggleReferLine()">参考线</button>
            <button @click="makeWallGroup()">导出</button>
            <input disabled :value="wallData" style="width:5rem"></input>
         </div>
         <p class="score">
            <span class="score-mask">
               <span class="score-block">得分：</span>               
               <span ref="scoreNew">{{score}}</span>
               <span ref="scoreOld">{{score}}</span>
               <span class="score-ghost">{{score}}</span>
            </span>
         </p>
      </div>
   </div>
</template>

<script>
   var PI = 3.141
   import Velocity from 'velocity-animate'
   import zrender from 'zrender/dist/zrender.js'
   export default {
      name: "bezier",
      data() {
         return { // x,y全部为抽象步长
            canvas_width:30*30,
            canvas_height:30*20,
            STEP:30,
            direction:'',
            head:{x:0,y:0,next:null,last:null,el:null},
            food:[],foodMax:6,
            tail:null,
            moveTimer:null,moveQueue:[],moveQueueMax:3,foodTimer:null,
            hz:0,hzLevel:0, //fps
            hzQueue:[[16.67*40,'hsl(206,10%,95%)'], //
            //  0     1     2     3:foodColor 4:foodEdge 5.bgColor  
               [0,16.67*14,10,'hsl(123,45%,69%)',,'hsl(220,2%,100%)'],
               [3,16.67*12,15,'hsl(177,45%,69%)',,'hsl(220,2%,97%)'],
               [6,16.67*10,25,'hsl(208,45%,69%)',,'hsl(220,2%,94%)'],
               [9,16.67*9,30,'hsl(284,45%,69%)',,'hsl(220,2%,91%)'],
               [12,16.67*8,35,'hsl(335,45%,69%)',,'hsl(220,2%,6%)'],
               [15,16.67*7,40,'hsl(359,45%,69%)',,'hsl(220,2%,3%)'],
               [30,16.67*6,45,'hsl(359,45%,69%)',,'hsl(220,2%,0%)'],
            ],
            wallBuffer:0,
            wall:[],zr:null,
            colors:{ //colour
               canvas:"#F8FAFE",
               wall:"hsl(0,0%,69%)",wallEdge:"hsl(0,0%,54%)",
               food:"",foodEdge:"",
               body:"#FF5758",bodyEdge:"#ea4445",
            },
            wallData:"",settings:{particularNum:12,resolution:0},
            paintMode:false,score:0,loadingDelay:200,cover:0,
            show:{maxScore:0,ranks:[],deadText:"",extraEndText:"",encoText:"",encoColor:"",enco:[
               {level:[1],msg:["兄弟，卸游戏吧","手滑了，我懂你","起跑线上摔一下，无所谓的","兄弟，卸游戏吧"],color:"hsl(0,0%,56%)"},
               {level:[2],msg:["兄弟，还得加油啊","还得继续冲冲冲","大神也有失手的时候","蛇：你是不是在演我？"],color:"hsl(0,9%,56%)"},
               {level:[3,4],msg:["这感觉，有内味了","大的，小的，我全都要！","蛇：我真的..吃不动了.."],color:"hsl(0,18%,64%)"},
               {level:[5,6],msg:["兄弟，你真的有点东西噢！","我还能再吃一百年！","蛇：累死老子了，终于停了！"],color:"hsl(0,27%,68%)"},
               {level:[7],msg:["犹如天上降饭桶，真是人间贪吃神！","到底什么时候才能天亮啊！"],color:"hsl(0,36%,72%)"},
            ]},
            phone:{top:"50%"},test:{on:0,el:null}
         };
      },
      methods: {
         toggleReferLine(){
            document.onmousemove = (e)=>{
               var x = Math.floor(e.offsetX/this.STEP);
               var y = Math.floor(e.offsetY/this.STEP);
               if(this.test.on==0){
                  this.test.on = 1
                  this.test.el = new zrender.Text({
                     zlevel:100,
                     style:{fontSize:20}
                  })
                  this.zr.add(this.test.el)
               }
               this.test.el.attr({
                  position:[e.offsetX-30,e.offsetY-20],
                  style:{text:`(${x},${y})`}
               })
               
            }
         },
         refreshRanks(){
            this.$http
            .post("/snake/getAllRanks")
            .then(res => {
               if (res.data.success == 1) {
                  this.show.ranks = res.data.data
               }
            });
         },
         colorHeavy(color,option){
            var ptn = /[\(\),%]/g
            var h = color.match(/\((\d*?),/)[0].replace(ptn,"")
            if(option == 'hue')
               return h
            var s = color.match(/,(\d*?)%,/)[0].replace(ptn,"")
            var l = color.match(/,(\d*?)%\)/)[0].replace(ptn,"")
            if(option == 'wall'){
               return `hsl(${h},${s}%,${l - 7 + Math.floor(Math.random()*14)}%)`
            }
            if(option == 'wallHeavy')
               return `hsl(${h},${s}%,${l-15}%)`
            return `hsl(${h},${s+25}%,${l-30}%)`
         },
         getShowMaxScore(){
            if(!this.Cookies.get("_id")) return
            this.$http
            .post("/snake/getRank", { user_id: this.Cookies.get("_id") })
            .then(res => {
               if (res.data.success == 1) {
                  if(res.data)
                     this.show.maxScore = res.data.data.score
               }
            });
         },
         getSayAvatar() {
            if (this.$store.state.login.user == "")
               return require("../../assets/Common/no-avatar.png");
            return this.$store.state.login.avatar;
         },
         bodyAdd(isHead,isTeleport,tele,elem){
            
            var STEP = this.STEP
            var headX = this.head.x
            var headY = this.head.y
            if(isHead){
                  let group = this.paintElem('head',this.head.x,this.head.y,this.getFixDirection())
                  this.zr.add(group)
                  this.head.el = group 
                  this.tail = this.head
            }else{
               let t = this.head;
               //换元素
               var a1 = this.paintElem('body',this.head.x,this.head.y,0)
               this.zr.remove(t.el)
               this.zr.add(a1)
               t.el = a1
               //换元素
               let el = this.paintElem('head',this.head.x,this.head.y,0)
               this.zr.add(el)
               var bodyObject = {x:t.x, y:t.y, next:t,last:null,el }
               t.last = bodyObject;
               this.head = bodyObject
            }
            
         },
         paintElem(options,x,y,rotation){
            var body = this.colors.body
            var bodyEdge = this.colors.bodyEdge
            var STEP = this.STEP
            if(options=='body')
               return getCircle(x,y)
            if(options=='head')
               return getGroup(x,y,rotation)
            function getCircle(x,y){
               x = x*STEP
               y = y*STEP
               return new zrender.Circle({
                  position:[x,y],
                  shape:{cx:STEP/2,cy:STEP/2,r:STEP/2 - 1},
                  style:{fill:body,stroke:bodyEdge,lineWidth:2},
                  zlevel:10,cursor:"normal"
               })
            }
            function getSmallCircle(x,y){
               return new zrender.Ellipse({
                  position:[0,0],
                  shape:{cx:x,cy:y,rx:STEP*0.28 - 1.3,ry:STEP*0.28 - 2.5},
                  style:{fill:'white',stroke:"black",lineWidth:1},
                  zlevel:10,cursor:"normal"
               })
            }
            function getTinyCircle(x,y){
               return new zrender.Circle({
                  position:[0,0],
                  shape:{cx:x,cy:y,r:STEP*0.10 - 1},
                  style:{fill:'black'},
                  zlevel:10,cursor:"normal"
               })
            }
            function getGroup(x,y,rotation){
               let group = new zrender.Group({
                  position:[x*STEP,y*STEP],
                  origin:[STEP/2,STEP/2],
                  rotation,cursor:"normal"
               })
               let el = getCircle(0,0)
               group.add(el)
               group.add(getSmallCircle(STEP*0.71,STEP*0.3))
               group.add(getSmallCircle(STEP*0.71,STEP*0.7))
               group.add(getTinyCircle(STEP*0.80,STEP*0.3))
               group.add(getTinyCircle(STEP*0.80,STEP*0.7))
               return group
            }
         },
         bodyMove(divX,divY,Angle){
            var t = this.tail
            var self = this
            var tele = {}
            // console.log(`${t.y},${this.canvas_height/this.STEP}`)
            while(t!=this.head){
               let surgeX = Math.abs(t.x - t.last.x)
               let surgeY = Math.abs(t.y - t.last.y)
               t.x = t.last.x;
               t.y = t.last.y;
               changeTelePosForBody(surgeX,surgeY)
               bodyMoveAnimate(t,t.x,t.y,this.hz,this.STEP,0,'body',tele)
               t = t.last
            }
            t.x +=divX
            t.y +=divY
            changeTelePos()
            bodyMoveAnimate(t,t.x,t.y,this.hz,this.STEP,Angle,'head',tele)
            function bodyMoveAnimate(el,x,y,hz,STEP,angle,opt,tele){
               if(opt=='head')
                  var isHead = true
               if(opt=='body')
                   var isHead = false
               var r = el.el.rotation/PI
               if(r>1.4 && r<1.6 && angle >-0.1 && angle<0.1)
                  el.el.rotation = -0.5*PI;
               if(r>-0.1 && r<0.1 && angle/PI >1.4 && angle/PI <1.6)
                  el.el.rotation = 2*PI;
               if(tele.on){           
                  if(isHead){
                     el.x = tele.nx
                     el.y = tele.ny
                     var telem = null
                     //funeral on
                     var deleteEl = el.el
                     deleteEl.animateTo({
                        position:[x*STEP,y*STEP],
                        rotation:angle,
                     },hz)
                     setTimeout(()=>{
                        self.zr.remove(deleteEl)
                     },hz)
                     telem = self.paintElem('head',tele.ox,tele.oy,self.getFixDirection())
                     self.zr.add(telem)
                     telem.animateTo({
                        position:[tele.nx*STEP,tele.ny*STEP],
                        rotation:angle,
                     },hz)
                     el.el = telem
                  }else{
                     debugger
                     el.el.attr = [x*STEP,y*STEP]
                     console.log('body')
                     el.el.animateTo({
                        position:[x*STEP,y*STEP],
                        rotation:angle,
                     },hz)
                  } 
               }else{
                  el.el.animateTo({
                     position:[x*STEP,y*STEP],
                     rotation:angle,
                  },hz)
               }
            }
            function changeTelePos(){
               if(t.x == 30){
                  tele.ox = -1; tele.nx = 0 ;tele.oy = t.y; tele.ny = t.y;tele.on =1;
               }
               if(t.x == -1){
                  tele.ox = 30; tele.nx = 29 ;tele.oy = t.y; tele.ny = t.y;tele.on =1;
               }
               if(t.y == 20){
                  tele.ox = t.x; tele.nx = t.x ;tele.oy = -1; tele.ny = 0;tele.on =1;
               }
               if(t.y == -1){
                  tele.ox = t.x; tele.nx = t.x ;tele.oy = 20; tele.ny = 19;tele.on =1;
               }
            }
            function changeTelePosForBody(surgeX,surgeY){
               tele.on = 0
               if(t.y == 0 && surgeY>5){
                  tele.on =1;
               }
               if(t.y == 19 && surgeY>5){
                  tele.on =1;
               }
               if(t.x == 0 && surgeX>5){
                  tele.on =1;
               }
               if(t.x == 29 && surgeX>5){
                  tele.on =1;
               }
            }
         },
         checkDead(){
            // if(this.head.x < 0 +this.wallBuffer || this.head.x >= this.canvas_width/this.STEP - this.wallBuffer)
            //     this.dead()
            // if(this.head.y < 0 +this.wallBuffer || this.head.y >= this.canvas_height/this.STEP- this.wallBuffer)
            //     this.dead()
            //test
            // var t = this.head.next
            // while(t){
            //    console.log(`死亡检测：（${this.head.x},${this.head.y}）（${t.x},${t.y}）`)
            //    if(t.x == this.head.x && t.y == this.head.y)
            //       this.dead()
            //    t = t.next
            // }
            for(let i=0;i<this.wall.length;i++){
               if(this.head.x == this.wall[i].x && this.head.y == this.wall[i].y)
                  this.dead()
            }
         },
         checkEat(){
            for(let i=0;i<this.food.length;i++){
               let item = this.food[i]
               let x = this.head.x
               let y = this.head.y
               // console.log(item)
               if((x == item.x && y == item.y &&item.type=='normal')||(item.type=='bonus'&&
               ((x == item.x && y == item.y)||(x-1 == item.x && y == item.y)||(x == item.x && y-1 == item.y)||(x-1 == item.x && y-1 == item.y)))){
                  this.bodyAdd()
                  this.zr.remove(item.el)
                  this.food.splice(i,1)
                  this.effectEat(this.head.x*this.STEP,this.head.y*this.STEP,item.level,item.type)
                  if (item.type=='normal') this.score += this.hzQueue[item.level][2];
                  if (item.type=='bonus') this.score += this.hzQueue[item.level][2]*3;
                  if(this.score >= this.hzQueue[this.hzLevel+1][0]){
                     this.hzLevel++
                     this.hz = this.hzQueue[this.hzLevel][1]
                     this.changeHz(this.hz)
                     this.colors.canvas = this.hzQueue[this.hzLevel][5]
                  }
                  return;
               }
            }
         },
         makeFood(obeyMax,option){
            if(this.food.length >= this.foodMax && !obeyMax) return;
            var wall = this.wall;
            var pos = {
               x:Math.floor(Math.random()*(this.canvas_width/this.STEP - 2*this.wallBuffer) + this.wallBuffer),
               y:Math.floor(Math.random()*(this.canvas_height/this.STEP - 2*this.wallBuffer) + this.wallBuffer)
            }
            if(option=='bonus'){
               if(!judgeWall(pos))
                  return;
               pos.x++
               if(!judgeWall(pos))
                  return;
               pos.y++
               if(!judgeWall(pos))
                  return;
               pos.x--
               if(!judgeWall(pos))
                  return;
            }else{
               if(!judgeWall(pos)){
                  return;
               }
            }
            var x = pos.x
            var y = pos.y
            var level = this.hzLevel;
            if(option=='bonus'){
               var type = 'bonus';
               var el = new zrender.Circle({
                  position:[x*this.STEP,y*this.STEP],
                  shape:{cx:this.STEP,cy:this.STEP,r:this.STEP - 2},
                  style:{fill:this.hzQueue[level][3],stroke:this.hzQueue[level][4],lineWidth:2},
                  zlevel:5,origin:[this.STEP,this.STEP],scale:[0,0],cursor:"normal"
               })
            }else{
               var type = 'normal';
               var el = new zrender.Circle({
                  position:[x*this.STEP,y*this.STEP],
                  shape:{cx:this.STEP/2,cy:this.STEP/2,r:this.STEP/2 - 2},
                  style:{fill:this.hzQueue[level][3],stroke:this.hzQueue[level][4],lineWidth:2},
                  zlevel:5,origin:[this.STEP/2,this.STEP/2],scale:[0,0],cursor:"normal"
               })
            }

            el.animateTo({
               scale:[1,1]
            },300,"quadraticOut")
            this.zr.add(el)
            this.food.push({x,y,el,level,type}) //
            function judgeWall(pos){
               let i;
               for(i=0;i<wall.length;i++){
                  if(pos.x == wall[i].x && pos.y == wall[i].y) 
                     return false
               }
               return true
            }
         },
         makeWall(x,y){
            var color = this.colorHeavy(this.colors.wall,'wall')
            var wall = new zrender.Rect({
               position:[x*this.STEP,y*this.STEP],
               shape:{x:0.5,y:0.5,width:this.STEP-1,height:this.STEP-1},
               style:{fill:color,stroke:this.colorHeavy(color,'wallHeavy'),opacity:0,lineWidth:3},
               zlevel:0,cursor:"normal"
            })
            wall.animateTo({
               style:{opacity:1}
            },16.67*10)
            this.zr.add(wall)
            var obj = {
               x,y,el:wall
            }
            this.wall.push(obj)
         },
         makeWallGroup(arr){
            if(!arr){
               let arr = []
               this.wallData = "";
               for(let i=0;i<this.wall.length;i++){
                  let x = this.wall[i].x;
                  let y = this.wall[i].y;
                  arr.push({x,y})
                  this.wallData += `[${x},${y}],`
               }
               return;
            }
            for(let i=0;i<arr.length;i++)
               setTimeout(()=>{this.makeWall(arr[i][0],arr[i][1])},16.67/3*i)
         },
         generateMap(){
            for(let i=0;i<this.wall.length;i++){
               let x = this.wall[i].x;
               let y = this.wall[i].y;
               let max = this.canvas_width/this.STEP;
               this.zr.remove(this.wall[i].el)
            }
            this.wall = []
            //this.makeWallGroup([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[29,1],[29,2],[29,3],[29,4],[29,5],[29,6],[29,7],[29,8],[29,9],[29,10],[29,11],[29,12],[29,13],[29,14],[29,15],[29,17],[29,18],[29,19],[29,16],[28,19],[27,20],[27,19],[26,19],[25,19],[24,19],[23,19],[22,19],[21,20],[20,20],[19,20],[17,20],[18,19],[19,19],[20,19],[21,19],[17,19],[16,19],[15,19],[14,19],[13,19],[12,19],[11,19],[10,19],[9,19],[8,19],[7,19],[6,19],[5,19],[4,19],[3,19],[2,19],[1,19],[0,19],[0,18],[0,17],[0,16],[0,13],[0,14],[0,15],[0,12],[0,11],[0,10],[0,9],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1]])
            var sum = 0;
            for(let i=0;i<this.canvas_width/this.STEP-1;i++){
               for(let j=0;j<this.canvas_height/this.STEP-1;j++){
                  if(i<this.wallBuffer || i>this.canvas_width/this.STEP - this.wallBuffer) continue;
                  if(j<this.wallBuffer || j>this.canvas_height/this.STEP - this.wallBuffer) continue;
                  var s = Number(Math.random()).toFixed(2)
                  if(s > 0.91){
                     setTimeout(()=>{
                        this.makeWall(i,j)
                     },sum*16.67)
                     sum++;
                  }
                     
               }
            }
            return sum*16.67
         },
         dead(){
            clearInterval(this.foodTimer)
            clearInterval(this.moveTimer)
            var user_id = this.Cookies.get("_id")
            for(let i=0;i<this.show.enco.length;i++){
               let item = this.show.enco[i]
               for(let j=0;j<item.level.length;j++){
                  if(item.level[j]==this.hzLevel){
                     let random = Math.floor(Math.random()*item.msg.length)
                     this.show.encoText =  item.msg[random]
                     this.show.encoColor = item.color
                     continue;
                     continue;
                  }
               }
            }
            if(!this.paintMode && user_id){
               this.$http
               .post("/snake/uploadRank", { user_id,score:this.score})
               .then(res => {
                  if(!res.data) return;
                  this.show.deadText = ""
                  this.show.extraEndText = ""
                  if (res.data.success == 1 || res.data.success == 2) {
                     this.show.deadText += "个人新纪录！"
                     this.show.encoText = ""
                     this.show.maxScore = this.score
                  }else{
                     this.show.extraEndText = "历史最高：" + this.show.maxScore
                  }
                  
                  
                  this.refreshRanks()
               });
            }
            this.paintMode = false;
            clearInterval(this.moveTimer)
            setTimeout(()=>{
               this.effectDead(this.head.x*this.STEP,this.head.y*this.STEP)
            },this.hz*0.9)
            setTimeout(()=>{
               this.cover=-1
               document.onkeydown = (e)=>{
                  // e.preventDefault();
                  if(e.key==' '|| e.key=='Enter'){
                     this.start()
                  }
                  
               }
            },this.hz * 2.2)
            
         },
         getFixDirection(){
             switch(this.direction){              
               case "up":
                   return PI*(0.5).toFixed(3)  
                   break;           
               case "left":
                   return PI*(1).toFixed(3) 
                   break;               
               case "down":
                   return PI*(1.5).toFixed(3)
                   break; 
               case "right":
                   return PI*(0).toFixed(3)
                   break;               
               }
         },
         effectEat(x0,y0,level,type){
            x0 += this.STEP/2
            y0 += this.STEP/2
            if(type == 'bonus')
               var r = this.STEP*1 * (0.7 + 0.3 * Math.random())
            else       
               var r = this.STEP*0.55 * (0.7 + 0.3 * Math.random())
            for(let i =0;i< this.settings.particularNum;i++){
               let lightness = Math.floor(Math.random() * 40 + 40)
               let pos1 = Math.random()*(this.STEP*2) - (this.STEP)
               let pos2 = Math.random()*(this.STEP*2) - (this.STEP)
               if(type == 'bonus'){
                  pos1 = Math.random()*(this.STEP*3.6) - (this.STEP*1.8)
                  pos1 = Math.random()*(this.STEP*3.6) - (this.STEP*1.8)
               }
               let color = this.colorHeavy(this.hzQueue[level][3],'hue') - 10 + Math.random() * 20;
               let particle = new zrender.Circle({
                  shape: {
                     cx: 0,cy: 0,r },
                  style: {
                     fill: 'hsl(' + Math.floor(color)+ ',60%,'+ lightness + '%)',
                     stroke: 'hsl(' + Math.floor(color)+ ',60%,'+ (lightness-10) + '%)',
                     lineWidth:2,
                  },
                  position: [x0, y0],
                  zlevel:20,
               });
               this.zr.add(particle);
               particle.animateTo({
                  position:[x0 + pos1,y0 + pos2],
                  scale:[0,0]
               },this.hz*7.19,"quinticOut",()=>{
                  this.zr.remove(particle)
               })
            }
         },
         effectDead(x0,y0){
            var shakeX = 0
            var shakeY = 0
            switch(this.direction){
               case "right":
                  shakeY = 0.6; 
                  break;
               case "left":
                  shakeY = 0.6; 
                  break;
               case "up":
                  shakeX = 0.6; 
                  break;
               case "down":
                  shakeX = 0.6; 
                  break;
            }
            var animator = this.head.el.animate('')
            var halfFrame = this.hz*0.9
            animator.when(halfFrame,{
               postion:[x0 + shakeX*this.STEP, y0 + shakeY*this.STEP]
            }).when(halfFrame*1.5,{
               position:[x0 - shakeX*this.STEP, y0 - shakeY*this.STEP],
            }).when(halfFrame*2,{
               position:[x0, y0],
            }).done().start("bounceOut") 
         },
         bulletMode(into,ratio){
            if(into){
               this.hz = this.hz + (16.67 * 20)
            }else{
               this.hz = this.hz - (16.67 * 20)
            }
         },
         goPaintMode(){
            this.paintMode = true;
            this.hz = this.hzQueue[0][0]
            var isPainting = undefined;
            var self = this;
            if(this.paintMode){
               this.colors.canvas = this.hzQueue[0][1]
               this.zr.on("mousedown",down)
               this.zr.on("mouseup",up)
               this.zr.on("mousemove",paintOn)
            }else{
               this.colors.canvas = this.hzQueue[1][5]
               isPainting = undefined;
               this.zr.off("mousedown")
               this.zr.off("mouseup")
               this.zr.off("mousemove")
            }
            function down(e){  
               if(e.which == 3)
                  isPainting = 'right';
               else
                  isPainting = 'left';
            }
            function up(){  
               isPainting = undefined;
            }
            function paintOn(e){
               if(!isPainting) return;
               var x = Math.floor(e.offsetX/self.STEP);
               var y = Math.floor(e.offsetY/self.STEP);
               if(isPainting == 'left'){
                  for(let i=0;i<self.wall.length;i++){
                     let t = self.wall[i];
                     if(t.x == x && t.y == y){
                        return;
                     }
                  }
                  self.makeWall(x,y)
               }else if(isPainting == 'right'){ 
                     for(let i=0;i<self.wall.length;i++){
                        let t = self.wall[i];
                        if(t.x == x && t.y == y){
                           self.zr.remove(t.el)
                           self.wall.splice(i,1)
                           return;
                        }
                     }
                  }
               }
         },
         start(mode){
            let body = this.head
            while(body){
               if(body.el) this.zr.remove(body.el)
               body = body.next
            }
            for(let i =0;i<this.food.length;i++){ 
               this.zr.remove(this.food[i].el)
            }//一系列重绘
            this.tail = null
            this.food = []
            this.score = 0
            this.cover = 0;
            this.hzLevel = 1;
            this.moveQueue = [];
            if(mode=='paint'){
               this.hz = this.hzQueue[0]
               this.goPaintMode()
            }else{
               this.hz = this.hzQueue[1][1]
               this.colors.canvas = this.hzQueue[this.hzLevel][5]
            } 
            this.$refs.cover.style.opacity = 0;//拿掉这破玩意
            
            setTimeout(()=>{
               //定义一些函数
               this.direction = getDirection()
               var self = this;
               for(let i=1;i<=9;i++){
                  setTimeout(()=>{this.makeFood(true)},i*16.67*5)
               }
               this.foodTimer = setInterval(()=>{
                  this.makeFood()
                  this.makeFood(false,'bonus')
               },1100)
               function getDirection(){
                  switch(Math.floor(Math.random()*4)){
                     case 0:
                        return 'left'
                     case 1:
                        return 'right'
                     case 2:
                        return 'up'
                     case 3:
                        return 'down'
                  }
               }
               function getForwardSpace(){
                  switch(self.direction){
                     case 'left':
                        return [-1,0]
                     case 'right':
                        return [1,0]
                     case 'down':
                        return [0,1]
                     case 'up':
                        return [0,-1]
                  }
               }
               function judgeWall(pos){
                  let i,j;
                  var fPos = getForwardSpace()
                  for(j=0;j<5;j++){
                     for(i=0;i<self.wall.length;i++){
                        // console.log(`检测${pos.x},${pos.y},追加量是(${fPos[0]},${fPos[1]})*${j}`)
                        if(pos.x + fPos[0] *j == self.wall[i].x && pos.y + fPos[1] *j == self.wall[i].y)
                           return false
                     }
                  }
                  return true
               }
               function getPos(){
                  let x = x || Math.floor(Math.random()*(self.canvas_width/self.STEP - 2*self.wallBuffer) + self.wallBuffer)
                  let y = y || Math.floor(Math.random()*(self.canvas_height/self.STEP - 2*self.wallBuffer) + self.wallBuffer)
                  return {x,y}
               }
               var tPos = getPos()
               while(!judgeWall(tPos)){
                  tPos = getPos()
               }
               this.head = {x:tPos.x,y:tPos.y,next:null,last:null,el:null}
               this.bodyAdd(true)
               this.changeHz(this.hz)
               document.onkeydown = (e)=>{
                  // e.preventDefault();
                  // if(this.moveQueue.length == this.moveQueueMax+1) return;
                  switch(e.key){
                      case "w": case "ArrowUp":
                        this.moveQueue.push('up')
                        break;
                      case "s": case "ArrowDown":
                        this.moveQueue.push('down')
                        break;
                      case "a": case "ArrowLeft":
                        this.moveQueue.push('left')
                        break;
                      case "d": case "ArrowRight":
                        this.moveQueue.push('right')
                        break;
                  }
                  // console.log(this.moveQueue.join('-'))
               }
            },this.generateMap())
         },
         changeHz(hz){
            clearInterval(this.moveTimer)
            this.moveTimer = setInterval(()=>{
               
               if(this.head.y == 20 || this.head.y == -1 || this.head.x == -1 || this.head.x == 30){

               }else{
                  var t = this.moveQueue.shift()
                  while(!validDirection(t,this.direction) && this.moveQueue.length!=0){
                     t = this.moveQueue.shift()
                  }
                  if(validDirection(t,this.direction)) this.direction = t
                  this.checkEat()
               }
               
               let direction = this.getFixDirection(this.direction)
                switch(this.direction){
                  case "right":
                      this.bodyMove(1,0,direction)
                      break;
                  case "left":
                      this.bodyMove(-1,0,direction)
                      break;
                  case "up":
                      this.bodyMove(0,-1,direction)
                      break;
                  case "down":
                      this.bodyMove(0,1,direction)
                      break;
                  }
               this.checkDead()
            },hz)
            function validDirection(d,direction){
               if(!d) return false;
               switch(d){
                  case "left":
                     if(direction=='left' || direction=='right') return false
                     return true
                  case "right":
                     if(direction=='left' || direction=='right') return false
                     return true
                  case "up":
                     if(direction=='up' || direction=='down') return false
                     return true
                  case "down":
                     if(direction=='up' || direction=='down') return false
                     return true
               }
            }
         },
         judgeAndSign(){
            if (this.$store.state.login.avatar!='') return
            setTimeout(()=>{
               this.$store.commit('receiveLoginState',-1)
               this.$store.commit('receiveLoginTog',true)
            },10)
         },
      },
      created(){
         var width = document.body.clientWidth;
         var fixedWidth = width>1120?1060:width-40
         var ratio = this.canvas_width/fixedWidth
         this.$store.state.snake.screen = fixedWidth + 'px'
         this.canvas_width/=ratio
         //this.canvas_height+=1
          //test
         this.canvas_height/=ratio
         this.STEP/=ratio 
         for(let i=2;i<this.hzQueue.length;i++){
            this.hzQueue[i][0] = this.hzQueue[i-1][0] + this.hzQueue[i-1][2]*this.hzQueue[i][0]
         }
         for(let i=1;i<this.hzQueue.length;i++){
            this.hzQueue[i][4] = this.colorHeavy(this.hzQueue[i][3])
         }
      },
      mounted() {
         // //
         // this.direction = 'up'
         // console.log(this.getFixDirection())
         //
         
         if (document.body.clientWidth <= 768){
            this.phone.top = '100%'
         }
         
         this.getShowMaxScore()
         this.$refs.main.oncontextmenu = function(e){
            e.preventDefault();
         }
         this.zr = zrender.init(this.$refs.main)
         var cursor = 'normal'
         var strokeNoScale = true
         for(let i=0;i<=this.canvas_width/this.STEP;i++){
            if(i<this.wallBuffer || i>this.canvas_width/this.STEP - this.wallBuffer){ continue;}
               setTimeout(()=>{
                  var line = new zrender.Line({
                     position:[i*this.STEP,0],
                     shape:{x1:0,y1:0 + this.STEP*this.wallBuffer,
                            x2:0,y2:this.canvas_height-this.STEP*this.wallBuffer,percent:0},
                     style:{lineWidth:0.5,stroke:'#C7C8C8'},cursor,
                     percent:0,
                  })
                  line.animateTo({
                     shape:{percent:1}
                  },300)
                  this.zr.add(line)
               },this.loadingDelay + i*16.67*2)
         }
         for(let i=0;i<=this.canvas_height/this.STEP;i++){
            if(i<this.wallBuffer || i>this.canvas_height/this.STEP - this.wallBuffer) continue;
               setTimeout(()=>{   
                  var line = new zrender.Line({
                     position:[0,i*this.STEP],
                     shape:{x1:this.STEP*this.wallBuffer,y1:0,
                            x2:this.canvas_width-this.STEP*this.wallBuffer,y2:0,percent:0},
                     style:{lineWidth:0.5,stroke:'#C7C8C8'},cursor,strokeNoScale,
                     
                     percent:0,
                  })
                  line.animateTo({
                     shape:{percent:1}
                  },300)
                  this.zr.add(line)
               },this.loadingDelay + i*16.67*2)
         }
         setTimeout(()=>{
            this.cover = 1;
         },this.loadingDelay + this.generateMap())
      },
      computed:{
         getRankText(){
            if(!this.$store.state.login.user)
               return "点击注册，记录你的成绩和排名"
            return this.$store.state.login.user + "的最高分："+ this.show.maxScore
         },
         getEndText(){
            if(!this.$store.state.login.user)
               return "得分："+ this.score + " （未登录,分数浪费了哦..）"
            return this.$store.state.login.user + "的本次得分："+ this.score
         },
         getPhoneTop(){
            return this.phone.top
         }
      },
      watch: {
         score(val,old){
            var oel = this.$refs.scoreOld
            var nel = this.$refs.scoreNew
            oel.innerText = old
            oel.style.top = '0'
            nel.style.top = '3rem'
            Velocity(oel,{top:'-3rem'},{duration:this.hz*1.8,easing:"easeInOutQuart"})
            Velocity(nel,{top:'0rem'},{duration:this.hz*1.8,easing:"easeInOutQuart"})
         }
      },
   };

</script>

<style lang="scss" scoped>
   #snake-wrapper{
     margin: 0 auto;
     color:rgba(255, 87, 88, 0.2);
     color:rgb(125, 227, 130);
     position: relative;
   }
   canvas {
      transform: translateZ(0);
      background-color: #F8FAFE;
      transition: 0.5s all;
   }
   #cover-beyond{
      position: absolute;
      left:0;
      top: 0;
      z-index: 9;
      transition: 0.2s all;
      background-color: rgba(0, 0, 0, 0.15);
   }
   #cover{
      position: absolute;
      left:0;
      top: 0;
      z-index: 10;
      transition: 0.2s all;
      #wrapper{
         min-width: 30rem;
         padding:3rem 2rem 1.5rem 2rem;
         background-color: rgba(255, 255, 255, 1);
         position: absolute;
         height: auto;
         width:auto;
         left:50%;
         top:50%;
         border-radius: 0.8rem;
         transform: translate(-50%,-50%);
         .login-wrapper{
            margin-top: 1rem;
            img{
               width: 7rem;
               height: 7rem;
               border-radius: 50%;
               display: block;
               margin:0 auto;
            }
            p{
               letter-spacing: .05rem;
               text-align: center;
               margin:0.8rem 0 1.0rem 0;
               font-size: 1.7rem;
               color:#aaa;
            }
         }
         .banner{
            letter-spacing: 0.2rem;
            position: absolute;
            left:50%;
            top:0;
            transform: translate(-50%,-50%);
            background-color: #79CEF2;
            color:white;
            font-size: 2.1rem;
            width: 23rem;
            text-align: center;
            padding:0.8rem 0;
            border-radius: 0.8rem;
         }
         .options-wrapper{
            display: flex;
            justify-content: space-around;
            .option{
               img{
                  width:4.2rem;
                  transition: 0.2s all;
                  margin:0 auto;
                  display: block;
               }
               p{
                  font-size: 1.5rem;
                  text-align: center;
                  margin:0.3rem 0 0 0;
                  color:rgb(142, 142, 142);
                  letter-spacing: 0.1rem;
                  transition: 0.2s all;
               }
               &:hover img{
                  filter:invert(0.05);
                  cursor: pointer;
               }
               &:hover p{
                  color:rgb(108, 108, 108);
                  cursor: pointer;
               }
            }
            
         }
         .start-wrapper{
            display: flex;
            justify-content: space-around;
            .choose{
               img{
                  width:12rem;
                  transition: 0.2s all;
                  &:hover{
                     filter:brightness(1.075);
                     cursor: pointer;
                  }
               }
               
            }
         }
         input{
            width:3rem;
         }
      }
      .title{
         margin:0;
         font-size: 3.2rem;
         color:#2BBBDC;
         font-weight: bold;
         text-align: center;
      }
      .enco{
         font-size: 2.4rem;
         color:#8E8E8E;
      }
      
      .big{
         // padding:0.8rem 1.5rem;
         font-size: 1.8rem;
         margin:0 0.5rem;
      }
      .intro{
         text-align: center;
         font-size: 1.8rem;
         color:rgb(168, 168, 168);
         margin:0.4rem 0 0.6rem 0;
      }
      .setting-intro{
         margin-bottom: 0.7rem;
         margin-top: -0.5rem;
         font-size: 1.5rem;
         color:rgb(222, 222, 222);
         letter-spacing: 0.1rem;
      }
   }
   #button-wrapper{
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      button{
         padding:0.6rem 1.2rem;
         margin: 0 0.5rem;
      }
      textarea{
         margin-top: 0.5rem;
         transition: none;
      }
   }
   #rank-wrapper{
      overflow-y:scroll;
      height:26.5rem;
      .rank{
         margin:0.8rem 1.2rem;
         font-size: 2rem;
         .rank-bg{
            margin-top: 0.1rem;
            background-color: rgb(121, 204, 239);
            border-radius: 2rem;
            width:25.5rem;
            float:right;
            .index{
               margin-top: 0.3rem;
               margin-left:1.5rem;
               color:rgb(76, 131, 154);
               font-size: 1.2rem;
               font-weight: bold;
               float:left;
            }
            .user{
               // font-weight: bold;
               letter-spacing: 0.075rem;
               margin-top: -0.9rem;
               margin-left:1.5rem;
               margin-bottom:0.3rem;
               font-size: 1.95rem;
               color:rgb(255, 255, 255);
               float:left;
            }
            .score{
               margin-right: 1.5rem;
               margin-top: -1.8rem;
               color:rgb(77, 110, 123);
            }
            
         }
         img{
            border:0.25rem solid rgb(121, 204, 239);
            vertical-align: middle;
            width:4rem;
            height:4rem;
            border-radius: 50%;
            margin-right: 1rem;
         }
         span:nth-of-child(1){
            margin-right: 2rem;
         }
         
      }
      .yellow{
         img{
            border-color:rgb(239, 209, 121);
         }
         .rank-bg{
            background-color: rgb(239, 209, 121);
            
            .index{
               color:rgb(154, 141, 76);
            }
            .user{
               color:rgb(255, 255, 255);
            }
            .score{
               color:rgb(120, 116, 72);
            }
         }
      }
      
      .gold{
         img{
            border-color:rgb(239, 165, 121);
         }
         .rank-bg{
            background-color: rgb(239, 165, 121);
            .index{
               color:rgb(154, 105, 76);
            }
            .user{
               color:rgb(255, 255, 255);
            }
            .score{
               color:rgb(126, 97, 80);
            }
         }
      }  
      .bloody{
         img{
            border-color:rgb(239, 135, 121);
         }
         .rank-bg{
            background-color: rgb(239, 135, 121);
            .index{
               color:rgb(154, 76, 76);
            }
            .user{
               color:rgb(255, 255, 255);
            }
            .score{
               color:rgb(127, 82, 82);
            }
         }
      }     
   }
   .rank-user{
      margin-top: 1.25rem;
      padding-top: 0.25rem;
      border-top: 0.2rem dashed #79CCEF;
      overflow-y:hidden!important;
      height:auto!important;
   }
   .score{
      float:right;
      font-size: 2.5rem;
      margin:0 0.5rem 0 0;
      color:#29ADCA;
      font-weight: bold;
      position: relative;
      overflow: hidden;
      .score-mask{
         width:auto;
         height:auto;
         position: relative;
         overflow: hidden;
         display: inline-block;
         margin-right: 1rem;
      }
      span{
         position: absolute;
         top:0rem;
      }
      span.score-ghost{
         visibility: hidden;
         position: relative;
         top:0rem;
      }
      span.score-block{
         position: relative;
         top:0rem;
      }
   }
   .slide-fade-enter-active {
      transition: all 0.5s ease-in-out;
   }
   .slide-fade-leave-active {
      transition: all 0.5s ease-in-out;
   }
   .slide-fade-enter,
   .slide-fade-leave-to {
      transform: translateX(30px);
      opacity: 0;
   }
   .fade-enter-active {
      transition: all 0.5s ease-in-out;
   }
   .fade-leave-active {
      transition: all 0.5s ease-in-out;
   }
   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }
   
</style>

this.makeWallGroup([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]
,[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],
[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[29,1],[29,2],[29,3],[29,4],[29,5],[29,6],[29,7],[29,8],[29,9],[29,10],[29,11],[29,12],[29,13],[29,14],[29,15],[29,17],[29,18],[29,19],[29,16],[28,19],[27,20],[27,19],[26,19],[25,19],[24,19],[23,19],[22,19],[21,20],[20,20],[19,20],[17,20],[18,19],[19,19],[20,19],[21,19],[17,19],[16,19],[15,19],[14,19],[13,19],[12,19],[11,19],[10,19],[9,19],[8,19],[7,19],[6,19],[5,19],[4,19],[3,19],[2,19],[1,19],[0,19],[0,18],[0,17],[0,16],[0,13],[0,14],[0,15],[0,12],[0,11],[0,10],[0,9],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[8,8],[7,8],[6,8],[5,8],[4,8],[3,8],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[9,13],[9,14],[9,15],[9,16],[20,16],[20,15],[20,14],[20,13],[20,12],[21,12],[22,12],[23,12],[24,12],[25,12],[26,12],[20,8],[21,8],[22,8],[23,8],[24,8],[25,8],[26,8],[20,7],[20,6],[20,5],[20,4],[20,3],[12,5],[13,5],[14,5],[15,5],[16,5],[17,5],[12,6],[12,7],[17,6],[17,7],[17,8],[12,8],[12,12],[12,13],[12,14],[12,15],[13,15],[14,15],[17,12],[17,13],[17,14],[17,15],[16,15],[15,15],[3,13],[8,16],[3,7],[8,3],[21,3],[26,7],[26,13],[21,16]])