import ListAllUsers from "./components/ListAllUsers.vue";
import UserDetail from "./components/UserDetail/UserDetail.vue";

export const routes = [
    { path: "", component: ListAllUsers },
    {
        path: "/user-detail",
        component: UserDetail,
        props: true
    }
];
