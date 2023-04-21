import { useState } from "react";
import c from "./Profile.module.css";
import { LoaderFunction, useLoaderData } from "react-router-dom";

export const profileLoader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const tab = url.searchParams.get("tab");
	return { tab };
};

export const Profile = () => {
	const { tab } = useLoaderData() as { tab: string };
	const [isEdit, setIsEdit] = useState(tab === 'edit');
	
	return (
		<>
			<header>
				<h1 className="h1">Ваш Профиль</h1>
			</header>

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
							defaultValue={"Гарик Героинов"}
							className={c.profile__input}
						/>
					) : (
						<h2>Гарик Героинов</h2>
					)}
					<p className={c.profile__description}>
						Какое-то описание Какое-то описаниеКакое-то описаниеКакое-то
						описаниеКакое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то
						описаниеКакое-то описаниеКакое-то описаниеКакое-то описаниеКакое-то
						описаниеКакое-то описаниеКакое-то описаниеКакое-то описание
					</p>
					<div className={c.profile__footer}>
						<button onClick={() => setIsEdit(!isEdit)} className={"button"}>
							Изменить
						</button>
						{isEdit && (
							<button onClick={() => setIsEdit(!isEdit)} className={"button"}>
								Сохранить Изменения
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
