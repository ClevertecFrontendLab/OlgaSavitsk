import { RoutePath } from "@constants/index";
import { MainPage, SignUp, UnauthorizedLayout } from "@pages/index";
import { Route, Routes } from "react-router-dom";

export const routes = (
    <Routes>
        <Route element={<UnauthorizedLayout />} >
            <Route path={RoutePath.SignUp} element={<SignUp />} />
        </Route>
        <Route path='/main' element={<MainPage />} />
    </Routes >
)
