/**
 * 获取数据
 * @authors Your Name (you@example.org)
 * @date    2019-04-19 10:24:05
 * @version $Id$
 */

 /**
 * 
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl = '//elm.cangdu.org';
let imgBaseUrl = '//elm.cangdu.org/img/';
let dataUrl = {
	// 搜索地址
	search:'/v1/pois',
	city:'/v1/cities'

}
export default {
	searchData(cityid,value){
		return axios.get(dataUrl.search,{
			params:{
				type:'search',
				city_id:cityid,
				keyword:value
			}
		})
	},
	cityData(){
		return axios.get(dataUrl.city,{
			params:{
				type:'hot',
			}
		})
	}
}