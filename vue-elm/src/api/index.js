/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-04-19 11:21:06
 * @version $Id$
 */
import axios from 'axios'
// 导入地址
import site from './config.js'
// 域名地址 //elm.cangdu.org
// 设置axios默认路经
axios.defaults.baseURL = '//elm.cangdu.org'
// 获取缓存
import {getStore} from './cache.js'

export default {
	// 搜索数据
	search(cityId,keyword){
		return axios.get(site.search,{
			params:{
				type:'search',
				city_id:cityId,
				keyword:keyword
			}
		})
	},
	// 搜索结果地址
	searchResult(geohash,keyword){
		return axios.get(site.search,{
			params:{
				type:'search',
				'extras[]': 'restaurant_activity',
				geohash,
				keyword
			}
		})
	},
	// 城市 type = hot(热门城市) guess(默认地址) group(所有城市)
	cityData(type){
		return axios.get(site.city,{
			params:{
				type:'hot'
			}
		})
	},
	// 当前城市数据
	currentCityData(number){
		return axios.get(site.city+number)
	},
	// 首页地址信息
	indexAddress(geohash){
		return axios.get(site.indexAddress+geohash)
	},
	// 首页食品分类列表
	indexFoodList(geohash){
		return axios.get(site.indexFoodList,{
			params:{
				group_type: '1',
				'flags[]': 'F',
				geohash
			}
		})
	},
	// 首页商铺列表
	indexShopList(latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []){
		let supportStr = '';
		support_ids.forEach(item => {
			if (item.status) {
				supportStr += '&support_ids[]=' + item.id;
			}
		});
		let data = {
			latitude,
			longitude,
			offset,
			limit: '20',
			'extras[]': 'activities',
			keyword: '',
			restaurant_category_id,
			'restaurant_category_ids[]': restaurant_category_ids,
			order_by,
			'delivery_mode[]': delivery_mode + supportStr
		}
		return axios.get(site.indexShopList,{
			params:{
				data
			}
		})			
	},
	// food页面的category种类列表
	foodCategoryList(latitude, longitude){
		return axios.get(site.foodCategoryList,{
			params:{
				latitude,
				longitude
			}
		})
	},
	// food页面的配送方式
	foodDelivery(latitude, longitude){
		return axios.get(site.foodDelivery,{
			params:{
				latitude,
				longitude,
				kw:''
			}
		})
	},
	// food页面的商家属性活动列表
	foodActivityList(latitude, longitude){
		return axios.get(site.foodDelivery,{
			params:{
				latitude,
				longitude,
				kw:''
			}
		})
	}

}
