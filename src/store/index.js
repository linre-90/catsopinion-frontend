import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        blogActive: false,
        page: [
            {
                name: "home",
                active: true,
                headerText: "The only opinion cat owners need!",
            },
            {
                name: "contact",
                active: false,
                headerText: "Hit us with messages!",
            },
            {
                name: "appz",
                active: false,
                headerText: "The appz zone, play with the apps!",
            },
            {
                name: "privacypolicy",
                active: false,
                headerText: "This is privacy policy we believe!",
            },
        ],
        bannerOk: false,
    },
    mutations: {
        changeActivePage(state, pageName) {
            state.page.forEach((page) => {
                if (page.name === pageName) {
                    page.active = true;
                } else {
                    page.active = false;
                }
            });
        },
        toggleBlog(state, displayStatus) {
            state.blogActive = displayStatus;
        },
        cookieOk(state) {
            state.bannerOk = true;
        },
    },
    actions: {
        changeActivePage(context, pageName) {
            context.commit("changeActivePage", pageName);
        },
        toggleBlog(context, displayStatus) {
            context.commit("toggleBlog", displayStatus);
        },
        cookieOk(context) {
            context.commit("cookieOk");
        },
    },
    modules: {},
});
