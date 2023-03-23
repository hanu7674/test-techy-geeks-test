import React from "react";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AutoVerifier from "../AutoVerifier";
import ErrorPage from "../Error";
import Home from "../Home";
import ManualVerifier from "../ManualVerifier";
import ManualVerifierView from "../ManualVerifier/View";
import Videos from "../Videos";


const router = createBrowserRouter([
    {
      path: "/api",
      element: <Home/>,
      errorElement: <ErrorPage/>
    },
    {
        path: "/api/error-page",
        element: <ErrorPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/api/auto-verifier",
        element: <AutoVerifier/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/api/manual-verifier",
        element: <ManualVerifier/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/api/manual-verifier/view",
        element: <ManualVerifierView/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/api/videos",
        element: <Videos/>,
        errorElement: <ErrorPage/>
      },
  ]);

const Routes = () => {

    return(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    )
}

export default Routes;