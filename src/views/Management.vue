<template>
    <div>
        <Header text="车牌照管理"></Header>
        <div class="wrapper">
            <div class="boxs" v-for="(item,index) in Management">
                <div class="item">
                    <div class="num">
                        {{item.number}}
                    </div>
                    <div class="seting">
                        <router-link :to="{path:'/carInformation',query: {id: item.id}}">[编辑车辆信息]</router-link>
                    </div>
                    <div class="del" @click="delItem(index)">
                        <img src="@/assets/img/del.png" alt="">
                    </div>
                </div>
            </div>

            <div class="boxs">
                <router-link to="/addCar" class="item add">
                    +添加车辆
                    <img src="@/assets/img/right-icon.png" alt="">
                </router-link>
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
                Management: []
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            loadData() {
                var params = new URLSearchParams();
                this.$axios.post(domain.baseUrl + '/car-license/list.html?token=' + sessionStorage.getItem('userToken'),
                    params,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                )
                    .then(function (res) {
                        this.Management = res.data.data

                    }.bind(this)).catch(function (error) {
                        console.log(error);
                    });
            },
            delItem(index) {
                var car_license_id = this.Management[index].id
                var params = new URLSearchParams();
                params.append('car_license_id', car_license_id);
                MessageBox.confirm('你确认删除吗？').then(action => {
                    this.$axios.post(domain.baseUrl + '/car-license/delete.html?token=' + sessionStorage.getItem('userToken'),
                        params,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    )
                        .then(function (res) {


                        }.bind(this)).catch(function (error) {
                            console.log(error);
                        });
                    Toast({
                        message: '删除成功',
                        iconClass: 'icon icon-success'
                    });
                    this.Management.splice(index, 1);
                });


            }
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

    .boxs {
        width: 100%;
        height: 3.57rem;
        height: 3.57rem;
        line-height: 3.57rem;
        background: #fff;
        margin-bottom: .5rem;
    }

    .item {
        width: 90%;
        margin: 0 auto;
        display: flex
    }

    .item .num {
        flex: 3;
        text-align: left
    }

    .item .seting {
        flex: 6;
        text-align: left;
    }

    .item .seting a {
        color: #1daad5;
    }

    .item .del {
        flex: 1;
        text-align: right
    }

    .del img {
        width: 1rem;
        height: 1.143rem;
    }

    .add {
        color: #1daad5;
        position: relative;
    }

    .add img {
        width: .5357rem;
        height: .92857rem;

        position: absolute;
        right: .3rem;
        top: 1.3rem
    }
</style>