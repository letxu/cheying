<template>
    <div>
        <Header text="更换手机号"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>修改昵称</span>
                </p>
            </div>
            <div class="item">
                <div class="c-pnone">
                    <input type="text" v-model="names" autofocus>
                </div>
            </div>
        </div>
        <mt-button size="large" class="r" @click="next">确认修改</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                names: this.$store.state.nickname
            }
        },
        methods: {
            next() {
                var names = this.names;
                var params = new URLSearchParams();
                params.append('nickname', names);
                this.$axios.post(domain.baseUrl + '/my/update-user-info.html?token='+sessionStorage.getItem('userToken'),
                    params,
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }
                )
                    .then(function (res) {
                        MessageBox('提示', res.data.message).then(action => {
                            if (action == 'confirm') {     //确认的回调
                                this.$router.back(-1)
                            }
                        })
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
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

    .tab-top p span {
        padding-left: 7px;
        border-left: 2px solid #fff;
    }

    .item {
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        background: #fff;
        margin-top: .5rem;

    }
    .c-pnone {
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }
    .c-pnone input {
        outline: none;
        font-size: .9375rem
    }
    .font {
        width: 90%;
        margin: 1.5rem auto 0;
        font-size: .75rem;
        line-height: 1.5rem;
        color: #999999;
        text-align: left
    }
    .r {
        position: fixed;
        bottom: 0;
        background: #1daad5;
        border-radius: 0;
        color: #fff;
        font-size: .9375rem
    }
</style>