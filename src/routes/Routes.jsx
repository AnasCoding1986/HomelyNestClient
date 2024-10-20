import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import DashBoard from '../layouts/DashBoard'
import Statistic from '../pages/Dashboard/Common/Statistic'
import Addroom from '../pages/Dashboard/Host/Addroom'
import Mylistings from '../pages/Dashboard/Host/Mylistings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <RoomDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <DashBoard></DashBoard>,
    children: [
      {
        index: true,
        element: <Statistic></Statistic>,
      },
      {
        path: 'add-room',
        element: <Addroom></Addroom>,
      },
      {
        path: 'my-listings',
        element: <Mylistings></Mylistings>,
      },
    ]

  },
])
