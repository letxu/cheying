<template>
    <div class="findpwd">
        <Header text="登录"></Header>
        <div class="img" ref="height"></div>
        <div class="login_out">
            <form action="" method="post" id="form">
                <div class="re_jk_li">
                    <div class="re_li_in">
                        <div class="login_li_img icon_mobile"></div>
                        <input type="tel" v-model="phoneNum" maxlength="11" placeholder="请输入您的手机号" id="teleipt"
                            value="">
                    </div>
                </div>

                <div class="re_jk_li">
                    <div class="re_li_in">
                        <div class="login_li_img icon_morecode"></div>
                        <input type="password" v-model="Password" placeholder="请输入密码" id="pwd1" value="">
                    </div>

                </div>

            </form>
            <div id="inpbutton1" @click="btn">登录</div>
            <div class="no-code">
                <p>
                    还没有账号？
                    <router-link to="/register">去注册 >></router-link>
                </p>
                <router-link to="/forgotPassword" class="right-btn">忘记密码</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import api from '@/fetch/api.js';
    import { Indicator } from 'mint-ui';
    import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                clientHeight: '',
                phoneNum: "",
                Password: ""
            }
        },
        beforeRouteEnter: (to, from, next) => {
            //组件内守卫
            //已登录状态回到登录界面，即 登出
            next(vm => {
                vm.$store.dispatch("setUser", null);
            });

        },
        mounted() {
            // 获取浏览器可视区域高度
            this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
            //console.log(self.clientHeight);
            window.onresize = function temp() {
                this.clientHeight = `${document.documentElement.clientHeight}`;
            };
        },
        watch: {
            // 如果 `clientHeight` 发生改变，这个函数就会运行
            clientHeight: function () {
                this.changeFixed(this.clientHeight)
            }
        },
        methods: {

            ...mapMutations(['changeLogin']),
            changeFixed(clientHeight) {                        //动态修改样式
                console.log(clientHeight);
                this.$refs.height.style.height = clientHeight + 'px';

            },
            btn: function () {
                console.log(api)
                var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,15}$/;//手机号正则验证
                var reg1 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                var phoneNum = this.phoneNum;
                var password = this.Password;
                var newPassword = this.newPassword;
                if (!phoneNum) {
                    MessageBox('提示', '请输入您的手机号');
                    return;
                }
                if (!reg1.test(phoneNum)) {
                    MessageBox('提示', '请输入正确的手机号码');
                    return;
                }
                if (!password) {
                    MessageBox('提示', '请输入密码');
                    return;
                }
                if (!reg.test(password)) {
                    MessageBox('提示', '密码为6-15位之间');
                    return;
                }
                else {
                    // Toast({
                    //     message: '登录成功',
                    //     iconClass: 'icon icon-success'
                    // });
                    // window.location.href = '/index'
  
                    let data = {
                        'account_number': phoneNum,
                        'password': password
                    }
                    console.log(data)
                    console.log(api)
                    api.post('/login/login.html', data).then(res => {
                        if (res.data.status == 10000) {
                            console.log(res.data.token)
                            sessionStorage.setItem("userName", res.data.account_number)
                            sessionStorage.setItem("userToken", res.data.token)
                            MessageBox('提示', res.data.message).then(action => {

                                console.log(11221)
                                if (action == 'confirm') {     //确认的回调
                                    console.log(11)
                                    // this.$store.dispatch("setNumber", res.data.data.account_number)
                                    // this.$store.dispatch("setToken", res.data.data.token)
                                    this.$router.push("/index")
                                }
                            })

                        } else {
                            MessageBox('提示', res.data.message)
                        }

                    }, err => {
                        console.log(err);
                        this.$toast("连接服务器发生错误!");
                    })
                }

            }

        },
        getParams() {
            let routerParams = this.$route.query.name
            this.msg = routerParams
            console.log(routerParams)
        },
        computed:{
            msg:function(){
                console.log(this.msg)
            }
        },
        components: {
            Header
        }
    }
</script>
<style scoped>
    .img {
        width: 100%;
        height: 100%;
        background: url(../assets/img/login-bg1.png) no-repeat top center;
        background-size: cover;
    }

    .findpwd {
        position: relative;
    }

    .login_out {
        /* height: 287px; */
        width: 100%;
        /* border: 1px solid aqua; */
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 15px;
        margin-top: 70%;
    }

    .re_jk_li {
        width: calc(100% - 30px);
        margin: 0 auto;
        /* margin-top: 15px; */
        font-size: .5rem;
        color: #c7f1ff;
        border-bottom: 1px solid #bed7f5;
        padding: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 30px;
        height: 50px;
    }

    .re_li_in {
        display: flex;
        align-items: center;
        width: 66%;
    }

    .icon_mobile {
        background: url(../assets/img/mobile.png);
        background-size: 11px 16px;
        background-repeat: no-repeat;
        background-position: left center;
    }

    .icon_yzcode {
        background: url(../assets/img/yzcode.png);
        background-size: 13px 10px;
        background-repeat: no-repeat;
        background-position: left center;
    }

    .icon_morecode {
        background: url(../assets/img/suo.png);
        background-size: 11px 16px;
        background-repeat: no-repeat;
        background-position: left center;
    }

    .re_jk_li input[type="text"],
    .re_li_in input[type="tel"],
    .re_jk_li input[type="tel"],
    .re_jk_li input[type="password"],
    .re_li_in input[type="password"],
    .re_li_in input[type="text"] {
        width: 75%;
        background: none;
        outline: none;
        border: 0px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: .9rem;
    }

    .re_jk_li input::-webkit-input-placeholder,
    .re_jk_li textarea::-webkit-input-placeholder {
        color: #c7f1ff;
    }

    .login_li_img {
        width: 25px;
        height: 20px;
    }

    #inpbutton1 {
        background: #fff;
        color: #4e91ff;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: calc(100% - 30px);
        margin: 2rem auto 0;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold
    }

    .inpbutton {
        color: #2979ff;
        /* width: 75px; */
        padding: 0px 5px;
        font-size: 12px;
        border: none;
        outline: none;
        background: #fff;
        border-radius: 4px;
        width: 94px;
        height: 2rem;
        line-height: 2rem;
    }

    .no-code {
        color: #feea8b;
        font-size: 1rem;
        width: calc(100% - 30px);
        margin: 2rem auto 0;
    }

    .no-code p {
        float: left
    }

    .no-code p a {
        color: #feea8b;
        font-size: 1rem;
        margin-left: .5rem
    }

    .right-btn {
        float: right;
        color: #feea8b;
        font-size: 1rem;
    }
</style>