<template>
    <div>
        <Header text="添加车辆"></Header>
        <div class="wrapper">
            <div class="addcar">
                <div class="a-container">
                    <h3>请添加真实有效的车牌号码</h3>
                    <div class="input-box">

                        <div class="name" style="z-index: 2" @click="cphInputClick">
                            <span :class="{active: (activeIndex-1)==index}" v-for="(item,index) in cph">{{item}}</span>
                            <img src="@/assets/img/san.png" alt="">
                        </div>
                        <div class="input">
                            <input type="text" v-model="cartCode" placeholder="请输入完整信息">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <mt-button size="large" class="r" @click="next">确认添加</mt-button>
        <div class="license-plate ">

            <transition name="slide">
                <div class="keyboard-wrap" @click="clickBoard" v-show="show_keyboard">

                    <div>
                        <div class="keyboard" v-show="show_keyboard">
                            <span v-for="item in provice" @click="cphInputClick">{{ item }}</span>
                        </div>

                    </div>

                </div>
            </transition>
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
                cartCode: "",
                provice: ["京", "津", "沪", "渝", "翼", "豫", "云", "辽", "黑", "湘", "皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘", "晋", "蒙", "陕", "吉", "闵", "贵", "粤", "青", "藏", "川", "宁", "琼"],
                proviceActive: "浙",
                cph: [],
                show_keyboard: false
            }
        },
        methods: {

            clickBoard: function (e) {
                if (e.target.tagName.toLowerCase() == 'span') {
                    if (e.target.className.indexOf('k') == -1) {
                        console.log(e.target.className.indexOf('k'))
                        this.cph.splice(0, 1, e.target.textContent)
                        this.proviceActive = this.cph[0]
                    }
                    if (e.target.className == 'k-del') {
                        this.cph.pop()
                    }
                    if (e.target.className == 'k-done') {
                        // this.setPlateNumber(this.cph)
                        this.cphInputClick()
                        this.$emit('plate-number', this.cph)
                    }
                }
            },
            cphInputClick: function () {
                console.log(this.show_keyboard)
                console.log(this.activeIndex)
                this.show_keyboard = !this.show_keyboard
            },
            next() {

                var reg = /^(京[A-HJ-NPQY]|沪[A-HJ-N]|津[A-HJ-NPQR]|渝[A-DFGHN]|冀[A-HJRST]|晋[A-FHJ-M]|蒙[A-HJKLM]|辽[A-HJ-NP]|吉[A-HJK]|黑[A-HJ-NPR]|苏[A-HJ-N]|浙[A-HJKL]|皖[A-HJ-NP-S]|闽[A-HJK]|赣[A-HJKLMS]|鲁[A-HJ-NP-SUVWY]|豫[A-HJ-NP-SU]|鄂[A-HJ-NP-S]|湘[A-HJ-NSU]|粤[A-HJ-NP-Y]|桂[A-HJ-NPR]|琼[A-F]|川[A-HJ-MQ-Z]|贵[A-HJ]|云[AC-HJ-NP-SV]|藏[A-HJ]|陕[A-HJKV]|甘[A-HJ-NP]|青[A-H]|宁[A-E]|新[A-HJ-NP-S])([0-9A-HJ-NP-Z]{4}[0-9A-HJ-NP-Z挂试]|[0-9]{4}学|[A-D0-9][0-9]{3}警|[DF][0-9A-HJ-NP-Z][0-9]{4}|[0-9]{5}[DF])$|^WJ[京沪津渝冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云藏陕甘青宁新]?[0-9]{4}[0-9JBXTHSD]$|^(V[A-GKMORTV]|K[A-HJ-NORUZ]|H[A-GLOR]|[BCGJLNS][A-DKMNORVY]|G[JS])[0-9]{5}$|^[0-9]{6}使$|^([沪粤川渝辽云桂鄂湘陕藏黑]A|闽D|鲁B|蒙[AEH])[0-9]{4}领$|^粤Z[0-9A-HJ-NP-Z][0-9]{3}[港澳]$/
                var cartCode = this.cartCode;
                var allCode = this.proviceActive + cartCode
                console.log(allCode)
                if (!cartCode) {
                    MessageBox('提示', '请输入您的车牌号')
                    return;
                };
                if (!reg.test(allCode)) {
                    MessageBox('提示', '请输入正确的车牌号')
                } else {
                    var params = new URLSearchParams();
                    params.append('number', allCode);
                    this.$axios.post(domain.baseUrl+'/car-license/add.html?token='+sessionStorage.getItem('userToken'),
                        params,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    )
                        .then(function (res) {
                            if (res.data.status == 10000) {
                                MessageBox('提示', res.data.message).then(action => {
                                    if (action == 'confirm') {     //确认的回调
                                        this.$router.back(-1)
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
        computed: {
            activeIndex: function () {
                return this.cph.length
            }
        },
        components: {
            Header
        }
    }
</script>
<style scoped>
    .addcar {
        background: #fff
    }

    .a-container {
        width: 94%;
        margin: 0 auto;
        padding-bottom: 4rem;
    }

    .a-container h3 {
        padding: 3rem 0;
        font-size: 1rem;
        color: #999
    }

    .a-container .input-box {
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        border: 1px solid #1daad5;
        display: flex
    }

    .a-container .input-box .name {
        flex: 1;
        position: relative;
    }

    .a-container .input-box .name img {
        width: .5625rem;
        height: .5rem;
        position: absolute;
        right: .5rem;
        top: 1.2rem;
    }

    .a-container .input-box .name span {
        width: 100%;
    }

    .a-container .input-box .input {
        flex: 5;
        text-align: left;

    }

    .a-container .input-box .input input {
        padding-left: 1rem;
        border-left: 1px solid #b2b2b2;
        outline: none;
    }

    .a-container .input-box input::-webkit-input-placeholder {
        color: #b2b2b2;
    }

    .r {
        position: fixed;
        bottom: 0;
        background: #1daad5;
        border-radius: 0;
        color: #fff;
        font-size: .9375rem
    }

    .license-plate .cph-wrap {
        display: flex;
        justify-content: flex-start;
        font-size: 18px;
        line-height: 55px;
        min-height: 55px;
        position: absolute;
        left: 15px;
        right: 15px;
        top: 15px;
    }

    .license-plate .cph-wrap-shadow {
        box-shadow: 0 1px 8px rgba(92, 169, 214, .43);
        background: #f7f7f7;
        z-index: 0;
    }

    .license-plate .cph-wrap span {
        text-align: center;
        position: relative;
        width: 14.28571%;
    }

    .license-plate .cph-wrap-shadow span::before {
        content: '';
        display: block;
        height: 30px;
        width: 1px;
        background: #83d4ff;
        position: absolute;
        top: 0;
        margin-top: 13px;
        right: 0;
        box-shadow: 0 0 5px rgba(92, 169, 214, .43);
    }

    .license-plate .cph-wrap span:last-child::before {
        content: none;
    }

    .license-plate .cph-wrap .active {
        border-bottom: 3px solid #007AFF;
        background: #fff;
        width: 14%;
    }

    .license-plate .keyboard-wrap {
        background: #CFD3DD;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .license-plate .keyboard {
        display: flex;
        text-align: left;
        flex-flow: row wrap;
        position: relative;
        padding: 10px 2px 0;
    }

    .license-plate .keyboard span {
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 2px #666;
        width: calc(10% - 4px);
        text-align: center;
        height: 46px;
        line-height: 46px;
        margin: 0 2px 8px;
    }

    .license-plate .keyboard>div {
        display: flex;
    }

    .license-plate .keyboard .k-del {
        /* background: #ABB1BD url(../img/x-mark.svg) no-repeat center center; */
        width: 40px;
        position: absolute;
        right: 2px;
        display: block;

    }

    .license-plate .keyboard .k-del img {
        display: block;
        margin: 9px auto;
    }

    .license-plate .keyboard .k-done {
        width: 72px;
        background: #007AFF;
        color: #fff;
    }

    .license-plate .slide-enter-active,
    .slide-leave-active {
        transition: all .3s;
        opacity: 1;
        transform: translateY(0);
    }

    .license-plate .slide-enter,
    .slide-leave-to
    /* .fade-leave-active below version 2.1.8 */

        {
        opacity: 0;
        transform: translateY(400px);
    }
</style>