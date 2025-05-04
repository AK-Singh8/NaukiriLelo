// eslint-disable-next-line no-unused-vars
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Jobs from "./components/shared/Jobs"
import Browse from "./components/shared/Browse"
import Profile from "./components/shared/Profile"
import JobDesc from "./components/shared/JobDesc"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"

const appRouter=createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDesc/>
  },
  {
    path: '/browse',
    element:<Browse/>
  },
  {
    path: '/profile',
    element:<Profile/>
  },
  {
    path: '/admin/companies',
    element:<Companies/>
  },
  {
    path: '/admin/companies/create',
    element:<CompanyCreate/>
  },
  {
    path: '/admin/companies/:id',
    element:<CompanySetup/>
  },
  {
    path: '/admin/jobs',
    element:<AdminJobs/>
  },
  {
    path: '/admin/jobs/create',
    element:<PostJob/>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element:<Applicants/>
  },
])
function App() {
  return (
    <><RouterProvider router={appRouter}/></>
  )
}

export default App
