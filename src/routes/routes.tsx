import { RoutePath } from "@constants/index";
import {
    CalendarPage,
    ConfirmConfig,
    MainPage,
    PageConfig,
    ResultErrorRequired,
    ResultModal,
    ReviewsPage,
    SignIn,
    SignUp,
} from "@pages/index";
import { MainLayout } from "@pages/Page-config/main-layout/main-layout-page";
import { UnauthorizedLayout } from "@pages/Page-config/unauthorized-layout";
import { Route, Routes } from "react-router-dom";


export const routes = (
    <Routes>
        <Route path='/' element={<PageConfig />} >
            <Route element={<UnauthorizedLayout />} >
                <Route index path={RoutePath.SignIn} element={<SignIn />} />
                <Route path={RoutePath.SignUp} element={<SignUp />} />
                <Route index path='/auth/:type' element={<ConfirmConfig />} />
                <Route element={<ResultErrorRequired />}>
                    <Route path='/result/:type' element={<ResultModal />} />
                </Route>
            </Route>
            <Route element={<MainLayout />}>
                <Route index path={RoutePath.Home} element={<MainPage />} />
                <Route path={RoutePath.Feedbacks} element={<ReviewsPage />} />
                <Route path={RoutePath.Calendar} element={<CalendarPage />} />
            </Route>
        </Route>
    </Routes >
)
