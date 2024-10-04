import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'

import AdminProductsSlice from './admin/products-slice/index'
import adminOrderSLice from './admin/order-slice/index'

import shoppingProductSlice from './shop/products-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'



const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts: AdminProductsSlice,
        adminOrder: adminOrderSLice,

        shopProducts : shoppingProductSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder: shopOrderSlice,

    }
})

export default store