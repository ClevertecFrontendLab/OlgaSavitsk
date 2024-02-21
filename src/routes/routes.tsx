import { RoutePath } from "@constants/index";
import { MainPage, ResultModal, SignUp, UnauthorizedLayout } from "@pages/index";
import { Route, Routes } from "react-router-dom";

export const routes = (
    <Routes>
        <Route element={<UnauthorizedLayout />} >
            <Route path={RoutePath.SignUp} element={<SignUp />} />
            <Route path='/result/:type' element={<ResultModal />} />
        </Route>
        <Route path={RoutePath.Home} element={<MainPage />} />
    </Routes >
)
