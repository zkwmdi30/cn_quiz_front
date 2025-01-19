import { createRouter, createWebHistory } from "vue-router";
import QuizLayout from "@/layouts/QuizLayout.vue";
import MenuLayout from "@/layouts/MenuLayout.vue";

const routes = [
  {
    path: "/",
    component: QuizLayout,
    children: [
      {
        path: "",
        name: "quiz",
        component: () => import("../components/QuizMain.vue"),
      },
    ],
  },
  {
    path: "/about",
    component: MenuLayout,
    children: [
      {
        path: "",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
