const {Builder, By, Key, until} = require('selenium-webdriver');
router.post("/api/wisdom/init",(req, res)=>{
   (async function(){
      var driver = new Builder().forBrowser('chrome').build()
      await driver.get('https://passport.zhihuishu.com/login?service=https://onlineservice.zhihuishu.com/login/gologin')
      await driver.findElement(By.id('lUsername')).sendKeys(req.body.phone)
      await driver.findElement(By.id('lPassword')).sendKeys(req.body.password) /*driver.findElement(By.id('qStudentID')).click()*/
      await driver.findElement(By.className('wall-sub-btn')).click()
      driver.wait(until.elementLocated(By.className('topFix'))).click()
      driver.wait(until.elementLocated(By.className('speedPromote_btn'))).click().then(()=>{
         driver.getCurrentUrl().then(doc=>{
            driver.switchTo()
            driver.sleep(4000)
            driver.executeAsyncScript(`var ti = $("body");
   var video = $(".catalogue_ul1 li[id*=video-]");
   var i = 1;
   var v = 1;
   video.css("color", "blue");
   console.log("已选取" + video.length + "个");
   setTimeout(function () {
      $('.speedTab15').click();
      $('.volumeIcon').click();
      $('.line1bq').click();
      $(".popbtn_cancel").click();
      $('body > div.wrap_popboxes.wrap_popchapter').remove();
   }, 3000);
   ti.on("DOMNodeInserted", function (e) {
       if (e.target.textContent == "关闭") {
           console.log("检测到第" + i + "个弹题窗口");
           window.setTimeout(function () {
               document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName("answerOption")[0].getElementsByTagName("input")[0].click();
               $(".popbtn_cancel").click();
               console.log("已关闭");
           }, 3000);
           i++;
       } else if (e.target.textContent == "本节视频,累计观看时间『100%』") {
           console.log("下一节");
           $('.next_lesson_bg').find('a').trigger('click');
           console.log("已跳转");
           setTimeout(function () {
               $('.volumeIcon').click();
               $('.speedTab15').click();
           }, 6000);
           v++;
           console.log("目前播放了" + v + "个视频");
       }
   });`)
         }) 
         
      })
      
   })()
})
   router.post("/api/wisdom/init", (req, res)=>{
      var arr = []
      axios.get('http://web.chacuo.net/css3beziertool').then((data)=>{
         data = data.data
         let $ = cheerio.load(data)
         let options = $('option');
         options.attr('value');
         [].forEach.call(options,(item)=>{
            let obj = {}
            obj.data = $(item).val()
            obj.name = $(item).text()
            arr.push(obj)
         })
         res.send(arr)
         return
         // options.each((i,item)=>{
         //    let obj = {}
         //    obj.data = $(this).attr('value')
         //    obj.name = $(this).val()
         //    arr.push(obj)
         // })
      })
      
   })
   const express = require("express");
const router = express.Router();
router.post("/api/wisdom/init",(req, res)=>{

})
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const data = {
   phone:'18162084058',
   password:'981219'
}
log = console.log
async function run(url,content,webdriver){
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
//   await page.emulate(iPhone);
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36')
  await page.goto(url);
  await page.type('#lUsername',data.phone)
  await page.type('#lPassword',data.password)
  await page.click('.wall-sub-btn')
  await page.evaluate(webdriver)
//   await page.waitForNavigation();
//   await page.content();
  await page.waitFor(3500)
  await page.click('.topFix')
  await page.waitFor(5500)
  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page()))); // 声明变量
  await page.click('.speedPromote_btn') // 点击跳转
  const newPage = await newPagePromise; // newPage就是a链接打开窗口的Page对象
//   await newPage.emulate(iPhone);
  await newPage.evaluate(webdriver)
  await newPage.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36')
  await newPage.waitFor(5500)
 
  await newPage.addScriptTag({content})
  await log(browser.pages())
//   await browser.close();
}
run('https://passport.zhihuishu.com/login?service=https://onlineservice.zhihuishu.com/login/gologin',
`var ti = $("body");
   var video = $(".catalogue_ul1 li[id*=video-]");
   var i = 1;
   var v = 1;
   video.css("color", "blue");
   console.log("已选取" + video.length + "个");
   setTimeout(function () {
      $('.speedTab15').click();
      $('.volumeIcon').click();
      $('.line1bq').click();
      $(".popbtn_cancel").click();
      $('body > div.wrap_popboxes.wrap_popchapter').remove();
   }, 3000);
   ti.on("DOMNodeInserted", function (e) {
       if (e.target.textContent == "关闭") {
           console.log("检测到第" + i + "个弹题窗口");
           window.setTimeout(function () {
               document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName("answerOption")[0].getElementsByTagName("input")[0].click();
               $(".popbtn_cancel").click();
               console.log("已关闭");
           }, 3000);
           i++;
       } else if (e.target.textContent == "本节视频,累计观看时间『100%』") {
           console.log("下一节");
           $('.next_lesson_bg').find('a').trigger('click');
           console.log("已跳转");
           setTimeout(function () {
               $('.volumeIcon').click();
               $('.speedTab15').click();
           }, 6000);
           v++;
           console.log("目前播放了" + v + "个视频");
       }
   });`,function(){
            Object.defineProperties(navigator,{
               webdriver:{
                  get: () => false
               }
            })
         })
module.exports = router