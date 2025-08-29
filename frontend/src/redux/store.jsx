//create redux store
import { configureStore } from '@reduxjs/toolkit';
import getCommunityReducer from './slices/communitySlice';
import userReducer from './slices/userSlice';
import visitorReducer from './slices/visitorSlice';

export const store=configureStore({
    reducer:{
        userLoginReducer:userReducer,
        getCommunityReducer:getCommunityReducer,
        visitorReducer:  visitorReducer
    }
})