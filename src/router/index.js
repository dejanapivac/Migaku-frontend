import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/authentication/Login.vue";
import Registration from "../views/authentication/Registration.vue";
import Profile from "../views/profile/Profile.vue";
import Reviews from "../views/profile/Reviews.vue";
import Posts from "../views/profile/Posts.vue";
import Deeds from "../views/profile/Deeds.vue";
import { Auth } from "@/services/userService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    children: [
      {
        alias: "",
        path: "reviews",
        name: "Reviews",
        component: Reviews
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/registration"];
  const loginNeeded = !publicPages.includes(to.path);
  const user = Auth.getUser();

  if (loginNeeded && !user) {
    next("/login");
    return;
  }

  next();
});

export default router;
