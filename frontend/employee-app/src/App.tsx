
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { CreateEmployee, } from './pages/create.employee/CreateEmployee'
import { Login } from './pages/login/Login'
import NotFound from './pages/notfound/Notfound';
import { HomeLayout } from './containers/home.layout/HomeLayout';
import { EmployeeListContainer } from './pages/employee.list/EmployeeListContainer';
import { EmployeeDetails } from './pages/employee.details/EmployeeDetails';

const isLoggedIn = () => {
  const token = localStorage.getItem("isLoggedIn")
  return token === "true";
}

// const ProtectedRouteChecker =  ({children}: {children: React.ReactNode}) => {
//   const loggedIn = isLoggedIn();
  
//   if(loggedIn) return children;
//   return <Navigate to="/login"/>
// }

const PublicRouteChecker =  ({children}: {children: React.ReactNode}) => {
  const loggedIn = isLoggedIn();
  
  if(loggedIn) return <Navigate to="/"/>;
  return children
}

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Navigate to="/employees" />,
  },
  {
    path: "/login",
    element: <PublicRouteChecker> <Login /> </PublicRouteChecker> ,
  },
  {
    path: "/employees",
    element: <HomeLayout/>,
    children: [
      { index: true, element: <EmployeeListContainer />},
      { path: "create", element: <CreateEmployee />},
      { path: "details/:id", element: <EmployeeDetails/>}
    ]

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
      {/* <Login /> */}
      {/* <CreateEmployeePage/>  */}
    </>
  )
}

export default App
