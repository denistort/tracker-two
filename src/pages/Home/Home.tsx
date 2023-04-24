import { MouseEvent, useState } from 'react';
import {
	Link,
	LoaderFunctionArgs,
	useLoaderData,
	useNavigation,
} from 'react-router-dom';
import { fetchUsersHabbit } from '../../api/habbit/habbit.api';
import useNProgress from '../../Hooks/UseNProgress';
import { HabbitItem } from './HabbitItem/HabbitItem';

import c from './Home.module.css';
export const homeLoader = async (_props: LoaderFunctionArgs) => {
	try {
		const habbits = await fetchUsersHabbit();
		console.log(habbits);
		return { habbits };
	} catch (error) {
		console.log(error);
	}
	return { habbits: null };
};

type HomeData = Awaited<ReturnType<typeof homeLoader>>;

export const Home = () => {
	const [oneCol, setOneCol] = useState(false);
	const { habbits } = useLoaderData() as HomeData;
	const { state } = useNavigation();
	const [modalOpen, setModalOpen] = useState(false);
	const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
	useNProgress({}, state === 'loading' || state === 'submitting');
	return (
		<>
			<header>
				<h1 className="h1">Все привычки</h1>
				<button onClick={() => setOneCol(!oneCol)}>setCol</button>
			</header>
			<div
				className={`${c['all-habbits']} ${
					oneCol ? c.oneCol : c.multipleCol
				}`}
			>
				{habbits
					? habbits.map((habbit, index) => (
							<HabbitItem
								key={habbit.id}
								title={habbit.title}
								id={habbit.id}
								icon={habbit.icon}
							></HabbitItem>
					  ))
					: 'нет привычек'}
			</div>
		</>
	);
};
