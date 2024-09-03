import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const loginInitialState = {
    credentials: '',
    token: '',
    connected: false,
    status: 'idle',
    error: null,
}

const userInitialState = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
}

const BASE_URL = 'http://localhost:3001/api/v1/user';

export const getUserToken = createAsyncThunk(
    'auth/getUserToken',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await axios.post(BASE_URL + "/login", credentials)

            return response.data
        } catch (error) {
            return rejectWithValue(error.code)
        }
    }
);

export const fetchUserData = createAsyncThunk(
    'profile/getUserData',
    async (token, {rejectWithValue}) => {
        try {
            const res = await axios({
                method: 'post',
                url: BASE_URL + '/profile',
                headers: {Authorization: `Bearer ${token}`},
            })
            return res.data.body
        } catch (error) {
            return rejectWithValue(error.code)
        }
    }
)

export const updateUserData = createAsyncThunk(
    'profile/updateUserData',
    async (data, {rejectWithValue}) => {
        try {
            const res = await axios({
                method: 'put',
                url: BASE_URL + '/profile',
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                },
                data: data.userName,
            })
            return res.data.body
        } catch (error) {
            return rejectWithValue(error.code)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: loginInitialState,
    reducers: {
        logout(state) {
            state.credentials = ''
            state.token = ''
            state.connected = false
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserToken.pending, (state) => {
                state.status = 'loading'
                state.connected = false
            })
            .addCase(getUserToken.fulfilled, (state, {payload}) => {
                state.status = 'succeeded';
                state.token = payload.body.token;
                state.connected = true;
            })
            .addCase(getUserToken.rejected, (state, action) => {
                state.status = 'failed'
                state.connected = false

                if (action.payload === 'ERR_NETWORK') {
                    state.error = 'Network Error'
                } else if (action.payload === 'ERR_BAD_REQUEST') {
                    state.error = ' Invalid Username or Password'
                }
            })
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        emptyUserData(state) {
            state.email = ''
            state.firstName = ''
            state.lastName = ''
            state.userName = ''
            state.id = ''
            state.createdAt = ''
            state.updatedAt = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, {payload}) => {
                state.email = payload.email;
                state.firstName = payload.firstName;
                state.lastName = payload.lastName;
                state.userName = payload.userName;
                state.id = payload.id;
                state.createdAt = payload.createdAt;
                state.updatedAt = payload.updatedAt;
            })
            .addCase(updateUserData.fulfilled, (state, {payload}) => {
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.userName = payload.userName
                state.updatedAt = payload.updatedAt
            })
    },
})

// selectors
export const getAuthStatus = (state) => state.auth.status
export const getAuthConnected = (state) => state.auth.connected
export const getAuthError = (state) => state.auth.error
export const getAuthToken = (state) => state.auth.token
export const getUserData = (state) => state?.user

//actions
export const {logout} = authSlice.actions
export const {emptyUserData} = userSlice.actions

//reducers
export const authReducer = authSlice.reducer
export const userReducer = userSlice.reducer
