<template>
        <div>
            <Header text="申请添加"></Header>
            <div class="wrapper">
                <div class="tab-top">
                    <p>
                        <span>申请添加</span>
                    </p>
                </div>
                <div class="item">
                    <div class="c-code">
                        <span>*</span>停车场名称
                    </div>
                    <div class="c-pnone">
                        <input type="text"  placeholder="请输入停车场名称">
                    </div>
                </div>
                <div class="item">
                    <div class="c-code">
                        免费时长
                    </div>
                    <div class="c-pnone">
                        <input type="text"  placeholder="请输入免费时长">
                    </div>
                </div>
    
                <div class="item">
                    <div class="c-code">
                        营业时长
                    </div>
                    <div class="c-pnone">
                        <input type="text"  placeholder="请输入营业时长">
                    </div>
                </div>
                <div class="item">
                        <div class="c-code">
                            <span>*</span>停车场地址
                        </div>
                        <div class="c-pnone">
                            <input type="text" >
                        </div>
                    </div>
                <div class="item long">
                    <div class="c-code">
                        24小时封顶收费
                    </div>
                    <div class="c-pnone">
                        <input type="text" placeholder="请输入时长">
                    </div>
                </div>
                <div class="item long">
                    <div class="c-code">
                        停车场总停车位
                    </div>
                    <div class="c-pnone">
                        <input type="text" placeholder="请输入总停车位">
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
                   
                }
            },
            methods: {
                next() {
                    Toast({
                            message: '提交成功',
                            iconClass: 'icon icon-success'
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
        .c-code span{
            color: #eb0202
        }
        .c-pnone {
            text-align: left;
            flex: 3
        }
        .long .c-code {
            flex: 1
        }
        .long .c-pnone {
            flex: 2
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