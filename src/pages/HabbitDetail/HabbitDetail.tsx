import { FC, useState } from 'react';
import {
	LoaderFunctionArgs,
	useLoaderData,
	useNavigation,
} from 'react-router-dom';
import { fetchHabbitById, trackAsMissedDay } from '../../api/habbit/habbit.api';
import { fetchTracks } from '../../api/tracks/tracks.api';
import { HabbitHeader } from '../../components/HabbitHeader/HabbitHeader';
import { TrackHabbitModal } from '../../components/TrackHabbitModal/TrackHabbitModal';
import useNProgress from '../../Hooks/UseNProgress';
import c from 'classnames';
import style from './HabbitDetail.module.css';

const isToday = (twoDate: string) => {
	const firstDate = new Date().toLocaleDateString('en', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
	const secondDate = new Date(twoDate).toLocaleDateString('en', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
	return firstDate === secondDate;
};

export const habbitDetailLoader = async ({ params }: LoaderFunctionArgs) => {
	const id = params['id'];
	if (id) {
		try {
			const tracks = await fetchTracks(id);
			const habbit = await fetchHabbitById(id);

			if (tracks) {
				const doneNum = tracks.filter(
					(track) => track.status === 'done'
				).length;

				const filterDays = tracks.filter(
					(track) =>
						Date.now() >= new Date(track.day).getTime() &&
						track.status === 'empty' &&
						!isToday(track.day)
				);
				if (filterDays.length > 0) {
					await trackAsMissedDay(filterDays);
				}
				console.log(filterDays, 'filtered past days');

				// Calc Procent
				const calcPrecent = (all: number, num: number) =>
					Number(((num / all) * 100).toFixed(2));
				const procentProgress = calcPrecent(tracks.length, doneNum);
				//
				const formattedTracks = tracks.map((track) => {
					const now = new Date().toLocaleDateString('en', {
						day: '2-digit',
						month: 'long',
						year: 'numeric',
					});
					const trackDate = new Date(track.day).toLocaleDateString(
						'en',
						{ day: '2-digit', month: 'long', year: 'numeric' }
					);
					return {
						id: track.id,
						day: track.day.split(' ').at(1)?.split(',').join(''),
						month: track.day.split(' ').at(0),
						year: track.day.split(' ').at(-1),
						habbitId: track.id,
						status: track.status,
						isToday: now === trackDate,
					};
				});
				const r = formattedTracks.reduce((acc, track) => {
					if (acc[track.month]) {
						acc[track.month].push(track);
					} else {
						acc[track.month] = [track];
					}
					return acc;
				}, {});
				return { tracks, trackTree: r, habbit, procentProgress };
			}
			return {
				tracks: null,
				trackTree: null,
				habbit,
				procentProgress: 0,
			};
		} catch (error) {
			console.log(error);
		}
	}
	return { tracks: null, trackTree: null, habbit: null, procentProgress: 0 };
};

type HabbitDetailData = Awaited<ReturnType<typeof habbitDetailLoader>>;

export const HabbitDetail = () => {
	const { trackTree, habbit, procentProgress } =
		useLoaderData() as HabbitDetailData;
	const { state } = useNavigation();
	useNProgress({}, state === 'loading' || state === 'submitting');
	
	return (
		<>
			<HabbitHeader
				title={habbit?.title || 'Без названия'}
				progress={procentProgress}
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
				<footer className={c("footer", style.footer)}>
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
			<Day
				key={day.id}
				id={day.id}
				day={day.day}
				isToday={day.isToday}
				status={day.status}
			></Day>
		))}
	</>
);
export type DayProps = {
	id: string;
	day: string;
	status: string;
	isToday: string;
};
const Day: FC<DayProps> = ({ id, day, isToday, status }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const onOpenHandler = () => {
		if (isToday) {
			setModalOpen(true);
		}
		return;
	};
	return (
		<div
			onClick={onOpenHandler}
			key={id}
			tabIndex={0}
			className={c('habbit__calendar_day', {
				[style.succes]: status === 'done',
				[style.missed]: status === 'missed',
			})}
		>
			<h4
				className={c('habbit__calendar_day__item-num', {
					[style.missed_title]:
						status === 'done' || status === 'missed',
				})}
			>
				{day}
			</h4>
			{isToday && (
				<span
					className={c(style.status_bar, {
						[style.today_success]: status === 'done',
						[style.today_default]: status !== 'done',
					})}
				>
					Today
				</span>
			)}
			<TrackHabbitModal
				isOpen={modalOpen}
				handleClose={() => {
					setModalOpen(false);
				}}
				day={day}
				id={id}
			></TrackHabbitModal>
		</div>
	);
};
