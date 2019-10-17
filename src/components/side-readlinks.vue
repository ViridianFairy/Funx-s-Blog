<template>
   <div>
      <div id="title">目录</div>
      <div id="links-wrapper"></div>
   </div>
</template>

<script>
   export default {
      name: "About",
      methods: {
         init(){
            var val = document.getElementsByClassName('readlinks')
            var con = document.getElementById('links-wrapper')
            con.innerHTML=""
            for(let i=0;i<val.length;i++){
               var item = val[i].cloneNode(true)
               item.removeAttribute('name')
               item.removeAttribute('class')
               item.style.marginLeft="1rem"
               item.style.padding="0"
               item.style.marginTop="1rem"
               item.style.marginBottom="0rem"
               item.style.opacity="0.8"
               item.style.border="none"
               item.style.fontSize="1.6rem"
               if(item.tagName.toLowerCase() == 'h3'){
                  item.style.marginLeft="2.5rem"
                  item.style.fontSize="1.45rem"
               }
               // var item = document.createElement("BUTTON");
               con.appendChild(item)
            }
            this.$forceUpdate();
         }
      },
      mounted(){
         //this.init(this.links)
      },
      computed:{
         links(){
            return this.$store.state.read.linksBool
         }
      },
      watch:{
         links(){
            this.init()
         }
      }
   };
</script>
<style scoped>
    #title {
      font-size: 2rem;
      font-weight: bold;
      color: rgb(65, 139, 156);
      margin-left: 1.7rem;
      position: relative;
      display: inline-block;
      margin-bottom: 0.7rem;
   }
   #title::before {
      left: -1.9rem;
      top: -0.3rem;
      position: absolute;
      content: "";
      width: 0.7rem;
      height: 3rem;
      background-color: #4AACC2;
   }
</style>