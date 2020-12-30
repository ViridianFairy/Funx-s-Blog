const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const $ajax = require('axios')
// mongoose.connect("mongodb://myblog:731016@106.15.200.151:27017/MyBlog", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// });
// const Ncov = mongoose.model("NCOV", new mongoose.Schema({
//    name: String,
//    data: String,
// },
//    { collection: "NCOV" }));
app.use(require("cors")());
app.use(express.json());
/* =====================
   begin
   =====================  */
/*$ajax.get("https://lab.isaaclin.cn/nCoV/api/area").then(doc => {
	// console.dir(doc.data)
	var arr = [];
	var obj = {
		curInj: [0, 0],
		inj: [0, 0],
		sus: [0, 0],
		cur: [0, 0],
		dead: [0, 0],
		bad: [0, 0]
	};
	doc.data.results.forEach(d => {
		if (d.countryName == "中国") {
			delete d.cities;
			delete d.locationId;
			delete d.continentEnglishName;
			delete d.countryEnglishName;
			delete d.continentName;
			delete d.provinceEnglishName;
			arr.push(d);
		}
	});
	$ajax.get("https://lab.isaaclin.cn/nCoV/api/overall").then(doc2 => {
		var doc2 = doc2.data.results[0];
		obj.inj[0] = doc2.confirmedCount;
		obj.curInj[0] = doc2.currentConfirmedCount;
		obj.sus[0] = doc2.suspectedCount;
		obj.cur[0] = doc2.curedCount;
		obj.dead[0] = doc2.deadCount;
		obj.bad[0] = doc2.seriousCount;
		obj.inj[1] = doc2.confirmedIncr;
		obj.curInj[1] = doc2.currentConfirmedIncr;
		obj.sus[1] = doc2.suspectedIncr;
		obj.cur[1] = doc2.curedIncr;
		obj.dead[1] = doc2.deadIncr;
		obj.bad[1] = doc2.seriousIncr;
		var ncov = new Ncov({
			name: "全国",
			data: JSON.stringify({
				data: arr,
				statis: obj
			})
		});
		ncov.save((err, data) => {
			if (!err) console.log("ok");
		});
	});
});
$ajax.get("https://lab.isaaclin.cn/nCoV/api/area").then(doc => {
	// console.log()
	var ncov = new Ncov({
		name: "全国",
		data: JSON.stringify(doc.data)
	});
	ncov.save((err, data) => {
		if (!err) console.log("ok");
	});
});
const PROV = [
	{name: "南海诸岛", nameFull: "南海诸岛", value: -1},
	{name: "北京", nameFull: "北京市", value: -1},
	{name: "天津", nameFull: "天津市", value: -1},
	{name: "上海", nameFull: "上海市", value: -1},
	{name: "重庆", nameFull: "重庆市", value: -1},
	{name: "河北", nameFull: "河北省", value: -1},
	{name: "河南", nameFull: "河南省", value: -1},
	{name: "云南", nameFull: "云南省", value: -1},
	{name: "辽宁", nameFull: "辽宁省", value: -1},
	{name: "黑龙江", nameFull: "黑龙江省", value: -1},
	{name: "湖南", nameFull: "湖南省", value: -1},
	{name: "安徽", nameFull: "安徽省", value: -1},
	{name: "山东", nameFull: "山东省", value: 5555},
	{name: "新疆", nameFull: "新疆维吾尔自治区", value: 99999},
	{name: "江苏", nameFull: "江苏省", value: -1},
	{name: "浙江", nameFull: "浙江省", value: -1},
	{name: "江西", nameFull: "江西省", value: 555},
	{name: "湖北", nameFull: "湖北省", value: -1},
	{name: "广西", nameFull: "广西壮族自治区", value: -1},
	{name: "甘肃", nameFull: "甘肃省", value: -1},
	{name: "山西", nameFull: "山西省", value: -1},
	{name: "内蒙古", nameFull: "内蒙古自治区", value: -1},
	{name: "陕西", nameFull: "陕西省", value: -1},
	{name: "吉林", nameFull: "吉林省", value: -1},
	{name: "福建", nameFull: "福建省", value: -1},
	{name: "贵州", nameFull: "贵州省", value: -1},
	{name: "广东", nameFull: "广东省", value: -1},
	{name: "青海", nameFull: "青海省", value: -1},
	{name: "西藏", nameFull: "西藏自治区", value: -1},
	{name: "四川", nameFull: "四川省", value: -1},
	{name: "宁夏", nameFull: "宁夏回族自治区", value: -1},
	{name: "海南", nameFull: "海南省", value: -1},
	{name: "台湾", nameFull: "台湾", value: -1},
	{name: "香港", nameFull: "香港", value: -1},
	{name: "澳门", nameFull: "澳门", value: -1}
];
PROV.forEach((v, j) => {
	setTimeout(() => {
		$ajax
			.get(`https://lab.isaaclin.cn/nCoV/api/area?latest=0&province=${encodeURI(v.nameFull)}`)
			.then(doc => {
				doc = doc.data.results;
				var arr = [];
				doc.forEach((v, i) => {
					var obj = {};
					obj.updateTime = v.updateTime;
					obj.sus = v.suspectedCount;
					obj.curInj = v.currentConfirmedCount;
					obj.inj = v.confirmedCount;
					obj.cur = v.curedCount;
					obj.dead = v.deadCount;
					if (doc.length >= 200) {
						if (i % 9 >= 8) {
							arr.push(obj);
						}
					} else if (doc.length >= 60) {
						if (i % 9 >= 6) {
							arr.push(obj);
						}
					} else {
						arr.push(obj);
					}
				});
				console.log(j + v.name + " 长度：" + arr.length);
				var ncov = new Ncov({
					name: v.name,
					data: JSON.stringify(arr)
				});
				ncov.save((err, data) => {
					if (!err) console.log("ok");
				});
			});
	}, j * 1000 * 15);
});
*/
app.post("/api/ncov/getAll", (req, res) => {
	Ncov.findOne({name: "全国"}, (err_u, doc) => {
		JSON.parse(doc.data);
		res.send(doc);
	});
});
app.post("/api/ncov/getAllTime", (req, res) => {
	Ncov.findOne({name: req.body.time}, (err_u, doc) => {
		JSON.parse(doc.data);
		res.send(doc);
	});
});
app.post("/api/ncov/getProv", (req, res) => {
	Ncov.findOne({name: req.body.name}, (err_u, data) => {
		res.send(data);
	});
});

app.listen(3011, "0.0.0.0", () => {
	console.log("success");
});
