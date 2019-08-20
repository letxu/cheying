<template>
        <div>
            <Header text="使用明细"></Header>
            <div class="wrapper">
                <div class="tab-top">
                    <p>
                        <span>使用明细</span>
                    </p>
                </div>
                <div class="item" v-for="(item,index) in BillDetail " :key="item.id">
                    <div class="left">
                        <p class="name">{{item.name}}</p>
                        <p>{{item.num}}</p>
                        <p class="timer">{{item.timer}}</p>
                    </div>
                    <div class="right">
                        <p>金额：
                            <span>{{item.price}}</span>元</p>
                    </div>
    
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
                    names: "来自猩猩的你",
                    BillDetail: [
                        {
                            id: 1,
                            name: "金元停车场",
                            num: "[ 浙A394DJ ]",
                            timer: "2018-01-01   18:24~20:00",
                            price: 20
                        },
                        {
                            id: 2,
                            name: "金元停车场",
                            num: "[ 浙A394DJ ]",
                            timer: "2018-01-01   18:24~20:00",
                            price: 20
                        },
                        {
                            id: 3,
                            name: "金元停车场",
                            num: "[ 浙A394DJ ]",
                            timer: "2018-01-01   18:24~20:00",
                            price: 20
                        },
                    ]
                }
            },
            methods: {
    
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
            height: 7.457rem;
            line-height: 7.457rem;
            background: #fff;
            display: flex;
            border-bottom: 1px solid #eeeeee;
        }
    
        .item .left {
            flex: 2
        }
    
        .item .left p {
            line-height: 1.5rem;
            text-align: left;
            padding-left: 5%;
            color: #333333;
            font-size: .7857rem;
            margin-top: .8rem
        }
    
        .item .left p.name {
            font-size: 1.0714rem
        }
    
        .item .left p.timer {
            color: #999999;
    
        }
    
        .item .right p {
            color: #333333;
            font-size: .857rem
        }
    
        .item .right {
            flex: 1
        }
    
        .item .right p {
            padding-right: 2.5%;
            line-height: 12rem;
        }
    
        .item .right p span {
            font-size: 1.214rem;
    
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