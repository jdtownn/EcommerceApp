import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null,
    userInfo: null
}

export const getAllOrderForAdmin = createAsyncThunk('/order/getAllOrderForAdmin ', async() => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/get`)

    return response.data
})

export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin ', async(id) => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/details/${id}`)

    return response.data
})

export const getUserDetailsForAdmin = createAsyncThunk('/order/getUserDetailsForAdmin ', async(userId) => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/details/user/${userId}`)

    return response.data
})

export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus ', async({id,orderStatus}) => {
    const response = await axios.put(`http://localhost:5000/api/admin/orders/update/${id}`, {orderStatus})

    return response.data
})


const adminOrderSlice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        resetOrderDetailsForAdmin: (state,action) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrderForAdmin.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllOrderForAdmin.fulfilled, (state,action) => {
            state.isLoading = false
            state.orderList = action.payload.data
        }).addCase(getAllOrderForAdmin.rejected, (state) => {
            state.isLoading = false
            state.orderList = []
        }).addCase(getOrderDetailsForAdmin.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetailsForAdmin.fulfilled, (state,action) => {
            state.isLoading = false
            state.orderDetails = action.payload.data
        }).addCase(getOrderDetailsForAdmin.rejected, (state) => {
            state.isLoading = false
            state.orderDetails = null
        }).addCase(getUserDetailsForAdmin.pending, (state) => {
            state.isLoading = true
        }).addCase(getUserDetailsForAdmin.fulfilled, (state,action) => {
            state.isLoading = false
            state.userInfo = action.payload.data
        }).addCase(getUserDetailsForAdmin.rejected, (state) => {
            state.isLoading = false
            state.userInfo = null
        })
    }
})

export const {resetOrderDetailsForAdmin} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;