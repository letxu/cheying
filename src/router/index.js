import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Index'
import user from '@/views/User'
import list from '@/views/CartList'
import CartDetail from '@/views/CartDetail'
import GoodsDetail from '@/views/GoodsDetail'
import LookingCare from '@/views/Looking-care'
import Parking from '@/views/Parking-payment'
import service from '@/views/service'
import applyAdd from '@/views/apply-add'
import spelling from '@/views/spelling'
import changePhone from '@/views/change-phone'
import changePhone1 from '@/views/change-phone1'
import changePic from '@/views/change-pic'
import changeName from '@/views/change-name'
import changePassword from '@/views/change-password'
import UserInformation from '@/views/user-information'
import Coupons from '@/views/coupons'
import Bill from '@/views/Bill'
import Management from '@/views/Management'
import AboutMe from '@/views/AboutMe'
import ContactUs from '@/views/ContactUs'
import Apply from '@/views/Apply'
import Instructions from '@/views/Instructions'
import BillDetail from '@/views/bill-detail'
import couponsDetail from '@/views/coupons-detail'
import addCar from '@/views/addCar'
import search from '@/views/search'
import review from '@/views/review'
import near from '@/views/near'
import driving from '@/views/driving'
import idCart from '@/views/idCart'
import carInformation from '@/views/carInformation'
import addList from '@/views/addList'
import parkingDetail from '@/views/parkingDetail'
import forgotPassword from '@/views/forgot-password'
import register from '@/views/register'
import login from '@/views/login'
import couponsInstruction from '@/views/coupons-instructions'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/index',
      component: index,
      meta: { navShow: true }
    },
    {
      path: '/list',
      component: list,
    },
    {
      path: '/LookingCare',
      component: LookingCare,
    },
    {
      path: '/Parking',
      component: Parking,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/service',
      component: service,
    },
    {
      path: '/applyAdd',
      component: applyAdd,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/spelling',
      component: spelling,
    },
    {
      path: '/GoodsDetail',
      component: GoodsDetail,

    },
    {
      path: '/CartDetail',
      component: CartDetail,

    },
    {
      path: '/user',
      component: user,
      meta: { navShow: true, requireAuth: true },

    },
    {
      path: '/changePhone',
      // name:changePhone,
      component: changePhone

    },  
     {
      path: '/changePhone1',
      // name:changePhone,
      component: changePhone1

    },
    {
      path: '/changeName',
      // name:  changeName,
      component: changeName

    },
    {
      path: '/changePic',
      // name:  changeName,
      component: changePic
    
    },
    {
      path: '/changePassword',
      // name:  changePassword,
      component: changePassword
    },

    {
      path: '/UserInformation',
      // name:  UserInformation,
      component: UserInformation
    },
    {
      path: '/couponsInstruction',
      // name:  Coupons,
      component: couponsInstruction
    },

    {
      path: '/Coupons',
      // name:  Coupons,
      component: Coupons
    },
    {
      path: '/Bill',
      // name:  Bill,
      component: Bill
    },
    {
      path: '/Management',
      // name:  Management,
      component: Management
    },
    {
      path: '/AboutMe',
      // name:  AboutMe,
      component: AboutMe
    },
    {
      path: '/ContactUs',
      // name:  ContactUs,
      component: ContactUs
    },

    {
      path: '/Apply',
      // name:  Apply,
      component: Apply
    },
    {
      path: '/Instructions',
      // name:  Instructions,
      component: Instructions
    },
    {
      path: '/BillDetail',
      // name:  BillDetail,
      component: BillDetail
    }
    ,
    {
      path: '/couponsDetail',
      // name:  couponsDetail,
      component: couponsDetail
    }
    ,
    {
      path: '/addCar',
      // name:  addCar,
      component: addCar
    }
    ,
    {
      path: '/search',
      // name:  search,
      component: search
    },
    {
      path: '/review',
      // name:  review,
      component: review
    },
    {
      path: '/near',
      // name:  near,
      component: near
    },
    {
      path: '/driving',
      // name:  driving,
      component: driving
    },
    {
      path: '/idCart',
      // name:  idCart,
      component: idCart
    },
    {
      path: '/carInformation',
      component: carInformation
    },
    {
      path: '/addList',
      component: addList
    }, {
      path: '/parkingDetail',
      component: parkingDetail

    }, {
      path: '/forgotPassword',
      component: forgotPassword
    }, {
      path: '/register',
      component: register
    }, {
      path: '/login',
      component: login
    }

  ]
})
router.beforeEach((to, from, next) => {
let token = sessionStorage.getItem('userToken')
if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  if (token) { // 通过vuex state获取当前的token是否存在
    next();
  }
  else {
    next({
      path: '/login',
      // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
}
else {
  next();
}
});



export default router
