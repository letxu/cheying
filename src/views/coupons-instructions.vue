<template>
        <div>
            <Header text="优惠券使用说明"></Header>
            <div class="wrapper">
                <div class="tab-top">
                    <p>
                        <span>优惠券使用说明</span>
                    </p>
                </div>
        
                <div class="item">
                    <h3>优惠券使用说明</h3>
                    <P>优惠券使用说明</P>
                </div>
            </div>
        </div>
    </template>
    <script>
        import Header from '@/components/header-bar/header-bar';
        export default {
            data() {
                return {
    
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
            padding: 1rem 0;
            background: #fff;
            border-top: 1px solid #eeeeee;
        }
        .item h3{
            width: 90%;
            margin: 0 auto 1rem;
            color: #2b2b2b;
            font-size: 1.07rem;
            text-align: left;
    
        }
        .item p {
            text-align: left;
            width: 90%;
            margin: 0 auto;
            font-size: .9285rem;
            color: #555555;
            line-height: 1.5rem
        }
    </style>