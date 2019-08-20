<template>
        <div>
            <Header text="车牌照管理"></Header>
            <div class="wrapper">
                <div class="boxs" v-for="(item,index) in Management">
                    <div class="item">
                        <div class="num">
                            {{item.num}}
                        </div>
                        <div class="seting">
                            <router-link to="/parkingDetail">[查看详情]</router-link>
                        </div>
                        <div class="del" @click="delItem(index)">
                            <img src="@/assets/img/del.png" alt="">
                        </div>
                    </div>
                </div>
    
                <div class="boxs">
                    <router-link to="/applyAdd" class="item add">
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
                    Management: [
                        {
                            id: 1,
                            num: "金玉停车场"
    
                        },
                        {
                            id: 2,
                            num: "金玉停车场"
    
                        },
                        {
                            id: 3,
                            num: "金玉停车场"
    
                        }
                    ]
                }
            },
            methods: {
                delItem(index) {
                   
                    MessageBox.confirm('你确认删除吗？').then(action => {
                        Toast({
                            message: '删除成功',
    
                            iconClass: 'icon icon-success'
                        });
                        this.Management.splice(index,1);
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
            flex: 5;
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