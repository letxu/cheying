<template>
    <div>
        <Header text="驾驶证信息"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>驾驶证信息</span>
                </p>
            </div>

            <div class="add-cart">
                <p>驾驶证正面</p>
                <div class="idcard_con">

                    <input id="excel-upload-input1" type="file" @change="changeImage($event)" ref="avatarInput">

                    <p class="add-icon" @click="failClick(1)">
                        <img src="@/assets/img/add.png" alt="">
                    </p>
                </div>
                <p>驾驶证反面</p>
                <div class="idcard_con">

                    <input id="excel-upload-input2" type="file" @change="pushImg($event,index)">
                    <p class="add-icon" @click="failClick(2)">
                        <img src="@/assets/img/add.png" alt="">
                    </p>
                </div>

            </div>
        </div>
        <mt-button size="large" class="r" @click="next">保存</mt-button>
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
                avatar:""
            }
        },
        methods: {
            pushImg() {

            },
            changeImage(e) {
                console.log(e)
                var file = e.target.files[0]
                var reader = new FileReader()
                var that = this
                reader.readAsDataURL(file)
                reader.onload = function (e) {
                    that.avatar = this.result
                }
            },
            failClick(item) {
                let id = 'excel-upload-input' + item
                document.getElementById(id).click()

            },
            next() {
                console.log(1)

                var names = this.names;
                if (!names) {//未输入手机号
                    MessageBox('提示', '请输入昵称');
                    return;
                } else {
                    Toast({
                        message: '修改成功',
                        iconClass: 'icon icon-success'
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
    .wrapper {
        margin-bottom: 41px;
    }

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
        height: 2.125rem;
        line-height: 2.125rem;
        background: #1daad5;
        color: #fff;
        margin-top: .5rem;
        font-size: .9375rem;
        text-align: left;
    }

    .item .title {
        width: 90%;
        margin: 0 auto
    }

    .add-cart {
        width: 100%;
        text-align: center;
        padding-bottom: 1rem;
    }

    .add-cart p {
        width: 90%;
        margin: 0 auto;
        text-align: left;
        padding: 1rem 0;
    }

    .add-cart input {
        width: 90%;
        background: none;
        margin: 0 auto;
        outline: none;
        height: 10rem;
        border: 1px solid #dedede;
        opacity: 0;
    }

    .idcard_con {
        position: relative;
        width: 90%;
        left: 5%;
        border: 1px solid #dedede;
    }

    .idcard_con .add-icon {
        position: absolute;
        left: 5%;
        text-align: center;
        top: 2rem
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