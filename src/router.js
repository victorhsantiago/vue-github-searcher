import App from "./App.vue";
import UserDetail from "./components/UserDetail/UserDetail.vue";

export const routes = [
    { path: "", component: App },
    {
        path: "/user-detail",
        component: UserDetail
    }
];
