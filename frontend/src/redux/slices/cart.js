import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk(
    "/cart/addToCart",
    async ({ product, user_id }, { rejectWithValue }) => {
        try {
            console.log('user_id in addtocart thunk', user_id)
            console.log('product in addtocart thunk', product)
            product = product._id;
            console.log(" product = product._id: ", product)
            const response = axios.post("http://localhost:3000/cart/add-to-cart", { user_id, product })
            console.log("addtocart api response: ", response)
            console.log('addtocart api response: response.data: ', response.data)
            return response.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);

export const showCart = createAsyncThunk(
    "/cart/showCart",
    async (user_id, { rejectWithValue }) => {
        try {
            console.log('userid in showcart thunk', user_id)
            let { data } = await axios.get(`http://localhost:3000/cart/${user_id}`)
            console.log('data in showCart thunk: ',data);
            return data;

        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    err: err.response.data,
                    status: err.response.status,
                });
            } else {
                return rejectWithValue({
                    err: "Network Error",
                });
            }
        }
    }
);


const initialState = {
    cart: [],
    productId: '',
    cartData: []
}
const cart = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {},
        setProductId(state, action) {
            state.productId = action.payload;
        },
        increment(state) {
            state.quantity += 1;
        },
        decrement(state) {
            if (state.quantity <= 0)
                state.quantity = 0;
            else
                state.quantity -= 1;
        },
    },
)

export const { setProductId, increment, decrement } = cart.actions;
export default cart.reducer;
