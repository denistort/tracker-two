import { createSlice } from "@reduxjs/toolkit";
import {
	signInEmailProviderAction,
	signUpEmailProviderAction,
} from "./actionCreator";

interface UserSlice {
	userCredentials: {
		id: string;
		email: string;
		email_confirmed: string;
	} | null;
	error: string | null;
	isLoading: boolean;
}

const initialState: UserSlice = {
	userCredentials: null,
	error: null,
	isLoading: false,
};

export const authSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		/**
		 * Sign up
		 */
	},
	extraReducers: (builder) => {
		/**
		 * Sign in
		 */

		builder.addCase(signInEmailProviderAction.pending, (state, _action) => {
			state.isLoading = true;
		});

		builder.addCase(signInEmailProviderAction.fulfilled, (state, action) => {
			state.userCredentials = {
				id: action.payload?.id || "",
				email: action.payload?.email || "threre is not email",
				email_confirmed: action.payload?.email_confirmed || "not",
			};
			state.error = null;
			state.isLoading = false;
		});

		builder.addCase(signInEmailProviderAction.rejected, (state, action) => {
			state.error = action.payload as string;
			state.isLoading = false;
			state.userCredentials = null;
		});

		/**
		 * Sign up
		 */

		builder.addCase(signUpEmailProviderAction.pending, (state, _action) => {
			state.isLoading = true;
		});

		builder.addCase(signUpEmailProviderAction.fulfilled, (state, action) => {
			state.userCredentials = {
				id: action.payload?.id || "",
				email: action.payload?.email || "threre is not email",
				email_confirmed: action.payload?.email_confirmed || "not",
			};
			state.error = null;
			state.isLoading = false;
		});

		builder.addCase(signUpEmailProviderAction.rejected, (state, action) => {
			state.error = action.payload as string;
			state.isLoading = false;
			state.userCredentials = null;
		});
	},
});
export const userActions = authSlice.actions;
export const userReducer = authSlice.reducer;
