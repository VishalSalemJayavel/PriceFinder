import React from "react-dom/client";
import ReactDOM  from "react-dom/client";
import axios from 'axios';
import App from "./App";
import './index.css';

import {LoginPage, SignUp, Product, SingleProduct} from './pages';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Logout from "./pages/logout/Logout";

  axios.defaults.baseURL = 'http://localhost:8000/';

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
    },
    {
      path: "logout/",
      element: <Logout />,
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />
);