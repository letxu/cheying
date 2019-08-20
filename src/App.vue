<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
    <tab></tab>
  </div>
</template>

<script>
  import Tab from '@/components/tab/tab';
  export default {
    name: 'app',
    data() {
      return {

      };
    },
    // created() {
    //   //在页面加载时读取sessionStorage里的状态信息
    //   if (sessionStorage.getItem("store")) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    //   }
    //   //在页面刷新时将vuex里的信息保存到sessionStorage里
    //   window.addEventListener("beforeunload", () => {
    //     sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    //   })
    // },
    components: {
      Tab
    }
  };

</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow-x: none;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    background: #f3f3f3;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  #app::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .wrapper {
    margin-top: 42px;
  }

  input {
    outline: none;
    -webkit-appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>