<template>
   <div id="snake-wrapper" :style="{width:canvas_width+'px'}">
      
      <canvas ref="main" :width="canvas_width" :height="canvas_height"
       :style="{backgroundColor:colors.canvas}"></canvas>
      <transition name="slide-fade">
      <div ref="cover" id="cover" :style="{width:canvas_width+'px',height:canvas_height+'px'}" v-if="cover==1">
         <div id="wrapper">
            <div class="banner">选择模式</div>
            <p class="title">贪吃蛇</p>
            <div class="login-wrapper">
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
            <!-- <p class="intro">WASD或方向键控制，登录后还可排名</p> -->
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
         <div id="wrapper">
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
         <div id="wrapper">
            <div class="banner">设置</div>
            <p class="intro" >粒子数量：<input v-model="settings.particularNum" maxlength="2"></p>
            <p class="intro">单格宽度：<input v-model="settings.singleWidth" maxlength="2"></p>
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
         <div id="wrapper">
            <div class="banner">帮助</div>
            <p class="intro">【WASD】或【方向键】进行控制</p>
            <p class="intro">【创造模式】下左键拖动绘制，右键拖动移除</p>
            <p class="intro">...游戏还没做完</p>
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
         <div id="wrapper">
            <div class="banner" style="backgroundColor:#FF5758">你挂掉了</div>
            <p class="title">{{show.deadText}}</p>
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
            <div class="options-wrapper">
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
            <button @click="makeWallGroup()">导出</button>
            <input disabled :value="wallData"></input>
         </div>
         <p class="score">得分：{{score}}</p>
      </div>
   </div>
</template>

<script>
   import zrender from 'zrender/dist/zrender.min'
   export default {
      name: "bezier",
      data() {
         return { // x,y全部为抽象步长
            canvas_width:30*30,
            canvas_height:30*20,
            STEP:30,
            direction:'right',
            head:{x:2,y:2,next:null,last:null,el:null},
            food:[],foodMax:4,
            tail:null,
            moveTimer:null,
            hz:0,hzLevel:0, //fps
            hzQueue:[[16.67*40], //
               [0,16.67*14,10,'hsl(123,45%,69%)'],
               [3,16.67*12,15],
               [4,16.67*10,20],
               [5,16.67*9,25],
               [5,16.67*8,30],
               [5,16.67*8,30],
            ],
            wallBuffer:1,
            wall:[],zr:null,
            colors:{ //colour
               canvas:"#F8FAFE",canvasPaint:"rgb(230, 244, 255)",canvasNormal:"#F8FAFE",
               wall:"rgb(176, 176, 176)",wallEdge:"rgb(137, 137, 137)",
               food:"hsl(123,45%,69%)",foodEdge:"hsl(123,70%,39%)",
               body:"#FF5758",bodyEdge:"#ea4445",
            },
            wallData:"",settings:{particularNum:12,singleWidth:30},
            paintMode:false,score:0,loadingDelay:200,cover:0,
            show:{maxScore:0,ranks:[],deadText:"",extraEndText:""}
         };
      },
      methods: {
         refreshRanks(){
            this.$http
            .post("/snake/getAllRanks")
            .then(res => {
               if (res.data.success == 1) {
                  this.show.ranks = res.data.data
               }
            });
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
         bodyAdd(isHead){
            var body = this.colors.body
            var bodyEdge = this.colors.bodyEdge
            if(isHead){
               let group = getGroup(this.STEP,this.head.x,this.head.y,this.getFixDirection())
               this.zr.add(group)
               this.head.el = group 
               this.tail = this.head
            }else{
               let t = this.head;
               //换元素
               var a1 = getCircle(this.STEP,this.head.x*this.STEP,this.head.y*this.STEP)
               this.zr.remove(t.el)
               this.zr.add(a1)
               t.el = a1
               //换元素
               let el = getGroup(this.STEP,this.head.x,this.head.y)
               this.zr.add(el)
               var bodyObject = {x:t.x, y:t.y, next:t,last:null,el }
               t.last = bodyObject;
               this.head = bodyObject
            }
            function getCircle(STEP,x,y){
               return new zrender.Circle({
                  position:[x,y],
                  shape:{cx:STEP/2,cy:STEP/2,r:STEP/2 - 1},
                  style:{fill:body,stroke:bodyEdge,lineWidth:2},
                  zlevel:10,cursor:"normal"
               })
            }
            function getSmallCircle(STEP,x,y){
               return new zrender.Ellipse({
                  position:[0,0],
                  shape:{cx:x,cy:y,rx:STEP*0.28 - 1.3,ry:STEP*0.28 - 2.5},
                  style:{fill:'white',stroke:"black",lineWidth:1},
                  zlevel:10,cursor:"normal"
               })
            }
            function getTinyCircle(STEP,x,y){
               return new zrender.Circle({
                  position:[0,0],
                  shape:{cx:x,cy:y,r:STEP*0.10 - 1},
                  style:{fill:'black'},
                  zlevel:10,cursor:"normal"
               })
            }
            function getGroup(STEP,x,y,rotation){
               let group = new zrender.Group({
                  position:[x*STEP,y*STEP],
                  origin:[STEP/2,STEP/2],
                  rotation,cursor:"normal"
               })
               let el = getCircle(STEP,0,0)
               group.add(el)
               group.add(getSmallCircle(STEP,STEP*0.71,STEP*0.3))
               group.add(getSmallCircle(STEP,STEP*0.71,STEP*0.7))
               group.add(getTinyCircle(STEP,STEP*0.80,STEP*0.3))
               group.add(getTinyCircle(STEP,STEP*0.80,STEP*0.7))
               return group
            }
         },
         bodyMove(divX,divY,Angle){
            var t = this.tail
            while(t!=this.head){
               t.x = t.last.x;
               t.y = t.last.y;
               bodyMoveAnimate(t.el,t.x,t.y,this.hz,this.STEP,0)
               t = t.last
            }
            t.x +=divX
            t.y +=divY
            bodyMoveAnimate(t.el,t.x,t.y,this.hz,this.STEP,Angle)
            function bodyMoveAnimate(el,x,y,hz,STEP,angle){
               el.animateTo({
                  position:[x*STEP,y*STEP],
                  rotation:angle,
               },hz)
            }
         },
         checkDead(){
            // if(this.head.x < 0 +this.wallBuffer || this.head.x >= this.canvas_width/this.STEP - this.wallBuffer)
            //     this.dead()
            // if(this.head.y < 0 +this.wallBuffer || this.head.y >= this.canvas_height/this.STEP- this.wallBuffer)
            //     this.dead()
            var t = this.head.next
            while(t){
               if(t.x == this.head.x && t.y == this.head.y)
                  this.dead()
               t = t.next
            }
            for(let i=0;i<this.wall.length;i++){
               if(this.head.x == this.wall[i].x && this.head.y == this.wall[i].y)
                  this.dead()
            }
         },
         checkEat(){
            for(let i=0;i<this.food.length;i++){
               let item = this.food[i]
               if(this.head.x == item.x && this.head.y == item.y){
                  this.bodyAdd()
                  this.zr.remove(item.el)
                  this.food.splice(i,1)
                  this.effectEat(this.head.x*this.STEP,this.head.y*this.STEP)
                  this.score += this.hzQueue[this.hzLevel][2];
                  console.log(this.hzLevel)
                  if(this.score >= this.hzQueue[this.hzLevel+1][0]){
                     this.hzLevel++
                     this.hz = this.hzQueue[this.hzLevel][1]
                     this.changeHz(this.hz)
                  }
                  return;
               }
            }
         },
         makeFood(obeyMax){
            if(this.food.length >= this.foodMax && !obeyMax) return;
            var self = this;
            var pos = getPos()
            if(!judgeWall(pos)){
               return;
            }
            var x = pos.x
            var y = pos.y
            var el = new zrender.Circle({
               position:[x*this.STEP,y*this.STEP],
               shape:{cx:this.STEP/2,cy:this.STEP/2,r:this.STEP/2 - 2},
               style:{fill:this.colors.food,stroke:this.colors.foodEdge,lineWidth:2},
               zlevel:5,origin:[this.STEP/2,this.STEP/2],scale:[0,0],cursor:"normal"
            })
            el.animateTo({
               scale:[1,1]
            },300,"quadraticOut")
            this.zr.add(el)
            this.food.push({x,y,el})
            function getPos(){
               x = x || Math.floor(Math.random()*(self.canvas_width/self.STEP - 2*self.wallBuffer) + self.wallBuffer)
               y = y || Math.floor(Math.random()*(self.canvas_height/self.STEP - 2*self.wallBuffer) + self.wallBuffer)
               return {x,y}
            }
            function judgeWall(pos){
               let i;
               for(i=0;i<self.wall.length;i++){
                  if(pos.x == self.wall[i].x && pos.y == self.wall[i].y) 
                     return false
               }
               return true
            }
         },
         makeWall(x,y){
            var wall = new zrender.Rect({
               position:[x*this.STEP,y*this.STEP],
               shape:{x:0.5,y:0.5,width:this.STEP-1,height:this.STEP-1},
               style:{fill:this.colors.wall,stroke:this.colors.wallEdge,opacity:0,lineWidth:3},
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
         dead(){
            var user_id = this.Cookies.get("_id")
            if(!this.paintMode && user_id){
               this.$http
               .post("/snake/uploadRank", { user_id,score:this.score})
               .then(res => {
                  if(!res.data) return;
                  this.show.deadText = ""
                  this.show.extraEndText = ""
                  if (res.data.success == 1 || res.data.success == 2) {
                        this.show.deadText += "个人新纪录！"
                        // this.show.deadText += "历史最高排名！"
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
            },0)
            setTimeout(()=>{
               this.cover=-1
            },300)
            
         },
         getFixDirection(){
             switch(this.direction){
               case "right":
                   return 0
               case "left":
                   return Math.PI*1
               case "up":
                   return Math.PI*0.5
               case "down":
                   return Math.PI*-0.5
               }
         },
         effectEat(x0,y0){
            x0 += this.STEP/2
            y0 += this.STEP/2
            for(let i =0;i< this.settings.particularNum ; i++){
               let lightness = Math.floor(Math.random() * 40 + 40)
               let pos1 = Math.random()*100 - 50
               let pos2 = Math.random()*100 - 50
               let color = 113+ Math.random() * 20;
               let particle = new zrender.Circle({
                  shape: {
                     cx: 0,cy: 0,r: this.STEP/2 * (0.7 + 0.3 * Math.random())
                  },
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
            var halfFrame = 160
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
            this.hz = 16.67 * 100
            var isPainting = undefined;
            var self = this;
            if(this.paintMode){
               this.colors.canvas = this.colors.canvasPaint
               this.zr.on("mousedown",down)
               this.zr.on("mouseup",up)
               this.zr.on("mousemove",paintOn)
            }else{
               this.colors.canvas = this.colors.canvasNormal
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
            console.log(body)
            while(body){
               if(body.el) this.zr.remove(body.el)
               body = body.next
            }
            for(let i =0;i<this.food.length;i++){ 
               this.zr.remove(this.food[i].el)
            }//一系列重绘
            this.head = {x:2,y:2,next:null,last:null,el:null}
            this.tail = null
            this.food = []
            this.score = 0
            this.cover = 0;
            this.hzLevel = 1;
            if(mode=='paint'){
               this.hz = this.hzQueue[0]
               this.goPaintMode()
            }else{
               this.hz = this.hzQueue[1][1]
               this.colors.canvas = this.colors.canvasNormal
            } 
            this.$refs.cover.style.opacity = 0;//拿掉这破玩意
            // setTimeout(()=>{
            //    this.$refs.cover.style.display = 'none';
            // },200)
            this.bodyAdd(true) //嘎嘣脆的头
            this.changeHz(this.hz)
            document.onkeydown = (e)=>{
               switch(e.key){
                   case "w": case "ArrowUp":
                       if(this.direction=="left" || this.direction=="right")
                           this.direction = "up";
                       break;
                   case "s": case "ArrowDown":
                       if(this.direction=="left" || this.direction=="right")
                           this.direction = "down";
                       break;
                   case "a": case "ArrowLeft":
                       if(this.direction=="up" || this.direction=="down")
                           this.direction = "left";
                       break;
                   case "d": case "ArrowRight":
                       if(this.direction=="up" || this.direction=="down")
                           this.direction = "right";
                       break;
               }
            }
            var a = 12;
            while(a--){
               this.makeFood(true)
            }
            setInterval(()=>{
               this.makeFood()
            },1000)
         },
         changeHz(hz){
            clearInterval(this.moveTimer)
            this.moveTimer = setInterval(()=>{
               this.checkEat()
                switch(this.direction){
                  case "right":
                      this.bodyMove(1,0,0)
                      break;
                  case "left":
                      this.bodyMove(-1,0,Math.PI*1)
                      break;
                  case "up":
                      this.bodyMove(0,-1,Math.PI*0.5)
                      break;
                  case "down":
                      this.bodyMove(0,1,Math.PI*-0.5)
                      break;
                  }
               this.checkDead()
            },hz)
         }
      },
      mounted() {
         this.getShowMaxScore()
         this.$refs.main.oncontextmenu = function(e){
            e.preventDefault();
         }
         for(let i=2;i<this.hzQueue.length;i++){
            this.hzQueue[i][0] = this.hzQueue[i-1][0] + this.hzQueue[i-1][2]*this.hzQueue[i][0]
            console.log(this.hzQueue[i][0])
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
            this.makeWallGroup([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[29,1],[29,2],[29,3],[29,4],[29,5],[29,6],[29,7],[29,8],[29,9],[29,10],[29,11],[29,12],[29,13],[29,14],[29,15],[29,17],[29,18],[29,19],[29,16],[28,19],[27,20],[27,19],[26,19],[25,19],[24,19],[23,19],[22,19],[21,20],[20,20],[19,20],[17,20],[18,19],[19,19],[20,19],[21,19],[17,19],[16,19],[15,19],[14,19],[13,19],[12,19],[11,19],[10,19],[9,19],[8,19],[7,19],[6,19],[5,19],[4,19],[3,19],[2,19],[1,19],[0,19],[0,18],[0,17],[0,16],[0,13],[0,14],[0,15],[0,12],[0,11],[0,10],[0,9],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[8,8],[7,8],[6,8],[5,8],[4,8],[3,8],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[9,13],[9,14],[9,15],[9,16],[20,16],[20,15],[20,14],[20,13],[20,12],[21,12],[22,12],[23,12],[24,12],[25,12],[26,12],[20,8],[21,8],[22,8],[23,8],[24,8],[25,8],[26,8],[20,7],[20,6],[20,5],[20,4],[20,3],[12,5],[13,5],[14,5],[15,5],[16,5],[17,5],[12,6],[12,7],[17,6],[17,7],[17,8],[12,8],[12,12],[12,13],[12,14],[12,15],[13,15],[14,15],[17,12],[17,13],[17,14],[17,15],[16,15],[15,15],[3,13],[8,16],[3,7],[8,3],[21,3],[26,7],[26,13],[21,16]])
         },this.loadingDelay + 300)
         setTimeout(()=>{
            this.cover = 1;
         },this.loadingDelay + 1300)
      },
      computed:{
         getRankText(){
            if(!this.$store.state.login.user)
               return "登录才可以参与排名"
            return this.$store.state.login.user + "的最高分："+ this.show.maxScore
         },
         getEndText(){
            if(!this.$store.state.login.user)
               return "本次得分："+ this.score
            return this.$store.state.login.user + "的本次得分："+ this.score
         }
      }
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
      
      .big{
         // padding:0.8rem 1.5rem;
         font-size: 1.8rem;
         margin:0 0.5rem;
      }
      .intro{
         text-align: center;
         font-size: 1.8rem;
         color:rgb(168, 168, 168);
         margin:0.2rem 0 0.6rem 0;
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
         margin:0.8rem 0.75rem;
         font-size: 2rem;
         .rank-bg{
            margin-top: 0.1rem;
            background-color: rgb(121, 204, 239);
            border-radius: 2rem;
            width:22.5rem;
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