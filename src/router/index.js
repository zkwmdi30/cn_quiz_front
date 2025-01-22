import { createRouter, createWebHistory } from "vue-router";
import WordLayout from "@/layouts/WordLayout.vue";
import MenuLayout from "@/layouts/MenuLayout.vue";

const routes = [
  {
    path: "/",
    component: MenuLayout,
    children: [
      {
        path: "",
        name: "quiz",
        component: () => import("../components/QuizMain.vue"),
      },
    ],
  },
  {
    path: "/word",
    component: WordLayout,
    children: [
      {
        path: "",
        name: "word",
        component: () => import("../components/WordMain.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
