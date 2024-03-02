import { RoutePath } from "@constants/routes.constants";
import { selectAuthStatusCode } from "@redux/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function ResultErrorRequired() {
    const statusCode = selectAuthStatusCode()

    if (!statusCode) {
        return <Navigate to={RoutePath.SignUp} replace={true} />
    }
    return <Outlet />
}