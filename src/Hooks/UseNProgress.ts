import { useEffect, useState } from "react";
import NProgress from "nprogress";

export interface UseNProgressProps {
	template?: string;
	easing?: string;
	speed?: number;
	trickle?: boolean;
	trickleRate?: number;
	trickleSpeed?: number;
	showSpinner?: boolean;
	parent?: `#${string}` | `.${string}`;
}
export default function useNProgress(props: UseNProgressProps) {
	const [show, setShow] = useState(false);
	useEffect(() => {
		NProgress.configure(props);
	}, []);

	useEffect(() => {
		if (show) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}, [show]);

	return {
		loaderStart: () => setShow(true),
		loaderEnd: () => setShow(false),
		increment: (value: number) => NProgress.inc(value)
	};
}
