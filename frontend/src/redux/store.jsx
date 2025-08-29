//create redux store
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import getCommunityReducer from './slices/communitySlice'
import visitorReducer from './slices/visitorSlice'

export const store=configureStore({
    reducer:{
        userLoginReducer:userReducer,
        getCommunityReducer:getCommunityReducer,
        visitorReducer:  visitorReducer
    }
})