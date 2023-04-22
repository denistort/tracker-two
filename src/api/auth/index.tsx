import { AuthResponse, UserResponse } from '@supabase/supabase-js';
import { supabase } from '../../supabase/supabase.client';

export type EmailType = `${string}@${string}.${string}`;

/**
 * Login function
 */
/**
 *
 */
export const signInWithEmailAndPassWord = async (
	email: EmailType,
	password: string
) => {
	const res = await supabase.auth.signInWithPassword({ email, password });
	if (res.data.user) {
		return {
			id: res.data.user.id,
			email: res.data.user.email,
			email_confirmed: res.data.user.email_confirmed_at,
		};
	}
	if (res.error) {
		throw new Error(res.error.message);
	}
};
/**
 *
 * Register function
 */
export type signUpCredentials = {
	password: string;
	email: string;
	first_name: string;
	id_auth: string;
	last_name: string;
	login: string;
};
export const signUpWithEmailAndPassWord = async ({
	email,
	first_name,
	last_name,
	login,
	password,
}: signUpCredentials) => {
	const res = await supabase.auth.signUp({ email, password });
	if (res.error) {
		throw new Error(res.error.message);
	}
	console.log(res)
	if (res.data.user?.id) {
		const w = await supabase.from('Users').insert([
			{
				id_auth: res.data.user?.id || '',
				first_name,
				login,
				email,
				last_name,
				profile_image: 'default',
			},
		]);
		if (w.error) {
			throw new Error(w.error.message);
		}
		if (w.status === 201) {
			return {
				id: res.data.user.id,
				email: res.data.user.email,
				email_confirmed: res.data.user.email_confirmed_at,
			};
		}
	}
};

/**
 *
 * Get currentUser
 */
export const getCurrentUser = async (): Promise<UserResponse> =>
	supabase.auth.getUser();

/**
 * signOut
 */

export const signOut = async () => {
	const res = await supabase.auth.signOut();
	if (res.error) {
		throw new Error(res.error.message);
	}
};
