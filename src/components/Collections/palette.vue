<template>
   <div id="palette">
      <div class="slider">
         单例
         原生js
      </div>
   </div>
</template>

<script>
   export default {
      name: "palette", mounted() { main() }
   };
   // function $(str){
   //    return document.querySelector(str)
   // }
   // function Currying(fn){
   //    var _args = [].slice.call(arguments,1)
   //    console.log(`_args:${_args}`)
   //    return function(){
   //       var _newArgs = [].slice.call(arguments)
   //       var _totalArgs = _args.concat(_newArgs)
   //       console.log(`_newArgs:${_newArgs},_tottalArgs${_totalArgs}`)
   //       return fn.apply(this,_totalArgs)
   //    }
   // }
   // function betterCurrying(fn){
   //    var length = len || fn.length
   //    return function(){
   //       var allArgsFulfilled = (arguments.length >= length)
   //       if(allArgsFulfilled){
   //          return fn.apply(this.arguments)
   //       }else{

   //       }
   //    }
   // }
   // function test(name,age,color){
   //    console.log(name+"-"+age+"-"+color)
   // }
   // var t = Currying(test,"Xayah","23")
   // t("pink")








   function main(){    //entrance
      $('.slider').style.color = 'blue';
   }
   
</script>

<style lang="scss" scoped>
   .slider{
      color:red;
   }
</style>
