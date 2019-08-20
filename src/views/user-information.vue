<template>
    <div>
        <Header text="车主信息"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>车主信息</span>
                </p>
            </div>
            <!-- <div class="item">
                <div class="c-code">
                    昵称
                </div>
                <div class="c-pnone">
                    <input type="text" v-model="phoneNum" placeholder="请输入昵称">
                </div>
            </div> -->
            <div class="item">
                <div class="c-code">
                    生日
                </div>
                <div class="c-pnone">
                    <div class="birth">
                        <div @click="openPicker" style="padding-left: 1rem">{{birthday}}</div>
                    </div>
                    <mt-datetime-picker type="date" ref="picker" :startDate="startDate"  :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
                    </mt-datetime-picker>
                </div>

            </div>

            <div class="item">
                <div class="c-code">
                    性别
                </div>
                <div class="c-pnone">
                    <input class="text-hui" v-model="message" @click="ShouPup1" placeholder="请选择性别" onfocus="this.blur()" />
                    <mt-popup v-model="popupVisible1" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
                        <mt-picker :slots="slots" @change="onValuesChange1" showToolbar>
                        
                            <div class="picker-toolbar-title">
                            
                                <div class="usi-btn-cancel" @click="popupVisible1 = !popupVisible1">取消</div>
                            
                                <div class="usi-btn-a"></div>
                            
                                <div class="usi-btn-sure" @click="popupVisible1 = !popupVisible1">确定</div>
                                </div>
                        </mt-picker>
                    </mt-popup>

                </div>

            </div>
            <!-- <router-link to="/driving"  class="item">
                    <div class="c-code">
                        驾驶证信息
                    </div>
                    <div class="c-pnone">
                         <img src="@/assets/img/back.png" alt="" >
                     </div>
                 </router-link>
                 <router-link to="/idCart"  class="item">
                    <div class="c-code">
                        身份证信息
                    </div>
                    <div class="c-pnone">
                        <img src="@/assets/img/back.png" alt="" >
                    </div>
                </router-link>         -->
        </div>
        <mt-button size="large" class="r" @click="next">保存</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import { DatetimePicker } from 'mint-ui';
    import { formatDate } from "../assets/js/date";
    export default {
        data() {
            return {
                birthday: "请选择出生日期",  //出生日期
                startDate: new Date('1949-01-01'),
                endDate:new Date(),
                phoneNum: "",
                oldPassword: "",
                Password: "",
                newPassword: "",
                message1: "请选择生日",
                message: "请选择性别",
                slots: [{
                    values: ['请选择性别','男', '女'],

                }],
                popupVisible: false,
                popupVisible1: false,
            }
        },
        methods: {
            openPicker() {
                this.$refs.picker.open()
            },
            handleConfirm(data) {
                var d = new Date(data);  

                var  resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
                this.birthday=resDate
            },
            onValuesChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
            },
            ShouPup() {
                this.popupVisible = true
            },
            ShouPup1() { 
                this.popupVisible1 = true
            },
            onValuesChange(picker, values) {
                this.message1 = values;
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
            },
            onValuesChange1(picker, values) {
                this.message = values;
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
            },
            next() {
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

    .c-pnone>>>.picker-slot-wrapper {
        transform: translate(0px, 0) translateZ(0px);
        text-align: center
    }

    .usi-btn-a {
        flex: 4
    }

    .usi-btn-cancel {
        flex: 1
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

    .usi-btn-sure {
        flex: 1
    }

    .item>>>.picker-items {
        width: 100%;
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

    .item {
        color: #333
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

    .c-pnone img {
        float: right;
        margin-top: 1rem;
        width: .5rem;
        height: 1rem;
        margin-right: 1rem;
        transform: rotate(180deg);
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