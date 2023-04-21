import { Link } from "react-router-dom";
import c from './style.module.css';

export const SignUpForm = () => {
	return (
		<div className="login-form__wrapper">
			<h2 className="h2">Зарегистрироваться</h2>
			<div className="input__wrapper">
				<label htmlFor="first_name">Имя</label>
				<input id="first_name" type="text" name="first_name" placeholder="Имя" />
			</div>
			<div className="input__wrapper">
				<label htmlFor="last_name">Фамилия</label>
				<input id="last_name" type="text" name="last_name" placeholder="Фамилия" />
			</div>
			<div className="input__wrapper">
				<label htmlFor="login">Логин</label>
				<input id="login" type="text" name="login" placeholder="Логин" />
			</div>
			<div className="input__wrapper">
				<label htmlFor="email">Почта</label>
				<input id="email" type="text" name="email" placeholder="Почта" />
			</div>
			<div className="input__wrapper">
				<label htmlFor="password">Пароль</label>
				<input
					id="password"
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>
			<div className="input__wrapper">
				<label htmlFor="password">Подтвердите Пароль</label>
				<input
					id="password_confirm"
					type="password"
					name="password_confirm"
					placeholder="Password"
				/>
			</div>
			<button className="button" type="submit">
				Зарегистрироваться
			</button>
			<div className={c.footer}>
				<Link to={"/"}>Вернуться в приложение</Link>
				<Link to={"/auth?tab=sign-in"}>Войти</Link>

			</div>
		</div>
	);
};
