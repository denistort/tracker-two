import { ReactNode, FC } from 'react';
import { useAppSelector } from '../store/hocs';
import { Navigate } from 'react-router-dom';

export interface PrivateForAuthentificatedProps {
	children: ReactNode;
}

export const PrivateForAuthentificated: FC<PrivateForAuthentificatedProps> = ({ children }) => {
	const { userCredentials } = useAppSelector((state) => state.userReducer)

	if (!userCredentials) {
		return <>{children}</>;
	} else {
		return <Navigate to={'/'}/>
	}
};
