import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';

import { UserResponse } from '../types';

export const selectUser = createSelector(
    (state: RootState) => state.userStore.user as UserResponse,
    (state: RootState) => state.userStore.progress,
    (user, progress) => ({ user, progress }),
);

export const selectUserState = () => UseMemmoisedSelector(selectUser);
