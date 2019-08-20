<template>
    <div>
        <div class="wrapper">
            <Header text="停车缴费"></Header>
            <mt-radio title="" v-model="value" :options="options">
            </mt-radio>
            <div class="attention">
                <p class="title">注意事项</p>
                <p>1、车牌号付费仅适用于车牌识别的停车场；</p>
                <p>2、临牌、特殊车牌及车牌识别有误的车辆，临牌、特殊车牌及车牌识别有误的车辆；</p>
                <p>3、临牌、特殊车牌及车牌识别有误的车辆；</p>
            </div>
        </div>
        <mt-button size="large" class="r" @click="next">去缴费</mt-button>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';

    export default {
        data() {
            return {
                value: "",
                // radio的选项
                options: []
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
                ).then(function (res) {
                    // console.log(res.data.data)
                    console.log(this.options.value)
                        // this.options=res.data.data.number
                        for(var i=0;i<res.data.data.length;i++){
                        
                            // this.options[i].label=res.data.data[i].number
                            this.options[i].value=res.data.data[i].id
                        }
                    
                          
                    }.bind(this)).catch(function (error) {
                        console.log(error);
                    });
            },
            next: function () {
                console.log(this.value)
            }

        },

        components: {
            Header
        }
    }
</script>
<style scoped> 
    .wrapper>>>.mint-radiolist-label {
        display: flex
    }

    .wrapper>>>.mint-radio {
        flex: 1;
        line-height: 48px;
        text-align: left
    }

    .mint-cell-wrapper .mint-cell-title {
        flex: none
    }
    .wrapper>>>.mint-cell-wrapper{
        background-image: none
    }
    /* .wrapper>>>.mint-radio-core{} */

    .wrapper>>>.mint-radio-label {
        flex: 8;
        text-align: left;
        padding-left: 3rem;
        letter-spacing: .2rem
    }

    .wrapper>>>.mint-cell {
        margin-top: 1rem
    }

    .wrapper>>>.mint-radio-label {
        height: 48px;
        line-height: 48px;
        background: #fff;
        border-radius: .5rem
    }

    .wrapper>>>.mint-radiolist {
        position: relative;
        top: 1rem
    }

    .wrapper>>>.mint-cell {
        background: none
    }

    .attention {
        width: 94%;
        margin: 5rem auto 0;
        font-size: 1rem;
        color: #b9b9b9
    }

    .attention .title {
        position: relative;
        text-align: center;
    }

    .attention .title::before {
        position: absolute;
        top: .5rem;
        right: 0;
        content: "";
        width: 9rem;
        height: 1px;
        background: #b9b9b9
    }

    .attention .title::after {
        position: absolute;
        top: .5rem;
        left: 0;
        content: "";
        width: 9rem;
        height: 1px;
        background: #b9b9b9
    }

    .attention p {
        text-align: left;
        margin-top: 2rem;
        line-height: 1.5rem
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