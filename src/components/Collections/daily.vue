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
					<input v-model="config.value[index]" :disabled="[4,5,6,7].includes(index)">
				</div>
				<div><button class="green" @click="cessOn">{{cess==0?'下一步':'确认'}}</button></div>
			</div>
		</div>
		</transition>
		<transition name="public-slide">
		<div v-if="cess==2">
			<div class="form">
				<div>
				<span>{{config.value[1]+" 收到的验证码:"}}</span><input v-model="capcha" style="width:7rem;">
				</div>
				<div><button class="green" @click="cessOn">{{cess==0?'下一步':'确认'}}</button></div>
			</div>
		</div>
		</transition>
		<
	</div>
</transition>
</template>

<script>
   export default {
      name: "daily",
      data(){
         return {
				list:[],
				cess:0,
				indic:['1.确认你的个人信息','2.填写错误会发生意外,真的确认了吗','3.填写手机验证码'],
				capcha:"",
				config:{
					key:['学号','电话','家庭住址','接收邮件','学校','经度','纬度'],
					value:['061700150','18162084058',['中国','山东省','潍坊市','潍城区'],
					'297091829@qq.com','福州大学','119.14263382','36.71611487']
				}
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
         
      },
      methods:{
			getOpacity(index){
				if(index>=4) return '0.5'
				else return '1'
			},
			cessOn(){
				if(this.cess==2){

				}else{
					this.cess++
				}
			}
		},

   };

</script>

<style lang="scss" scoped>
.indic{
	text-align: center;
	font-size: 1.9rem;
	color:rgb(233, 160, 92);
	margin:0.9rem 0;
}
.form > div{
	text-align: center;
	margin: 1.4rem auto 1.4rem auto;
	& span{
		font-size: 1.4rem;
		margin-right: 1rem;
	}
}

</style>
