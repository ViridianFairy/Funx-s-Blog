<template>
  <div id="links-big-wrapper">
    <div id="links-title" @click="jumpTop">目录</div>

    <div id="links-wrapper"></div>
    <!-- <div id="extra-links">
      <img src="../assets/Common/links1.svg" />
      <br />
      <img src="../assets/Common/links2.svg" />
    </div>-->
    <div class="links-item">评论区</div>
  </div>
</template>

<script>
export default {
  name: "side-readlinks",
  methods: {
    jumpTop() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
      });
      document.getElementById("bg-navi").style.top = "0rem";
    },
    init() {
      var val = document.getElementsByClassName("readlinks");
      var con = document.getElementById("links-wrapper");
      // console.log("links数量：" + val.length);
      con.innerHTML = "";
      for (let i = 0; i < val.length; i++) {
        var item = val[i].cloneNode(true);
        item.removeAttribute("name");
        item.removeAttribute("class");
        item.style.marginLeft = "1rem";
        item.style.padding = "0";
        item.style.marginTop = "0.8rem";
        item.style.marginBottom = "0.8rem";
        item.style.opacity = "0.8";
        item.style.border = "none";
        item.style.fontSize = "1.6rem";
        if (item.tagName.toLowerCase() == "h3") {
          item.style.marginTop = "0.4rem";
          item.style.marginBottom = "0rem";
          item.style.marginLeft = "2.5rem";
          item.style.fontSize = "1.45rem";
          item.style.fontWeight = "normal"
        }
        con.appendChild(item);
      }
      var review = document.getElementsByClassName("links-item")[0];
      review.setAttribute("onclick", 'myAnchor("review")');
    }
  },
  mounted() {
    var timer = null;
    var a = document.getElementById("links-big-wrapper");
    window.onscroll = () => {
      if (timer) return;
      // console.log(window.innerHeight + "-" + window.scrollY);
      if (window.scrollY <= window.innerHeight - a.offsetHeight - 150) {
        a.style.top = "0px";
        return;
      }
      timer = setTimeout(() => {
        a.style.top = window.scrollY - 90 + "px";
        timer = null;
      }, 200);
    };
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
<style scoped>
#links-big-wrapper {
  position: relative;
  transform: translateZ(0);
  transition: 0.6s all ;
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
  color: rgb(142, 107, 75);
  margin-left: 1rem;
  padding: 0px;
  margin-top: 0.8rem;
  margin-bottom: 0rem;
  opacity: 0.7;
  border: none;
  font-size: 1.6rem;
  font-weight: bold;
}
.links-item:hover {
  cursor: pointer;
  color: rgb(111, 84, 59);
}
.links-item:hover::before {
  color: rgb(151, 86, 25);
}
.links-item::before {
  font: normal normal normal 14px/1 FontAwesome;
  content: "\f044";
  font-size: 1.8rem;
  margin-right: 0.85rem;
  vertical-align: -0.1rem;
  color: rgb(199, 110, 27);
}
</style>