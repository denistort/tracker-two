import { AuthResponse, UserResponse } from "@supabase/supabase-js";
import { supabase } from "../../supabase/supabase.client";

export type EmailType = `${string}@${string}.${string}`;

/**
 * Login function
 */
export const signInWithEmailAndPassWord = async (
	email: EmailType,
	password: string
): Promise<AuthResponse> =>
	supabase.auth.signInWithPassword({ email, password });

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
