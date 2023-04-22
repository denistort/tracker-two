import { AuthResponse, UserResponse } from "@supabase/supabase-js";
import { supabase } from "../../supabase/supabase.client";

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
}
/**
 *
 * Register function
 */
export const signUpWithEmailAndPassWord = async (
	email: EmailType,
	password: string
): Promise<AuthResponse> => supabase.auth.signUp({ email, password });

/**
 * 
 * Get currentUser
 */
export const getCurrentUser = async (): Promise<UserResponse> =>
	supabase.auth.getUser();
