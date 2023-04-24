import {
	FC,
	useEffect,
	PropsWithChildren,
	DetailedHTMLProps,
	HTMLAttributes,
	useRef,
} from 'react';
import { ReactPortal } from '../ReactPortal/ReactPortal';
import { motion, AnimatePresence } from 'framer-motion';

import c from 'classnames';
import { useOutsideClick } from '../../Hooks/useClickOutSide';

export type BaseModalProps = {
	handleClose: () => void;
	isOpen: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const dropIn = {
	hidden: {
		y: '-1rem',
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: '0rem',
		opacity: 0,
	},
};

export const BaseModal: FC<PropsWithChildren<BaseModalProps>> = ({
	isOpen,
	handleClose,
	children,
	...rest
}) => {
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null;
		document.body.addEventListener('keydown', closeOnEscapeKey);
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [handleClose]);

	return (
		<ReactPortal wrapperId="modal-root">
			{isOpen && (
				<AnimatePresence mode={'wait'}>
					<motion.div
						onClick={() => {
							handleClose()
						}}
						tabIndex={1}
						className="cover"
						id="add-habbit-popup"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							onClick={(e) => {
								e.stopPropagation();
							}}
							variants={dropIn}
							initial="hidden"
							animate="visible"
							exit="exit"
							className={c('popup')}
							// {...rest}
						>
							{children}
							<button
								className="popup__close"
								onClick={() => handleClose()}
							>
								<img
									src="/images/close.svg"
									alt="Закрыть попап"
								/>
							</button>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			)}
		</ReactPortal>
	);
};
