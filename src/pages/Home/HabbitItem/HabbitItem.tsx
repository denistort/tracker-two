import { FC, MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../../../Hooks/useClickOutSide';
import style from './HabbitItem.module.css';

export interface HabbitItemProps {
	id: string;
	icon: string;
	title: string;
}
export const HabbitItem: FC<HabbitItemProps> = ({ id, title, icon }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
	const [mouseEnter, setMouseEnter] = useState(false);

	const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		if (e.which === 3 || e.button === 2) {
			setModalOpen(!modalOpen);
			setModalPosition({
				x: e.clientX,
				y: e.clientY,
			});
		}
	};
	const ref = useOutsideClick<HTMLDivElement>(() => {
		setModalOpen(false);
	});
	useEffect(() => {
		const contextMenuHandler = (e: globalThis.MouseEvent) => {
			e.preventDefault();
		};
		if (mouseEnter) {
			document.addEventListener('contextmenu', contextMenuHandler);
		} else {
			document.removeEventListener('contextmenu', contextMenuHandler);
		}
		return () => {
			document.removeEventListener('contextmenu', contextMenuHandler);
		};
	}, [mouseEnter]);

	return (
		<>
			<Link to={`/habbit/${id}`} key={id}>
				<div
					onMouseEnter={() => setMouseEnter(true)}
					onMouseLeave={() => setMouseEnter(false)}
					onMouseDown={onMouseDown}
					className={style.habbit_item}
				>
					<div>
						<img
							className={style.icon}
							src={`/icons/${icon}.svg`}
							alt={title}
						/>
					</div>
					<h3 className={style.title}>{title}</h3>
				</div>
			</Link>
			{modalOpen && (
				<div
					ref={ref}
					style={{
						top: modalPosition['y'],
						left: modalPosition['x'],
					}}
					className={style.minimodal}
				>
					<span>Удалить? </span>
					<a href="">Да</a>
					<a href="">Нет</a>
				</div>
			)}
		</>
	);
};
