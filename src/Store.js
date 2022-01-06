import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { themeMiddleware } from './slices/themeSlice'
import cartReducer, { cartMiddleware } from './slices/cartSlice'
import orderHistoryReducer, { orderHistoryMiddleware } from './slices/orderHistorySlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        cart: cartReducer,
        orderHistory: orderHistoryReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(themeMiddleware, cartMiddleware, orderHistoryMiddleware)
})