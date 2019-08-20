<template>
    <div>
        <div class="user-bg">
            <div class="header-p">
                <router-link :to="{path:'changePic'}" tag="a">
                    <img :src="avatar" />
                </router-link>

            </div>
            <div class="information">
                <p class="name">{{userInfo.nickname}}</p>
                <p class="lv">
                    <span>普通会员</span>
                </p>
            </div>
            <div class="Setup " @click="Setup" v-if="show">
                <img src="@/assets/img/Setup.png" alt="">
            </div>
            <div class="Setup " @click="Setup1" v-if="!show">
                <img src="@/assets/img/u-back.png" alt="">
            </div>
        </div>
        <div class="box">
            <ul v-if="show">
                <router-link :to="item.url" tag="li" v-for="item in boxList" :key="item.id">
                    <i>
                        <img :src="item.img" alt="">
                    </i>
                    <p>{{item.title}}</p>
                </router-link>
            </ul>

            <ul v-if="!show">
                <router-link :to="{path:'changeName'}" tag="li">
                    <i>
                        <img src="@/assets/img/icon9.png" alt="">
                    </i>
                    <p>修改昵称</p>
                </router-link>
                <router-link :to="{path:'changePic'}" tag="li">
                    <i>
                        <img src="@/assets/img/icon10.png" alt="">
                    </i>
                    <p>更改头像</p>
                </router-link>
                <router-link :to="{path:'changePassword'}" tag="li">
                    <i>
                        <img src="@/assets/img/icon11.png" alt="">
                    </i>
                    <p>修改密码</p>
                </router-link>
                <router-link :to="{path:'changePhone'}" tag="li">
                    <i>
                        <img src="@/assets/img/icon11.png" alt="">
                    </i>
                    <p>更换手机号</p>
                </router-link>
            </ul>

        </div>
        <div @click="loginOut" class="loginOut" v-if="!show">
            退出登录
        </div>
    </div>
</template>
<script>
    import headerImg from "@/assets/img/user.jpg";
    import img1 from "@/assets/img/icon1.png";
    import img2 from "@/assets/img/icon2.png";
    import img3 from "@/assets/img/icon3.png";
    import img4 from "@/assets/img/icon4.png";
    import img5 from "@/assets/img/icon5.png";
    import img6 from "@/assets/img/icon6.png";
    import img7 from "@/assets/img/icon7.png";
    import img8 from "@/assets/img/icon8.png";
    import { MessageBox } from 'mint-ui';
    import { Actionsheet } from 'mint-ui';
    export default {
        data() {
            return {
                show: true,
                avatar: headerImg,
                userInfo: [],
                boxList: [
                    {
                        id: 1,
                        img: img1,
                        url: "/UserInformation",
                        title: "车主信息"
                    },
                    {
                        id: 2,
                        img: img2,
                        url: "/Coupons",
                        title: "我的卡券"
                    },
                    {
                        id: 3,
                        img: img3,
                        url: "/BillDetail",
                        title: "账单信息"
                    },
                    {
                        id: 4,
                        img: img4,
                        url: "/Management",
                        title: "车牌照管理"
                    },
                    {
                        id: 5,
                        img: img5,
                        url: "/AboutMe",
                        title: "关于我们"
                    },
                    {
                        id: 6,
                        img: img6,
                        url: "",
                        title: "联系我们"
                    },
                    {
                        id: 7,
                        img: img7,
                        url: "/Apply",
                        title: "入驻申请"
                    },
                    {
                        id: 8,
                        img: img8,
                        url: "/Instructions",
                        title: "平台使用说明"
                    }
                ]

            }
        },

        mounted() {
            this.getuseronfo()
        },
        methods: {
            Setup: function () {
                this.show = false;
                console.log({ navShow: false })
                meta: { navShow: false }
            },
            Setup1: function () {
                this.show = true;
                meta: { navShow: true }
            },
            loginOut: function () {
                MessageBox.confirm('确定退出登录?').then(action => {

                    this.$router.push({ path: "/login" });
                    return this.$store.getters.currentUser
                });
            },

            getuseronfo() {
                console.log(this.avatar)
                console.log(headerImg)

                if (this.avatar === headerImg) {
                    var params = new URLSearchParams();

                    this.$axios.post(domain.baseUrl + '/my/get-user-info.html?token=' + sessionStorage.getItem('userToken'),
                        params,
                        {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }
                    )
                        .then(function (res) {
                            this.userInfo = res.data.data
                            if (res.data.data.avatar == "") {
                                this.avatar = headerImg
                            } else {
                                this.$store.commit("setAvatar", domain.baseUrl + res.data.data.avatar)
                                this.$store.commit("setNumber", res.data.data.account_number)
                
                                this.$store.commit("setNickname", res.data.data.nickname)
                                this.avatar = this.$store.state.avatar
                                this.nickname = this.$store.state.nickname
                            }
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        })
                } else {
                    return false
                }

            }
        },
        comments: {

        }
    }
</script>
<style scoped>
    .user-bg {
        width: 100%;
        height: 9.9375rem;
        display: flex;
        background: url(../assets/img/user-bg.jpg);
        background-size: cover;
    }

    .user-bg .header-p img {
        width: 5.34375rem;
        height: 5.34375rem;
        margin-top: 2.2rem;
        border-radius: 50%;
        background: #fff;
        margin-left: .5rem
    }

    .information {
        flex: 2
    }

    .information .name {
        margin-top: 3.5rem;
        font-size: 1.125rem;
        color: #fefefe;
        text-align: left;
        margin-left: .6rem;
    }

    .header-p {
        flex: 1
    }

    .Setup {
        flex: 1
    }

    .lv {
        text-align: left;
        width: 5.25rem;
        height: 1.4375rem;
        line-height: 1.4375rem;
        background: url(../assets/img/vip-bg.png) no-repeat;
        background-size: cover;
        margin-top: 1rem;
        margin-left: .6rem;

        color: #fff;
        text-align: right;

    }

    .lv span {
        padding-right: .5rem;
        font-size: .76875rem;
    }

    .Setup img {
        width: 4.875rem;
        height: 2.156rem;
        margin-top: 3.6rem;
    }

    .box {
        width: 100%;
        background: #fff;
    }

    .box ul {
        width: 95%;
        display: inline-block;
        margin: 1rem auto;
    }

    .box ul li {
        width: 25%;
        float: left;
        margin-top: 1rem;
        margin-bottom: 1rem;
        position: relative;
    }

    .box ul li input {
        width: 100%;
        position: absolute;
        opacity: 0;
        height: 100%;
        top: 0;
        left: 0;
    }

    .box li i {
        display: inline-block;
        width: 1.625rem;
        height: 1.625rem;
        margin-bottom: .5rem
    }

    .box li i img {
        width: 100%;
        height: 100%
    }

    .box li p {
        color: #6c6c6c;
        font-size: .75rem;
        margin-top: .2rem;
    }

    .loginOut {
        width: 15rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        border-radius: .5rem;
        background: #1daad5;
        color: #fff;
        margin: 3rem auto 0;
    }
</style>