<template>
    <div>
        <Header text="详情"></Header>
        <div class="detail">
            <div class="detail-top">
                <img src="@/assets/img/detail.jpg" alt="">
                <div class="content">
                    <p>
                        <span>￥132</span>元</p>
                    <h3>标题标题标题标题标题</h3>
                    <div class="adress">
                        <p>58m</p>
                        <p>滨江区滨盛路1766号星光二期3楼</p>
                    </div>
                </div>
            </div>
            <div class="store">
                <div class="img">
                    <img src="@/assets/img/detail.jpg" alt="">
                </div>
                <div class="store-content">
                    <h3>iihan home晨光店铺</h3>
                    <p>
                        <router-link class="all" :to="{path:'/List'}">全部产品</router-link>
                        <router-link class="into" :to="{path:'/CartDetail'}">进入店铺</router-link>
                    </p>
                </div>

            </div>
            <div class="product-detail">
                <span>产品介绍</span>
            </div>
            <div class="detail-content">
                <p style="margin-top: 1rem"> 富文本编辑</p>
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


            }
        },

        methods: {


        },
        components: {
            Header

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

    .content>p span {
        font-size: 1.125rem;
        margin-right: .2rem
    }

    .content>p {
        margin-top: 1rem;
        color: #ff8502;
        font-size: .75rem;

    }

    .content .adress {
        margin-top: 1rem;
        font-size: .75rem;
        color: #999999
    }
    .content .adress p{
        display: inline-block;
        margin-right: 1rem
    }
    .store {
        height: 5.375rem;
        width: 100%;
        display: flex;
        background: #fff;
        margin-top: 1rem
    }

    .store .img {
        width: 7.5rem;
        flex: 0 0 7.5rem;
        margin-left: 2.5%;
        margin-top: .8rem
    }

    .store .img img {
        width: 7.5rem;
        height: 3.75rem;
    }

    .store-content {
        margin-left: 1.2rem
    }

    .store-content h3 {
        margin-top: 1rem;
        font-size: .9375rem;
        color: #333;
        text-align: left;
    }

    .store-content p {
        margin-top: 1rem;
        font-size: .75rem
    }

    .store-content p a {
        display: inline-block;
        padding: .4rem 1rem;
        border: 1px solid #1daad5;
        border-radius: 2rem;
        margin-right: 1rem
    }

    .all {
        color: #1daad5;

    }

    .into {
        background: #1daad5;
        color: #fff
    }

    .product-detail {
        width: 100%;
        height: 2.8125rem;
        text-align: center;
        line-height: 2.8125rem;
        background: #fff;
        padding: 3px 0;
        margin-top: 1rem;
        border-bottom: 1px solid #dcdcdc;
    }

    .product-detail span {
        display: inline-block;
        height: 2.8125rem;
        line-height: 2.8125rem;
        border-bottom: 3px solid #1daad5;
    }
</style>