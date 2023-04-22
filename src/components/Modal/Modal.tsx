import { FC, useEffect } from "react";
import { ReactPortal } from "../ReactPortal/ReactPortal";

export interface ModalProps {
	isOpen: boolean;
	handleClose: () => void;
}
export const Modal: FC<ModalProps> = ({ isOpen, handleClose }) => {
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === "Escape" ? handleClose() : null;

		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [handleClose]);

	if (!isOpen) return null;
	return (
		<ReactPortal wrapperId="modal-root">
			<div className="cover" id="add-habbit-popup">
				<div className="popup">
					<h2>Новая привычка</h2>
					<div className="icon-label">Иконка</div>
					<div className="icon-select">
						<button
							className="icon icon_active"
							// onclick="setIcon(this, 'sport')"
						>
							<img src="/images/sport.svg" alt="Спорт" />
						</button>
						<button className="icon">
							<img src="/images/water.svg" alt="Напитки" />
						</button>
						<button className="icon">
							<img src="/images/food.svg" alt="Еда" />
						</button>
					</div>
					<form className="popup__form">
						<input type="text" name="name" placeholder="Название" />
						<input
							type="text"
							name="icon"
							hidden
							placeholder="Иконка"
							defaultValue={"sport"}
						/>
						<input type="number" name="target" placeholder="Цель" />
						<button className="button" type="submit">
							Добавить
						</button>
					</form>
					<button className="popup__close" onClick={() => handleClose()}>
						<img src="/images/close.svg" alt="Закрыть попап" />
					</button>
				</div>
			</div>
		</ReactPortal>
	);
};
