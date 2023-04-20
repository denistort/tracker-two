import { Link } from "react-router-dom";

export const SignInForm = () => {
	return (
		<div className="login-form__wrapper">
			<h2 className="h2">Login</h2>
			<div className="input__wrapper">
				<label htmlFor="email">Email</label>
				<input id="email" type="text" name="email" placeholder="Login" />
			</div>
			<div className="input__wrapper">
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					name="email"
					placeholder="Password"
				/>
			</div>
			<button className="button" type="submit">
				Войти
			</button>
			<div>
				<Link to={"/"}>Вернуться в приложение</Link>
				<Link to={"/auth?tab=sign-up"}>Зарегистрироваться</Link>
			</div>
		</div>
	);
};
