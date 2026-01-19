import React from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

export const login = createAsyncThunk( 'auth/login', async ( credentials, thunkAPI ) => {
    try {
        const res = await axios.post( 'login', credentials );
        console.log(res.data?.token);
        localStorage.setItem('token', res?.data?.token);
        return res?.data;

    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
} )

export const logout = createAsyncThunk( 'auth/logout', async ( _, thunkAPI ) => {
    try {
        const res = axios.post('logout', {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        localStorage.removeItem('token');
        localStorage.clear();
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
} );

export const getInfo = createAsyncThunk( 'auth/getInfo', async (_, thunkAPI) => {
    try {
        const res = await axios.get('student_info', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(res.data);
        return res?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
} )

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        student: null,
        isloading: false,
        islogin: false,
        error: null,
    },

    extraReducers: ( builder ) => {
        builder
            .addCase( login.pending, ( state ) => {
                state.isloading = true;
                state.islogin = false;
            } )

            .addCase( login.rejected, ( state, action ) => {
                state.isloading = false;
                state.islogin = false;
                state.error = action.payload;
            } )

            .addCase( login.fulfilled, ( state, action ) => {
                state.student = action.payload.student;
                state.isloading = false;
                state.islogin = true;
                state.error = null;
            } )

            .addCase( logout.fulfilled, (state) => {
                state.student = null;
                state.isloading = false;
                state.islogin  = false;
            } )

            .addCase( getInfo.fulfilled, ( state, action ) => {
                state.student = action.payload?.student;
                state.isloading = false;
                state.islogin = true;
            } )

            .addCase( getInfo.rejected, ( state, action ) => {
                state.student = null;
                state.isloading = true;
                state.islogin = false;
            } )
    }
});

export default authSlice.reducer;
