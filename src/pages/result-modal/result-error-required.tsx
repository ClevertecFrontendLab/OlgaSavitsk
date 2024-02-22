import { RoutePath } from "@constants/routes.constants";
import { RootState } from "@redux/configure-store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ResultErrorRequired() {
    const error = useSelector(({ authStore }: RootState) => authStore.error)

    if (!error) {
        return <Navigate to={RoutePath.SignUp} replace={true} />
    }
    return <Outlet />
}