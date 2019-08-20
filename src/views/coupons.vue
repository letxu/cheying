<template>
    <div>
        <Header text="我的卡券"></Header>
        <div class="wrapper">
            <div class="coupons">

                <div class="coupons-item">
                    <router-link to="/couponsDetail" class="coupons-item">
                        <img src="@/assets/img/coupons.jpg" alt="">
                        <router-link to="/GoodsDetail" class="usering"></router-link>
                    </router-link>
                    <div class="giving">
                        <p @click="giving">转赠</p>
                    </div>
                </div>

                <div class="coupons-item">
                    <router-link to="/review" class="coupons-item">
                        <img src="@/assets/img/oldCoupons.png" alt="">
                    </router-link>

                </div>
            </div>
            <div class="item">
                <router-link to="/Bill">优惠券使用明细</router-link>
            </div>
            <div class="xy">
                <router-link to="/couponsInstruction">《优惠券使用说明》</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                names: "来自猩猩的你"
            }
        },
        methods: {
            giving() {
                MessageBox.prompt('请输入受赠用户手机号', "").then(({ value, action }) => {
                    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

                    if (!value) {
                        MessageBox('提示', '请输入您的手机号');
                        return;
                    }
                    if (!reg.test(value)) {
                        MessageBox('提示', '您输入的手机号码不正确');
                        return;
                    }
                    console.log(value)
                })
            },
            next() {
                console.log(1)

                var names = this.names;
                if (!names) {//未输入手机号
                    MessageBox('提示', '请输入昵称');
                    return;
                } else {
                    Toast({
                        message: '修改成功',
                        iconClass: 'icon icon-success'
                    });
                }

            },
        },

        components: {
            Header
        }
    }
</script>
<style scoped>
    .coupons {
        width: 100%;

        padding-bottom: 1rem;
    }

    .coupons-item {
        width: 95%;
        padding-top: 1rem;
        margin: 0 auto;
     

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

    .item {
        width: 24.357rem;
        height: 3.57rem;
        background: #fff;
        line-height: 3.57rem;
        margin: 0 auto;
        text-align: left;
        padding-left: 1rem
    }

    .item a {
        width: 100%;
        height: 100%;
        display: inline-block
    }

    .xy {
        margin-top: 2rem
    }

    .xy a {
        color: #1daad5;
        text-decoration: underline
    }

    .giving {
        width: 100%;
        text-align: right
    }

    .giving p {
        width: 6.25rem;
        height: 2.5rem;
        background: #ff9900;
        color: #fff;
        font-size: .875rem;
        line-height: 2.5rem;
        text-align: center;
        display: inline-block;
        margin-top: 1rem
    }

    body>>>.mint-msgbox-header {
        display: none;
    }
</style>