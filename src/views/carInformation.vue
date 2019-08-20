<template>
    <div>
        <Header text="车辆信息"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>车辆信息</span>
                </p>
            </div>
            <div class="item">
                <div class="c-code">
                    车辆品牌
                </div>
                <div class="c-pnone">
                    <input type="text" v-model="brand" placeholder="请输入车辆品牌">
                </div>
            </div>
            <div class="item">
                <div class="c-code">
                    车辆型号
                </div>
                <div class="c-pnone">
                    <input type="text" v-model="model" placeholder="请输入车辆型号">
                </div>
            </div>

            <div class="item">
                <div class="c-code">
                    车辆颜色
                </div>
                <div class="c-pnone">
                    <input type="text" v-model="color" placeholder="请输入车辆颜色">
                </div>
            </div>
            <div class="item">
                <div class="c-code">
                    购买日期
                </div>
                <div class="c-pnone">
                    <div class="birth">
                        <div @click="openPicker" style="padding-left: 1rem">{{buyTime}}</div>
                    </div>
                    <mt-datetime-picker type="date" ref="picker" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月"
                        date-format="{value} 日" @confirm="handleConfirm">
                    </mt-datetime-picker>
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
    export default {
        data() {
            return {
                buyTime: "请输入购买日期",
                startDate: new Date('1949-01-01'),
                endDate:new Date(),
                model: "",
                color: ""

            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            openPicker() {
                this.$refs.picker.open()
            },
            handleConfirm(data) {
                var d = new Date(data);  

                var  resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
                this.buyTime=resDate
     
            },
            loadData() {
                var params = new URLSearchParams();
                params.append('car_license_id', this.$route.query.id);
                this.$axios.post(domain.baseUrl + '/car-license/view.html?token=' + sessionStorage.getItem('userToken'),
                    params,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                ).then(function (res) {
                    this.brand = res.data.data.brand
                    this.model = res.data.data.model
                    this.color = res.data.data.color
                    this.buyTime = res.data.data.buy_time


                }.bind(this)).catch(function (error) {
                    console.log(error);
                });
            },
            next() {
                var params = new URLSearchParams();
                params.append('car_license_id', this.$route.query.id);
                params.append('brand', this.brand);
                params.append('model', this.model);
                params.append('color', this.color);
                params.append('buy_time', this.buyTime);
                this.$axios.post(domain.baseUrl + '/car-license/update-information.html?token=' + sessionStorage.getItem('userToken'),
                    params,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                )
                    .then(function (res) {

                        if (res.data.status == 10000) {
                            this.$router.back(-1)

                        } else {
                            MessageBox('提示', res.data.message)
                        }


                    }.bind(this)).catch(function (error) {
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