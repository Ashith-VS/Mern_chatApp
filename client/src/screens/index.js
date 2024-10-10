import { lazy } from "react"
// import Login from "./Auth/Login"
// import Register from "./Auth/Register"
// import Home from "./Home"

const Login = lazy(() => import('./Auth/Login'))
const Register = lazy(() => import('./Auth/Register'))
const Home = lazy(() => import('./Home'))

export {
    Login,
    Register,
    Home
}