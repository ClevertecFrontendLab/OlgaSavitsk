import { RoutePath } from "@constants/index";
import { MainPage, ResultErrorRequired, ResultModal, SignUp, UnauthorizedLayout } from "@pages/index";
import { Route, Routes } from "react-router-dom";

export const routes = (
    <Routes>
        <Route path='/' element={<UnauthorizedLayout />} >
            <Route index /* path={RoutePath.SignUp} */ element={<SignUp />} />
            <Route element={<ResultErrorRequired/>}>
                <Route path='/result/:type' element={<ResultModal />} />
            </Route>
        </Route>
        <Route path={RoutePath.Home} element={<MainPage />} />
    </Routes >
)
