<template>
    <div>
        <Header text="优惠券使用说明"></Header>
        <div class="bg">
            <img src="@/assets/img/coupon-bg.png" alt="">
            <p>
                <img src="@/assets/img/coupon.png" alt="">
            </p>
        </div>

        <div class="content">
            <p>优惠券说明</p>
            <p>1、优惠券文字内容说明优惠券文字内容说明，优惠券文字内容说明优惠券文字内容说明。</p>
            <p>2、优惠券文字内容说明优惠券文字内容说明，优惠券文字内容。</p>
            <p>3、优惠券文字内容说明优惠券文字内容说明，优惠券文字内容。</p>
        </div>
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
    .tab-top {
        width: 100%;
        height: 2.625rem;
        line-height: 2.625rem;
        text-align: left;
        background: #1daad5;
        color: #fff;
    }

    .tab-top p {
        width: 90%;
        margin: 0 auto;
        font-size: .875rem;

    }
    .bg{
        position: relative;
    }
    .bg>img {
        width: 100%
    }
    .bg p{
        width: 100%;
        text-align: center;
        position: absolute;
        top: 7rem
    }
    .bg p img{
        width: 16.656rem;
        height: 19.375rem;
   
    }
    .content{

        width: 94%;
        margin:  7rem auto 0;
        text-align: left
    }
    .content p{
        line-height: 1.8rem;
        margin-top: .5rem
    }
</style>