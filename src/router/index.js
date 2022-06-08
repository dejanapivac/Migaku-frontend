import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Map from "../views/Map.vue";
import Account from "../views/Account.vue";
import Login from "../views/authentication/Login.vue";
import Registration from "../views/authentication/Registration.vue";
import Profile from "../views/profile/Profile.vue";
import Reviews from "../views/profile/Reviews.vue";
import Posts from "../views/profile/Posts.vue";
import Deeds from "../views/profile/Deeds.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    children: [
      {
        alias: "",
        path: "reviews",
        name: "Reviews",
        component: Reviews,
      },
      {
        path: "posts",
        name: "Posts",
        component: Posts,
      },
      {
        path: "deeds",
        name: "Deeds",
        component: Deeds,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
