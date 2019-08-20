<!-- 顶部栏 组件 -->

    <template>
        <div class="header-bar">
          <i class="icon-arrow_lift" @click="back"></i>
          <h1>{{text}}</h1>
        </div>
      </template>
      
      <script>
      export default {
        components: {},
        date() {
                return {}
            },
        props: {
          text: {
            type: String,
        
          }
        },
        watch: {},
        methods: {
          back () {
            this.$router.back(-1)
          }
        },
        filters: {},
        computed: {},
        created () {},
        mounted () {}
      }
      </script>
      
      <style scoped>
 
      
      .header-bar {
        position: fixed;
        top: 0;
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #fff;
        text-align: center;
    
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        z-index: 10;
      }
      .header-bar i {
          width: 9.5px;
          height: 17px;
        background: url(./back.png) no-repeat;
        background-size: cover;
          display: block;
          float: left;
          margin: 12px 0 0 15px;
        }
        .header-bar h1 {
          display: inline-block;
          line-height: 44px;
          font-size: 15px;
          color: #333;
          margin-left: -15px;
        }
     
      </style>
      