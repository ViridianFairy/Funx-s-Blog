<template>
<transition name="public-slide">
   <div id="disk-wrapper">
      <div id="files-wrapper">
         <div class="header">
            <span>当前位置：
               <span v-for="(item,index) in pos.split('/')" :key="item" @click="explore(index)">{{index==0?'根目录':' / '+item}}</span>
            </span>
            <span>文件数：{{files.length}}</span>
            <span class="header-text">拖动文件直接上传</span>
            <div class="upload-wrapper">
                              <input type="file" @change="getFiles" name="avatar" ref="upload"/>
                              <!-- <input class="upload-text" disabled :placeholder="fileName"> -->
                              <div class="upload"><button @click="$refs.upload.click()">上传</button></div>
                           </div>
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
                <img @click="download([],$event)" class="oper-img" src="../../assets/Collections/Disk/下移.svg" draggable='false'>&nbsp;
                <img @click="delet([])" class="oper-img" src="../../assets/Collections/Disk/删除.svg" draggable='false'>&nbsp;
                <img @click="share($event,[])" class="oper-img" src="../../assets/Collections/Disk/分享.svg" draggable='false'>&nbsp;
            </span>
            </th>
            <th>大小</th><th>最后修改</th><th>操作</th></tr>
         <tbody is="transition-group" :name="transName"  mode="out-in">
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
                  <img v-else-if="['mp4','avi','mov','MOV'].includes(item.format)" src="../../assets/Collections/Disk/video.svg" draggable='false'>
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
                  <img v-if="item.isFile" @click="download(index,$event)" src="../../assets/Collections/Disk/下移.svg" draggable='false'>
                  <img @click="delet(index)" class="delete-icon" src="../../assets/Collections/Disk/删除.svg" draggable='false'>
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
</transition>
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
            transName:'msg',
         }
      },
      methods:{
         select(index,always){
            if(!this.mouseChoose && !always) return;
            
            var stat = !this.choose[index]
            this.choose.splice(index,1,stat)
         },
         cancalRename(){
            this.renameId = -1;
         },
         share(event, index){
            if(Array.isArray(index)){
               index = this.choose
               var text = ''
               for(let i=0;i<index.length;i++){
                  if(!index[i]) continue;
                  if(this.files[i].isFile==false) continue;
                  text += 'funx.pro/resource/junk'+this.pos+'/'+this.files[i].name+'\n';
               }
               if(text=='')
                  text='文件夹无链接'
               this.$alert('右键复制：'+text,'tiny-clipboard',{x:event.pageX, y:event.pageY})
               return;
            }else{
            var text='funx.pro/resource/junk'+this.pos+'/'+this.files[index].name;
            this.$alert('右键复制：'+text,'tiny-clipboard',{x:event.pageX, y:event.pageY})
            }
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
         download(index,e){
            var hasFile = false;
            if(Array.isArray(index)){
               index = this.choose
               for(let i=0;i<index.length;i++){
                  console.log('111')
                  if(index[i]==0) continue;
                  if(this.files[i].isFile==false) continue;
                  var x=new XMLHttpRequest();
                  x.open("GET", 'http://funx.pro/resource/junk'+this.pos+'/'+this.files[i].name, true);
                  x.responseType = 'blob';
               x.onload=(e)=>{
                  hasFile = true
                  var url = window.URL.createObjectURL(x.response)
                  var a = document.createElement('a');
                  a.href = url
                  a.download = this.files[i].name
                  a.click()
               }
               x.send();
               }
               this.$alert(`开始下载文件（未完成，后端压缩包）`,'tiny-overload',{x:e.pageX, y:e.pageY})
               if(hasFile){
                  //this.$alert(`开始下载文件`,'tiny-overload',{x:e.pageX, y:e.pageY})
               }else{
                  //this.$alert(`无文件可下载，也许你选择了文件夹`,'tiny-overload',{x:e.pageX, y:e.pageY})
               }
               return;
            }else{
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
            this.$alert(`开始下载文件`,'tiny-overload',{x:e.pageX, y:e.pageY})
            }
           
         },
         explore(item,index){
            if(typeof item == 'number'){
               this.transName = 'msg2'
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
               this.transName = 'msg'
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
                  this.choose = [];
                  this.files.forEach(()=>{
                     this.choose.push(0)
                  })
               }else{
                  this.choose.unshift(0)
               }
            })
         },
         getFiles(e) {
            e.preventDefault();
            if(e.target.files[0].size >= 1024 * 1024 * 50){
               this.$alert("大于50M啦","false");
               return;
            }
            console.log(e.target.files[0])
            var formData = new FormData()
            this.fileName = e.target.files[0].name
            formData.append('file', e.target.files[0])
               formData.append('name', e.target.files[0].name)
               formData.append('pos', this.pos)
            this.$alert(`开始上传文件`,'tiny-overload',{x:e.pageX, y:e.pageY})
            var config = {
               headers: { 'Content-Type': 'multipart/form-data' }
            }
            this.$http.post('/disk/uploadPublic', formData, config ).then(res=>{
               if(res.data.success==1){
                  this.refresh()
                  console.log('成功')
                  this.$alert("上传成功！","true-overload");
               }else{
                     this.$alert(res.data.msg,"false-overload");
                  }
            })
         },
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
            this.$alert(`开始上传文件`,'tiny-overload',{x:e.pageX, y:e.pageY})
            var msg = '';
            var count = 0;
            var success_count = 0;
            for(let i=0;i<fileList.length;i++){
               if(fileList[i].size >= 1024 * 1024 *100){
                  this.$alert("不能大于100MB噢！","false-overload");
                  return;
               }
               var formData = new FormData()
               formData.append('file', fileList[i])
               formData.append('name', fileList[i].name)
               formData.append('pos', this.pos)
               var config = {
                  headers: { 'Content-Type': 'multipart/form-data' }
               }
               this.$http.post('/disk/uploadPublic', formData, config ).then(res=>{
                  count++;
                  if(res.data.success==1){
                     success_count++;
                     this.refresh()
                     console.log('成功')
                    // this.$alert("上传成功！","true-overload");
                  }else{
                     msg+=res.data.msg+'\n'
                    // this.$alert(res.data.msg,"false-overload");
                  }
                  if(count == fileList.length){
                     if(success_count==0)
                        this.$alert(`上传失败${count-success_count}个\n`+msg,"false-overload");
                     else if(success_count==count && count!=0)
                        this.$alert(`成功上传${success_count}个文件`,"success-overload");
                     else
                        this.$alert(`成功上传${success_count}个文件，失败${count-success_count}个\n`+msg,"tips-overload");
                  }
               })
            }
  
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
   #disk-wrapper{
      min-height:calc(100vh - 100px);
   }
   table{
      border: none !important;
      border-top: 1px solid #f3f3f3 !important;
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
//  overflow: hidden;
//  text-overflow: ellipsis;
//  white-space: nowrap;
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
      transition: transform 1.5s;
   }
   
   .msg-leave-active,.msg2-leave-active{
      transition: all 0.08s ease-out;
   }
   .msg-enter-active,.msg2-enter-active{
      transition: all 0.3s 0.08s ease-out;
   }
   .msg-leave-to,
   .msg2-enter{
      transform: translateX(20px);
      opacity: 0;
   }
   .msg-enter,
   .msg2-leave-to{
      transform: translateX(-20px);
      opacity: 0;
   }
   .msg-move,.msg2-move{
      transition: all 0.25s
   }
   .upload-wrapper{
      height:3rem;
      margin: 0 !important;
      display: inline-block;
      position: relative;
   }
   .upload{
      margin: 0 !important;
      position: relative;
      color:rgb(255, 214, 175)
   }
   input.upload-text{
      position: absolute;
      width: 10.5rem;
      border: 0.1rem solid rgb(253, 221, 190);
   }
   .upload button{
      margin-top: -0.10rem;
      margin-right: 0;
      margin-left:0.1rem;
      padding: 0.45rem 1rem;
      background-color: #FFB876;
   }
      input[type="file"]{
      opacity: 0;
      position: absolute;
   }
   @media screen and (max-width: 768px) {
      .header-text{
         display: none;
      }
      .header{
         margin-top: 1rem;
      }
      .attach{
         img:nth-child(2),img:nth-child(1){
            display: none;
         }
      }
      .delete-icon{
         display: none;
      }
   }
   
</style>
