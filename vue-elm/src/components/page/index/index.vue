<template>
  <div>
  	<!-- 头部 -->
  	<head-top signin-up='index'>
  		<router-link slot="search" :to="'/search'" class="search">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
				<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
			</svg>
		</router-link>
		<div slot="title" class="title">
			<!-- <amap @get-msg="getMsg"></amap> -->
			<span class="title_text">{{title}}</span>
		</div>	
  	</head-top>
  	<!-- nav -->
  	<nav class="nav-wrapper">
  		<div class="swiper-container">
  			<div class="swiper-wrapper">
  				<div class="swiper-slide">
  					<span>12</span>
  				</div>
  			</div>
  		</div>
  	</nav>
  	<!-- 附近商家 -->
  </div>
</template>

<script>
	import headTop from 'components/header/head'
	import amap from 'components/test/amap'
	import Swiper from 'swiper'; 
	import 'swiper/dist/css/swiper.min.css';

	const ERR_OK ='OK';
	export default {
		components:{headTop,amap},
		data() {
		  	return {
		  		title:'成都市武侯区'
		  	}
		},
		methods:{
			getMsg(data){
				console.log(1);
				console.log(data);
			},
			_loadCityData(type){
				this.http.cityData(type).then((res)=>{
					console.log(res);
					if(res.statusText == ERR_OK){}
				})
				// this.$http.get('/v1/cities',{
				// params:{
				// 	type:type,
				// }
				// }).then((res)=>{
				// 	console.log(res);
				// })
			}
		},
		created(){
			this._loadCityData('group');
		},
		mounted(){
			var mySwiper = new Swiper('.swiper-container', {
		      	pagination: '.swiper-pagination',
		        loop: true
		    })
		}
	}
</script>

<style lang="less">
	@import '../../../assets/style/base.less';
	.search{
		left:.8rem;
		.wh(1.2rem,1.2rem);
		.ct();
	}
	.title{
		.center();
		width: 50%;
		color:#fff;
		margin-left: -0.5rem;
		font-size: 0.8rem;
	}
	.nav-wrapper{
		margin-top: 1.9rem;
	}
</style>