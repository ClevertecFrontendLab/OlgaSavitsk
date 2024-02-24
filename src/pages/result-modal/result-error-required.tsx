import { RoutePath } from "@constants/routes.constants";
import { RootState } from "@redux/configure-store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ResultErrorRequired() {
    const statusCode = useSelector(({ authStore }: RootState) => authStore.statusCode)

    if (!statusCode) {
        return <Navigate to={RoutePath.SignUp} replace={true} />
    }
    return <Outlet />
}