import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueMeta from "vue-meta";

Vue.use(VueRouter);
Vue.use(VueMeta);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/contact",
        name: "Contact",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/*webpackChunkName: "contact"*/ "../views/Contact.vue"),
    },
    {
        path: "/privacypolicy",
        name: "PrivacyPolicy",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /*webpackChunkName: "privacypolicy"*/ "../views/PrivacyPolicy.vue"
            ),
    },
    {
        path: "/blog",
        name: "BlogPage",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/*webpackChunkName: "blogpage"*/ "../views/Blog.vue"),
    },
    {
        path: "/appz",
        name: "Appz",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/*webpackChunkName: "appz"*/ "../views/Appz.vue"),
    },
    {
        path: "/weatherapp",
        name: "Weatherapp",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /*webpackChunkName: "weatherapp"*/ "../components/appz/WeatherApp.vue"
            ),
    },
    {
        path: "*",
        name: "Error",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/*webpackChunkName: "error"*/ "../views/Error404.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
