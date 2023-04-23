import { FC } from "react";

export type HabbitHeaderProps = {
	title: string;
	progress: number;
}
export const HabbitHeader: FC<HabbitHeaderProps> = ({ title, progress }) => {
	return (
		<header>
			<h1 className="h1">{title}</h1>
			<div className="progress">
				<div className="progress__text">
					<div className="progress__name">Прогресс</div>
					<div className="progress__percent">{progress}%</div>
				</div>
				<div className="progress__bar">
					<div className="progress__cover-bar"></div>
				</div>
			</div>
		</header>
	);
};
