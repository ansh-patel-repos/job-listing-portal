import { createBrowserRouter, RouterProvider } from "react-router-dom" 
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { ErrorPage } from "./pages/ErrorPage"

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Registration/>,
    errorElement: <ErrorPage />
  },
  
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorPage/>
  }
])

const App = () => {
  return <RouterProvider router={Router}></RouterProvider>
}

export default App;