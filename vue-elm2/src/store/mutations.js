/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-04-08 17:47:54
 * @version $Id$
 */
import {
	SAVE_GEOHASH, //保存城市geohash
	RECORD_ADDRESS, //地址
} from './mutation-types.js'
// import * as  types from './mutation-types.js'
// 设置获取localStorage
import {setStore,getStore} from '../api/cache.js'

export default {
	//保存geohash
	[SAVE_GEOHASH](state, geohash) {
		state.geohash = geohash;
		
	},
	[RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	}
}
