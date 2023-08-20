import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from '../components/layout/Main';
import Landing from '../components/layout/Landing';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';



export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main> </Main>,
        children: [
            {
                path:'/',
                element:<Landing/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
           
        ]
            
        
    }
    // {
    //     path: '/login',
    //     element:<Login></Login>
    // },
    // {
    //     path: '/register',
    //     element:<Register></Register>
    // },
    // {
    //     path: '/spinner',
    //     element:<Spinner></Spinner>
    // },
    // {
    //     path: '*',
    //     element: <NotFound></NotFound>

    // }
   
        
   
])