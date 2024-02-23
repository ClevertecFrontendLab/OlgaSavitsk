import { RoutePath } from "@constants/index";
import {
    MainPage,
    PageConfig,
    ResultErrorRequired,
    ResultModal,
    SignIn,
    SignUp
} from "@pages/index";
import { Route, Routes } from "react-router-dom";

export const routes = (
    <Routes>
        <Route path='/' element={<PageConfig />} >
            <Route path={RoutePath.SignIn} element={<SignIn />} />
            <Route path={RoutePath.SignUp} element={<SignUp />} />
            <Route element={<ResultErrorRequired />}>
                <Route path='/result/:type' element={<ResultModal />} />
            </Route>
            <Route path={RoutePath.Home} element={<MainPage />} />
        </Route>
    </Routes >
)
