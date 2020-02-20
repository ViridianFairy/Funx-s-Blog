<template>
  <div id="water-wrapper">
    <div class="ghost" :style="{height:ghostHeight+'px'}"></div>
    <transition name="init">
      <div v-if="black" class="black" @click="unexpand"></div>
    </transition>
    <div
      :class="['water',item.name]"
      v-for="(item) in imgs"
      :key="item.name+item.time"
      @click="expand(item)"
    >
      <img :src="path +item.name" draggable="false"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      savedWidth: 0,
      savedName: "",
      savedLeft:0,
      savedTop:0,
    };
  },
  props: {
    
  },
  mounted() {
    this.init(); //当前瀑布流设置为两列，计算瀑布流每个item和图片的宽度
  },
  methods: {
    unexpand() {
      this.black = false;
      var e = document.getElementsByClassName(`${this.savedName}`)[0];
      console.log(e)
      e.childNodes[0].style.width = this.savedWidth;
      e.style.left = this.savedLeft;
      e.style.top = this.savedTop;
      e.classList.remove('wrapper-zoom')
      e.childNodes[0].classList.remove('item-zoom')
      setTimeout(() => {
        e.style.zIndex = 10;
      }, 200);
    },
    expand(v) {
      if (this.black) {
        this.unexpand();
        return;
      }
      
      this.black = !this.black;
      var e = document.getElementsByClassName(`${v.name}`)[0];
      e.style.zIndex = 2001;
      this.savedWidth = e.childNodes[0].style.width;
      this.savedLeft = e.style.left;
      this.savedTop = e.style.top;
      this.savedTransform = e.style.transform;
      this.savedName = v.name;
      e.classList.add('wrapper-zoom')
      e.childNodes[0].classList.add('item-zoom')
    },
    init() {
      this.height = [];
      let screenWidth = document.getElementById("water-wrapper").offsetWidth; //屏幕宽度
      this.boxWidth =
        (screenWidth - this.boxMarginX * (this.col * 2)) / this.col; //每个item的宽度
      for (let i = 0; i < this.col; i++) this.height.push(0);
      this.imgs.forEach(v => {
        this.loadImg(v.name).then(obj => {
          let k = this.getMinId();
          var e = document.getElementsByClassName(`${v.name}`)[0];
          e.childNodes[0].style.width = this.boxWidth + "px";
          e.style.left =
            k * this.boxWidth + this.boxMarginX * (2 * k + 1) + "px";
          e.style.top = this.height[k] + "px";
          e.style.animation = `appear 0.5s ${0.2 +
            0.05 * this.loadingId++}s  forwards`;
          this.height[k] +=
            parseInt(obj.h * (this.boxWidth / obj.w)) + this.boxMarginY;
          this.ghostHeight = Math.max.apply(null, this.height);
        });
      });
    },
    getMinId() {
      let min = 9999;
      let k = -1;
      this.height.forEach((v, i) => {
        if (v < min) {
          min = v;
          k = i;
        }
      });
      return k;
    },
    loadImg(name) {
      return new Promise(resolve => {
        let img = new Image();
        img.src = this.path + name;
        img.onload = () => {
          resolve({ w: img.width, h: img.height });
        };
      });
    }
  },
  watch: {
    col() {
      this.init();
    }
  }
};
</script>
<style lang="scss" scope>
#water-wrapper {
  position: relative;
}
.ghost {
  width: 1px;
}
.black {
  left: -500px;
  top: -500px;
  z-index: 2000;
  position: absolute;
  width: calc(100% + 1500px);
  height: calc(100% + 500px);
  background-color: rgba(0, 0, 0, 0.826);
}
.wrapper-zoom{
   width:100%;
   height:100%;
   position: fixed;
   left: 0;
   top:0;
}
.item-zoom{
   width:auto;
   height:100vh;
   max-height:100vh;
   left:50%;
   top:50%;
   position: absolute;
   transform: translate(-50%, -50%);
}
.water {
  opacity: 0;
  transform: translateY(25px);
  transition: 0.2s all;
  position: absolute;
  z-index: 10;
  img {
    box-shadow: 0px 1px 5px 0px rgba(50, 50, 50, 0.27);
    border-radius: 3px;
    transition: 0.3s all;
    &:hover {
      transform: translateY(-5px);
      border-radius: 0;
      box-shadow: 0px 4px 5px 0px rgba(50, 50, 50, 0.67);
    }
  }
}
.init-enter-active {
  transition: all 0.2s 0.2s;
}
.init-leave-active {
  transition: all 0.2s;
}
.init-enter,
.init-leave-to {
  opacity: 0;
}
@keyframes appear {
  from {
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>