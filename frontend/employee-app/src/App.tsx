
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { CreateEmployee, } from './pages/create.employee/CreateEmployee'
// import Login from './pages/login/Login'
import NotFound from './pages/notfound/Notfound';
import { HomeLayout } from './containers/home.layout/HomeLayout';
import { EmployeeListContainer } from './pages/employee.list/EmployeeListContainer';
import { EmployeeDetails } from './pages/employee.details/EmployeeDetails';
import { EditEmployee } from './pages/edit.employee/EditEmployee';
import { lazy, Suspense } from 'react';
import EmployeeProfile from './pages/profile.employee/EmployeeProfile';
import Loader from './components/Loader/Loader';

const LazyLoginComponent = lazy(() => import ('./pages/login/Login'));

const isLoggedIn = () => {
  const token = localStorage.getItem("token")
  console.log("token in isLoggedIn", token)
  if (token) return true
  return false
}

const ProtectedRouteRoleChecker =  ({children}: {children: React.ReactNode}) => {
  const payloadString = localStorage.getItem("access-payload")
  if(!payloadString) return null
  const payload = JSON.parse(payloadString)
  
  if(payload.role === "ADMIN" || payload.role === "HR") return children;
  return <Navigate to="/login"/>
}

const PublicRouteChecker =  ({children}: {children: React.ReactNode}) => {
  const loggedIn = isLoggedIn();
  
  if(loggedIn) return <NotFound/>;
  return children
}

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Navigate to="/employees" />,
  },
  {
    path: "/login",
    element:
    <PublicRouteChecker>
      <Suspense fallback= {<Loader/>} >
         <LazyLoginComponent />
      </Suspense>
    </PublicRouteChecker>
  },    
  { 
    path: "/employees",
    element: <HomeLayout/>,
    children: [
      { index: true, element: <EmployeeListContainer />},
      { path: "create", element: <ProtectedRouteRoleChecker><CreateEmployee/></ProtectedRouteRoleChecker>},
      { path: "details/:id", element: <EmployeeDetails/>},
      { path: "edit/:id", element: <ProtectedRouteRoleChecker><EditEmployee/></ProtectedRouteRoleChecker>},
      { path: "profile", element: <EmployeeProfile/>}
    ],
    errorElement:<NotFound />

  },
  {
    path: '*',
    element: <NotFound />
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
