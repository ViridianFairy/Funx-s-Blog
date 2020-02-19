import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Edit from "../components/Edit.vue";
import Read from "../components/Read.vue";
import Review from "../components/Review.vue";
import Category from "../components/Category.vue";
import sideDefault from "../components/side-default.vue";
import sideEdit from "../components/side-edit.vue";
import sideCategory from "../components/side-category.vue"
import sideReadlinks from "../components/side-readlinks.vue"
import Collection from "../components/Collection";
import Demo from "../components/Demo";
import nothing from "../components/404";
import disk from "../components/Collections/disk";
import gossip from "../components/Collections/gossip";
import snake from "../components/Collections/snake";
import autoappr from "../components/Collections/autoappr";
Vue.use(VueRouter);
const routes = [
   {
      path:'/d',redirect:'/demo/disk'
   },
   {
      path: "/",
      components: {
         left: Home,
         right: sideDefault,
      }
   }, //前两个是一样哒！
   {
      path: "/home",
      components: {
         left: Home,
         right: sideDefault,
      }
   },
   {
      path: "/read",
      components: {
         left: Read,
         right: sideReadlinks,
         bottom: Review
      }
   },
   {
      path: "/edit",
      components: {
         left: Edit,
         right: sideEdit,
      }
   },
   {
      path: "/about",
      components: {
         left: About
      }
   },
   {
      path: "/category",
      components: {
         left: Category,
         right: sideCategory,
      }
   },
   {
      path: "/collection",
      components: {
         left: Collection,
         right: sideDefault,
      }
   },
   {
      path: "/demo",
      components: {
         left: Demo,
         right: sideDefault,
      }
   },
   {
      path: "/demo/disk",
      components: {
         left: disk,
         right: null,
      }
   },
   {
      path: "/demo/gossip",
      components: {
         left: gossip,
         right: null,
      }
   },
   {
      path: "/demo/snake",
      components: {
         left: snake,
         right: null,
      }
   },
   {
      path: "/404",
      components: {
         left: nothing,
         right: null,
      }
   }
];
const router = new VueRouter({
   mode: "history",
   routes
});
router.beforeEach((to, from, next) => {
   document.body.scrollTop = 0
   document.documentElement.scrollTop = 0
   window.pageYOffset = 0
   if (to.matched.length === 0) {  //如果未匹配到路由
      //from.path ? next({ path: from.path }) : 
      next('/404');   //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
   } else {
      next();    //如果匹配到正确跳转
   }
});

export default router;
