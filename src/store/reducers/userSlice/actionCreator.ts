import {
	EmailType,
	signInWithEmailAndPassWord,
	signUpWithEmailAndPassWord,
} from "../../../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInEmailProviderAction = createAsyncThunk(
	"user/sign-in-email-provider",
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
	"user/sign-up-email-provider",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue, fulfillWithValue }
	) => {
		try {
			const res = await signUpWithEmailAndPassWord(
				email as EmailType,
				password
			);
			if (res.data.user) {
				return fulfillWithValue({
					id: res.data.user.id,
					email: res.data.user.email,
					email_confirmed: res.data.user.email_confirmed_at,
				});
			}
			if (res.error) {
				throw new Error(res.error.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
