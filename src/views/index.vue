<template>
  <div class="index">
    <div class="search-box">
      <div class="emperature">杭州 5℃</div>
      <div class="search">
        <div class="search-bg">
          <img src="@/assets/img/search-icon.png" alt="">
          <router-link to="/near"> 搜索目的地、找停车场</router-link>
        </div>
      </div>
    </div>
    <div :style="{width:'100%',height:'12.143rem'}">

      <div class="amap-demo" id="map_container"></div>
    </div>
    <div class="flex cart-distance">
      <p class="cart-name">
        {{near}}
      </p>
      <p class="distance"></p>
      <p class="near">
        <router-link to="/near">查看附近更多停车厂</router-link>
        <img src="@/assets/img/right-icon.png" alt="">
      </p>

    </div>
    <div class="no-login" v-show="!isLogin">
      <p>未登录，无法使用停车等功能</p>
      <router-link to="/login">立即登录</router-link>
    </div>
    <div class="flex box">
      <router-link :to="{path:'/Parking'}" class="box-list">
        <p>
          <img src="@/assets/img/box-icon1.png" alt="">
        </p>
        <p>停车缴费</p>
      </router-link>
      <router-link :to="{path:'/LookingCare'}" class="box-list">
        <p>
          <img src="@/assets/img/box-icon2.png" alt="">
        </p>
        <p>寻找车辆</p>
      </router-link>
      <router-link :to="{path:'/applyAdd'}" class="box-list">
        <p>
          <img src="@/assets/img/box-icon3.png" alt="">
        </p>
        <p>申请添加</p>
      </router-link>
      <router-link :to="{path:'/service'}" class="box-list">
        <p>
          <img src="@/assets/img/box-icon4.png" alt="">
        </p>
        <p>车后服务</p>
      </router-link>
      <router-link :to="{path:'/spelling'}" class="box-list">
        <p>
          <img src="@/assets/img/box-icon5.png" alt="">
        </p>
        <p>拼东东</p>
      </router-link>
    </div>
    <mt-swipe :auto="0">
      <mt-swipe-item>
        <img src="@/assets/img/banner1.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/img/banner1.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="@/assets/img/banner1.png" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <div class="tab" ref="tab">
      <ul class="index-tab" ref="tabWrapper">
        <li ref="tabitem" v-for="(item, index) in title" v-text="item.title" :class="selected===index ? active :''" @click="onCurrentTitle(item, index)"></li>
      </ul>
    </div>
    <!-- tab-container -->
    <div class="index-box" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <ul v-if="selected==selected" class="left">
        <router-link tag="li" :to="{ path: 'GoodsDetail', query: {id: item.id}}" v-for="(item, index) in items" class="item" :key="item.id">
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <h3>{{item.name}}</h3>
          <p>￥{{item.price}}元</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import con1 from "@/assets/img/index1.jpg";
  import con2 from "@/assets/img/index2.jpg";
  import con3 from "@/assets/img/index1.jpg";
  import AMap from 'AMap'
  import AMapUI from 'AMapUI'
  import BScroll from 'better-scroll';
  import api from '../fetch/api'
  export default {
    data() {
      const self = this;
      return {
        Login: "",
        selected: 0,//注意就是这里，默认选字符串数字，不然初始没展示；
        busy: false,
        curType: 0,
        // imgsrc:domain.testUrl,
        active: 'selected',
        zoom: 20,
        near: "",
        Flng: "",
        Flat: "",
        title: [
          {
            id: 1,
            title: "测试1"
          },
          {
            id: 2,
            title: "测试2"
          },
          {
            id: 3,
            title: "测试3"
          },
          {
            id: 4,
            title: "测试4"
          },
          {
            id: 5,
            title: "测试5"
          },
          {
            id: 6,
            title: "测试6"
          },

        ],
        curTitle: {
          id: 1,
          title: "测试1"
        },
        items: [
          {
            img: con1,
            name: "标题内容标题内容标题内容标题内容标题1",
            price: 50
          },
          {
            img: con2,
            name: "标题内容标题内容标题内容标题内容标题2",
            price: 50
          }
          ,
          {
            img: con3,
            name: "标题内容标题内容标题内容标题内容标题3",
            price: 50
          },
          {
            img: con3,
            name: "标题内容标题内容标题内容标题内容标题3",
            price: 50
          },
          {
            img: con3,
            name: "标题内容标题内容标题内容标题内容标题3",
            price: 50
          },
          {
            img: con3,
            name: "标题内容标题内容标题内容标题内容标题3",
            price: 50
          },
          {
            img: con3,
            name: "标题内容标题内容标题内容标题内容标题3",
            price: 50
          },
          {
            img: con3,
            name: "标题内容标题内容标题内容标题内容标题3",
            price: 50
          }
        ]
      }
    },
    created() {
      this.$nextTick(() => {
        // this.InitTabScroll();
      });
    },
    mounted() {
      var that = this
      // console.log(that.Flng)
      if (this.Flng == "" && this.Flat == "") {
        // this.nears()
      }
    },
    methods: {
      // getBaseUrl(){
      //   return Vue.prototype.baseURL
      // },
      nears() {
        var _this = this;
        var mapObj = new AMap.Map('map_container', {
          resizeEnable: true,
          zoom: 20,
        });
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        mapObj.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          mapObj.addControl(geolocation);

          geolocation.getCurrentPosition();
          // let timer = setInterval(() => {
          AMap.event.addListener(geolocation, 'complete', (data) => {
            // res即是对应的公交路线数据信息
            // res为获取到的当前位置的信息
            _this.Flng = data.position.lng
            _this.Flat = data.position.lat
            var params = new URLSearchParams();
            params.append('Lng', _this.Flng);
            params.append('Lat', _this.Flat);
            let token = localStorage.getItem('userToken')
            _this.$axios.post(
              domain.baseUrl + '/carpark/carpark-list.html',
              params,
              {
                headers: {
                  // "Access-Control-Allow-Origin":"*",
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
            ).then((res) => {
              _this.near = res.data.data[0].park_name
              Indicator.close();
            }
            )
          })
          // }, 100)
        })
      },
      // 获取当tab
      onCurrentTitle(item, index) {
        console.log(index)
        this.selected = index
        this.curLeague = item
        this.curType = 0
      },
      // getNear() {
      //   var params = new URLSearchParams();
      //   params.append('Lng', this.lng);
      //   params.append('Lat', this.lat);
      //   let token = window.localStorage.getItem('token')
      //   this.$axios.post('/api/carpark/carpark-list.html',
      //     params,
      //     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      //   )
      //   .then((res) => { 
      //     this.near = res.data.data[0].park_name}
      //   )

      // },
      InitTabScroll() {
        // console.log(this.$refs.tabitem[0])
        let width = 0
        for (let i = 0; i < this.title.length; i++) {
          width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        }

        this.$refs.tabWrapper.style.width = width + 'px'

        this.$nextTick(() => {

          if (!this.scroll) {

            this.scroll = new BScroll(this.$refs.tab, {

              startX: 0,

              click: true,

              scrollX: true,

              scrollY: false,

              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh()
          }
        });

      }
    },
    computed: {
      isLogin() {
        if (sessionStorage.getItem('userName') && sessionStorage.getItem('userToken')) {
          this.$store.commit("userStatus", sessionStorage.getItem('userName'))
        } else {
          this.$store.commit("userStatus", null)
        }
        return this.$store.state.isLogin
        // this.Login=this.$store.state.isLogin
      }
    },
    components: {
      BScroll
    }
  }
</script>

<style scoped>
  #map_container {
    height: 12.142rem
  }

  .search-box {
    height: 5.357rem;
    width: 100%;
    line-height: 5.357rem;
    background: #1baed6;
    display: flex
  }
  .search-box .emperature {
    flex: 2;
    color: #fff
  }
  .search-box .search {
    flex: 7
  }

  .index>>>.amap-copyright {
    display: none !important;
  }

  .search-box .search .search-bg {
    width: 18.406rem;
    height: 2.5rem;
    background: #fff;
    margin-top: 1.3rem;
    line-height: 2.6rem;
    border-radius: .5rem
  }
  .search-bg img {
    width: 1rem;
    height: 1rem;
    position: relative;
    top: .2rem
  }
  .search-box .search .search-bg a {
    outline: none
  }
  .index {
    background: #f3f3f3;
    width: 100%;
    height: 100%;
    /* padding-top: 60px; */
    /* overflow: hidden; */
  }
  .tab {
    width: 100%;
    overflow: hidden;
  }
  .index-tab {
    background-color: #fff;
    display: flex;
    text-align: center;
    overflow: hidden;
    border-bottom: 1px solid #dcdcdc;
  }
  .index-tab li {
    display: block;
    width: 5rem;
    flex: 0 0 5.375rem;
    padding: 17px 0;
    font-size: 15px;
    text-decoration: none;
  }
  .index-tab li.selected {
    color: #26a2ff;
    margin-bottom: -3px;
    position: relative;
  }
  .index-tab li.selected::after {
    position: absolute;
    content: "";
    width: 20px;
    height: 3px;
    bottom: 3px;
    background: #26a2ff;
    left: 50%;
    margin-left: -10px;
  }
  .flex {
    display: flex;
    font-size: 13px;
  }
  .cart-distance {
    height: 3.125rem;
    background: #fff;
    line-height: 3.125rem
  }

  .cart-name {
    flex: 3;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .distance {
    flex: 2;
    text-align: center;
    color: #333;
  }

  .near {
    flex: 3;
    text-align: left;
    position: relative;
  }

  /* .near a {
    margin-left: .5rem
  } */
  .near img {
    width: .5357rem;
    height: .92857rem;
    float: right;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .mint-tab-container-item {
    margin-top: 20px
  }

  .mint-tabbar>.mint-tab-item.is-selected,
  .mint-tabbar {
    background-color: #fff
  }

  .near a {
    color: #1daad5
  }

  .box-list {
    flex: 1;
    display: inline-block;
    color: #333
  }

  .box {
    height: 5.25rem;
    background: #fff;
    margin: .5rem 0
  }

  .box-list img {
    width: 2.53rem;
    height: 2.53rem;
    margin: .5rem 0 .5rem
  }

  .mint-swipe {
    height: 7.375rem
  }

  .mint-swipe img {
    width: 100%;
    height: 7.375rem
  }

  .mint-swipe-indicator {
    width: 35px !important;
    height: 6px !important;
    border-radius: 0 !important;
    opacity: 1 !important;
    background: #fff !important;
    margin: 0 .2rem !important;
  }

  .mint-swipe-indicator.is-active {
    background: #ff814f;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0;
    color: #26a2ff;
    position: relative;
  }

  .index-box {
    background: #fff;
    margin-bottom: 50px;
  }

  .index-box ul {
    width: 94%;
    margin: 30px auto 0;
    display: inline-block;
  }

  .index-box ul li {
    width: 48%;
    float: left;
    margin-bottom: 20px;
    box-shadow: 4px 5px 10px #f3f3f3
  }

  .item:nth-child(2n-1) {
    margin-right: 4%
  }

  .item img {
    width: 100%
  }

  .item h3 {
    color: #333;
    font-size: 14px;
    line-height: 18px;
    font-weight: normal;
    text-align: left;
    width: 90%;
    margin: 10px auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /* .item:nth-child(3) p{
    display: none
  }
  .item:nth-child(3) h3{
    -webkit-line-clamp: 1;
  } */

  .item p {
    color: #ff8502;
    font-weight: normal;
    text-align: left;
    width: 90%;
    font-size: 1.125rem;
    margin: 0 auto 10px;
  }

  .index>>>.mint-swipe-indicator {
    width: 2rem;
    height: .375rem;
    border-radius: 0;
    background: #fff;
    opacity: 1;
  }

  .index>>>.mint-swipe-indicator.is-active {
    background: #ff814f;
  }

  .no-login {
    width: 100%;
    height: 5.3125rem;
    background: #fff;
    margin-top: .5rem
  }

  .no-login p {
    color: #666666;
    font-size: .9285rem;
    padding-top: 1rem
  }

  .no-login a {
    display: inline-block;
    width: 6.5rem;
    height: 1.5625rem;
    background: #1baed6;
    color: #fff;
    text-align: center;
    font-size: .75rem;
    line-height: 1.5625rem;
    border-radius: .3rem;
    margin-top: 1rem
  }
</style>