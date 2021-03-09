import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import Facebook from "./components/socialMedia/Facebook.vue";
import Twitter from "./components/socialMedia/Twitter.vue";
import VueMeta from "vue-meta";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
Vue.config.productionTip = false;
Vue.component("facebook", Facebook);
Vue.component("twitter", Twitter);
Vue.use(VueMeta);
const firebaseConfig = {
    apiKey: process.env.CATS_FIREBASE_API_KEY,
    authDomain: process.env.CATS_FB_AUTH_DOMAIN,
    projectId: process.env.CATS_FB_PROJECT_ID,
    storageBucket: process.env.CATS_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.CATS_FB_MESSAGE_SENDER_ID,
    appId: process.env.CATS_FB_APPID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount("#app");
