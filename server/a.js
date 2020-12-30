const mongoose = require("mongoose");
// const $ajax = require('axios')
mongoose.connect("mongodb://myblog:731016@106.15.200.151:27017/MyBlog", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
const Ncov = mongoose.model("NCOV", new mongoose.Schema({
   name: String,
   data: String,
},
   { collection: "NCOV" }));
const fs = require('fs')
const $ajax = require('axios')
// var Data = fs.readFileSync('../json/20200215.json', 'utf-8')
var MONTH = [-1, 31, 29, 10]
var m, d, i
var calen = []
for (m = 2; m <= 3; m++) {
	for (m == 2 ? (d = 27) : (d = 1); d <= MONTH[m]; d++) {
		var strd = d
		if (strd <= 9) strd = '0' + strd
		calen.push(`2020-0${m}-${strd}`)
	}
}
var last = {}
function sleep(wait) {
	return new Promise((res,rej) => {
		 setTimeout(() => {
			  res(wait);
		 },wait);
	});
}
var last = {curInj: 45399, inj: 78195, dead:  2718, sus: 0, cur: 30078}
async function run(){
	for (let i = 0; i < calen.length; i++) {
		let calenItem = calen[i]
		let doc = await $ajax.get(
			`http://api.tianapi.com/txapi//ncovcity/index?key=6e07e5626fdebe0394ff896b6bdb52a3&date=${calenItem}`
		)
		console.log(calenItem)
		var obj = {
			data: [],
			statis: {curInj: [0, 0], inj: [0, 0], dead: [0, 0], sus: [0, 0], cur: [0, 0]}
		}
		
		doc = doc.data.newslist
		doc.forEach(v => {
			delete v.provinceName
			delete v.cities
			delete v.comment
			delete v.locationId
			delete v.statisticsData
			obj.data.push(v)
			obj.statis.curInj[0] += v.currentConfirmedCount
			obj.statis.inj[0] += v.confirmedCount
			obj.statis.sus[0] += v.suspectedCount
			obj.statis.cur[0] += v.curedCount
			obj.statis.dead[0] += v.deadCount
		})
		obj.statis.curInj[1] = obj.statis.curInj[0] - last.curInj
		obj.statis.inj[1] = obj.statis.inj[0] - last.inj
		obj.statis.sus[1] = obj.statis.sus[0] - last.sus
		obj.statis.cur[1] = obj.statis.cur[0] - last.cur
		obj.statis.dead[1] = obj.statis.dead[0] - last.dead
		last.curInj=obj.statis.curInj[0]
		last.inj=obj.statis.inj[0]
		last.sus=obj.statis.sus[0]
		last.cur=obj.statis.cur[0]
		last.dead=obj.statis.dead[0]
		console.log(obj.statis)
		var ncov = new Ncov({
			name: calenItem,
			data: JSON.stringify(obj)
		});
		ncov.save((err, data) => {
			if (!err) console.log("ok");
		});
		await sleep(5000)
	}
}
run()

/*var t = ''


var cnt = 0
function gotton(arr, name) {
	return true
	var found = 0
	arr.forEach(v=>{
		if(v['name'] == name && found==0){
			found=1
		}
	})
	if(found==1) return false
	return true
}
calen.forEach((date)=>{
	cnt = 0
	var obj = {
		data: [],
		statis: {
			curInj: [],
			inj: [],
			dead: [],
			sus: []
		}
	}
	Data.forEach(v => {
		if (v.date == date && gotton(obj.data,v.name)) {
			cnt++
			obj.data.push(v)
		}
	})
	console.log(date + '  '+cnt + '条')
	obj.data.forEach(v=>{
		console.log(v.name)
	})
})*/
