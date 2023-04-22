import { supabase } from '../../supabase/supabase.client';

export const getUserInfo = async () => {
	const user = await supabase.auth.getUser();
	if (user.data.user?.id) {
		const data = await supabase
			.from('Users')
			.select('*')
			.filter('id_auth', 'eq', user.data.user.id)
			.single();
		if (data.error) {
			throw new Error(data.error.message);
		}
		return data.data;
	} else {
		throw new Error(user.error?.message);
	}
};
