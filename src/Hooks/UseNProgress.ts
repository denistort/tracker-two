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
export default function useNProgress(props: UseNProgressProps, isLoading: boolean) {
	useEffect(() => {
		NProgress.configure(props);
	}, []);

	useEffect(() => {
		if (isLoading) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}, [isLoading]);

	return {
		increment: (value: number) => NProgress.inc(value)
	};
}
