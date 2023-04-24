import { useEffect, useRef, DetailedHTMLProps, HTMLAttributes  } from "react";

type GenericClickOutSide<T> = DetailedHTMLProps<HTMLAttributes<T>, T>

export const useOutsideClick = <GenericClickOutSide>(callback: () => void) => {
	const ref = useRef<GenericClickOutSide>();

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [ref]);

	return ref;
};
