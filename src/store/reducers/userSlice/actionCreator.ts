import {
	EmailType,
	signInWithEmailAndPassWord,
	signOut,
	signUpCredentials,
	signUpWithEmailAndPassWord,
} from '../../../api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signInEmailProviderAction = createAsyncThunk(
	'user/sign-in-email-provider',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue, fulfillWithValue }
	) => {
		try {
			const res = await signInWithEmailAndPassWord(
				email as EmailType,
				password
			);
			if (res) {
				return fulfillWithValue(res);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const signUpEmailProviderAction = createAsyncThunk(
	'user/sign-up-email-provider',
	async (cred: signUpCredentials, { rejectWithValue, fulfillWithValue }) => {
		try {
			const res = await signUpWithEmailAndPassWord(cred);
			if (res) {
				return fulfillWithValue(res);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const signOutAction = createAsyncThunk(
	'user/sign-out',
	async (_, { rejectWithValue, fulfillWithValue }) => {
		try {
			await signOut();
			return fulfillWithValue(true);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);