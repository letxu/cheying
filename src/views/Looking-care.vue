<template>
    <div>
        <Header text="寻找车辆"></Header>
        <div class="img" ref="height"></div>
    </div>
</template>
<script>
    import Header from '@/components/header-bar/header-bar';

    export default {
        data() {
            return {
                clientHeight:'',
            }
        },
        mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods:{
      changeFixed(clientHeight){                        //动态修改样式
        console.log(clientHeight);
        this.$refs.height.style.height = clientHeight+'px';

      }
    },
        components:{
            Header
        }
    }
</script>
<style  scoped>
    .img{
        width: 100%;
        height: 100%;
        background: url(../assets/img/ing.png) no-repeat center;
        background-size: cover;
    }
</style>