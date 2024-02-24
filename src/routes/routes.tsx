import { Route, Routes } from "react-router-dom";
import { RoutePath } from "@constants/index";
import { MainLayout } from "@pages/Page-config/main-layout";
import { UnauthorizedLayout } from "@pages/Page-config/unauthorized-layout";
import {
    MainPage,
    PageConfig,
    ResultErrorRequired,
    ResultModal,
    SignIn,
    SignUp
} from "@pages/index";


export const routes = (
    <Routes>
        <Route path='/' element={<PageConfig />} >
            <Route element={<UnauthorizedLayout />} >
                <Route index path={RoutePath.SignIn} element={<SignIn />} />
                <Route path={RoutePath.SignUp} element={<SignUp />} />
                <Route element={<ResultErrorRequired />}>
                    <Route path='/result/:type' element={<ResultModal />} />
                </Route>
            </Route>
            <Route element={<MainLayout />} >
                <Route index path={RoutePath.Home} element={<MainPage />}
                />
            </Route>
        </Route>
    </Routes >
)
