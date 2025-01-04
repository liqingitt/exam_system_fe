import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: '/', redirect: '/prod/formList' },
    {
      path: "/prod",
      component: "@/layouts/ProdLayout",
      routes: [
        { path: "/prod", redirect: "/prod/formList" },
        { path: "/prod/formList", component: "FormList" },
       
      ]
    },
    { path: "/form/edit/:formId", component: "FormEdit" },
    { path: "/form/enter/:formId", component: "FormEnter" },
  ],
  npmClient: 'npm',
});
