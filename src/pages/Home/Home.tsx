import { useState } from 'react';
import {
	Link,
	LoaderFunctionArgs,
	useLoaderData,
	useNavigation,
} from 'react-router-dom';
import { fetchUsersHabbit } from '../../api/habbit/habbit.api';
import useNProgress from '../../Hooks/UseNProgress';

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
							<Link to={`/habbit/${habbit.id}`} key={habbit.id}>
								<div className={c.habbit_item}>
									<img
										src={habbit.icon}
										alt={habbit + ' ' + index + 1}
									/>
									<h3>{habbit.title}</h3>
								</div>
							</Link>
					  ))
					: 'нет привычек'}
			</div>
		</>
	);
};
