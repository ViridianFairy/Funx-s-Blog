const express = require("express");
const tes = require('tesseract.js')
const router = express.Router();
const gm = require('gm')
const puppeteer = require('puppeteer');

const wsServer = require('http').createServer(require("express")())
const io = require('socket.io')(wsServer)
var data = {
   stuid:'061700150',
   password:'zfx731016',
   extra:{
      'point':'100',
      'judge':'老师授课的方式非常适合我们，他根据本课程知识结构的特点，重点突出，层次分明。理论和实际相结合，通过例题使知识更条理化。',
   }
}
log = console.log
async function run(url){
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36')
  page.goto(url);
  await page.waitFor('#muser')
  await page.type('#muser',data.stuid)
  await page.waitFor(500);
  await page.type('#passwd',data.password)
  await page.waitFor(500);
  await page.click('.button input')
  io.send({
      msg:'抵达主界面...',
      bar:10  
   })
  await page.waitFor(2000);
  var frame = (await page.frames())[2];
  await page.waitFor(500);
  await frame.click('#Label_menu > #container > #container> #container> #container> #container')
  await page.waitFor(1000);
  await frame.click('a[href$="score"]')
  frame = (await page.frames())[3];
  io.send({
      msg:'抵达评议处...',
      bar:20  
   })
  var times = 0;
   while(1){
      if(++times==100) break;
      io.send({
         msg:'第'+times+'次..',    
      })
      await frame.waitFor('a[href$="score"]')
      await frame.waitFor(1500);
      
      var teas = await frame.$$eval('td',e=>{
         var num = 0;
         var teachers = []
         for(let i=0;i<e.length;i++){
            var text = e[i].innerHTML
            if(text.length>=12) continue;
            if(++num<=3) continue;
            if(text=='') continue;
            teachers.push(text)
         }
         return teachers
      });
      console.log(teas)
      io.send({
         msg:teas,    
      })
      await frame.click('a[href$="score"]')
      await frame.waitFor(100);
      await frame.waitFor('#ContentPlaceHolder1_TB_zf')
      await frame.waitFor('#ContentPlaceHolder1_RB_List5_0')
      await frame.waitFor('#ContentPlaceHolder1_Image2')
      await frame.type('#ContentPlaceHolder1_TB_zf',data.extra.point)
      await frame.type('#ContentPlaceHolder1_TB_pj',data.extra.judge)
      await frame.click('#ContentPlaceHolder1_RB_List1_0')
      await frame.waitFor(100);
      await frame.click('#ContentPlaceHolder1_RB_List2_0')
      await frame.click('#ContentPlaceHolder1_RB_List3_0')
      await frame.waitFor(100);
      await frame.click('#ContentPlaceHolder1_RB_List4_0')
      await frame.click('#ContentPlaceHolder1_RB_List5_0')
      //await frame.waitFor(2000);
      var image = await frame.$('#ContentPlaceHolder1_Image2')
      image.screenshot({
         path:__dirname+'/image.png'
      })
      tes.recognize(__dirname+'/image.png').then(async(res)=>{
         //console.log('尝试：'+res.data.text||'空')
          io.send({
            msg:'尝试：'+res.data.text||'空',    
         })
          await frame.waitFor(1000)
          await frame.type('#ContentPlaceHolder1_verifycode',res.data.text)
          await frame.click('#ContentPlaceHolder1_Button_xk')
          await frame.waitFor(1000)
          page.on('dialog',async dialog=>{
            await dialog.dismiss();
          })
         //  frame.on('dialog',async dialog=>{
         //    await dialog.dismiss();
         //  })
          await frame.waitFor(1000)
          var left = (await page.frames())[2];
          await left.click('a[href$="score"]')
          await frame.waitFor(500)
      })
   }
}
io.on('connection',(socket)=>{
   console.log('连接！')
   io.send({
      msg:'连接成功...',    
   })
   io.on('init',doc=>{
      doc.stuid && (data.stuid = doc.stuid)
      doc.password && (data.password = doc.password)
      
   })
   run('http://jwch.fzu.edu.cn/')
   // socket.on('login',data=>{
   //    name = data.name
   // })
   // socket.on('disconnect',data=>{
   //    io.emit('message',{
         
   //    })
   // })
})
run('http://jwch.fzu.edu.cn/')
module.exports = {
   router,
   server:wsServer,
}