import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from 'reapop';
import useNProgress from '../../Hooks/UseNProgress';
import { useAppDispatch, useAppSelector } from '../../store/hocs';
import { signOutAction } from '../../store/reducers/userSlice/actionCreator';
import { CreateHabbitModal } from '../Modal/CreateHabbitModal';
export const Panel = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const { userCredentials, isLoading, error } = useAppSelector((state) => state.userReducer);
	const dispatch = useAppDispatch();
	useNProgress({}, isLoading);
	const notifications = useNotifications()
	useEffect(() => {
		if (!userCredentials && !isLoading && error) {
			notifications.notify('Что-то пошло не так', 'error')
		}
		if (!userCredentials && !isLoading && !error) {
			notifications.notify('Вы успешно вышли из вашего аккаунт', 'success')
		}
	}, [isLoading])
	const onClickHandler = () => {
		dispatch(signOutAction());
	}
	return (
		<div className={`panel transition`}>
			<Link to={'/'}>
				<img
					tabIndex={0}
					className="logo"
					src="/images/logo.svg"
					alt="Логотип Habbit App"
				/>
			</Link>
			<nav className="menu">
				<div className="menu__list"></div>
				<div className={'nav__buttons'}>
					<button
						className="menu__add"
						onClick={() => setModalOpen(true)}
					>
						<img src="/images/add.svg" alt="Добавить привычку" />
					</button>

					<Link to={'/profile'}>
						<button className="menu__add">
							<svg
								width="2.4rem"
								height="2.4rem"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								fill="none"
								stroke="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								color="#000000"
							>
								<path
									d="M10 18v-3a2 2 0 012-2v0a2 2 0 012 2v3M2 8l9.732-4.866a.6.6 0 01.536 0L22 8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
								<path
									d="M20 11v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						</button>
					</Link>
					{userCredentials && (
						<button className="menu__add" onClick={onClickHandler}>
							<svg
								width="24px"
								height="24px"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="currentColor"
							>
								<path
									d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1"
									stroke="#currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						</button>
					)}
				</div>
			</nav>
			<CreateHabbitModal
				isOpen={modalOpen}
				handleClose={() => setModalOpen(false)}
			></CreateHabbitModal>
		</div>
	);
};
