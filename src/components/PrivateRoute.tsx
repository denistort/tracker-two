import { ReactNode, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hocs';
import { Navigate } from 'react-router-dom';
import { useIsAuth } from '../Hooks/useIsAuth';
import { userActions } from '../store/reducers/userSlice/userSlice';

export interface PrivateRouteProps {
	children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
	const { userCredentials } = useAppSelector((state) => state.userReducer);
	const { resetUser } = userActions;
	const dispatch = useAppDispatch();
	const status = useIsAuth();

	useEffect(() => {
		if (status === 'not-authenticated' && userCredentials) {
			dispatch(resetUser())
		}
		console.log(status)
	}, [status]);

	if (status === 'authenticated') {
		return <>{children}</>;
	}
	if (status === 'not-authenticated') {
		return <Navigate to={'/auth?tab=sign-in'} />;
	}

	return null;
};
