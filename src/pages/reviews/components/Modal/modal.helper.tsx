import { ReactNode } from 'react'
import { To } from 'react-router-dom'
import { RoutePath } from '@constants/routes.constants'
import { ResultStatusType } from 'antd/lib/result'

type ObjectResult = {
    [key: string]: ModalContext;
}

type ModalContext = {
    status: ResultStatusType,
    title: string,
    buttonText: string,
    subTitle?: ReactNode,
    redirectPath?: To,
    dataId?: string
}

const modal: ObjectResult = {
    'success': {
        status: 'success',
        title: 'Отзыв успешно опубликован',
        buttonText: 'Отлично',
        dataId: 'registration-enter-button'
    },
    'error': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: <p>Что-то пошло не так. Попробуйте ещё раз.</p>,
        buttonText: 'Написать отзыв',
        dataId: 'write-review-not-saved-modal'
    },
    '500': {
        status: '500',
        title: 'Что-то пошло не так',
        subTitle: <p>Произошла ошибка, попробуйте ещё раз.</p>,
        buttonText: 'Назад',
        redirectPath: RoutePath.Home,
    }
}

export const modalContext = new Map(Object.entries(modal))

