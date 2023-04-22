import { FC, ReactNode, useLayoutEffect, useState } from "react";
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

export const ReactPortal: FC<ReactPortalProps> = ({ children, wrapperId }) => {
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