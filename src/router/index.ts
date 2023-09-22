import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import EventBus from '@/utils/eventbus';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index/index.vue"),
  },
  {
    path: "/video",
    name: "video",
    component: () => import("../views/video/index.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(async(to, from,next) => {
//   // ...
//   console.log(to.path,from.path,from.name,'pathhhhhhhhhhhh')
//   if(to.path == '/upload' && from.path == '/' && from.name == 'index'){
//     let res = await EventBus.fire('SHOW_ANI')
//     if(res){
//       next()
//     }else{
//       return false
//     }
//   }else{
//     next()
//     // 返回 false 以取消导航
//   }
// })

export default router;
