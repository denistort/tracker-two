import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuth } from '../Hooks/useIsAuth';

export interface PrivateForAuthentificatedProps {
	children: ReactNode;
}

export const PrivateForAuthentificated: FC<PrivateForAuthentificatedProps> = ({
	children,
}) => {
	const status = useIsAuth();

	if (status === 'authenticated') {
		return <Navigate to={'/'} />;
	}
	if (status === 'not-authenticated') {
		return <>{children}</>;
	}

	return null;
};
