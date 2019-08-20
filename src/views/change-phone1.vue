<template>
    <div>
        <Header text="更换手机号"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>更换手机号</span>
                </p>
            </div>
            <div class="item">
                <div class="c-code">
                    +86
                </div>
                <div class="c-pnone">
                    <input type="tel" v-model="phoneNum" maxlength="11" placeholder="请输入您的新手机号">
                </div>

            </div>
            <div class="item">
                <div class="c-code">
                    手机验证码
                </div>
                <div class="c-pnone">
                    <input type="text" v-model="code">
                    <button v-show="sendAuthCode" type="button" id="inpbutton" class="inpbutton" @click="getAuthCode">获取手机验证码</button>
                    <span v-show="!sendAuthCode" class="inpbutton"> {{auth_time}}s后重新发送</span>
                </div>

            </div>
        </div>
        <mt-button size="large" class="r" @click="next">确认</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                phoneNum: "",
                code: "",
                tcode: "",
                sendAuthCode: true,
                auth_time: ""
            }
        },
        
        methods: {
    
            getAuthCode: function () {
                var that = this
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
                params.append('mobile', this.phoneNum);
                this.$axios.post(domain.baseUrl + '/my/verification-old-mobile.html?token=' + sessionStorage.getItem('userToken'),
                    params,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                )
                    .then(function (res) {
                        that.tcode = res.data.data.code
                        MessageBox('提示', res.data.message);
                        console.log(res.data.data.code);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            next() {
                // console.log(JSON.parse(sessionStorage.getItem('store')).phoneNum)
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
                var phoneNum = this.phoneNum;
                if (!phoneNum) {//未输入手机号
                    MessageBox('提示', '请输入手机号码');
                    return;
                }
                if (!reg.test(phoneNum)) {//手机号不合法
                    MessageBox('提示', '您输入的手机号码不正确，请重新输入');
                    return;
                } if (!this.code) {
                    MessageBox('提示', '请输入手机验证码');
                    return;
                } else if (this.code != this.tcode) {//手机号不合法
                    MessageBox('提示', '您输入的手机验证码不正确，请重新输入');
                    return;
                }
                else {
                    var params = new URLSearchParams();
                    params.append('mobile', phoneNum);
                    this.$axios.post(domain.baseUrl + '/my/change-mobile.html?token=' + sessionStorage.getItem('userToken'),
                        params,
                        {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }
                    )
                        .then(function (res) {
                            console.log(res)
                            MessageBox('提示', res.data.message).then(action => {
                                if (action == 'confirm') {     //确认的回调
                                    this.$router.push("/user")
                                }
                            })
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
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
        display: flex
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

    .c-code {
        flex: 1
    }

    .c-pnone {
        text-align: left;
        flex: 3
    }

    .c-pnone input {
        width: 11rem;
        padding-left: 1rem;
        border-left: 1px solid #b2b2b2;
        outline: none;
        background: #fff;
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