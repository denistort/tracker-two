import { useEffect, useState } from "react"
import { getCurrentUser } from "../api/auth";

type Status = 'authenticated' | 'not-authenticated' | 'pending' | 'empty';

export const useIsAuth = (): Status => {
	const [isAuth, setIsAuth] = useState<Status>('empty');

	useEffect(() => {
		const getSessionUser = async () => {
			setIsAuth('pending');
			try {
				const user = await getCurrentUser();
				if (!user) {
					setIsAuth('not-authenticated')
				} else {
					setIsAuth('authenticated');
				}
			} catch (error) {
				
			}

		}
		getSessionUser();
	}, [])

	return isAuth
}