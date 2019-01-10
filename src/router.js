import ListAllUsers from "./components/ListAllUsers.vue";
import UserDetail from "./components/UserDetail/UserDetail.vue";
import SearchResult from './components/SearchResult/SearchResult.vue'

export const routes = [
    { path: "", component: ListAllUsers },
    {
        path: "/user/:id",
        component: UserDetail,
        props: true
    },
    {
        path: "/search-result/:user",
        component: SearchResult,
        props: true
    },
    { path: "*", redirect: "/" }
];
