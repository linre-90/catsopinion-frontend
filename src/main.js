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
    apiKey: "AIzaSyCY97dR9vOGwFO5rAxE5Jq77I9axVh3mNE",
    authDomain: "catsopinion-backend.firebaseapp.com",
    projectId: "catsopinion-backend",
    storageBucket: "catsopinion-backend.appspot.com",
    messagingSenderId: "135107342022",
    appId: "1:135107342022:web:b401193290d53fcfbc31c7",
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
