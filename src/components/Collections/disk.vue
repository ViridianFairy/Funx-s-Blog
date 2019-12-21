<template>
   <div id="disk-wrapper">
      <div id="files-wrapper">
         <div class="header">
            <span>当前位置：
               <span v-for="(item,index) in pos.split('/')" :key="item" @click="explore(index)">{{index==0?'根目录':' / '+item}}</span>
            </span>
            <span>文件数：{{files.length}}</span>
            <span>拖动文件直接上传</span>
         </div>
         <table>
            <col style="width:50%"/>  
            <col style="width:17%"/>  
            <col style="width:17%"/>  
            <col style="width:auto"/>   
            <tr><th>
               <span v-if="choose.filter(val=>val>0).length==0">文件名</span>
               <span v-else>
               已选中 {{choose.filter(val=>val>0).length}} 个文件&nbsp;
                <img class="oper-img" src="../../assets/Collections/Disk/下移.svg" draggable='false'>&nbsp;
                <img class="oper-img" src="../../assets/Collections/Disk/删除.svg" draggable='false'>&nbsp;
                <img class="oper-img" src="../../assets/Collections/Disk/分享.svg" draggable='false'>&nbsp;
            </span>
            </th>
            <th>大小</th><th>最后修改时间</th><th>操作</th></tr>
            
         <tbody is="transition-group" name="msg" appear>
            <tr class="files" v-for="(item,index) in files" :key="item.name+item.time" @dblclick="explore(item,index)">
               <td class="format">
                  <!--代码 文本 图片 办公三件套 压缩 音乐 视频 -->
                  <img v-if="choose[index]==0" src="../../assets/Collections/Disk/c.svg" class="checkbox" 
                     @mouseover="select(index)" @mousedown="select(index,true)" draggable='false'>
                     <img v-else src="../../assets/Collections/Disk/c1.svg" class="checkbox" 
                     @mouseover="select(index)" @mousedown="select(index,true)" draggable='false'>
                  <img v-if="['ppt','pptx'].includes(item.format)" src="../../assets/Collections/Disk/n-ppt.svg" draggable='false'>
                  <img v-else-if="['xls','xlsx'].includes(item.format)" src="../../assets/Collections/Disk/n-excel.svg" draggable='false'>
                  <img v-else-if="['doc','docx'].includes(item.format)" src="../../assets/Collections/Disk/n-word.svg" draggable='false'>
                  <img v-else-if="['zip','rar'].includes(item.format)" src="../../assets/Collections/Disk/n-zip.svg" draggable='false'>
                  <img v-else-if="['mp3','flac'].includes(item.format)" src="../../assets/Collections/Disk/audio.svg" draggable='false'>
                  <img v-else-if="['mp4','avi'].includes(item.format)" src="../../assets/Collections/Disk/video.svg" draggable='false'>
                  <img v-else-if="['txt'].includes(item.format)" src="../../assets/Collections/Disk/n-txt.svg" draggable='false'>
                  <img v-else-if="['cpp','html','js','c','css'].includes(item.format)" src="../../assets/Collections/Disk/n-txt.svg" draggable='false'>
                  <img v-else-if="['png','jpg','jpeg','svg'].includes(item.format)" src="../../assets/Collections/Disk/image.svg" draggable='false'>
                  <img v-else-if="!item.isFile" src="../../assets/Collections/Disk/fold.svg" draggable='false'>
                  <img v-else src="../../assets/Collections/Disk/unknown.svg" draggable='false'>   
                  <span class="name" v-if="renameId==index">
                     <input v-model="renameData" id="rename-input">
                  </span>
                  <span class="name" v-else>{{item.name}}</span>
                  <span class="attach">
                     <img @click="createFold()" class="oper-img" src="../../assets/Collections/Disk/加话题.svg" draggable='false'>
                     <img @click="sort()" class="oper-img" src="../../assets/Collections/Disk/排序.svg" draggable='false'>
                     <img @click="rename(index)" class="oper-img" src="../../assets/Collections/Disk/修改.svg" draggable='false'>
                  </span>
               </td> 
               <td><span v-if="item.isFile">{{item.size}}</span><span v-else>--</span></td> 
               <td>{{item.changeTime}}</td>
               <td class="oper">
                  <img v-if="item.isFile" @click="download(index)" src="../../assets/Collections/Disk/下移.svg" draggable='false'>
                  <img @click="delet(index)" src="../../assets/Collections/Disk/删除.svg" draggable='false'>
                  <img v-if="item.isFile" @click="share($event,index)" src="../../assets/Collections/Disk/分享.svg" draggable='false'>
               </td>
               
            </tr>
         </tbody>
         </table>
         <transition name="msg">
         <div v-if="files.length==0 && pos!=''" :key="'nothing'" v-cloak>
            <div id="no-reviews-body">
                  <img src="../../assets/Common/nodata.svg" />
                  <span>这里空空如也...</span>
               </div>
            </div>
         </transition>
      </div>
   </div>
</template>

<script>

   export default {
      name: "disk", 
      data(){
         return {
            files:[],
            pos:"",
            choose:[],
            mouseChoose:false,
            renameId:-1,
            renameData:"",
         }
      },
      methods:{
         select(index,always){
            if(!this.mouseChoose && !always) return;
            
            var stat = !this.choose[index]
            this.choose.splice(index,1,stat)#
         },
         cancalRename(){
            this.renameId = -1;
         },
         share(event, index){
            var text='funx.pro/resource/junk'+this.pos+'/'+this.files[index].name;
            this.$alert('右键复制：'+text,'tiny-clipboard',{x:event.pageX, y:event.pageY})
         },
         rename(index){
            this.renameData = this.files[index].name
            this.renameId = index
            this.$nextTick(()=>{
               var input = document.getElementById('rename-input')
               var obj = input
               input.focus()
               obj.type = 'text';
               obj.selectionStart = 0; // 选中开始位置
               obj.selectionEnd = obj.value.indexOf('.');// 获取输入框里的长度。
               obj.type = 'input_type';// 获得焦点后，改回number类型
               input.onblur = ()=>{
                  if(this.renameId==-1) return;
                  this.renameId = -1;
                  if(this.files[index].name==this.renameData) return;
                  this.$http
                  .post("/disk/rename",{
                     pos:this.pos, name:this.files[index].name, isFile:this.files[index].isFile ,rename:this.renameData
                  }).then(res => {
                     if(res.data.success==1)
                        this.refresh()
                     else
                        this.$alert(res.data.msg,'false')
                  })
               }
            })
         },
         createFold(){
            this.$http
            .post("/disk/createFold",{
               pos:this.pos,
            })
            .then(res => {
               console.log(res.data.success)
               this.choose.unshift(0)
               this.refresh()
               setTimeout(()=>{
                  this.rename(0)
               },100)
            })
         },
         delet(index){
            this.$http
            .post("/disk/delete",{
               pos:this.pos,
               name:this.files[index].name,
               isFile:this.files[index].isFile,
               _id: this.Cookies.get("_id"),
            })
            .then(res => {
               if(res.data.success==1){
                  this.$alert(res.data.msg,"true");
                  this.files.splice(index,1)
                  this.choose.splice(index,1)
               }else{
                  this.$alert(res.data.msg,"false");
               }
               
            })
         },
         download(index){
            var x=new XMLHttpRequest();
            x.open("GET", 'http://funx.pro/resource/junk'+this.pos+'/'+this.files[index].name, true);
            x.responseType = 'blob';
            x.onload=(e)=>{
                var url = window.URL.createObjectURL(x.response)
                var a = document.createElement('a');
                a.href = url
                a.download = this.files[index].name
                a.click()
            }
            x.send();
         },
         explore(item,index){
            if(typeof item == 'number'){
               var arr = this.pos.split('/')
               var tpos = ''
               for(let i=1;i<=item;i++){
                  console.log(i+":"+arr[i])
                  tpos += '/'+arr[i]
               }
                  
               console.log(tpos)
               this.pos = tpos;
               this.refresh(true)
            }
            else if(!item.isFile){
               this.pos += '/' + item.name  
               this.refresh(true)
            }else{
               //this.$alert("暂不支持预览哦","tips");
               window.open('/resource/junk'+this.pos+'/'+this.files[index].name);
            }
         },
         refresh(first){
            // console.log(this.pos)
            this.$http
            .post("/disk/getPublic",{
               pos:this.pos,
            })
            .then(res => {
               this.files = res.data.data;
               if(first){
                  this.files.forEach(()=>{
                     this.choose.push(0)
                  })
               }else{
                  this.choose.unshift(0)
               }
            })
         }
      },
      mounted(){
         var box = document.getElementById("disk-wrapper")
         var table = document.getElementsByTagName("table")[0]
         this.refresh(true)
         box.addEventListener("drop",(e)=>{  //拖离 
            table.style.backgroundColor = ''  
            e.preventDefault();
            var fileList = e.dataTransfer.files;
            console.log(fileList)
            if(fileList[0].size >= 1024 * 1024 *100){
               this.$alert("不能大于100MB噢！","false");
               return;
            }
            var formData = new FormData()
            formData.append('file', fileList[0])
            formData.append('name', fileList[0].name)
            formData.append('pos', this.pos)
            var config = {
               headers: { 'Content-Type': 'multipart/form-data' }
            }
            this.$http.post('/disk/uploadPublic', formData, config ).then(res=>{
               if(res.data.success==1){
                  this.refresh()
                  this.$alert("上传成功！","true");
               }else{
                  this.$alert(res.data.msg,"false");
               }
            })  
         })
         box.addEventListener('click',(e)=>{

         })
         box.addEventListener("dragleave",function(e){  //拖后放  
            table.style.backgroundColor = '' 
             e.preventDefault();
             
         })  
         box.addEventListener("dragenter",function(e){  //拖进
            //  box.style.filter = 'brightness(2)'
             e.preventDefault();      
         })  
         box.addEventListener("dragover",function(e){  //拖来拖去    
            table.style.backgroundColor = 'rgb(227, 245, 229)'
             e.preventDefault();      
         })
         box.addEventListener("mousedown",(e)=>{  //拖来拖去    
            this.mouseChoose = true;   
            // console.log(this.mouseChoose)
         })
         box.addEventListener("mouseup",(e)=>{  //拖来拖去    
            this.mouseChoose = false;      
            // console.log(this.mouseChoose)
         })
      },
      created(){
         
      }
   };

</script>

<style lang="scss" scoped>
   input{
      padding: 0.4rem 0.6rem;
   }
   button{
      // color:rgb(227, 245, 229)
      padding:0.5rem 1rem;
      margin:-0.4rem 0;
   }
   table{
      table-layout:fixed;
      user-select: none;
      width:100%;
      & > span{
         width:100%;
      }
      th{
         font-size: 1.5rem;
         text-align: left;
         padding-left: 2%!important;
      }
      td{
         font-size: 1.35rem!important;
         padding: 0.45rem!important;
         padding-left: 2%!important;
         text-align: left;
      }
      tr:nth-child(2n){
         background-color:rgba(255, 255, 255, 0.9);
      }
      tr:nth-child(2n-1){
         background-color:rgba(245, 253, 255, 0.9);
      }
      tr{
         transition:0.2s all;
         &:hover{
            background-color:rgb(232, 245, 255);
            .attach img{
               opacity: 1;
            }
         }
         &:active{
            background-color:rgb(213, 239, 246);
         }
         // td:nth-child(1){
         //    width:400rem;
         // }
         
      }
      .format{
         img{
            width:2.2rem;
            height:2.1rem;
            vertical-align: -0.2rem;
         }
         img:first-child{
            width:1.6rem;
            vertical-align: -0.2rem;
            padding:0 1.2rem 0 0.4rem;
            margin-right: 0;
         }
         .attach{
            text-align: right;
         }
         .attach img{
            transition: 0.2s all;
            opacity: 0;
            float:right;
            width:1.5rem;
            vertical-align: -0.3rem;
            margin-left: 0rem;
            padding:0 0.4rem;
         }
      }
      .oper{
         img{
            margin-right: 1rem;
            width:1.6rem;
            vertical-align:-0.5rem;
            &:hover{
               cursor: pointer;
               filter:brightness(0.65);
            }
         }  
      }
      .oper-img{
         width:1.6rem;
         vertical-align:-0.3rem;
         &:hover{
               cursor: pointer;
               filter:brightness(0.65);
         }
      }
      .name{
         vertical-align: 0.25rem;
         margin-left: 0.9rem;
         margin-right: 0.9rem;
         img{
            vertical-align: -0.6rem;
            margin-left: 0.2rem;
            transition: 0.2s all;
            &:hover{
               cursor: pointer;
               filter:brightness(0.9);
            }
         }
      }
   }
   .header{
      margin:0rem 0 1rem 2.4rem;
      font-size: 1.4rem;
      color:rgb(195, 195, 195);
      & > span{
         margin-right:1.5rem;
         & >span{
            user-select: none;
            color:rgb(121, 169, 203);
            &:hover{
               color:rgb(85, 147, 192);
               text-decoration: underline;
               cursor: pointer;
            }
         }
      }
   }
   #no-reviews-body {
      margin-top: -1rem;
      text-align: center;
      width:100%;
   }
   #no-reviews-body img{
      width: 15rem;
      height: 15rem;
      opacity: 0.35;
   }
   #no-reviews-body span{
      vertical-align:6rem;
      margin-left: 1.5rem;
      font-size: 1.5rem;
      color:#ccc;
   }
   .files{
      font-size: 1.5rem;
   }
   .msg-leave-active,.msg-enter-active{
      transition: all 0.3s ease-out;
   }
   .msg-leave {
      // transform: translateX(-30px);
      opacity: 0;
   }
   .msg-enter{
      transform: translateX(-30px);
      opacity: 0;
   }
</style>
