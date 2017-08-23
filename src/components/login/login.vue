<template>
<div class="login">
	<div class="logo" @click='alt'>
		<img src="../../assets/logo_bak.png" alt="">
	</div> 
	<div class='lbox'>
		<ul>
			<li>
				<span class="icon-phone ln"></span>
				<input class='ipt' type="number" v-model='phone' maxlength="11" placeholder="请输入手机号">
			</li>
			<li>
				<span class="icon-key ln"></span>
				<input class='ipt' type="password" v-model='password' placeholder="请输入密码" utocomplete="off">
			</li>
		</ul>

		<div class="btnbox">
			<a href="javascript:;" class="abtn" @click='login'>登陆</a>
		</div>
		<div class="remPsd" v-my-directive>
        	<span>
        		<i class="remember" @click="change">
        			<em class='select' :class="{selected:selected}"></em>
        			记住密码
        		</i>	
        	</span>
        	<router-link tag="span" class="forget" to="/forgetPsd">忘记密码？</router-link>
        </div>
		<!-- <div class='dl'>
			<a href="javascript:;" class="">登陆遇到问题</a>
			<router-link to="/register" tag='a'>手机号注册</router-link>
		</div> -->
	</div>
	<my-loading></my-loading>
</div>
</template>
<script>
import MD5 from "js-md5";
import { checkLogin } from 'src/service/getData.js'; 
export default{
	name:'login',
	data(){
		return {
			phone:'',
			password:'',
			selected:false, 
		}
	},
	myOptions:{ run:true },
	created(){ 
		this.isme = this.mUtils.getCookie('redme');
		this.initData();
	},
	methods:{
		initData(){ 
			this.selected =  ((this.isme == 1) ? true : false);
			if(this.selected){  
				this.phone = this.mUtils.getCookie('Account');
				this.password = this.mUtils.getCookie('psd');
			}
		},
		change(){
			this.selected =! this.selected;
		},
		isRdme(){
			if(this.selected){ 
				this.mUtils.setCookie('redme',1);
				this.mUtils.setCookie('psd',this.password);
			}else{  
				this.mUtils.setCookie('redme',0);
				this.mUtils.setCookie('psd',"");
			}
		},
		async login(){   
			if(this.checkInfo()){
				let params = {
					Account:this.phone,
					Password:MD5(this.password)
				}
				this.$dialog.loading.open('请稍后...');
				let res = await checkLogin(params); 
				this.$dialog.loading.close();
				let ress = res.data;
				if(ress.State === 1){
					this.isRdme();
					this.$router.push('/');
				}else{
					if(res == -404 || res == -401){
						this.openAlert('服务器异常,请稍后登陆');
					}else{
						this.openAlert('用户名或密码错误');
					}
				} 
			}
		},
		checkInfo(){
			let m = 1;
			if(!(/^1[34578]\d{9}$/.test(this.phone))){
				if(this.phone == ""){
					this.openAlert('请先填写手机号')
					m = 0;
					return;
				}
				this.openAlert('手机号格式错误');
				m = 0;
				return;
			}

			if(!this.password.trim()){
				this.openAlert('密码不可为空');
				m = 0;
				return;
			}else if(this.password.trim().length < 6){
				this.openAlert('用户名或密码错误')
				m = 0;
				return;
			}
			return m;
		},
		openAlert(msg) {
            this.$dialog.alert({mes: msg});
        },
        alt(){
        	// this.$toast('信息提示')
        	this.myToast({mes:'heheh'})
        }
	}
}
</script>
<style scoped>
.lbox .remPsd{
	font-size: 0.22rem;
	position: relative;
	text-align: center;
}
.remPsd span:first-child{ 
	padding-right: .3rem;
}
.remPsd span:last-child{ 
	padding-left: .3rem;
}
.forget{
	color: #ac7cc5;
}
.select{ 
	width: 0.38rem;
	height: 0.3rem; 
	background:  url(../../assets/kuang.png) 0 0 no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	float: left;
	margin-top:.05rem
}
.remember .selected{ 
	width: 0.38rem;
	height: 0.3rem; 
	background:  url(../../assets/gou.png) 0 0 no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
}
.remPsd span{
	display: inline-block;
	vertical-align: top; 
}
.remember{
	color:#ac7cc5; 
	vertical-align: top;
}
img{display: block;width: 100%;} 
.logo{
	width: 2.13rem;
	margin: 1rem auto;
}
.lbox{
	padding: 0 0.5rem;
}
.lbox .ln,.lbox .lp{
	position: absolute;
	width: 0.60rem;
	height: 0.60rem;
	left: 0.1rem;
	top:0.3rem; 
}
.lbox .ln{
	font-size: 0.4rem;
	line-height: .6rem;
	color: #AC7CC5; 
}
.lbox li{
	border-bottom: 1px solid #ddd;
	position: relative;
	padding:.3rem 0;
}
.lbox .ipt{
	display: block;
	height:.6rem; 
	padding-left: 0.9rem;
	width: 100%;
}
.btnbox{
	margin: 1rem 0 .5rem;
}
.btnbox .abtn{
	display: block;
	width: 50%;
	margin: 0 auto;
	border-radius: 1rem;
	line-height: 0.8rem;
	text-align: center;
	background: #ac7cc5; 
    background: -webkit-gradient(linear, 100% 100%, 0% 100%, from(#ac7cc1), to(#D6ADEA));
	font-size: 0.3rem;
	letter-spacing: 0.05rem;
	color: #fff;
}
.dl{overflow: hidden;}
.dl a{
	float: left;
	width: 50%; 
	text-align: center;
}
.dl a:first-child{
	border-right: 1px solid #ddd;
}
</style>