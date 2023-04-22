import { useState } from 'react';
import c from './Profile.module.css';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getUserInfo } from '../../api/user/user.api';

export const profileLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const tab = url.searchParams.get('tab');
	try {
		const user = await getUserInfo();
		return { user, tab };
	} catch (error) {
		console.log(error);
	}
	return { user: null, tab };
};

type ProfileData = Awaited<ReturnType<typeof profileLoader>>;

export const Profile = () => {
	const { tab, user } = useLoaderData() as ProfileData;
	const [isEdit, setIsEdit] = useState(tab === 'edit');

	return (
		<>
			<header>
				<h1 className="h1">Ваш Профиль</h1>
			</header>
			{user && (
				<div className={c.profile_block}>
					{isEdit ? (
						<label htmlFor="avatar" className={c.avatar__edit}>
							<div className={c.profile_block__image_wraper}>
								<img
									src="/images/cover.jpg"
									alt="avatar of user"
									className={c.profile__image}
								/>
							</div>

							<input id="avatar" type="file" hidden />
						</label>
					) : (
						<div className={c.profile_block__image_wraper}>
							<img
								src="/images/cover.jpg"
								alt="avatar of user"
								className={c.profile__image}
							/>
						</div>
					)}
					<div className={c.profile_block__info}>
						{isEdit ? (
							<input
								type="text"
								name="icon"
								placeholder="Иконка"
								defaultValue={'Гарик Героинов'}
								className={c.profile__input}
							/>
						) : (
							<h2>{user.first_name + ' ' + user.last_name}</h2>
						)}
						<div className={c.profile__footer}>
							<button
								onClick={() => setIsEdit(!isEdit)}
								className={'button'}
							>
								Изменить
							</button>
							{isEdit && (
								<button
									onClick={() => setIsEdit(!isEdit)}
									className={'button'}
								>
									Сохранить Изменения
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
