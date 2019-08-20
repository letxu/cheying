<template>
    <div>
        <Header text="修改密码"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>修改密码</span>
                </p>
            </div>
            <div class="item">
                <div class="c-code">
                    账号
                </div>
                <div class="c-pnone">
                    <input type="number" v-model="phoneNum" maxlength="11" placeholder="请输入账号" disabled="disabled">
                </div>
            </div>
            <div class="item">
                <div class="c-code">
                    旧密码
                </div>
                <div class="c-pnone">
                    <input type="password" v-model="oldPassword" placeholder="请输入旧密码" autofocus>
                </div>

            </div>
            <div class="item">
                <div class="c-code">
                    新密码
                </div>
                <div class="c-pnone">
                    <input type="password" v-model="Password" placeholder="请输入新密码">
                </div>

            </div>
            <div class="item">
                <div class="c-code">
                    确认密码
                </div>
                <div class="c-pnone">
                    <input type="password" v-model="newPassword" placeholder="请再次输入新密码">
                </div>

            </div>
            <div class="font">
                <p>密码必须至少6个字符，而且同时包含字母和数字。</p>
                <p>
                    <router-link to="/forgotPassword">忘记密码？</router-link>
                </p>
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
                phoneNum: 13555555551,
                oldPassword: "",
                Password: "",
                newPassword: ""
            }
        },
        methods: {
            next() {

                var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,15}$/;//手机号正则验证
                var oldPassword = this.oldPassword;
                var password = this.Password;
                var newPassword = this.newPassword;

                if (!oldPassword) {

                    MessageBox('提示', '请输入旧密码');
                    return;
                }
                if (!reg.test(oldPassword)) {
                    MessageBox('提示', '密码为6-15位之间');
                    return;
                }
                if (!password) {
                    MessageBox('提示', '请输入新密码');
                    return;
                }
                if (!reg.test(password)) {
                    MessageBox('提示', '密码为6-15位之间');
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
               
                }else{
                    Toast({
                            message: '修改成功',

                            iconClass: 'icon icon-success'
                        });
                }
                // if (!reg.test(phoneNum)) {
                //     MessageBox('提示', '您输入的手机号码不正确，请重新输入');
                // } else {
                //     MessageBox({
                //         title: '确认手机号码',
                //         showCancelButton: true
                //     });
                //     let message = '我们将发送验证码短信到这个号码：+86' + phoneNum;
                //     MessageBox.confirm(message).then(action => {
                //         Toast({
                //             message: '发送成功',

                //             iconClass: 'icon icon-success'
                //         });
                //     });
                // }


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
        margin-top: .2rem;
        display: flex;
        font-size: .9375rem
    }

    .c-code {
        flex: 1
    }

    .c-pnone {
        text-align: left;
        flex: 3
    }

    .c-pnone input {
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

    .font a {
        color: #fc8200;
        font-size: .75rem;
        text-decoration: underline
    }
</style>