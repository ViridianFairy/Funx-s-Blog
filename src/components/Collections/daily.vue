<template>
<transition name="public-slide">
   <div>
		<div class="indic"><img class="icn" style="margin:0 0.4rem;width:2.5rem;vertical-align:-0.6rem"
      src="../../assets/Navi/saynum.svg"/>{{indic[cess]}}</div>
		<transition name="public-slide">
		<div v-if="cess==0 || cess==1">
			<div class="form">
				<div v-for="(key,index) in config.key" :key="index" :style="{opacity:getOpacity(index)}">
					<span>{{key}}:</span>
					<span v-if="index==2">
						<input v-model="config.value[index][1]" class="small-input">
						<input v-model="config.value[index][2]" class="small-input">
						<input v-model="config.value[index][3]" class="small-input">
					</span>
					<input v-else v-model="config.value[index]" :disabled="[4,5,6,7].includes(index)">
				</div>
			</div>
		</div>
		</transition>
		<transition name="public-slide">
		<div v-if="cess==2">
			<div class="form">
				<div>
				<span>{{config.value[1]+" 收到的验证码:"}}</span><input v-model="capcha" style="width:7rem;">
				</div>
			</div>
		</div>
		</transition>
		<transition name="public-slide">
		<div v-if="cess==3">
			<div class="form">
				<div>
				<span>{{"提交成功，您的id:" + id}}</span><br>
				<a href="http://funx.pro/demo/disk?l=daily">点击这里查看已加入的队列</a>
				</div>
			</div>
		</div>
		</transition>
		<div style="text-align:center">
			<button class="green" @click="cessOn" :style="{backgroundColor:getColor()}">{{cess==0?'下一步':'确认'}}
				<span v-if="disable" class="loader loader--style3" title="2">
  					<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  					   width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  						<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
  					   <animateTransform attributeType="xml"
  					    attributeName="transform"
  					    type="rotate"
  					    from="0 25 25"
  					    to="360 25 25"
  					    dur="0.6s"
  					    repeatCount="indefinite"/>
  					  </path>
  					</svg>
				</span></button>
		</div>
		<footer >
			本网站完全符合习近平总书记于2月3日，召开的中央政治局常委会议精神，总书记强调：“在疫情防控工作中，要坚决反对形式主义、官僚主义，让基层干部把更多精力投入到疫情防控第一线。”，
			官媒人民网则将其权威解读为——都什么时候了，还在搞“填表抗疫”？
			<br >
			<a href="https://github.com/ZimoLoveShuang/auto-submit">项目全都不是我做的，来源GithubZimoLoveShuang</a>
		</footer>
	</div>
</transition>
</template>

<script>
	import axios from 'axios'
   export default {
      name: "daily",
      data(){
         return {
				disable:false,
				list:[],
				cess:2,
				indic:['1.确认你的个人信息','2.填写错误会发生意外,真的确认了吗','3.填写手机验证码','4.搞定！每天7,10,13,19时会自动填表'],
				capcha:"",
				config:{
					key:['学号','电话','家庭住址','接收邮箱','学校','经度','纬度'],
					value:['061700150','18162084058',['中国','山东省','潍坊市','潍城区'],
					'297091829@qq.com','福州大学','119.14263382','36.71611487']
				},
				id:5
				/*config:{
					'学号':"061700150",
					'电话':"18162084058",
					'家庭住址':['中国','山东省','潍坊市','潍城区'],
					'接收邮件':'297091829@qq.com',
					'学校':'福州大学',
					'经度':'119.14263382',
					'纬度':'36.71611487',
				}*/
			}
      },
      computed: {
         URL(){
				return `${require('../../config').baseURL}:3022/api`
			}
      },
      methods:{
			getColor(){
				if(this.disable) return "#aaa"
				else return "#34b759"
			},
			getOpacity(index){
				if(index>=4) return '0.5'
				else return '1'
			},
			cessOn(){
				if(this.disable == true) return
				this.disable = true
				if(this.cess==2){
					axios.post(this.URL + "/daily/writeCode",{'capcha':this.capcha}).then(res => {
						console.log(res.data)
                  if (res.data.success == 1) {
							this.id = res.data.id
							this.cess++
							this.disable = false
                  }
               }).catch();
				}else if(this.cess==1){
					axios.post(this.URL + "/daily/write",this.config).then(res => {
                  if (res.data.success == 1) {
							this.cess++
							this.disable = false
                  }
               }).catch();
				}else{
					setTimeout(()=>{
						this.disable = false
						this.cess = -1
						this.$nextTick(()=>{
							this.cess = 1
						})
					},10000)
					
				}
					
			}
		},
		created(){

		},
   };

</script>

<style lang="scss" scoped>
.indic{
	text-align: center;
	font-size: 1.9rem;
	font-weight: bold;
	color:rgb(233, 160, 92);
	margin:0.9rem 0;
}
.form > div{
	color:#111;
	text-align: center;
	margin: 1.4rem auto 1.4rem auto;
	& span{
		font-size: 1.4rem;
		margin-right: 1rem;
	}
}
button{
	transition: 0.2s all;
}
footer{
	min-width:350px;
	width:60%;
	text-align: center;
	margin:2.5rem auto 1rem;
	font-size: 1.4rem;
	color:#ddd;
}
.small-input{
	width:5.5rem;
}
svg path,
svg rect{
  fill: #FF6700;
}
.loader{
	vertical-align:-0.5rem;
}
</style>
