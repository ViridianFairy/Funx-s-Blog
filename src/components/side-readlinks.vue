<template>
  <div id="links-big-wrapper">
    <div id="links-title" @click="jumpTop">目录</div>
    <div id="links-wrapper">
      <div class="links-h2" v-for="(item,bigIndex) in domList" :key="item.name">
         <transition-group name="slide-fade">
         <i @click="toggle(bigIndex)" v-show="!item.show" :key="'2'"></i>
         <i @click="toggle(bigIndex)" v-show="item.show" :key="'1'"></i></transition-group>
         
         <span :onclick="`window.myAnchor('${item.link}')`">{{item.name}}</span>
            <div class="child-wrapper">
              <div class="links-h3" v-for="(child,index) in item.data" :key="child.link"
                :onclick="`window.myAnchor('${child.link}')`" :ref="'a'+bigIndex">
                <span>{{index+1}}. {{child.name}}</span>
              </div>
          </div>
      </div>
    </div>
    <div class="links-item" onclick="window.myAnchor('review')"><span>评论区</span></div>
  </div>
</template>
<script>
export default {
  name: "side-readlinks",
  data(){
     return{
        domList:[]
     }
  },
  methods: {
   toggle(index){
      var dom = this.domList[index].dom
      if(this.domList[index].show){
         dom.style.height = 0
      }else{
         dom.style.height = this.domList[index].height
      }
      this.domList[index].show = !this.domList[index].show
   },
   jumpTop() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
      });
      document.getElementById("bg-navi").style.top = "0rem";
   },
   init() {
      var a = document.getElementsByClassName("readlinks");
      var arr = []
      Array.prototype.forEach.call(a,(item,index)=>{
         if(item.tagName.toLowerCase()=='h2'){
            arr.push({
               name:item.innerText,
               data:[],
               link:item.getAttribute('name'),
               show:1
            })
         }else{
            arr[arr.length-1].data.push({name:item.innerText,link:item.getAttribute('name')})
         }
      })
      this.domList = arr;
      this.$nextTick(() => {
         let doms = document.querySelectorAll('.child-wrapper')
         for(let i=0;i<doms.length;i++){
            let dom = doms[i]
            this.domList[i].height = dom.offsetHeight + 'px'
            this.domList[i].dom = doms[i]
            dom.style.height = this.domList[i].height
         }
     })
    }
  },
  mounted() {
     
  },
  computed: {
    links() {
      return this.$store.state.read.linksBool;
    }
  },
  watch: {
    links() {
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
   .links-h2 {
     color: rgb(58, 58, 58);
     font-size: 2.2rem;
     padding-bottom: 0.5rem;
     border-bottom: solid 1px rgb(234, 234, 234);
     margin: 0.8rem 0 0.8rem 1rem !important;
     padding: 0;
     opacity: 0.8;
     border: none;
     font-size: 1.6rem;
   }
   #links-big-wrapper {
     position: relative;
     transform: translateZ(0);
     transition: 0.6s all;
     border: 1px solid #f1f1f1a7;
     border-top: none;
     border-bottom: none;
     box-shadow: -5px 0px 5px -5px rgba(50, 50, 50, 0.15),
       5px 0px 5px -5px rgba(50, 50, 50, 0.15);
     padding-top: 0.5rem;
     background-color: rgba(255, 255, 255, 0.389);
   }
   #links-title {
     font-size: 2rem;
     font-weight: bold;
     color: rgb(65, 139, 156);
     margin-left: 1.7rem;
     position: relative;
     display: inline-block;
     margin-bottom: 0.7rem;
     user-select: none;
   }
   #links-title:hover {
     cursor: pointer;
   }
   #links-title::before {
     left: -1.9rem;
     top: -0.3rem;
     position: absolute;
     content: "";
     width: 0.7rem;
     height: 3rem;
     background-color: #4aacc2;
   }
   #extra-links {
     position: absolute;
     right: 0.3rem;
     bottom: 0rem;
   }
   #extra-links img {
     background-color: rgb(255, 255, 255);
     margin-bottom: 1rem;
     width: 3rem;
     opacity: 0.2;
   }
   .links-item {
     color: #3a3a3a;
     margin-left: 1rem;
     padding: 0px;
     margin-top: 0.8rem;
     margin-bottom: 0.8rem;
     opacity: 0.8;
     border: none;
     font-size: 1.6rem;
     user-select: none;
     span:hover{
        text-decoration: underline;
        cursor: pointer;
     }
   }
   .links-item::before {
     font: normal normal normal 14px/1 FontAwesome;
     content: "\f044";
     font-size: 1.6rem;
     margin-right: 0.85rem;
     vertical-align: -0.2rem;
     color: #316f7e;
   }
   .links-h2 {
      position: relative;
     margin-left: 0.5rem;
     padding: 0px;
     margin-top: 0.8rem;
     margin-bottom: 0.8rem;
     opacity: 0.8;
     border: none;
     font-size: 1.6rem;
     user-select: none;
     i::before {
       font: normal normal normal 14px/1 FontAwesome;
       font-size: 1.6rem;
       margin-right: 0.65rem;
       color: rgb(49, 111, 126);
       transition: 0.2s all;
     }
     i:nth-of-type(1)::before {
       content: "\f196";
     }
     i:nth-of-type(2)::before {
       content: "\f147";
     }
     i:hover::before{
         color:rgb(62, 166, 195);
     }
     & > span:nth-of-type(2):hover {
       cursor: pointer;
       text-decoration: underline;
     }
   }
   .links-h3 {
     position: relative;
     text-decoration: none;
     margin-left: 1.4rem;
     padding: 0px;
     margin-top: 0.4rem;
     margin-bottom: 0rem;
     opacity: 0.8;
     border: none;
     font-size: 1.45rem;
     font-weight: normal;
     text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
     & > span:hover {
       cursor: pointer;
       text-decoration: underline;
     }
   }
   .child-wrapper {
     overflow: hidden;
     transition: 0.3s all cubic-bezier(0.250, 0.460, 0.450, 0.940);
   }
   .slide-fade-enter-active {
      transition: all 0.2s ease-in-out;
   }
   .slide-fade-leave-active {
      position: absolute;
      transition: all 0.2s ease-in-out;
   }
   .slide-fade-enter,
   .slide-fade-leave-to {
      // transform: translateX(-5px);
      opacity: 0;
   }
   .slide-fade-move {
     transition: all 0.1s;
   }
</style>