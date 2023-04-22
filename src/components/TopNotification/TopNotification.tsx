import { FC, ReactNode } from 'react';
import { ReactPortal } from '../ReactPortal/ReactPortal';
import style from './TopNotification.module.css';
import c from 'classnames';

export interface TopNotificationProps {
	isOpen: boolean;
	parentId: `${string}`;
	type: 'succes' | 'error';
	children: ReactNode;
}
export const TopNotification: FC<TopNotificationProps> = ({
	isOpen,
	parentId,
	type,
	children,
}) => {
	if (!isOpen) {
		return null
	}
	return (
		<ReactPortal wrapperId={parentId}>
			<div
				className={c({
					[style.wrapper]: true,
					[style.error]: type === 'error',
					[style.succes]: type === 'succes',
				})}
			>
				<div className={style.inner}>{children}</div>
			</div>
		</ReactPortal>
	);
};
