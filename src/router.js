import { createRouter, createWebHashHistory } from "vue-router";
import Main from '../src/pages/home/Home.vue'
import Favourite from '../src/pages/favourite/Favourite.vue'
import Profile from "./pages/profile/Profile.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: Main},
        {path: '/favourite', component: Favourite},
        {path: '/profile', component: Profile},
    ]
})