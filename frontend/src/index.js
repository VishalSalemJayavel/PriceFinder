import React from "react";
import ReactDOM  from "react-dom";

import App from "./App";
import './index.css';

import {LoginPage, } from './pages';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "login/",
        element: <LoginPage />,
      },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />
);