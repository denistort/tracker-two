import { supabase } from '../../supabase/supabase.client';

export const fetchTracks = async (habbitId: string) => {
	const res = await supabase
		.from('Tracks')
		.select('*')
		.filter('habbit', 'eq', habbitId);
	return res.data;
};
