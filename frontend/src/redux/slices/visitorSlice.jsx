import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const visitorThunk = createAsyncThunk("visitor-data", async (username, thunkApi) => {
    try {
        const res = await axios.get(
            `http://localhost:4000/user-api/visitor/${username}`
        );
        return res.data.payload;
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const visitorSlice = createSlice({
    name: "visitor-data",
    initialState: {
        isVisitorPending: false,
        visitorStatus: false,
        currentVisitor: [],
        visitorErrorOccurred: false,
        visitorErrMsg: ''
    },
    reducers: {
        resetVisitorState: (state, action) => {
            state.isVisitorPending = false;
            state.currentVisitor = [];
            state.visitorStatus = false;
            state.visitorErrorOccurred = false;
            state.visitorErrMsg = ''
        }
    },
    extraReducers: builder => builder
        .addCase(visitorThunk.pending, (state, action) => {
            state.isVisitorPending = true;
        })
        .addCase(visitorThunk.fulfilled, (state, action) => {
            state.isVisitorPending = false;
            state.currentVisitor = action.payload.visitor;
            console.log(action.payload.visitor);
            state.visitorStatus = true;
            state.visitorErrMsg = '';
            state.visitorErrorOccurred = false;
        })
        .addCase(visitorThunk.rejected, (state, action) => {
            state.isVisitorPending = false;
            state.currentVisitor = [];
            state.visitorStatus = false;
            state.visitorErrMsg = action.payload;
            state.visitorErrorOccurred = true;
        }),
});

export const { resetVisitorState } = visitorSlice.actions;
export default visitorSlice.reducer;