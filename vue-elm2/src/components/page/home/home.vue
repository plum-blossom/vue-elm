<template>
  <div>
  	<head-top signin-up='home'>
        <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
    </head-top>
  </div>
</template>

<script>
	import headTop from 'components/header/head'
	export default {
	  name: 'Home',
	  data() {
	  	return {
	  		
	  	}
	  },
	  components:{
	       headTop
	  },
	  methods:{
	  	//点击图标刷新页面
	  	reload(){
	  		window.location.reload();
	  	}
	  }
	}
</script>

<style lang="less">
@import '../../../assets/style/base.less';
.head_logo{
	left:1.4rem;
	font-weight: 400;
	.fontSizCol(0.7rem,#fff);
	.wh(2.3rem,0.7rem);
	.ct();
}
</style>