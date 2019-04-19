<template>
  <div class="loading_container">
  	<div class="load_img" :style="{backgroundPositionY:-(poisitionY%7)*2.5+'rem'}">
  	</div>
  	<!-- 图片下的阴影效果 -->
	<svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
		<!-- ellipse --椭圆 -->
		<ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
	</svg>
  </div>
</template>

<script>
	export default {
	  name: 'Loading',
	  data() {
	  	return {
	  		poisitionY:0,
	  		timer:null,
	  	}
	  },
	  mounted(){
	  	// 600ms切换背景图片
	  	this.timer = setInterval(()=>{
	  		this.poisitionY ++;
	  		// console.log(this.poisitionY)
	  	},600)
	  },
	  boforeDestroy(){
	  	// 清楚定时器
	  	clearInterval(this.timer);
	  }
	}
</script>

<style lang="less">
	@import '../../assets/style/base.less';
	.loading_container{
		.psc(fixed);
		.wh(2.5rem,2.5rem);
	}
	.load_img{
		.wh(100%,100%);
		background: url(../../assets/images/icon_loading.png) no-repeat 0 0;
    	background-size: 2.5rem auto;
    	transform: translateY(0px);
    	animation: load .6s infinite ease-in-out;
    	position: relative;
    	z-index: 11;
	}
	.load_ellipse{
		position:absolute;
		.wh(3.6rem,2rem);
		top:2.2rem;
		left:-0.2rem;
		z-index:10;
		animation: ellipse .6s infinite ease-in-out;
	}
	@keyframes load{
		0%   {transform: translateY(0px);}
		50%  {transform: translateY(-50px);}
		100% {transform: translateY(0px);}
	}
	@keyframes ellipse{
		0%   {transform: scale(1);}
		50%  {transform: scale(0.3);}
		100% {transform: scale(1);}
	}
</style>