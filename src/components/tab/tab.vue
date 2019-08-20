<template>
        <div class="tab" v-show="$route.meta.navShow">
            <ul>
                <router-link to="/index" tag="li">
                    <i class="ico-index"></i>
                    <span>首页</span>
                </router-link>
                <router-link to="/user" tag="li">
                    <i class="ico-user"></i>
                        <span>我的</span>
                </router-link>
    
            </ul>
        </div>
    </template>
    
    <script>
        export default {
            date() {
                return {
                }
            },
            mounted() {
                setTimeout(() => {
                }, 20)
            }
    
        }
    </script>
    
    <style scoped>
        
        .tab ul {
    
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 100%;
            height: 3.5rem;
            line-height: 3.5rem;
            font-size: 1.1rem;
            position: fixed;
            background: #fff;
            bottom: 0;
            border-top: 1px solid #dcdcdc
        }
        .tab ul li {
            flex: 1;
      
        }
    
        i {
          display: block;
          width: 1.5rem;
          height: 1.3125rem;
          margin: 10px auto 0;
          background-size: cover;
         background-repeat: no-repeat;
       
        }
        i.ico-index{
            background-image: url('./index-icon.png') ;
        }
        i.ico-user{
            background-image: url('./user-icon.png') ;
        }
        span {
          display: block;
          font-size: 0.625rem;
          line-height: 0.625rem;
          margin-top: .5rem
        }
        li.router-link-active {
            color: #1daad5;
        }
        li.router-link-active i.ico-index{
            background-image: url('./index-active.png') ;
        }
        li.router-link-active i.ico-user{
            background-image: url('./user-active.png') ;
        }
    </style>