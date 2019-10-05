<template>

   <div id="z" @click="clickIn">
      <transition name="fade">
         <div id="black" v-show="visible"></div>
      </transition>
      <transition name="slide-fade">
         <div class="alert" key="al" v-show="visible">
            <p>
               <img v-if="type=='true'" src="../assets/Alert/true.svg" />
               <img v-if="type=='false'" src="../assets/Alert/false.svg" />
               <img v-if="type=='tips'" src="../assets/Alert/tips.svg" />
               <span :class="{greentext:type=='true',redtext:type=='false',bluetext:type=='tips'}">{{ msg }}</span>
            </p>
         </div>
      </transition>
   </div>

</template>

<script>
   export default {
      name: "alert",
      methods:{
         clickIn(e){
             this.visible = false;
             e.stopPropagation();
         }
       },
      data() {
         return {
            type: "",
            msg: "",
            visible: true
         };
      },
      mounted() {
         //Vue.$alertNum ++;
         this.visible = true;
         window.setTimeout(() => {
            //Vue.$alertNum --;
            this.visible = false;
         }, 1400);
      }
   };
</script>

<style scoped>
   #z {
      left: 0;
      top: 0;
      position: relative;
      z-index: 502;
      height: 100%;
   }

    #black {
      left: 0;
      bottom: 0;
      position: fixed;
      z-index: 501;
      width: 100%;
      height: 100rem;
      background-image: linear-gradient(bottom,
         rgba(0, 0, 0, 0.00) 0%,rgba(0, 0, 0, 0.2) 50%,rgba(0, 0, 0, 0.5) 90%);
   } 

   .alert {
      z-index: 503;
      position: fixed;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      height: auto;
      padding: 0rem 1rem;
      background-color: #ffffff;
      border-radius: 0.5rem;
      border: 1px solid rgb(218, 237, 251);
      box-shadow: 0px 1px 5px 1px rgba(44, 44, 44, 0.194);
   }

   .alert img {
      width: 8rem;
   }

   .alert p {
      text-align: left;
      font-weight: bold;
      color: rgb(92, 92, 92);
      user-select: none;
   }

   .alert span {
      font-size: 1.8rem;
      vertical-align: 2rem;
      line-height: 1.5;
   }

   .greentext {
      color: rgb(66, 181, 60);
   }

   .redtext {
      color: rgb(181, 60, 60);
   }

   .bluetext {
      color: rgb(60, 147, 181);
   }

   .slide-fade-enter-active {
      transition: all 0.2s cubic-bezier(0.02, 0.575, 0.1, 0.955);
   }

   .slide-fade-leave-active {
      transition: all 0.6s cubic-bezier(0.02, 0.575, 0.1, 0.955);
   }

   .slide-fade-enter,
   .slide-fade-leave-to {
      transform: translateX(-50%)translateY(-135%);
      opacity: 0.5;
   }

   @media screen and (max-width: 768px) {
      .alert img {
         display: block;
         margin: 0 auto;
         padding-bottom: 2rem;
      }

      .alert span {
         text-align: center;
         line-height: 0rem;
         vertical-align: 1.4rem;
      }
   }

   .fade-enter-active {
      transition: all 0.2s
   }

   .fade-leave-active {
      transition: all 0.2s
   }

   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }
</style>