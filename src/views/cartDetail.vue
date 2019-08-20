<template>
    <div>
        <Header text="详情"></Header>
        <div class="detail">
            <div class="detail-top">
                <img src="@/assets/img/detail.jpg" alt="">
                <div class="content">
                    <h3>标题标题标题标题标题</h3>
                    <div class="adress">
                        <p>58m</p>
                        <p>滨江区滨盛路1766号星光二期3楼</p>
                    </div>
                </div>
            </div>
            <a class="call" :href="'tel:' + phone">联系方式</a>
            <ul class="index-tab">
                <li v-for="(item, index) in tabs" v-text="item.title" :class="selected===index ? active :''" @click="onCurrentTitle(item, index)"></li>
            </ul>
            <div class="container">
                <div class="product-container" v-if="selected==0">
                    <div class="product" ref="tab">
                        <ul ref="tabWrapper">
                            <li ref="tabitem" v-for="(item, index) in product">
                                <p>
                                    <img :src="item.img" alt="">
                                </p>
                                <p>{{item.name}}</p>
                            </li>
                        </ul>

                        <router-link class="call" :to="{path:'/List'}">立即查看</router-link>

                    </div>
                    <div class="review-title">
                        <span>精选点评</span>
                    </div>
                    <div class="review-box">
                        <div class="review-container">
                            <div class="review-item">
                                <div class="img">
                                    <img src="@/assets/img/detail.jpg" alt="">
                                </div>
                                <div class="review-content">
                                    <p>来自猩猩的你</p>
                                    <p class="gray">2019-01-01</p>
                                    <p>
                                        消费后的点评评论消费后的点，评评论消费后的点评评论消费后的，点评评论消费后的点，评评论消费后的点评评论。
                                    </p>
                                    <p class="gray">
                                        推荐:
                                        <span>产品名称</span>
                                    </p>
                                    <p>
                                        <img src="@/assets/img/detail.jpg" alt="">
                                        <img src="@/assets/img/detail.jpg" alt="">
                                        <img src="@/assets/img/detail.jpg" alt="">
                                    </p>
                                    <p class="evaluation">
                                        <router-link :to="{path:'/review'}">追评</router-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-box">
                            <div class="review-container">
                                <div class="review-item">
                                    <div class="img">
                                        <img src="@/assets/img/detail.jpg" alt="">
                                    </div>
                                    <div class="review-content">
                                        <p>来自猩猩的你</p>
                                        <p class="gray">2019-01-01</p>
                                        <p>
                                            消费后的点评评论消费后的点，评评论消费后的点评评论消费后的，点评评论消费后的点，评评论消费后的点评评论。
                                        </p>
                                        <p class="gray">
                                            推荐:
                                            <span>产品名称</span>
                                        </p>
                                        <p>
                                            <img src="@/assets/img/detail.jpg" alt="">
                                            <img src="@/assets/img/detail.jpg" alt="">
                                            <img src="@/assets/img/detail.jpg" alt="">
                                        </p>
                                        <p class="evaluation">
                                            <router-link :to="{path:'/review'}">追评</router-link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="coupons" v-if="selected==1">
                    <router-link to="/couponsDetail" class="coupons-item">
                        <img src="@/assets/img/coupons.jpg" alt="">
                        <router-link to="/GoodsDetail" class="usering"></router-link>
                    </router-link>
                    <router-link to="/couponsDetail" class="coupons-item">
                        <img src="@/assets/img/coupons.jpg" alt="">
                        <router-link to="/GoodsDetail" class="usering"></router-link>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/header-bar/header-bar';
    import img1 from "@/assets/img/list1.png";
    import BScroll from 'better-scroll';
    export default {
        data() {
            return {
                phone: 1356565656,
                selected: 0,
                active: "selected",
                tabs: [
                    { title: "产品" },
                    { title: "优惠券" }
                ],
                product: [
                    {
                        id: 1,
                        img: img1,
                        name: "产品名称"
                    },
                    {
                        id: 2,
                        img: img1,
                        name: "产品名称"
                    },
                    {
                        id: 3,
                        img: img1,
                        name: "产品名称"
                    },
                    {
                        id: 4,
                        img: img1,
                        name: "产品名称"
                    },
                    {
                        id: 5,
                        img: img1,
                        name: "产品名称"
                    }
                ]
            }
        },
        created() {
            if (this.selected == 0) {
                this.$nextTick(() => {
                    this.InitTabScroll();
                });

            }

        },
        methods: {
            // 获取当tab
            onCurrentTitle(item, index) {
                console.log(index)
                this.selected = index
                this.curLeague = item
                this.curType = 0

            },
            loadMore: function () {

                this.busy = true;

                //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
                setTimeout(() => {
                    //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
                    this.busy = false;
                }, 1000);
            },
            InitTabScroll() {

                let width = 0
                for (let i = 0; i < this.product.length; i++) {
                    width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
                }
                console.log(width)
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
        components: {
            Header,
            BScroll
        }
    }
</script>

<style scoped>
    .detail {
        position: relative;
        top: 43px;

    }

    .detail-top {
        background: #fff;
    }

    .detail-top>img {
        width: 100%;
    }


    .content {
        width: 90%;
        margin: 0 auto;
        padding-bottom: 1rem;
        text-align: left
    }

    .content h3 {
        color: #333;
        font-size: 1.0625rem;
        margin-top: 1rem;
    }

    .content .adress {
        margin-top: 1rem;
        font-size: .75rem;
        color: #999999
    }

    .content .adress p {
        display: inline-block;
        margin-right: 1rem
    }

    .call {
        display: inline-block;
        width: 100%;
        height: 2.8125rem;
        line-height: 2.8125rem;
        text-align: center;
        color: #1daad5;
        background: #fff;
        border-top: 1px solid #eaeaea;
    }

    .index-tab {
        margin-top: 1rem;
        background-color: #eeeeee;

        display: flex;
        text-align: center;

    }

    .index-tab li {
        display: block;
        flex: 1;
        padding: 17px 0;
        font-size: 15px;
        text-decoration: none;
        color: #7f7f7f;
    }

    .index-tab li.selected {
        color: #26a2ff;

        position: relative;
        background: #fff;
        color: #333333
    }

    .product {
        width: 100%;
        overflow: hidden;
        background: #fff;
    }

    .product ul {
        display: flex;
        margin-top: .5rem;
        margin-bottom: 1.25rem
    }

    .product ul li img {
        width: 8.75rem;
        height: 5.5rem;
    }

    .product ul li {
        text-align: right;
        width: 9.75rem;
        flex: 0 0 9.75rem;
    }

    .product ul li p {
        margin-top: .9rem;
        text-align: center
    }

    .review-title {
        width: 100%;
        margin: 0 auto;
        height: 2.8125rem;
        line-height: 2.8125rem;
        text-align: left;
        margin-top: 1rem;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;
    }

    .review-title span {
        color: #333;
        font-size: .9375rem;
        padding-left: .5rem;
        margin-left: 2.5%;
        border-left: 3px solid #333;


    }

    .review-box {
        width: 100%;
        background: #fff;

    }

    .review-container {
        width: 90%;
        margin: 0 auto;

    }

    .review-item {
        display: flex;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #dcdcdc;
    }
    .review-item:last-child{
        border-bottom: none
    }
    .review-container .img {
        flex: 1;
        text-align: left;
    }

    .review-container .review-content {
        flex: 5;
        text-align: left;
    }

    .review-content p img {
        width: 6.16rem;
        height: 4.3125rem;
        border-radius: .5rem
    }

    .review-item .img img {
        width: 2.8125rem;
        height: 2.8125rem;
        border-radius: 50%;
    }

    .review-content p {
        font-size: .8125rem;
        color: #333333;
        margin-top: .5rem;
        line-height: 1.2rem
    }

    .review-content p.gray {
        color: #999;
    }

    .review-content p.gray span {
        color: #1daad5;
    }

    .evaluation {
        text-align: left
    }

    .evaluation a {
        display: inline-block;
        padding: .3rem 2rem;
        border: 1px solid #1daad5;
        border-radius: 2rem;
        margin-right: 1rem;
        ;
        color: #1daad5
    }

    .coupons {
        width: 100%;
        background: #fff;
        padding-bottom: 1rem;
    }
    .coupons-item{
        width:94%;
        display: inline-block;
        margin: 0 auto;
        position: relative;
        padding-top: 1rem;
    }
    
    .coupons-item>a {
        width: 100%;
        display: inline-block;
        height: 10.46rem;
        position: relative;
    }
    .coupons-item .usering{
        height: 10.46rem;
        width: 5rem;
        display: inline-block;
        position: absolute;
        right: 0;
        top: 1rem;
    }
    .coupons-item img {
        width: 25.357rem;
        height: 10.46rem;
    }
</style>