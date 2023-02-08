// import { lazy } from "react";
import React from 'react'
import { Navigate } from 'react-router-dom'
import Admin from "../pages/admin";
import Login from "../pages/login";
import Home from "../pages/home";
import Category from "../pages/category";
import Product from "../pages/product";
import Role from "../pages/role";
import User from "../pages/user";
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import Charts from '../pages/charts'
import Order from '../pages/order'
import Addgoods from '../pages/category/addgoods/addgoods.jsx'
// const Login=lazy(()=>{"../pages/login"})
const router = [
    {
        path: "/",
        element: <Admin />,
        children: [
            {
                path: '/',
                element:<Navigate to={"/home"}/>
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/category',
                element: <Category />,
                children: [{
                    path: 'addgoods',
                    element: <Addgoods />
                }]
            },
            {
                path: '/product',
                element: <Product />
            },
            {
                path: '/role',
                element: <Role />
            },
            {
                path: '/user',
                element: <User />
            },
            {
                path: '/order',
                element: <Order />
            },
            {
                path: '/charts',
                element: <Charts />,
                children: [{

                    path: 'bar',
                    element: <Bar />


                },
                {
                    path: 'line',
                    element: <Line />
                },
                {
                    path: 'pie',
                    element: <Pie />
                },
                {
                    path: '',
                    element:<Navigate to={"pie"}/>
                },
                ]
            },
        ]


    },
    {
        path: '/login',
        element: <Login />
    },


]

export default router
