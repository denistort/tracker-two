import { FC } from 'react';
import { LoaderFunctionArgs, useLoaderData, useNavigation } from 'react-router-dom';
import { fetchHabbitById } from '../../api/habbit/habbit.api';
import { fetchTracks } from '../../api/tracks/tracks.api';
import { HabbitHeader } from '../../components/HabbitHeader/HabbitHeader';
import useNProgress from '../../Hooks/UseNProgress';

export const habbitDetailLoader = async ({ params }: LoaderFunctionArgs) => {
	const id = params['id'];
	if (id) {
		try {
			const tracks = await fetchTracks(id);
			const habbit = await fetchHabbitById(id);

			if (tracks) {
				const formattedTracks = tracks.map((track) => ({
					id: track.id,
					day: track.day.split(' ').at(1)?.split(',').join(''),
					month: track.day.split(' ').at(0),
					year: track.day.split(' ').at(-1),
					habbitId: track.id,
					status: track.status,
				}));
				const r = formattedTracks.reduce((acc, track) => {
					if (acc[track.month]) {
						acc[track.month].push(track);
					} else {
						acc[track.month] = [track];
					}
					return acc;
				}, {});
				return { tracks, trackTree: r, habbit };
			}
			return { tracks: null, trackTree: null, habbit };
		} catch (error) {
			console.log(error);
		}
	}
	return { tracks: null, trackTree: null, habbit: null };
};

type HabbitDetailData = Awaited<ReturnType<typeof habbitDetailLoader>>;

export const HabbitDetail = () => {
	const { trackTree, habbit } = useLoaderData() as HabbitDetailData;
	const { state } = useNavigation()
	useNProgress({}, state === 'loading' || state === 'submitting');

	return (
		<>
			<HabbitHeader
				title={habbit?.title || 'Без названия'}
				progress={0}
			></HabbitHeader>
			<main>
				<div id="days"></div>
				<div>
					{trackTree &&
						Object.keys(trackTree).map((key) => (
							<div key={key}>
								<h3>{key}</h3>
								<div className="habbit__calendar">
									<RenderDays
										month={trackTree[key]}
									></RenderDays>
								</div>
							</div>
						))}
				</div>
				{/* <div className="habbit">
						<div className="habbit__day">День _</div>
						<form className="habbit__form" onsubmit="addDays(event)">
							<input
								name="comment"
								className="input_icon"
								type="text"
								placeholder="Комментарий"
							/>
							<img
								className="input__icon"
								src="/images/comment.svg"
								alt="Иконка комментария"
							/>
							<button className="button" type="submit">
								Готово
							</button>
						</form>
					</div> */}
				<footer className="footer">
					<h3>Footer</h3>
				</footer>
			</main>
		</>
	);
};
export type RenderDaysProps = {
	month: {
		created_at: string | null;
		day: string;
		habbit: string;
		id: string;
		status: string;
	}[];
};
const RenderDays: FC<RenderDaysProps> = (props) => (
	<>
		{props.month.map((day) => (
			<div key={day.id} tabIndex={0} className="habbit__calendar_day">
				<h4 className="habbit__calendar_day__item-num">{day.day}</h4>
			</div>
		))}
	</>
);
