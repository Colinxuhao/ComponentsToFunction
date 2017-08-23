<template>
	<div class="forgetpsd">
		<header-top  :title="'找回密码'"></header-top>
		
		<transition name='router-slid'> 
	        <div class="content" v-if='!nextctbl'>   
	        	  
	        	<div class='ipt clearfix'>
	        		<input type="text" placeholder="请输入您的手机号" maxlength="11" id="phone" class='phone' v-model="phone">       		
	        	</div>
	    		<div class='ipt clearfix'>
	    			<input type="text" placeholder="请输入验证码" v-model='vcode' class='validate'>
	    			<span class="getCode"  @click="getCode">{{msg||time}}</span>
	    		</div> 
	    		<div class="next" v-if='nextbl' @click="nextctbl = true">下一步</div>
	        </div>
		</transition>

		<transition name='router-slid'> 
	       <div class="content"  v-if='nextctbl'> 
				<div class='ipt clearfix'>
					<input type="password" placeholder="请输入新密码" class='npsd' v-model="newpsd"> 
					<div class="btnbox">
		    			<span class='abtn' @click="nextctbl = !nextctbl">上一步</span>
		    			<span class='abtn'  @click="sublime">确认</span>
		    		</div>  
		    	</div> 
			</div>
		</transition>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				phone:'15216774548',
				vcode:'',
				msg:'获取验证码',
				validCode:true,
				newpsd:'', 
				time:10,
				nextbl:false,
				nextctbl:false
			}
		},
		methods:{ 
			getCode(){ 
				if(!this.chechPhone() && this.validCode == true){
					this.$dialog.loading.open('请稍后...');

					setTimeout(() => {
						this.$dialog.loading.close();
						this.$dialog.alert({mes: "发送成功"}); 
						this.vcode = '1314520';
						this.validCode = false; 
						this.nextbl = true;
						this.msg = "";
						this.setCountdown();
					},1500)
				} 	 
			},
			chechPhone(){
				var reg = /^1[34578]\d{9}$/g;
				if(!(reg.test(this.phone))){
					if(!this.phone.trim()){
						alert('手机号不能为空')
					}else{
						alert('需要正确手机号');	
					}
					return true;
				}
			},
			setCountdown(){  
				var t = setTimeout(() => {
					if(this.time <= 0){
						this.msg = '获取验证码';
						this.time = '10';
						this.validCode = true;
						clearTimeout(t);
					}else{
						this.setCountdown();
					}
					this.time --
				},1000) 
			},
			sublime(){
				if(this.newpsd.trim().length >=6){
					this.$dialog.loading.open('请稍后...');
					
					setTimeout(() => {
						this.$dialog.loading.close();
						this.$dialog.confirm({
			                title: ' ',
			                mes: '密码修改成功',
			                opts: [  
			                    {
			                        txt: '确定',
			                        color: true,
			                        callback: () => {
			                        	this.mUtils.removeAllCookie();
			                        	this.$router.push('/login');
			                        }
			                    }
			                ]
			            });
					},1500);

				}else{
					this.$dialog.alert({mes: "密码不得小于6位数"});
				}
			}
		}
	}
</script>
<style scoped style='type/css'>
.content{
padding: 1.2rem 0.2rem 0;
}	
.phone{
float: left;
width: 100%;
height: .8rem;
margin-right: 5%;   
padding-left: .5rem;
border-bottom: 1px solid #ccc;
}
.validate{
float: left;
width: 70%;	
height: 0.8rem;
line-height: 0.8rem;
padding-left: .5rem;
border-bottom: 1px solid #ccc;
}
.getCode{
float: left;
width: 30%; 
text-align: center;
height: 0.8rem;
line-height: .8rem;
color: #ac7cc5;
border-left: 1px solid #ccc;
border-bottom: 1px solid #ccc;
}	
.next{
width: 70%;
margin:.6rem auto 0;
background: #ac7cc5;
background: -webkit-gradient(linear, 100% 100%, 0% 100%, from(#ac7cc1), to(#D6ADEA));
text-align: center;
line-height: .8rem;
border-radius: .1rem;
color: #fff;
font-size: .3rem;
}

.ipt{
height: .8rem; 
}
.npsd{
width: 100%;	
padding-left: .5rem;
height: .8rem;
line-height: .8rem;
margin-top: .1rem;
border-bottom: 1px solid #ccc; 
}
.btnbox	{
	text-align: center;
}
.btnbox	.abtn{
	width: 30%;
	display: inline-block;
	margin:.6rem auto 0;
	background: #ac7cc5;
	background: -webkit-gradient(linear, 100% 100%, 0% 100%, from(#ac7cc1), to(#D6ADEA));
	text-align: center;
	line-height: .8rem;
	border-radius: .1rem;
	color: #fff;
	font-size: .3rem;
}
.btnbox	.abtn:first-child{
	margin-right: 10%;
}
</style>