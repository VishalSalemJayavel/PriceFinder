import axios from 'axios';
import { default as React, default as ReactDOM } from "react-dom/client";
import App from "./App";
import './index.css';
import './interceptors/axios';

import { AllProducts, CustomerSettings, LoginPage, Logout, Product, ProductUpload, RetailerDashboard, RetailerSettings, Settings, SignUp, SingleProduct } from './pages';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "allproducts/",
    element: <AllProducts />,
  },
  {
    path: "productupload/",
    element: <ProductUpload />,
  },
  {
    path: "products/:category/",
    element: <Product />,
  },
  {
    path: "singleproduct/:productId/",
    element: <SingleProduct />,
  },
  {
    path: "logout/",
    element: <Logout />,
  },
  {
    path: "retailersettings/",
    element: <RetailerSettings />,
  },
  {
    path: "settings/",
    element: <Settings />,
  },
  {
    path: "customersettings/",
    element: <CustomerSettings />,
  },
  {
    path: "dashboard/",
    element: <RetailerDashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);