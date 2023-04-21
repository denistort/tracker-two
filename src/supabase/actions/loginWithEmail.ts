import { supabase } from "../supabase.client";

export const loginWithEmail = async (email: string, password: string) => {
	const res = await supabase.auth.signInWithPassword({ email, password });
	return res;
};
