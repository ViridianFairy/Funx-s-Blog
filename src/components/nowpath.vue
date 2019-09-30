<template>
   <p>
      <span @click="$router.push('/home')">
         <i></i>FunX
      </span>
      <span v-for="item in $store.state.path" @click="$router.push(item.link)">
         <i></i>{{ item.name }}
      </span>
   </p>
</template>

<script>
   export default {
      name: "nowpath",
      components: {},
      props: {
         sonPath: Array
      },
      data() {
         return {};
      }
   };
</script>

<style scoped>
   p {
      margin: 0;
      padding: 2rem 0 0 0;
      font-size: 1.4rem;
      line-height: 1.4;
   }
   p i {
      width: 14px;
      height: 14px;
      display: inline-block;
      margin: 0 0.8rem;
      vertical-align: -0.2rem;
   }
   span:nth-of-type(1) i {
      background-image: url("../assets/Common/path-home.png");
   }
   span:nth-of-type(n + 2) i {
      background-image: url("../assets/Common/path-arrow.png");
   }
   span:hover {
      text-decoration: underline;
      cursor: pointer;
      color: rgb(63, 63, 63);
   }
   @media screen and (max-width: 768px) {
      
   }
</style>
