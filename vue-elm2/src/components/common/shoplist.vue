<template>
  <div class="shoplist_container">
  	<ul>
  		<li>shoplist</li>
  	</ul>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		props:['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
		data() {
		  	return {
		  		offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
				shopListArr:[], // 店铺列表数据
				preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
				showBackStatus: false, //显示返回顶部按钮
				showLoading: true, //显示加载动画
				touchend: false, //没有更多数据
				imgBaseUrl:'//elm.cangdu.org/img/'
		  	}
		},
		computed: {
			...mapState([
				'latitude','longitude'
			])
		},
		methods:{
			_getData(){
				// console.log(this.latitude);
				if(this.latitude!=='' && this.longitude!==''){
					// console.log(1);
					this.http.indexShopList(this.latitude,this.longitude,this.offset, this.restaurantCategoryId).then((res)=>{
						// console.log(res);
					})
				}else{
					// console.log(2);
				}
				
			}
		},
		beforeMount(){
			// console.log(this.latitude);
			
			this.$nextTick(() => {
		      //do somthing
		      this._getData();
		    });　
		},
		mounted(){
			this.$next
			// console.log(this.latitude,this.longitude,this.offset, this.restaurantCategoryId);
			// this._getData();
		}
	}
</script>

<style>

</style>