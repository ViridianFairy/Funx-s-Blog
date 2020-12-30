const express = require("express");
const fs = require('fs');
const app = express();
const axios = require('axios')
const schedule = require('node-schedule')
app.use(require("cors")());
app.use(express.json());
const PATH = `../../resource/junk/daily`
function getNum(tail){
	var path = PATH + '/' + tail + '.JSON'
	var cnt = 1;
	while(1){
		if(!fs.existsSync(path + cnt))
			break
		cnt++
	}
	return cnt;
}
app.post("/api/daily/write", (req, res) => {
	var src = req.body.value
	var obj = {"user": 
	{"username": src[0], 
		"tellphone": src[1], 
		"address": src[2][0]+src[2][1]+src[2][2]+src[2][3],
		"email": src[3], 
		"school": src[4], 
		"lon": src[5], 
		"lat": src[6], 
		"abnormalReason": "...", 
		"photo": ""}, 
"cpdaily": 
{"defaults": 
	[{"default": 
		{"title": "晚检体温(必填)", 
			"value":"小于37.3度"}}, 
		{"default": 
			{"title": "是否有发热、咳嗽、乏力、呼吸困难等疑似症状(必填)", 
			"value": "否"}}]}}
	  fs.writeFile(`${PATH}/config${getNum('config')}.JSON`,JSON.stringify(obj),(err)=>{
		if(!err){
			fs.writeFileSync(`${PATH}/config.json`,JSON.stringify(obj))
			axios.get('https://service-h57fwvs8-1258189457.gz.apigw.tencentcs.com/release/login').then(doc=>{
				//console.log(doc)
				res.send({success:1})
			})
		}else{
			res.send({success:0})
		}
	})
})
app.post("/api/daily/writeCode", (req, res) => {
		var src = req.body
		var obj = {'code':src['capcha']}
		  fs.writeFile('../../resource/junk/daily/code.json',JSON.stringify(obj),(err)=>{
			if(!err){
				axios.get('https://service-1st2azu4-1258189457.gz.apigw.tencentcs.com/release/capcha').then(doc=>{
					//console.log(doc.data)
					res.send({success:1})
				})
			}else{
				res.send({success:0})
			}
		})
});
app.post("/api/daily/writeToken", (req, res) => {
	var src = req.body
	var obj = src
	var id = getNum('token')
	//console.log(src)
	  fs.writeFile(`${PATH}/token${id}.JSON`,JSON.stringify(obj),(err)=>{ 
		if(!err){
			res.send({success:1,id:id})
		}else{
			res.send({success:0})
		}
	})
});
app.get("/api/daily/1", (req, res) => {
	res.send('ok');
});
function scheduleAction(){
	schedule.scheduleJob("0 0 7,11,13,19 * * *",()=>{
		var max = getNum('token') -1
		var data, i
		if(max==0) return
		for(i=1;i<=max;i++){
			data = fs.readFileSync(PATH+`/config${i}.JSON`)
			fs.writeFileSync(PATH+'config',data)
			data = fs.readFileSync(PATH+`/token${i}.JSON`)
			fs.writeFileSync(PATH+'token',data)
			console.log('写入完第' + i + '个')
			action(`https://service-18rmujsw-1258189457.gz.apigw.tencentcs.com/release/sbfzu-sign`)
			// action(`https://service-18rmujsw-1258189457.gz.apigw.tencentcs.com/release/sbfzu-sign`)
		}
		async function action(url){
			var {data} = await axios.get(url)
			console.log(data)
		}
	})
}
scheduleAction()
app.listen(3022, '0.0.0.0', () => {
   console.log("success");
});