<template>
  <header id="head_top" class="">
  	<slot name="logo"></slot>
  	<slot name="search"></slot>
  	<section class="head_goback" @click="$router.go(-2)" v-if="goBack">
  		<!-- 返回箭头 -->
  		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
  	</section>
  	<router-link :to="userInfo ? '/profile' : '/login'" class="head_login" v-if="signinUp">
  		<svg class="user_avatar" v-if="userInfo">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
        </svg>
        <span class="logon_span">登录 | 注册</span>
  	</router-link>
  	<section class="head_title"  v-if="headTitle">
  		<span class="title_text">{{headTitle}}</span>
  	</section>
  	<slot name="title"></slot>
  	<!-- <div id="map-container"></div>			 -->
  </header><!-- /header -->
</template>
<script>
	import {mapState, mapActions} from 'vuex'
	export default {
	  name: 'headTop',
	  data() {
	  	return {
	  		userInfo:true
	  	}
	  },
	  props:['signinUp','headTitle','goBack'],
	  methods:{
	  },
	  mounted(){
	  }
	}
</script>

<style lang="less">
@import '../../assets/style/base.less';
#head_top{
	background: @blue;
	position: fixed;
	left:0;
	top:0;
	.wh(100%,1.95rem);
	z-index:100;
}
.head_goback{
	left:0.4rem;
	.wh(0.6rem,1rem);
	line-height: 2.2rem;
	margin-left:.4rem;
}
.head_login{
	right: 0.55rem;
	.fontSizCol(0.65rem,#fff);
	text-decoration: none;
	.ct();
	.logn_span{
		color:#fff;
	}
	.user_avatar{
		fill:#fff;
		.wh(.8rem,.8rem);
	}
}
</style>