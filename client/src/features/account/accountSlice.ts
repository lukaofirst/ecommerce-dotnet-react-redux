import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { User } from '../../app/models/user';
import { customHistory } from '../../index';
import { setBasket } from '../basket/basketSlice';

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDTO = await agent.Account.login(data);

            const { basket, ...user } = userDTO;

            if (basket) thunkAPI.dispatch(setBasket(basket));

            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/currentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));

        try {
            const userDTO = await agent.Account.currentUser();

            const { basket, ...user } = userDTO;

            if (basket) thunkAPI.dispatch(setBasket(basket));

            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        },
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            customHistory.push('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('item');
            toast.error('Session expired - please login again');
            customHistory.push('/');
        });

        builder.addMatcher(
            isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
            (state, action) => {
                state.user = action.payload;
            }
        );

        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            console.log(action.payload);
        });
    },
});

export const { signOut, setUser } = accountSlice.actions;