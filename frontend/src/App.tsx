import './App.css'
import LoginForm from './pages/Login'
import ChatPage from './pages/ChatPage'
import TimeSheetTable from './pages/TimeSheetPage'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import ProtectedRoutes from './components/routes/ProctectedRoutes'
import AuthProvider from "./context/AuthContext"
import StreamPage from './pages/StreamPage'
import Dashboard from './pages/Dashboard'

function App() {


  const router = createBrowserRouter(
    [
      {
        path:"/",
        element:(<LoginForm/>)
      },


      {
        path:"/chatPage",
        element:(<ProtectedRoutes><ChatPage/></ProtectedRoutes>)
      },
      {
        path:"/dashboard",
        element:(<ProtectedRoutes><Dashboard/></ProtectedRoutes>)
      },
      {
        path:"/timesheetPage",
        element:(<ProtectedRoutes><TimeSheetTable/></ProtectedRoutes>)
      },
      {
        path:"/streamPage",
        element:(<ProtectedRoutes><StreamPage/></ProtectedRoutes>)
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
