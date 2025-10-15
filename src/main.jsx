import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './appstore/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import Middelboard from './features/middelboard';
import Todolisttodos from './features/todolist';
import Boardtodos from './features/board';
import Login from './features/Login.jsx';
import Signup from './features/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
      path: "/",
      element:<Middelboard></Middelboard>,
      children:[

        {
        path:'/' ,
        element:<Boardtodos></Boardtodos> 
        }
        ,
        {
        path:'/todos/:id' ,
        element:<Todolisttodos></Todolisttodos> ,
        // children:[
        //   {
        //     path:'/todos/:id',
        //     element: <Donetodos></Donetodos>
        //     }
        // ]
        },
        
      ]
      
    }
  ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/signup",
    element: <Signup/>
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
