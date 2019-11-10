const express = require("express");
const router = express.Router();
const Model = require('./Model')
const mongoose = require("mongoose");
const puppeteer = require('puppeteer');
const Poker = Model.Poker
log = console.log
mongoose.connect("mongodb://myblog:731016@106.15.200.151:27017/MyBlog",{
   useNewUrlParser: true,
   useUnifiedTopology: true 
});
async function addCookies(cookies_str, page, domain){
   let cookies = cookies_str.split(';').map(pair=>{
       let name = pair.trim().slice(0,pair.trim().indexOf('='))
       let value = pair.trim().slice(pair.trim().indexOf('=')+1)
       return {name,value,domain}
   });
   await Promise.all(cookies.map(pair=>{
       return page.setCookie(pair)
   }))
}
async function run(){
   const browser = await puppeteer.launch({headless:false});
   const page = await browser.newPage();
   addCookies(`_zap=e1de1c8b-0157-41d6-93f0-d779daf003a1; d_c0="ADAi0cqoyg-PTunz3Yyh3KnIkfXDD2pry7I=|1564078276"; _xsrf=XRTmycVNLsEyQGsMXpD1C3xSivYr3vAd; __utmv=51854390.100--|2=registration_date=20160710=1^3=entry_date=20160710=1; __utma=51854390.150839987.1567698326.1567698326.1568882079.2; __utmz=51854390.1568882079.2.2.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/people/zhou-fang-xu-19/activities; tst=r; q_c1=3ac413b815604796872c367a63d9fdd9|1572417479000|1567698324000; tgw_l7_route=db62f4f7b358a79146476ae200b2eab3; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1572665542,1573045621,1573197582,1573214263; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1573214263; capsion_ticket="2|1:0|10:1573214512|14:capsion_ticket|44:ODFhM2ViNWUxZDQ4NDg4YTg0OWY0YWEyOWEyMzhkMWI=|0db9458b75be659e7e96e0bccc0c91490316c5612fa7f5fc4033bee3e5da1539"; z_c0="2|1:0|10:1573214536|4:z_c0|92:Mi4xLTRBN0F3QUFBQUFBTUNMUnlxaktEeVlBQUFCZ0FsVk5TS2V5WGdCRGhxaDUxX19oNEdpNi0ycGlOMkNULXZRcWZn|bd8a2315b4dfca7f85a4f2f46247f75f4cce9d14422401e14186522fd3c4c2da"`
      ,page,'.zhihu.com')
   page.goto('https://www.zhihu.com')
   await page.waitFor('div.Card');
   const collection = await page.$('div.GlobalSideBar > div > div.Sticky > div.Card > ul.GlobalSideBar-navList > li.GlobalSideBar-starItem > a');
   await page.evaluate((collection)=>{
      collection.setAttribute('target','_self');
      collection.click();
  },collection)
  await page.waitFor(3000);
  await page.evaluate(()=>{
   let box = document.querySelector('#zh-favlist-following-wrap');
      if(box){
          let as = box.querySelectorAll('.zm-item-title a');
          as[0].click();
      }
   })
   await page.waitFor(3000);
   function response(Obj){
      let _Obj = Obj;
      return async function abc(response){
          if( response.url().indexOf('/comments') > 0 ){
              console.log('装载一个知hu的评论s')
              let comments = JSON.parse(await response.text())
              let res_comments = comments.data.slice(0,10).map((data)=>{
                  //console.log({ name: data.author.name, content: data.content, like: data.likesCount })
                  return { name: data.author.name, content: data.content, like: data.likesCount }
              })
              _Obj.data = res_comments;
          }
      }
  }
  Obj = {}
  datas = []
  page.on('response', response(Obj))
  var answerlist = await page.$$('.zm-item')
  for(let answer of answerlist){ //这个answerlist就是page.$$('选择器')获得的元素列表
        let data = await page.evaluate((answer)=>{
            //这个一个html转码方法  如： 
//&lt;script&gt;alert(2);&lt;/script&gt =>   <script>alert(2);</script>
            function HTMLDecode(text) { 
                let temp = document.createElement("div"); 
                temp.innerHTML = text; 
                let output = temp.innerText || temp.textContent; 
                return output; 
            } 
            //以下就是通过选择器，获得各种元素，然后得到我们想要的数据
           //如作者，回答内容，标题，多少个赞 等等
            let comment = answer.querySelector('div.zm-item-fav > div.zm-item-answer > div.answer-actions > div > a.toggle-comment');
            //这里我们点击评论按钮，response事件发生，我们的函数执行，收集数据
            comment.click();

            let title = answer.querySelector('.zm-item-title > a').innerHTML;

            let author = answer.querySelector('div.zm-item-fav > div.zm-item-answer > div.answer-head > div > span.name');
            let author_link = '';
            if(!author){
                author = answer.querySelector('div.zm-item-fav > div.zm-item-answer > div.answer-head > div > span > span > a.author-link').innerHTML;
                author_link = 'https://www.zhihu.com'+answer.querySelector('div.zm-item-fav > div.zm-item-answer > div.answer-head > div > span > span > a.author-link').getAttribute('href');
            }else{
                author = author.innerHTML;
            }
       
            let content = answer.querySelector('div.zm-item-fav > div.zm-item-answer > div.zm-item-rich-text > textarea.content').innerHTML;
 
            content = HTMLDecode(content);
            let like = answer.querySelector('div.zm-item-fav > div.zm-item-answer > div.zm-item-vote > a').innerHTML;

            return { title, author, content, like ,author_link}
           
        },answer)
        await page.waitFor(2000);
        if(Obj.data.length == 1){
            await page.waitFor(2000);
        }
      //   console.log(Obj.data)
        await page.waitFor(1000)
      //   data.content = handler_content(data.content)
        data.comments = Obj.data;
        //这里我们就完成了一个回答的收集了
        datas.push(data);
        Obj.data = [];
      //   console.log(data.title)
    }
    //保存到数据库
    for(let data of datas){
        let comments = data.comments;
        delete data.comments;
        delete data.author_link;
        console.log(data)
        await new Model.Bihu({
            title:data.title,
            author:data.author,
            content:data.content,
            like:data.like,
        }).save()
    }
}
module.exports = router