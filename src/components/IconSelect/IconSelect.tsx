import { FC, DetailedHTMLProps, useState } from 'react';

import c from 'classnames';
import style from './IconSelect.module.css';

export interface IconSelectProps {
	onChange: (icon: string) => void;
	selectedIcon: string;
}
type IconsArrayType = { icon: string; alt: string }[][];
const iconsArray: IconsArrayType = [
	//
	[
		{ icon: 'sport', alt: 'Спорт' },
		{ icon: 'water', alt: 'Спорт' },
		{ icon: 'waist', alt: 'Спорт' },
		{ icon: 'tennis-ball', alt: 'Спорт' },
		{ icon: 'swimming', alt: 'Спорт' },
		{ icon: 'stretching', alt: 'Спорт' },
		{ icon: '1st-medal', alt: 'Спорт' },
		{ icon: 'basketball-alt', alt: 'Спорт' },
		{ icon: 'basketball-field', alt: 'Спорт' },
		{ icon: 'basketball', alt: 'Спорт' },
		{ icon: 'book-stack', alt: 'Спорт' },
		{ icon: 'book', alt: 'Спорт' },
		{ icon: 'bookmark-book', alt: 'Спорт' },
		{ icon: 'bowling-ball', alt: 'Спорт' },
		{ icon: 'boxing-glove', alt: 'Спорт' },
		{ icon: 'cinema-old', alt: 'Спорт' },
	],
	//
	[
		{ icon: 'cycling', alt: 'Спорт' },
		{ icon: 'favourite-book', alt: 'Спорт' },
		{ icon: 'fire-flame', alt: 'Спорт' },
		{ icon: 'fish', alt: 'Спорт' },
		{ icon: 'Fishing', alt: 'Спорт' },
		{ icon: 'flower', alt: 'Спорт' },
		{ icon: 'food', alt: 'Спорт' },
		{ icon: 'football-ball', alt: 'Спорт' },
		{ icon: 'football', alt: 'Спорт' },
		{ icon: 'golf', alt: 'Спорт' },
		{ icon: 'graph-down', alt: 'Спорт' },
		{ icon: 'graph-up', alt: 'Спорт' },
		{ icon: 'gym', alt: 'Спорт' },
		{ icon: 'hourglass', alt: 'Спорт' },
		{ icon: 'leaderboard-star', alt: 'Спорт' },
		{ icon: 'leaderboard', alt: 'Спорт' },
	],
	//[]
	[
		{ icon: 'locked-book', alt: 'Спорт' },
		{ icon: 'math-book', alt: 'Спорт' },
		{ icon: 'medal', alt: 'Спорт' },
		{ icon: 'movie', alt: 'Спорт' },
		{ icon: 'no-smoking-circle', alt: 'Спорт' },
		{ icon: 'no-smoking', alt: 'Спорт' },
		{ icon: 'open-book', alt: 'Спорт' },
		{ icon: 'palette', alt: 'Спорт' },
		{ icon: 'reports', alt: 'Спорт' },
		{ icon: 'rings', alt: 'Спорт' },
		{ icon: 'running', alt: 'Спорт' },
		{ icon: 'skateboard', alt: 'Спорт' },
		{ icon: 'skateboarding', alt: 'Спорт' },
		{ icon: 'smoking', alt: 'Спорт' },
		{ icon: 'yoga', alt: 'Спорт' },
		{ icon: 'walking', alt: 'Спорт' },
	],
];

export const IconSelect: FC<IconSelectProps> = (props) => {
	const [pagination, sePagination] = useState(0);
	const onNextSlide = () => {
		console.log(Math.min(pagination + 1, iconsArray.length - 1));
		sePagination(Math.min(pagination + 1, iconsArray.length - 1));
	};
	const onPreviousSlide = () => {
		sePagination(Math.max(pagination - 1, 0));
	};
	return (
		<div className={style.wrapper}>
			{pagination > 0 && (
				<button
					onClick={onPreviousSlide}
					className={c(style.slider, style.left)}
				>
					<svg
						width="24px"
						height="24px"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="currentColor"
					>
						<path
							d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</button>
			)}
			{pagination === iconsArray.length - 1 ? null : (
				<button
					onClick={onNextSlide}
					className={c(style.slider, style.right)}
				>
					<svg
						width="24px"
						height="24px"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="currentColor"
					>
						<path
							d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</button>
			)}
			<div className="icon-label">Иконка</div>
			<div className={c('icon-select', style['buttons'])}>
				{iconsArray[pagination].map((icon) => (
					<button
						key={icon.icon}
						className={c('icon', {
							icon_active: props.selectedIcon === icon.icon,
						})}
						onClick={() => props.onChange(icon.icon)}
					>
						<img src={`/icons/${icon.icon}.svg`} alt="Спорт" />
					</button>
				))}
			</div>
		</div>
	);
};
