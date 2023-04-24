import { supabase } from '../../supabase/supabase.client';
import { getUserInfo } from '../user/user.api';

export interface CreateHabbitCredentials {
	'date-end': string;
	'date-start': string;
	description: string;
	title: string;
	icon: string;
}
export const createHabbit = async (p: CreateHabbitCredentials) => {
	const user = await getUserInfo();
	if (user) {
		const createdHabbit = await supabase
			.from('Habbits')
			.insert([{ ...p, user: user.id }]);

		if (createdHabbit.status === 201) {
			let daylist = getDaysArray(
				new Date(p['date-start']),
				new Date(p['date-end'])
			);
			const daysList = daylist.map((date) =>
				date.toLocaleDateString('en', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				})
			);

			const createdRightNowHabbit = await supabase
				.from('Habbits')
				.select('*')
				.filter('user', 'eq', user.id)
				.single();

			if (createdRightNowHabbit.data) {
				const createdTracks = await supabase.from('Tracks').insert(
					daysList.map((date) => ({
						day: date,
						habbit: createdRightNowHabbit.data.id,
						status: 'empty',
					}))
				);
				if (createdTracks.status === 201) {
					return true;
				}
				if (createdTracks.error) {
					await supabase
						.from('Habbits')
						.delete()
						.filter('id', 'eq', createdRightNowHabbit.data.id);
					throw new Error(createdTracks.error.message);
				}
			}
		}
		if (createdHabbit.error?.message) {
			throw new Error(createdHabbit.error.message);
		}
	}
};

export const fetchUsersHabbit = async () => {
	const user = await getUserInfo();
	if (user) {
		const s = await supabase
			.from('Habbits')
			.select('*')
			.filter('user', 'eq', user.id);
		console.log(s);
		if (s.data) {
			return s.data;
		}
		if (s.error?.message) {
			throw new Error(s.error.message);
		}
	}
};

const getDaysArray = function (start: any, end: any): Date[] {
	let arr = [];
	let dt = new Date();
	for (
		arr = [], dt = new Date(start);
		dt <= new Date(end);
		dt.setDate(dt.getDate() + 1)
	) {
		arr.push(new Date(dt));
	}
	return arr;
};
export const fetchHabbitById = async (id: string) => {
	const habbit = await supabase
		.from('Habbits')
		.select('*')
		.filter('id', 'eq', id)
		.single();
	if (habbit.data) {
		return habbit.data;
	}
	if (habbit.error?.message) {
		throw new Error(habbit.error.message);
	}
};

export const trackDay = async (id: string): Promise<boolean> => {

	const res = await supabase
		.from('Tracks')
		.update({ status: 'done' })
		.eq('id', id)
	console.log(res);

	if (res.error) {
		throw new Error(res.error.message);
	}
	return true;
};
