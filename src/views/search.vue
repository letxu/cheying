<template>
    <div>
        <div class="search" ref="searchHeight">
            <img src="@/assets/img/back.png" alt="" @click="back">
            <div class="search-bg">
                <img src="@/assets/img/search-icon.png" alt="">
                <input id="search" v-model="searchLog" type="text" v-on:input="search" placeholder="搜索目的地、找停车场">
            </div>
        </div>
        <div class="search-log">
            <router-link to="near" class="search-item">
                <img src="@/assets/img/search1.png" alt=""> 滨江区
            </router-link>
            <router-link to="near" class="search-item">
                <img src="@/assets/img/search1.png" alt=""> 滨江区
            </router-link>
            <router-link to="near" class="search-item">
                <img src="@/assets/img/search1.png" alt=""> 滨江区
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                clientHeight: '',
                searchLog: ""
            }
        },

        methods: {
            back() {
                this.$router.back(-1)
            },
            search() {
                function onComplete(data) {
                var str = ['定位成功'];
                str.push('经度：' + data.position.getLng());
                str.push('纬度：' + data.position.getLat());
 
                AMap.service(["AMap.PlaceSearch"], function() {
                    var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 5,
                        pageIndex: 1,
                        city: "010", //城市
                        map: map,
                        panel: "panel",
                        input:"search"
                    });
                    //关键字查询
                    //placeSearch.search('北京大学');
 
                    var cpoint = [data.position.getLng(), data.position.getLat()]; //中心点坐标
                    placeSearch.searchNearBy('', cpoint, 230, function(status, result) {
                        
                    });
                    AMap.event.addListener(placeSearch, "selectChanged", function(data){
                        var selected = data.selected.data;
                        console.log( data.selected );
 
                        alert(selected.cityname + ',' + selected.adname + ',' + selected.name+'测试1111');
                        alert( selected.location.lat + ',' + selected.location.lng+'测试2222' );  // 点击poi周边结果经纬度
                    });
                }); 
            }
        }

    }
}
</script>
<style scoped>
    .search {
        width: 94%;
        height: 30px;
        background: #fff;
        margin: 0 auto;
        line-height: 30px;
        position: relative;
        border-radius: 1rem;
        margin-top: 15px;
        margin-bottom: 15px
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
        top: .15rem
    }

    .search input {
        outline: none;
        padding-left: .5rem
    }

    .search-item {
        height: 3.125rem;
        display: inline-block;
        width: 100%;
        text-align: left;
        line-height: 3.125rem;
        border-bottom: 1px solid #dedede;
    }

    .search-item img {
        width: 1.07rem;
        height: 1.07rem;
        margin: 0 1rem
    }

    .search-log {
        /* min-height: 100%; */
        background: #fff;
    }
</style>