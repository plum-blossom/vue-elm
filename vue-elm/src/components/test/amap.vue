<template>
  <div>
  	<h2>定位当前位置</h2>
  	<div class="amap-wrapper" id="amapContainer" @send-msg="sendMsg">
      <!-- <el-amap class="amap-box" :vid="'amap-vue'" v-show="loadingShow"></el-amap> -->
      <p>{{nowPlace}}</p>
    </div>
  </div>
</template>

<script>

 	import Vue from 'vue'
 	import VueAMap from 'vue-amap';
	import { lazyAMapApiLoaderInstance } from 'vue-amap';
	import Toast from 'vue-toast-mobile';

	Vue.use(VueAMap);
	VueAMap.initAMapApiLoader({
	  key: '0644403189e8f2d56f7253aa0774b3b2',
	  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
	  uiVersion: '1.0', // ui库版本，不配置不加载,
	  v: '1.4.4'
	});
	const locationAMap = {
	  /**
	   * @type {Object,Boolean}
	   */
	  locationData: { // 用于定位相关信息提交
	    nowLocation: {
	      lat: '', // 纬度
	      lon: '', // 经度
	      province: '', // 省
	      city: '', // 市
	      district: '', // 区 县
	      nowPlace: '', // 省-市-区
	      Address: '' // 详细地址
	    },
	    status: false // 用于回调函数判断 位置是否请求成功
	  },
	  /**
	   * 调用高德api Geolocation()
	   * @param callback
	   * @callback locationData
	   */
	  getPosition: function(callback) {
	    const mapObj = new AMap.Map('map') // index.html预置map容器div
	    const _thisSelf = this
	    mapObj.plugin('AMap.Geolocation', function() {
	      const geolocation = new AMap.Geolocation({
	        timeout: 2000,
	        GeoLocationFirst: true,
	        maximumAge: 0 // 定位结果缓存0毫秒，默认：0
	      })
	      mapObj.addControl(geolocation) // 把定位插件加入地图实例
	      geolocation.getCurrentPosition() // 调用定位
	      AMap.event.addListener(geolocation, 'complete', onComplete) // 返回定位信息
	      AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
	      function onComplete(data) {
	        // data是具体的定位信息
	        const latitude = data.position.getLat() // 纬度
	        const longitude = data.position.getLng() // 经度
	        // console.log('latitude', latitude, 'longitude', longitude)
	        _thisSelf.newGetAddress(latitude, longitude, callback)
	      }
	 
	      function onError(data) {
	        _thisSelf.locationData.status = false // 代表获取位置信息失败
	        callback(_thisSelf.locationData) // 回调函数
	      }
	    })
	  },
	  /**
	   * 调用高德api Geocoder()
	   * @param latitude 维度
	   * @param longitude 经度
	   * @param callback
	   * @callback locationData
	   */
	  newGetAddress: function(latitude, longitude, callback) {
	    const _thisSelf = this
	    _thisSelf.locationData.nowLocation.lat = latitude
	    _thisSelf.locationData.nowLocation.lon = longitude
	    const mapObj = new AMap.Map('map')
	    mapObj.plugin('AMap.Geocoder', function() {
	      const geocoder = new AMap.Geocoder({
	        city: '全国', // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
	        radius: 100 // 以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
	        // extensions: 'all' // 返回地址描述以及附近兴趣点和道路信息，默认"base"
	      })
	      // 纬度29.5647100000,106.5507300000 重庆市；31.2303700000,121.4737000000 上海市
	      const lnglat = [longitude, latitude] // 倒序反写经纬度
	      // 天津120 北京110 上海310 重庆500 ,
	      const reg1 = /^[1][1][0][0-9][0-9][0-9]/
	      const reg2 = /^[1][2][0][0-9][0-9][0-9]/
	      const reg3 = /^[5][0][0][0-9][0-9][0-9]/
	      const reg4 = /^[5][1][0][0-9][0-9][0-9]/
	      geocoder.getAddress(lnglat, function(status, result) {
	        // console.log('getAddress', result)
	        if (status === 'complete' && result.info === 'OK') {
	          // result为对应的地理位置详细信息
	          const adcode = result.regeocode.addressComponent.adcode // 省市编码
	          if (reg1.test(adcode) || reg2.test(adcode) || reg3.test(adcode) || reg4.test(adcode)) {
	            _thisSelf.locationData.nowLocation.city = result.regeocode.addressComponent.province
	          } else {
	            _thisSelf.locationData.nowLocation.city = result.regeocode.addressComponent.city
	          }
	          // 提取 省 市 区 详细地址信息  重拼装省-市-区信息
	          _thisSelf.locationData.nowLocation.province = result.regeocode.addressComponent.province
	          _thisSelf.locationData.nowLocation.district = result.regeocode.addressComponent.district
	          _thisSelf.locationData.nowLocation.Address = result.regeocode.formattedAddress
	          _thisSelf.locationData.nowLocation.nowPlace = result.regeocode.addressComponent.province + result.regeocode.addressComponent.city + result.regeocode.addressComponent.district
	          _thisSelf.locationData.status = true // 代表获取位置信息成功
	          callback(_thisSelf.locationData) // 回调函数
	        } else {
	          _thisSelf.locationData.status = false // 代表获取位置信息失败
	          callback(_thisSelf.locationData) // 回调函数
	        }
	      })
	    })
	  }
	}
	export default {
		data(){
			return{
				loadingShow:false,
				nowPlace:""
			}
		},
		created(){
			lazyAMapApiLoaderInstance.load().then((callback) => {
			  locationAMap.getPosition((res)=>{
			  	// console.log(res);
			  	if (res.status) {
			      this.loadingShow = false;
			      this.nowPlace = res.nowLocation.nowPlace;
			      // Toast({
			      //   message: '获取当前位置成功！',
			      //   duration: 1000
			      // })
			      // that.driverParam.nowLocation = res.nowLocation
			      // that.startCityKeyword = res_data.nowLocation.city
			    } else {
			      this.loadingShow = false
			      // Toast({
			      //   message: '获取当前位置失败！',
			      //   duration: 1000
			      // })
			    }
			  })
			});
		},
		methods:{
			sendMsg(){
				this.$emit('getMsg',this.nowPlace);
				console.log(55);
			}
		}


	}
</script>

<style>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>