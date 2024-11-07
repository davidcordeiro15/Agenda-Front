import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './Pages/Home'
import PageNotFound from './Pages/PageNotFound'
import Day from './Pages/Day.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {index: true, element: <Home></Home>},
      {path: '*', element:<PageNotFound/>},
      {path: '/day/:id', element:<Day />}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
