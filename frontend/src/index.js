import React from "react-dom/client";
import ReactDOM  from "react-dom/client";

import App from "./App";
import './index.css';

import {LoginPage, SignUp, Product, SingleProduct} from './pages';
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
    {
      path: "signup/",
      element: <SignUp />,
    },
    {
      path: "products/",
      element: <Product />,
    },
    {
      path: "singleproduct/",
      element: <SingleProduct />,
    }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />
);