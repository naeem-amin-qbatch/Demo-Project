import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
    "/user/login",
    async (data,{rejectWithValue}) => {
        try  {
            console.log('data in user login in thunk ',data)
            const response = await axios.post("http://localhost:3000/users/login", data)
            // console.log('user login response: ',response.data._id)
            // state.userId = response.data._id
            // console.log('user login response: ',state.userId)

            console.log('user login response.data: ',response.data)
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

export const userSignUp = createAsyncThunk(
    "/user/signup",
    async (data,{rejectWithValue}) => {
        try  {
            console.log('data in user sign up in thunk ',data)
            const response = await axios.post('http://localhost:3000/users/adduser', data)
            console.log('user signup response: ',response)
            console.log('user signup response.data: ',response.data)
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




const user = createSlice({
    name: "user",
    initialState: {
    loading:false,
    err:"",
    userId:"",
    message:"",
    },
    reducers: {},
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [userLogin.fulfilled]: (state, action) => {
            return {
                ...state,
                userId: action.payload._id,
                message: action.payload,
            }
        },
        [userLogin.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                err: action.payload.err,
            };
        },
        [userSignUp.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [userSignUp.fulfilled]: (state, action) => {
            return (
                console.log('userSignup.fulfilled',action.payload),
                // state.loginData.push(action.payload),
                action.payload
            )
        },
        [userSignUp.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                err: action.payload.err,
            };
        },
    }
});

const { reducer } = user;
export default reducer;
