import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/search",
                name: "search",
                meta: {
                    title: '多种条件和组合查询'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/Statistics/NewsSearch.vue")
            },
            {
                path: "/Recommend",
                name: "Recommend",
                meta: {
                    title: '用户浏览推荐新闻'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/Statistics/NewsRecom.vue")
            },
            {
                path: "/lifecycle",
                name: "lifecycle",
                meta: {
                    title: '新闻生命周期查询'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BasicNews/LifeCycle.vue")
            },
            {
                path: "/category",
                name: "category",
                meta: {
                    title: '各类新闻变化情况查询'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BasicNews/Category.vue")
            },
            {
                path: "/interest",
                name: "interest",
                meta: {
                    title: '用户兴趣变化查询'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BasicNews/Interest.vue")
            },
        ]
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;