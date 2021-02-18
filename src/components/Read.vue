<template>
<div>
	<transition name="public-slide">
		<div id="read-wrapper" name="article"  v-if="!loading">
			<div
				id="read-colorful"
				:style="{
					backgroundImage: `linear-gradient(to right,rgb(255, 255, 255) 15%,rgba(255, 255, 255, 0) 50%),
         linear-gradient(to top,rgb(255, 255, 255) 2%,rgba(255, 255, 255, 0) 10%),
         url(${this.article.image})`,
				}"
			></div>
			<!-- <loading ></loading> -->
			<h1>{{ article.title }}</h1>
			<button v-if="isAdmin" id="delete" @click="deleteIn" class="red">删除</button>
			<button v-if="isAdmin" id="edit" @click="$router.push('/edit?id=' + $route.query.id)">编辑</button>
			<button v-if="isAdmin" id="edit" class="green" @click="$router.push('/edit')">新增</button>
			<p>
				标签：
				<router-link :to="'/category?label=' + label" v-for="label in article.label" :key="label">
					<img src="../assets/Common/label-blue.svg" />
					{{ label }}
				</router-link>
			</p>
			<p>
				<span>{{ article.time }}</span>
				<span> <img class="info-i" src="../assets/Common/mine.svg" />{{ article.author }} </span>
				<span> <img class="info-i" src="../assets/Common/browse.svg" />{{ article.lookNum }} </span>
				<span> <img class="info-i" src="../assets/Common/interactive.svg" />{{ article.sayNum }}</span>
			</p>
			<div id="read-body" v-html="article.body"></div>
		</div>
	</transition>
	<loading v-if="loading"></loading>
</div>
</template>
<script>
import loading from "./loading";
import marked from "marked";
import "../css/article.css";
import { log } from "util";

export default {
	name: "read",
	components: { loading },
	computed: {},
	methods: {
		readyLazy() {
      var imgs;
      this.$nextTick(()=>{
         let t = Array.from(document.getElementsByTagName("img"))
         imgs = t.filter((value)=>{
           return value.getAttribute("data-src")
         })
			window.addEventListener("scroll",this.$throttle(lazyLoad,50))
			setTimeout(()=>{
				lazyLoad()
			},100)
         // lazyLoad()
      })
			function lazyLoad() {
				// console.log('run lazy')
				// console.log(imgs)
				var H = document.documentElement.clientHeight; //获取可视区域高度
				var S = document.documentElement.scrollTop || document.body.scrollTop;
				var User = parseInt(H+S)
				for (var i = 0; i < imgs.length; i++) {
					// console.log(`H+S:${User}，图片：${getTop(imgs[i])}`)
					if (User > getTop(imgs[i])) {
						imgs[i].src = imgs[i].getAttribute("data-src");
						imgs[i].style.width = ""
					}
				}
			}
			
			//offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
			function getTop(e) {
				var T = e.offsetTop;
				while ((e = e.offsetParent)) {
					T += e.offsetTop;
				}
				return T;
			}
		},
		refresh() {
			var id = this.$route.query.id;
			this.$http
				.post("/article", { _id: id, user_id: this.Cookies.get("_id") })
				.then((res) => {
					this.article = res.data[0];
					//debugger;
					this.article.body = marked(res.data[0].body)
					this.loading = false;
					//vuex
					this.$store.state.invalidArticle = false;
					if (this.article.lookNum == -1) this.$store.state.invalidArticle = true;
          this.$store.commit("articleLoaded", this.article.title);
					var count = 1;
					var timer = setInterval(() => {
						let doms = document.getElementsByClassName("readlinks");
						if (doms) {
              clearInterval(timer);
							function getCn(n) {
								var BASE = "一二三四五六七八九十";
								if (n >= 1 && n <= 10) return BASE[n - 1];
								if (n >= 11 && n <= 20) return BASE[9] + BASE[n - 1 - 10];
							}
							Array.from(doms).forEach((item, index) => {
								if (item.tagName.toLowerCase() == "h2") {
									count = 1;
								} else {
									item.innerText = `${getCn(count++)}、${item.innerText}`;
								}
							});
						}
          }, 20);
					var timer2 = setInterval(() => {
						let doms = document.getElementsByClassName("lazy");
						if (doms) {
              clearInterval(timer2);
              this.readyLazy()
						}
					}, 20);
					//vuex
				})
				.catch((e) => {});
			this.$http.post("/if-admin", { _id: this.Cookies.get("_id") }).then((res) => {
				if (res.data.success == 1) {
					this.isAdmin = 1;
				}
			});
		},
		deleteIn() {
			var con = confirm(`确定要删除《${this.article.title}》吗？`);
			if (con == true) {
				this.$http
					.post("/article-delete", { _id: this.article._id })
					.then((res) => {
						if (res.data.success == 1) {
							this.$alert(res.data.message, "true");
							this.$router.go(-1);
						}
					})
					.catch((e) => {});
			}
		},
	},
	data() {
		return {
			article: {},
			isAdmin: 0,
			loading: true,
		};
	},
	created() {
		this.refresh();
	},
	mounted() {},
};
</script>

<style scoped>
#read-wrapper #read-colorful {
	display: block;
	position: absolute;
	/* filter:blur(2px); */
	top: -46px;
	right: -1px;
	content: "";
	width: calc(100%);
	height: 200px;
	background-position: right top;
	background-size: calc(100%) 200px;
	background-repeat: no-repeat;
	z-index: 0;
	filter: blur(4px);
	opacity: 0.3;
}
#read-wrapper {
	background-color: white;
	padding: 2.5rem 2.5rem 3rem 4rem;
	position: relative;
}

#read-wrapper p:nth-of-type(1) img {
	vertical-align: -0.3rem;
	width: 1.8rem;
	display: inline-block;
	margin-right: 0.4rem;
}
#read-wrapper p:nth-of-type(1) a {
	color: #b1c1c8;
	margin-right: 1rem;
}
#read-wrapper p:nth-of-type(1) a:hover {
	text-decoration: underline;
}
#read-wrapper h1 {
	font-size: 2.8rem;
	color: rgb(47, 48, 55);
	margin-bottom: 1rem;
	margin-top: 0rem;
	position: relative;
	line-height: 1.3;
}
#read-wrapper p {
	position: relative;
	margin: 1rem 0;
	font-size: 1.3rem;
	color: #6c787d;
}
#read-wrapper p span {
	font-size: 1.3rem;
	margin-right: 1rem;
	color: #afb2b4;
}
#edit {
	float: right;
	margin-right: 1rem;
	padding: 0.6rem 1.2rem;
	margin-top: -0.4rem;
}
#delete {
	float: right;
	margin-right: 0rem;
	padding: 0.6rem 1.2rem;
	margin-top: -0.4rem;
}
/*
   正文！
   */
#read-body {
	margin-top: 2.5rem;
	font-size: 1.6rem;
	line-height: 1.8;
	border-top: 1px dashed rgb(217, 217, 217);
	padding-top: 0rem;
}
#read-body p {
	text-indent: 4rem;
	margin: 0.5rem;
}
#read-wrapper h1::before {
	position: relative;
	display: block;
	float: left;
	margin-right: 2rem;
	content: "";
	height: 8.2rem;
	width: 0.6rem;
	margin-top: 0.6rem;
	margin-bottom: 3rem;
	background-color: #4aacc2;
}
button {
	position: relative;
	z-index: 1;
}
/**/
@media screen and (max-width: 768px) {
	#read-wrapper {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	#read-wrapper p:nth-of-type(2) {
		line-height: 1.8;
	}
	#read-body {
		margin-top: 1rem;
	}
	#wrap {
		display: inline;
	}
	#read-wrapper h1::before {
		margin-right: 1.2rem;
	}
}
</style>
