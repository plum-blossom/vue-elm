<template>
  <div class="alert_container">
  	<section class="tip_text_container">
  		<div class="tip_icon">
  			<span></span>
  			<span></span>
  		</div>
  		<p class="tip_text">{{alertText}}</p>
  		<div class="confirm" @click="closeTip">
  			确认
  		</div>
  	</section>
  	
  </div>
</template>
<!-- 使用 -->
<!-- <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip> -->
<script>
	export default {
	  name: 'alertTip',
	  props:['alertText'],
	  methods:{
	  	closeTip(){
	  		this.$emit('closeTip');
	  	}
	  }
	}
</script>

<style lang="less">
@import '../../assets/style/base.less';
.alert_container{
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index:200;
}
.tip_text_container{
	width:12rem;
	position:absolute;
	top:50%;
	left:50%;
	margin-top: -6rem;
	margin-left: -6rem;
	animation: tipMove .4s;
	background: rgba(255,255,155,1);
	border:1px;
	border-radius: 0.25rem;
	display:flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.tip_icon{
		.wh(3rem,3rem);
		border:0.15rem solid #f8cb86;
		border-radius: 50%;
		display: flex;
		justify-content:center;
		align-items: center;
		flex-direction: column;
		span:nth-of-type(1){
			.wh(.12rem,1.5rem);
			background: #f8cb86;
		}
		span:nth-of-type(2){
			.wh(.2rem,.2rem);
			border:1px;
			border-radius: 50%;
			margin-top:.2rem;
			background: #f8cb86;

		}
	}
	.tip_text{
		.fontSizCol(.7rem,#333);
		line-height: .9rem;
		text-align: center;
		margin-top:.8rem;
		padding: 0 .4rem; 
	}
	.confirm{
		.fontSizCol(.8rem,#fff);
		font-weight: bold;
		margin-top:.8rem;
		background:#4cd964;
		width:100%;
		text-align: center;
		line-height:1.8rem;
		border:1px;
		border-bottom-left-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
	}

}
@keyframes tipMove{
   0%   { transform: scale(1) }
   35%  { transform: scale(.8) }
   70%  { transform: scale(1.1) }
   100% { transform: scale(1) }
}
</style>