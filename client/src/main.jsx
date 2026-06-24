import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import About from "./Components/About.jsx";
import Home from "./Components/Home.jsx";
import "./index.css";

import ContactUs from "./Components/ContactUs.jsx";

import HowToApply from "./Components/HowToApply.jsx"
import Gallery from "./Components/Gallery.jsx";

import Weoffer from "./Components/WeOffer.jsx";
import OurProduct from "./Components/OurProduct.jsx";
import Opportunities from "./Components/Opportunities.jsx";
import Collaboration from "./Components/Collaboration.jsx";
import Services from "./Components/Services.jsx";
import CollaborationForm from "./admin/CollaborationForm.jsx";
import Register from "./admin/Register.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import OpportunityForm from "./admin/OpportunityForm.jsx";
import AdminGallery from "./admin/AdminGallery.jsx";
import AdminCollaboration from "./admin/AdminCollaboration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/weoffer",
        element: <Weoffer />
      },
      {
        path: "/gallery",
        element: <Gallery />
      },


      {
        path: "/services",
        element: <Services />
      },
      {
        path: "/howtoapply",
        element: <HowToApply />
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/collaboration",
        element: <Collaboration />,
      },
      {
        path: "/opportunities",
        element: <Opportunities />,
      },

      {
        path: "/ourproducts",
        element: <OurProduct />,
      },
      {
        path: "/collaborationform",

        element: <ProtectedRoute>
          <CollaborationForm />,
        </ProtectedRoute>
      },

      {
        path: "/opportunityform",
        element: <ProtectedRoute>
          <OpportunityForm />,
        </ProtectedRoute>
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/admin-dashboard",
        element: <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>,
      },
      {
        path: "/admin-gallery",
        element: <ProtectedRoute>
          <AdminGallery />
        </ProtectedRoute>,
      },
      {
        path: "/admin-collaboration",
        element: <ProtectedRoute>
          <AdminCollaboration />
        </ProtectedRoute>,
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
