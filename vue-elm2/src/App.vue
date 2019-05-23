<template>
  <div id="app">
    <!-- 头部 -->
    <head-top signin-up='index'>
      <router-link slot="search" :to="'/search/geohash'" class="search">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
        <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </router-link>
    <div slot="title" class="title">
      <span class="title_text">{{title}}</span>
    </div>  
    </head-top>
    <!-- nav -->
    <nav class="nav-wrapper">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
            <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
       <img src="./assets/images/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
    <!-- 附近商家 -->
    <div class="shop_list_container">
      <div class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </div>
<!--       <shoplist :geohash="geohash"></shoplist> -->
    </div>
  </div>
</template>

<script>
  import headTop from 'components/header/head'
  import shoplist from 'components/common/shoplist.vue'
  import Swiper from 'swiper'
  import {mapMutations} from 'vuex'
  // import {msiteAddress} from './assets/js/getData.js'

  const ERR_OK ='OK';
  export default {
    components:{headTop,shoplist},
    data() {
        return {
          title:'请选择地址...',
          geohash:'',
          foodTypes: [], // 食品分类列表
          imgBaseUrl:'https://fuss10.elemecdn.com',
          hasGetData: false //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        }
    },
    // async beforeMount(){
    //   var _this = this;
    //   var data;
    //   await _this.http.cityData('guess').then((res)=>{
    //     data = res.data;
    //   })
    //   if(!data){
    //     return;
    //   }else{
    //     _this.geohash = data.latitude + ',' +data.longitude;
    //     // 保存geohash 到vuex
    //     _this.SAVE_GEOHASH(_this.geohash); 
    //   }
    //   await _this._loadAddressData(_this.geohash);
    //   _this._loadIndexFoodList(_this.geohash);
    // },
    mounted(){
      this.http.cityData('guess').then((res)=>{
        if(res.data){
          var data = res.data;
          var latitude = data.latitude;
          var longitude = data.longitude;
          this.geohash = data.latitude + ',' +data.longitude;
           // 保存geohash到vuex
          this.SAVE_GEOHASH(this.geohash);
          // this.http.getLocaltion(latitude,longitude).then((res)=>{
          //   console.log(res);
          // })
        }else{
          // 显示加载中
        }
      });
    },
    methods:{
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ]),
      // _loadAddressData(geohash){
      //   var _this = this;
      //   // console.log(geohash);
      //   _this.http.indexAddress(_this.geohash).then((res)=>{
      //      if(res.statusText === ERR_OK){
      //       // console.log(res.data);
      //         // 记录当前经度纬度
      //       _this.RECORD_ADDRESS(res.data);
      //       _this.title = res.data.name;
      //       _this.hasGetData = true;
      //      }
      //   })
      // },
      // _loadIndexFoodList(geohash){
      //   var _this = this;
      //   _this.http.indexFoodList(geohash).then((res)=>{
      //     if(res.statusText === ERR_OK){
      //       let data = res.data;
      //       let len  = data.length;
      //       let dataArr = [...data];
      //       let foodArr = [];
      //       for (let i = 0, j = 0; i < len; i += 8, j++) {
      //         foodArr[j] = dataArr.splice(0, 8);
      //       }
      //       _this.foodTypes = foodArr;
      //     }
      //   }).then(()=>{
      //       new Swiper('.swiper-container', {
      //         pagination: {
      //           el:'.swiper-pagination'
      //         },
      //         loop: true
      //       });
      //   })
      // },
      // // 解码url地址，求去restaurant_category_id值
      // getCategoryId(url){
      //   let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
      //   if (/restaurant_category_id/gi.test(urlData)) {
      //     return JSON.parse(urlData).restaurant_category_id.id
      //   }else{
      //     return ''
      //   }
      // }
    }
  }
</script>

<style lang="less">
  @import './assets/style/common.less';
  @import './assets/style/base.less';
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
    .title_text{
        .sc(0.8rem, #fff);
        text-align: center;
        display: block;
    }
  }
  .nav-wrapper{
    padding-top: 2.1rem;
    background: #fff;
    border-bottom:0.025rem solid @bc;
    height:10.6rem;
    .swiper-container{
      .wh(100%,auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        bottom: 0.2rem;
      }
    }
    .fl_back{
      .wh(100%,100%);
    }
  }
  .food_types_container{
    display: flex;
    flex-wrap: wrap;
    .link_to_food{
      width:25%;
      padding:0.3rem 0rem;
      .fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          .wh(1.8rem,1.8rem);
        }
        figcaption{
          text-align: center;
          .sc(0.55rem,#666);
        }
      }
    }
  }
  .shop_list_container{
    margin-top: .4rem;
    border-top: 0.025rem solid @bc;
    background: #fff;
    .shop_header{
      .shop_icon{
        .wh(0.6rem,0.6rem);
        fill:#999;
        margin-left: 0.6rem;
        vertical-align: middle;
      }
      .shop_header_title{
        font-size: 0.55rem;
        line-height: 1.6rem;
        color: #999;
      }
    }
  }
</style>
