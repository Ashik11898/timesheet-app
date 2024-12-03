import './App.css'
import LoginForm from './pages/Login'
import RegisterForm from './pages/RegisterForm'
import TimeSheetTable from './pages/TimeSheetPage'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import ProtectedRoutes from './components/routes/ProctectedRoutes'
import AuthProvider from "./context/AuthContext"

function App() {


  const router = createBrowserRouter(
    [
      {
        path:"/",
        element:(<LoginForm/>)
      },
      {
        path:"/registerPage",
        element:(<RegisterForm/>)
      },
      {
        path:"/timesheetPage",
        element:(<ProtectedRoutes><TimeSheetTable/></ProtectedRoutes>)
      }
    ]
  )


  return (
    <div>
      <AuthProvider> 
        <RouterProvider router={router}/>
      </AuthProvider> 
    </div>
  )
}

export default App
