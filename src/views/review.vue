<template>
    <div>
        <Header text="车牌照管理"></Header>
        <div class="wrapper">
            <div class="item">
                <div class="img">
                    <img src="@/assets/img/list1.png" alt="">
                </div>
                <div class="content">
                    <h3>产品名称产品名称产品名称</h3>
                    <p>￥188
                        <span>元</span>
                    </p>
                </div>
            </div>
            <div class="review">
                <h3>商品评论</h3>
                <textarea name="" id="" cols="30" rows="10" placeholder="再次输入商品评价..."></textarea>
            </div>
            <div class="boxs">
                <a class="item add">
                    +上传照片
                    <img src="@/assets/img/right-icon.png" alt="">
                </a>

            </div>
        </div>

        <mt-button size="large" class="r" @click="next">发表评论</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
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
    .item {
        display: flex;
        background: #fff;
        padding: 1rem 0;
        border-bottom: 1px solid #dedede
    }

    .item .img {
        flex: 2;
        text-align: right;
    }

    .item .img img {
        width: 6.75rem;
        height: 5rem;
    }

    .item .content {
        text-align: left;
        flex: 5;


    }

    .content h3 {
        font-size: .875rem;
        color: #333333;
        padding-left: 1rem;
        margin: 1rem 0;
    }

    .content p {
        font-size: 1.42857rem;
        color: #ff8502;
        padding-left: 1rem
    }

    .content p span {
        font-size: .75rem
    }

    .r {
        position: fixed;
        bottom: 0;
        background: #1daad5;
        border-radius: 0;
        color: #fff;
        font-size: .9375rem
    }

    .review {
        background: #fff;
        padding-bottom: 1rem
    }

    .review h3 {
        width: 25rem;
        margin: 0 auto;
        text-align: left;
        font-size: .9375rem;
        color: #333333;
        padding: 1rem 0;
    }

    .review textarea {
        width: 23rem;
        height: 6.214rem;
        border: 1px solid #dcdcdc;
        border-radius: .5rem;
        outline: none;
        resize: none;
        padding: 1rem;
    }

    .boxs {
        width: 100%;
        background: #fff;
        margin-top: .5rem;
        height: 3.125rem;
    }

    .add {
        color: #1daad5;
        position: relative;
        width: 90%;
        margin: 0 auto;
        border-bottom: none
    }

    .add img {
        width: .5357rem;
        height: .92857rem;
        position: absolute;
        right: .3rem;
        top: 1.3rem
    }
</style>