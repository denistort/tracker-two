import { ReactNode, FC } from 'react';
import { useAppSelector } from '../store/hocs';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
	children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
	const { userCredentials } = useAppSelector((state) => state.userReducer)

	if (userCredentials) {
		return <>{children}</>;
	} else {
		return <Navigate to={'/auth?tab=sign-in'}/>
	}
};
