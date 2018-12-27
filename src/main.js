import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { routes } from "./router.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faFingerprint,
    faUser,
    faIdCard,
    faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFingerprint, faUser, faIdCard, faCalendarCheck);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history"
});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
