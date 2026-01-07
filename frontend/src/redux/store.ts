import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import dealsReducer from './dealsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    deals: dealsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
