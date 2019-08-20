<template>
        <div>
            <div :style="{width:'100%',height:'300px'}">
                <div class="amap-demo" id="map_container"> </div>
    
            </div>
            <div class="search" ref="searchHeight">
                <img src="@/assets/img/back.png" alt="" @click="back">
                <div class="search-bg">
                    <img src="@/assets/img/search-icon.png" alt="">
                    <input id="search" v-model="searchLog" type="text" v-on:input="search" placeholder="搜索目的地、找停车场">
                </div>
            </div>
            <div class="log">
                <!-- <img src="@/assets/img/search-icon.png" alt=""> -->
                 {{cartName}}附近停车场
            </div>
            <div class="log-item" v-for="(item,index) in logList" :class="[item.is_open?'log-item aa':'log-item go']" :key="item.id">
                <div class="log-top">
                    <div class="log-header" @click='click(item,index)'>
                        <div class="name">
                            {{item.park_name}}
                        </div>
                        <div class="leave">
    
                            <img src="@/assets/img/back.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="log-body" v-if="item.is_open">
                    <h3>{{item.park_address}}</h3>
                    <div class="log-body-detail">
                        <div class="content">
                            <p>营业时长：{{item.business_hours}}h</p>
                            <p>总车位数量：{{item.parking_space_number}}</p>
                            <p>免费时长：{{item.free_time}}</p>
                            <p>24小时封顶：{{item.capping_fee}}</p>
                        </div>
                        <div class="navigation" @click='clickNav(item,index)'>
                            <img src="@/assets/img/navigate.png" alt="">
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </template>
    <script>
    
        import AMap from 'AMap'
        import AMapUI from 'AMapUI'
        import { Indicator } from 'mint-ui';
        export default {
            data() {
                const self = this;
                return {
                    // center: [120.19778, 30.18868],
                    map:"",
                    searchLog: "",
                    Flng: "",
                    Flat: "",
                    Tlng: "",
                    Tlat: "",
                    marker: "",
                    cartName:"",
                    logList: []
                }
            },
            created() {
    
            },
            mounted() {
                this.near()
    
                // this.drawMap();
            },
            methods: {
                search:function() {
                    let _this = this
                    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'], function () {
                        // 实例化Autocomplete
                        var autoOptions = {
                            city: "杭州",
                            input: 'search'
                        }
                        var autoComplete = new AMap.Autocomplete(autoOptions);
                     
                        var placeSearch = new AMap.PlaceSearch({
                                city: '杭州'
                                // map:_this.map
                            })
                        AMap.event.addListener(autoComplete, 'select', function (e) {
                            placeSearch.setCity(e.poi.adcode);
                            placeSearch.search(e.poi.name);
                            _this.cartName=e.poi.name
                            var mapObj1 = new AMap.Map('map_container', {
                                    resizeEnable: true,
                                    center:[e.poi.location.lng,e.poi.location.lat],
                                    zoom: 20,
                            });
                            // console.log(res.data.data)
                             _this.map=mapObj1
                            _this.searchLog=e.poi.name
                            _this.Flng=e.poi.location.lng
                            _this.Flat=e.poi.location.lat
                            var params = new URLSearchParams();
                            let token = window.localStorage.getItem('token')
                            params.append('Lng', _this.Flng);
                            params.append('Lat', _this.Flat);
                            _this.$axios.post('http://carparkapi.ygwl.info/carpark/carpark-list.html',
                                params,
                                {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }
                            )
                            .then((res) => {
                                console.log(res)
                                _this.logList = res.data.data
                                for (var i = 0; i < _this.logList.length; i++) {
                                    var jfong = [_this.logList[i].Lng, _this.logList[i].Lat];
                                    _this.marker = new AMap.Marker({
                                        position: jfong,
                                        zIndex: 1010,
                                        map: _this.map
                                    });
                                }
                            })
                        })
                    })
                },
                click(item, index) {//图标点击事件 
                    item.is_open = !item.is_open
                },
                clickNav(item, index) {//图标点击事件 
                    console.log(this.logList[index].Lat)
                    this.Tlng = this.logList[index].Lng;
                    this.Tlat = this.logList[index].Lat;
                    this.drawMap()
                },
                near:function(){
                    var _this = this;
                    var mapObj = new AMap.Map('map_container', {
                        resizeEnable: true,
                        zoom: 20,
                    });
                    Indicator.open({
                        text: '加载中...',
                        spinnerType: 'fading-circle'
                     });
                    _this.map=mapObj
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
                            console.log(data)
                            _this.Flng = data.position.lng
                            _this.Flat = data.position.lat
                            var params = new URLSearchParams();
                            params.append('Lng', _this.Flng);
                            params.append('Lat', _this.Flat);
                            let token = window.localStorage.getItem('token')
                            _this.$axios.post('http://carparkapi.ygwl.info/carpark/carpark-list.html',
                                params,
                                {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        // "Access-Control-Allow-Origin":"*"
                                    }
                                }
                            ).then((res) => {
                                    _this.logList = res.data.data
                                    for (var i = 0; i < _this.logList.length; i++) {
                                        var jfong = [_this.logList[i].Lng, _this.logList[i].Lat];
                                        _this.marker = new AMap.Marker({
                                            position: jfong,
                                            zIndex: 1010,
                                            map: mapObj
                                        });
                                    }
                                    Indicator.close();
                                }
                            )
                        })
                        // }, 100)
                    })
    
                },
                drawMap() { // 专车--画地图
                    let that = this;
                    that.map = new AMap.Map('map_container', {
                        resizeEnable: true,
                        zoom: 20,
                        // center: [that.Clng, that.Clat] // 地图中心点的经纬度
                    });
                    // var marker = new AMap.Marker({
                    //     map: map,
                    //     position: new AMap.LngLat(that.Clng, that.Clat) //此处根据页面数据可以直接传入经纬度进行描点
                    // })
                    AMap.plugin('AMap.Driving', function () {
                        var driving = new AMap.Driving({
                            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式,还有其他几种方式见Api文档
                            policy: AMap.DrivingPolicy.LEAST_TIME
                        })
                        //起、终点
                        var start_xy = new AMap.LngLat(that.Flng, that.Flat) // 起点的经纬度
                        var end_xy = new AMap.LngLat(that.Tlng, that.Tlat)   // 终点的经纬度
                        // 根据起终点经纬度规划驾车导航路线
                        driving.search(start_xy, end_xy, function (status, result) {
                            driving.searchOnAMAP({
                                origin: result.origin,
                                destination: result.destination
                            });
                            if (status === 'complete') {
                                if (result.routes && result.routes.length) {
                                    console.log(result.routes[0]);
                                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                                    var path = that.parseRouteToPath(result.routes[0])
                                    var startMarker = new AMap.Marker({
                                        position: path[0],
                                        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                                        map: that.map
                                    })
                                    var endMarker = new AMap.Marker({
                                        position: path[path.length - 1],
                                        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                                        map: that.map
                                    })
                                    var routeLine = new AMap.Polyline({
                                        path: path,
                                        isOutline: true,
                                        outlineColor: '#ffeeee',
                                        borderWeight: 2,
                                        strokeWeight: 5,
                                        strokeColor: '#0091ff',
                                        lineJoin: 'round'
                                    })
                                    routeLine.setMap(this.map)
                                    // 调整视野达到最佳显示区域
                                    that.map.setFitView([startMarker, endMarker, routeLine])
                                    console.log('绘制驾车路线完成')

                                }
                            } else {
                                console.log('获取驾车数据失败：' + result)
                            }
                        });
                    })
    
                    that.map.plugin('AMap.Geolocation', function () {
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
                        that.map.addControl(geolocation);
                        geolocation.getCurrentPosition();
                        let timer = setInterval(() => {
                            AMap.event.addListener(geolocation, 'complete', (data) => {
                                // res即是对应的公交路线数据信息
                                // res为获取到的当前位置的信息
                                console.log(111)
                                that.Flng = data.position.lng
                                that.Flat = data.position.lat
                            })
                        }, 100)
                  })
    
                },
                parseRouteToPath(route) {
                    var path = []
                    for (var i = 0, l = route.steps.length; i < l; i++) {
                        var step = route.steps[i]
                        for (var j = 0, n = step.path.length; j < n; j++) {
                            path.push(step.path[j])
                        }
                    }
                    return path
                },
    
                back() {
                    this.$router.back(-1)
                },
    
            },
            components: { AMap, AMapUI }
        };
    
    </script>
    <style scoped>
        #map_container>>>.amap-copyright {
            display: none !important;
        }
    
        #map_container {
            height: 300px;
        }
    
        .aa .leave img {
            transition: all .3s;
            transform: rotate(180deg);
    
        }
    
        .go .leave img {
            transform: rotate(270deg);
            transition: all .3s;
            margin-right: .2rem
        }
        .search {
            width: 94%;
            height: 30px;
            background: #fff;
            margin: 0 auto;
            line-height: 30px;
            border-radius: 1rem;
            margin-top: .5rem;
            margin-bottom: 15px;
            position: fixed;
            top: 1rem;
            left: 3%;
    
        }
    
        .search>img {
            width: .5rem;
            height: 1rem;
            position: absolute;
            top: .6rem;
            left: 1.5rem;
        }
    
        .search-bg img {
            width: 1rem;
            height: 1rem;
            position: relative;
            top: .15rem;
            left: -.2rem;
        }
    
        .log {
            width: 100%;
            height: 3.125rem;
            line-height: 3.125rem;
            background: #fff;
            color: #999999;
            margin-bottom: 1rem
        }
    
        .log img {
            width: 1rem;
            height: 1rem;
            position: relative;
            top: .2rem;
            left: -.2rem;
        }
    
        .log-item {
            width: 100%;
            background: #fff;
    
        }
    
        .log-item .log-header {
            width: 94%;
            margin: 0 auto;
            height: 3rem;
            display: flex;
            line-height: 3rem;
    
        }
    
        .log-top {
            width: 100%;
            height: 3rem;
            border-bottom: 1px solid #eaeaea;
        }
    
        .log-item .log-header .name {
            flex: 3;
            font-size: .929rem;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    
        .log-item .log-header .leave {
            flex: 5;
            text-align: left
        }
    
        .log-item .log-body {
            width: 94%;
            margin: 0 auto 1rem;
            height: 6.25rem
        }
    
        .log-item .log-body h3 {
            height: 2.5rem;
            text-align: left;
            line-height: 2.5rem
        }
    
        .leave img {
            float: right;
            margin-top: 1rem;
            width: .5rem;
            height: 1rem;
            transform: rotate(180deg);
        }
    
        .navigation img {
            width: 1.53rem;
            height: 2.625rem
        }
    
        .log-body-detail {
            width: 100%;
            height: 3.25rem;
            display: inline-block;
            margin: 0 auto;
        }
    
        .log-body-detail .content {
            width: 70%;
            float: left;
        }
    
        .log-body-detail .navigation {
            width: 30%;
            float: left;
            text-align: right
        }
    
        .log-body-detail .content p {
            width: 50%;
            float: left;
            text-align: left;
            margin-top: .6rem;
            font-size: .714rem;
            color: #333333
        }
    </style> 