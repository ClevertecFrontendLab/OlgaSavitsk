import { RoutePath } from "@constants/routes.constants"
import { ResultStatusType } from "antd/lib/result"
import { ReactNode } from "react"
import { To } from "react-router-dom"

type ObjectResult = {
    [key: string]: ModalContext;
}

type ModalContext = {
    status: ResultStatusType,
    title: string,
    subTitle?: ReactNode,
    buttonText: string,
    redirectPath: To,
    dataId?: string
}

const modal: ObjectResult = {
    'success': {
        status: "success",
        title: "Отзыв успешно опубликован",
        buttonText: 'Отлично',
        redirectPath: RoutePath.Feedbacks,
        dataId: 'registration-enter-button'
    },
    'error': {
        status: "error",
        title: "Данные не сохранились",
        subTitle: <p>Что-то пошло не так. Попробуйте ещё раз.</p>,
        buttonText: 'Написать отзыв',
        redirectPath: RoutePath.Feedbacks,
        dataId: 'write-review-not-saved-modal'
    },
    '500': {
        status: "500",
        title: "Что-то пошло не так",
        subTitle: <p>Произошла ошибка, попробуйте ещё раз.</p>,
        buttonText: 'Назад',
        redirectPath: RoutePath.Home,
        dataId: 'check-back-button'
    }
}

export const modalContext = new Map(Object.entries(modal))

