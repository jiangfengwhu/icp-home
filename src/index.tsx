import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./App";
import AppShowcase from "./components/AppShowcase";
import AboutMe from "./components/AboutMe";
import PrivacyPolicy from "./components/PrivacyPolicy";
import "./i18n/i18n";

// 创建路由配置
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AppShowcase />,
      },
      {
        path: "/about",
        element: <AboutMe />,
      },
      {
        path: "/:id/privacy_policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
