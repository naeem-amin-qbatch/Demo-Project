import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
    "/products/getAllProducts",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('http://localhost:3000/products/all')
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


const products = createSlice({
    name: "products",
    initialState: {
    loading:false,
    err:"",
    allProducts:[]
    },
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [getAllProducts.fulfilled]: (state, action) => {
            return (
                console.log(action.payload),
                state.allProducts.push(action.payload)
            )
        },
        [getAllProducts.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                err: action.payload.err,
            };
        },
    }
});

const { reducer } = products;


export default reducer;
