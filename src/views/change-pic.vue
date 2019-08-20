<template>
    <div>
        <Header text="更改头像"></Header>
        <div class="wrapper">
            <div class="tab-top">
                <p>
                    <span>更改头像</span>
                </p>
            </div>
            <div class="item">

                <div class="c-pnone">

                    <div class="img" @click="uploadHeadImg">
                        <img :src="avatars" />
                    </div>
                    <div class="change-pic">
                        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
                        <p>编辑头像</p>
                    </div>
                </div>
            </div>
        </div>
        <mt-button size="large" class="r" @click="next">保存</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';
    import headerImg from "@/assets/img/user.jpg";
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                avatars: headerImg,
                avatar: ""
            }
        },
        mounted() {
            this.getuseronfo()

        },
        methods: {
            // 将头像显示
            getuseronfo() {
                console.log(this.$store.state.avatar)
                if (this.$store.state.avatar == headerImg) {
                    this.avatars = headerImg
                  
                } else {
                    this.avatars=this.$store.state.avatar
                }
            },
            handleFile: function (e) {
                let $target = e.target || e.srcElement
                let file = $target.files[0]
                var reader = new FileReader()
                reader.onload = (data) => {
                    let res = data.target || data.srcElement
                    this.avatars = res.result
                }
                reader.readAsDataURL(file)
                this.avatar = file
            },
            uploadHeadImg: function () {
                this.$el.querySelector('.hiddenInput').click()
            },
            next() {
                var avatar = this.avatar;
                var params = new FormData();
                params.append('avatar', avatar);
                this.$axios.post(domain.baseUrl + '/my/dispose-img.html?token=' + sessionStorage.getItem('userToken'),
                    params,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                )
                    .then(function (res) {
                        console.log(res.data.data)
                        
                        var param = new URLSearchParams();
                        param.append('avatar', String(res.data.data));
                        this.$axios.post(domain.baseUrl + '/my/update-user-info.html?token=' + sessionStorage.getItem('userToken'),
                            param,
                            {
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                            }
                        )
                            .then(function (res) {
                                this.$store.commit("setAvatar",domain.baseUrl + res.data.data.avatar)
                                this.avatar = this.$store.state.avatar
                                MessageBox('提示', res.data.message).then(action => {
                                    if (action == 'confirzm') {     //确认的回调
                                        this.$router.back(-1)
                                    }
                                })
                            }.bind(this))
                            .catch(function (error) {
                                console.log(error);
                            });
                    }.bind(this))
                    .catch(function (error) {
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
        /* background: #fff; */
        margin-top: .5rem;

    }

    .change-pic {
        position: relative;
    }

    .change-pic p {
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center
    }

    .c-pnone {
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }

    .c-pnone .img {
        text-align: center;
        margin: 3rem auto .5rem;
        width: 12rem;
        height: 12rem;
        background: #fff;

    }

    .c-pnone .img img {
        width: 12rem;
        height: 12rem;
    }

    .c-pnone input {
        outline: none;
        font-size: .9375rem;
        width: 12rem;
        opacity: 0;
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