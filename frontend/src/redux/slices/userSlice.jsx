import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLoginThunk = createAsyncThunk("user-login", async (userCredObj, thunkApi) => {
    try {
        const res = await axios.post(
            "http://localhost:4000/user-api/login",
            userCredObj
        );
        if (res.data.message === "Login successful") {
            localStorage.setItem("token", res.data.token);
        } else {
            return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data.payload;
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const userSlice = createSlice({
    name: "user-login",
    initialState: {
        isUserPending: false,
        userLoginStatus: false,
        currentUser: {},
        userErrorOccurred: false,
        userErrMsg: ''
    },
    reducers: {
        resetUserState: (state, action) => {
            state.isUserPending = false;
            state.currentUser = {};
            state.userLoginStatus = false;
            state.userErrorOccurred = false;
            state.userErrMsg = ''
        }
    },
    extraReducers: builder => builder
        .addCase(userLoginThunk.pending, (state, action) => {
            state.isUserPending = true;
        })
        .addCase(userLoginThunk.fulfilled, (state, action) => {
            state.isUserPending = false;
            state.currentUser = action.payload;
            state.userLoginStatus = true;
            state.userErrMsg = '';
            state.userErrorOccurred = false;
        })
        .addCase(userLoginThunk.rejected, (state, action) => {
            state.isUserPending = false;
            state.currentUser = {};
            state.userLoginStatus = false;
            state.userErrMsg = action.payload;
            state.userErrorOccurred = true;
        }),
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;