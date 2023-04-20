import { FC, ReactNode, useEffect } from "react";
import { useState, useLayoutEffect } from "react";
// ...
import { createPortal } from "react-dom";
export interface ReactPortalProps {
	children: ReactNode;
	wrapperId: string;
}
function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperElement = document.createElement("div");
	wrapperElement.setAttribute("id", wrapperId);
	document.body.appendChild(wrapperElement);
	return wrapperElement;
}

const ReactPortal: FC<ReactPortalProps> = ({ children, wrapperId }) => {
	const [wrapperElement, setWrapperElement] = useState(null);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		// if element is not found with wrapperId or wrapperId is not provided,
		// create and append to body
		if (!element) {
			element = createWrapperAndAppendToBody(wrapperId);
		}
		setWrapperElement(element);
	}, [wrapperId]);

	// wrapperElement state will be null on the very first render.
	if (wrapperElement === null) return null;

	return createPortal(children, wrapperElement);
};
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
							value="sport"
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
