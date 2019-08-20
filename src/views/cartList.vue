<template>
    <div class="list">
        <Header text="列表"></Header>
        <div class="list-box">
            <router-link class="boxs" v-for="(item,index) in goodsList" :to="{ path: 'GoodsDetail', query: {id: item.id}}" tag="div" :key="item.id"
                :id="item.id">

                <div class="box-item">
                    <div class="img">

                        <img :src="item.img" alt="">
                    </div>
                    <div class="content">
                        <h3>{{item.name}}</h3>
                        <p> <span>￥{{item.price}}</span>元</p>
                    </div>
                </div>

            </router-link>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import img1 from "@/assets/img/list1.png";
    export default {
        data() {
            return {
                goodsList: [
                    {
                        id: 1,
                        img: img1,
                        name: "产品名称产品名称产品名称",
                        price: 188
                    },
                    {
                        id: 2,
                        img: img1,
                        name: "产品名称产品名称产品名称",
                        price: 188
                    },
                    {
                        id: 3,
                        img: img1,
                        name: "产品名称产品名称产品名称",
                        price: 188
                    },
                    {
                        id: 4,
                        img: img1,
                        name: "产品名称产品名称产品名称",
                        price: 188
                    },
                    {
                        id: 5,
                        img: img1,
                        name: "产品名称产品名称产品名称",
                        price: 188
                    },
                    {
                        id: 6,
                        img: img1,
                        name: "产品名称产品名称产品名称",
                        price: 188
                    }
                ]
            }
        },
        props: {
            text: {
                type: Object,
            }
        },
        components: {
            Header
        }
    }
</script>
<style>
    .list {
        background: #f3f3f3;
        height: 100%
    }

    .list-box {
        position: relative;
        top: 50px;

    }

    .box-item {
        width: 90%;
        height: 6.375rem;
        margin: 0 auto;
        display: flex;
    }

    .box-item .img {
        flex: 3
    }

    .boxs {
        margin-bottom: .6rem;
        background: #fff
    }

    .box-item .content {
        flex: 7;
        text-align: left;
    }

    .box-item img {
        margin-top: .65rem;
        width: 6.625rem;
        height: 5rem;
    }

    .box-item .content h3 {
        margin-top: 1.65rem;
        color: #333333;
        font-size: .875rem;
        padding-left: .5rem
    }

    .box-item .content p span {
        font-size: 1.125rem;
        margin-right: .2rem
    }

    .box-item .content p {
        margin-top: 1rem;
        color: #ff8502;
        font-size: .75rem;
        padding-left: .5rem
    }
</style>