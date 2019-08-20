<template>
    <div>
        <Header text="入驻申请"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>入驻申请</span>
                </p>
            </div>
            <div class="item">
                <div class="c-code">
                    <p class="left-text"> 联系人</p>
                </div>
                <div class="c-pnone">
                    <input type="text" v-model="uname" placeholder="请输入联系人">
                </div>
            </div>
            <div class="item">
                <div class="c-code">
                    <p class="left-text"> 手机号</p>
                </div>
                <div class="c-pnone">
                    <input type="tel" v-model="tel" maxlength="11"  placeholder="请输入手机号">
                </div>

            </div>
            <div class="item">
                <div class="c-code">
                    <p class="left-text"> 类别</p>

                </div>
                <div class="c-pnone">
                    <input class="text-hui" v-model="message" @click="ShouPup" onfocus="this.blur()" />
                    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
                        <mt-picker :slots="slots" @change="onValuesChange" showToolbar>
                        
                            <div class="picker-toolbar-title">
                            
                                <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
                            
                                <div class="usi-btn-a"></div>
                            
                                <div class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</div>
                                </div>
                        </mt-picker>
                    </mt-popup>
                </div>


            </div>
            <div class="item textarea">
                <div class="c-code">
                    <p class="left-text"> 说明</p>

                </div>
                <div class="c-pnone">
                    <textarea name="" id="" cols="30" rows="10" placeholder="请输入说明" v-model="texts"></textarea>

                </div>

            </div>

        </div>
        <mt-button size="large" class="r" @click="next">提交</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import { Picker } from 'mint-ui';
    import { Popup } from 'mint-ui';
    export default {
        data() {
            return {
                showToolbar: true,
                message: "请选择代理区域",
                slots: [{
                    values: ['选择类别', '类别1', '类别2', '类别3', '类别4', '类别5', '类别6'],

                }],
                popupVisible: false,
                tel: "",
                uname: "",
                texts: ""
            }
        },
        methods: {
            // onValuesChange(picker, values) {
            //     if (values[0] > values[1]) {
            //         picker.setSlotValue(1, values[0]);
            //     }
            //     },
            ShouPup() {
                this.popupVisible = true

            },
            onValuesChange(picker, values) {
                this.message = values;
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }

            },

            next() {

                var reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,15}$/;//手机号正则验证
                var uname = this.uname;
                var mobile = this.tel;
                var value = this.message;
                var texts = this.texts;
                console.log(this.texts)
                if (!uname) {
                    MessageBox('提示', '请输入联系人');
                    return;
                }
                if (!mobile) {
                    MessageBox('提示', '请输入手机号码');
                    return;
                }
                if (!reg.test(mobile)) {
                    MessageBox('提示', '您输入的手机号码不正确，请重新输入');
                    return;
                } if (value=="选择类别") {
                    MessageBox('提示', '请选择类别');
                    return;
                }
                if (!texts) {
                    MessageBox('提示', '请输入说明');
                    return;
                }
                else{
                    var params = new URLSearchParams();
                    params.append('mobile', mobile);
                    params.append('contact', uname);
                    params.append('description', texts);
                    params.append('type', value);
                    this.$axios.post(domain.baseUrl+'/entry-application/add.html?token='+sessionStorage.getItem('userToken'),
                        params,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    )
                        .then(function (res) {

                            if (res.data.status == 10000) {
                             
                                MessageBox('提示', res.data.message).then(action => {
                                    if (action == 'confirm') {     //确认的回调
                                    
                                        this.$router.push("/User")
                                    }
                                })

                            } else {
                                MessageBox('提示', res.data.message)
                            }


                        }.bind(this)).catch(function (error) {
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

    .c-pnone>>>.picker-slot-wrapper {
        transform: translate(0px, 0) translateZ(0px);
    }

    .item>>>.mint-popup-bottom {
        width: 100%;
    }

    .picker-toolbar-title {
        display: flex;
    }

    .picker-toolbar-title>div {
        float: left;
        text-align: center
    }

    .usi-btn-a {
        flex: 4
    }

    .usi-btn-cancel {
        flex: 1
    }

    .usi-btn-sure {
        flex: 1
    }

    .item>>>.picker-items {
        width: 100%;
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

    .text-hui {
        color: #666
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

    .item.textarea {
        height: 8.125rem;
    }

    .c-code {
        flex: 1;
        text-align: left;
    }

    .c-pnone {
        text-align: left;
        flex: 3;
        position: relative;
        overflow: hidden;
    }

    .c-pnone input {
        padding-left: 1rem;

        outline: none;
        background: #fff;
    }

    .c-pnone textarea {
        margin-left: 1rem;
        width: 90%;
        overflow: auto;
        height: 6rem;
        margin-top: 1rem;
        padding: 0;
        border: none;
        outline: none;

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

    .left-text {
        display: inline-block;
        margin-left: 1.5rem
    }
</style>