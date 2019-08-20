<template>
    <div class="findpwd">
        <Header text="忘记密码"></Header>
        <div class="img" ref="height"></div>
        <div class="login_out">
            <form action="" method="post" id="form">
                <div class="re_jk_li">
                    <div class="re_li_in">
                        <div class="login_li_img icon_mobile"></div>
                        <input type="tel" v-model="phoneNum" maxlength="11" placeholder="请输入您的手机号" id="teleipt" value="">
                    </div>
                </div>
                <div class="re_jk_li">
                    <div class="re_li_in">
                        <div class="login_li_img icon_yzcode"></div>
                        <input type="tel" v-model="msg" name="code" placeholder="请输入手机验证码" id="codeipt" value="">
                    </div>
                    <button v-show="sendAuthCode" type="button" id="inpbutton" class="inpbutton" @click="getAuthCode">获取手机验证码</button>
                    <span v-show="!sendAuthCode" class="inpbutton"> {{auth_time}}s后重新发送</span>
                </div>
                <div class="re_jk_li">
                    <div class="re_li_in">
                        <div class="login_li_img icon_morecode"></div>
                        <input type="password" v-model="Password" placeholder="请输入新密码" id="pwd1" value="">
                    </div>

                </div>
                <div class="re_jk_li">
                    <div class="re_li_in">
                        <div class="login_li_img icon_morecode"></div>
                        <input type="password" v-model="newPassword" placeholder="请确认您的密码" id="pwd2" value="">
                    </div>

                </div>

            </form>
            <div id="inpbutton1" @click="btn">确认</div>
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
                clientHeight: '',
                sendAuthCode: true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
                auth_time: 0,
                phoneNum: "",
                msg: "",
                Password: "",
                newPassword: ""
            }
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
            getAuthCode: function () {
                var reg1 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                var phoneNum = this.phoneNum;
                if (!phoneNum) {
                    MessageBox('提示', '请输入您的手机号');
                    return;
                }
                if (!reg1.test(phoneNum)) {
                    MessageBox('提示', '请输入正确的手机号码');
                } else {
                    this.sendAuthCode = false;
                    this.auth_time = 60;
                    var auth_timetimer = setInterval(() => {
                        this.auth_time--;
                        if (this.auth_time <= 0) {
                            this.sendAuthCode = true;
                            clearInterval(auth_timetimer);
                        }
                    }, 1000);
                    var params = new URLSearchParams();
                    params.append('mobile', phoneNum);
                    this.$axios.post(domain.baseUrl+'/login/send-messages.html',
                        params,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    )
                        .then(function (res) {
                            MessageBox('提示', res.data.message);
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            },

            changeFixed(clientHeight) {                        //动态修改样式
                console.log(clientHeight);
                this.$refs.height.style.height = clientHeight + 'px';

            },
            btn: function () {
                var reg = /^[_0-9a-z]{6,16}$/;//手机号正则验证
                var reg1 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                var phoneNum = this.phoneNum;
                var password = this.Password;
                var msg = this.msg;

                var newPassword = this.newPassword;
                if (!phoneNum) {
                    MessageBox('提示', '请输入您的手机号');
                    return;
                }
                if (!reg1.test(phoneNum)) {
                    MessageBox('提示', '请输入正确的手机号码');
                    return;
                }
                if (!msg) {
                    MessageBox('提示', '请输入验证码');
                    return;
                }
                if (!password) {
                    MessageBox('提示', '请输入新密码');
                    return;
                }
                if (!reg.test(password)) {
                    MessageBox('提示', '密码为6-15位之间');
                    return;
                }
                if (!newPassword) {
                    MessageBox('提示', '请确认您的新密码');
                    return;
                }
                if (!reg.test(password)) {
                    MessageBox('提示', '密码为6-15位之间');
                    return;
                }
                if (newPassword !== password) {
                    MessageBox('提示', '两次密码不匹配');

                } else {
                    var params = new URLSearchParams();
                    params.append('mobile', phoneNum);
                    params.append('code', msg);
                    params.append('password', password);

                    this.$axios.post(domain.baseUrl+'/login/reset-password.html',
                        params,
                        {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }
                    )
                        .then(function (res) {
                            if (res.data.status == 10000) {
                                MessageBox('提示', res.data.message).then(action => {
                                    if (action == 'confirm') {     //确认的回调
                                        this.$router.push("/login")
                                    }
                                })

                            } else {
                                MessageBox('提示', res.data.message);
                            }
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }

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
        background: url(../assets/img/findpwd.png) no-repeat top center;
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
</style>