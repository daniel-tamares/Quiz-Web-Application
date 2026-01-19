import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ( {children} ) => {
    const { islogin } = useSelector( (state) => state?.auth )
    console.log(islogin);
    return islogin ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute;
