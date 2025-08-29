import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommunityThunk = createAsyncThunk("get-community", async (arr, thunkApi) => {
    try {
        const res = await axios.put('http://localhost:4000/com-admin-api/get-community', { arr: arr });
        if (res.data.message !== "Community") {
            return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data.payload;
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const communitySlice = createSlice({
    name: "get-community",
    initialState: {
        isCommunityPending: false,
        communityStatus: false,
        communityArray: [],
        communityErrorOccurred: false,
        communityErrMsg: ''
    },
    reducers: {
        resetCommunityState: (state, action) => {
            state.isCommunityPending = false;
            state.communityArray = [];
            state.communityStatus = false;
            state.communityErrorOccurred = false;
            state.communityErrMsg = ''
        }
    },
    extraReducers: builder => builder
        .addCase(getCommunityThunk.pending, (state, action) => {
            state.isCommunityPending = true;
        })
        .addCase(getCommunityThunk.fulfilled, (state, action) => {
            state.isCommunityPending = false;
            state.communityArray = action.payload;
            state.communityStatus = true;
            state.communityErrMsg = '';
            state.communityErrorOccurred = false;
        })
        .addCase(getCommunityThunk.rejected, (state, action) => {
            state.isCommunityPending = false;
            state.communityArray = [];
            state.communityStatus = false;
            state.communityErrMsg = action.payload;
            state.communityErrorOccurred = true;
        }),
});

export const { resetCommunityState } = communitySlice.actions;
export default communitySlice.reducer;