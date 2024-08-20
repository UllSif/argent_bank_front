import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
}

export const fetchUserData = createAsyncThunk(
    'profile/getUserData',
    async (token) => {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/profile',
            headers: { Authorization: `Bearer ${token}` },
        })
        console.log(res.data.body)
        return res.data.body
    }
)

export const updateUserData = createAsyncThunk(
    'profile/updateUserData',
    async (data) => {
        const res = await axios({
            method: 'put',
            url: 'http://localhost:3001/api/v1/user/profile',
            headers: { Authorization: `Bearer ${data.token}` },
            data: data.userNames,
        })

        return res.data.body
    }
)

export const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        emptyUserData(state) {
            state.email = ''
            state.firstName = ''
            state.lastName = ''
            state.id = ''
            state.createdAt = ''
            state.updatedAt = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                state.email = payload.email
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.id = payload.id
                state.createdAt = payload.createdAt
                state.updatedAt = payload.updatedAt
            })
            .addCase(updateUserData.fulfilled, (state, { payload }) => {
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.updatedAt = payload.updatedAt
            })
    },
})

// selectors
export const getUserData = (state) => state

//actions
export const { emptyUserData } = profileSlice.actions

//reducers
export const profileReducer = profileSlice.reducer