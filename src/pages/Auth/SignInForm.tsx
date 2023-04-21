import { useState, FormEvent, ChangeEventHandler } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { loginWithEmail } from "../../supabase/actions/loginWithEmail";

import c from "./style.module.css";

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

export const SignInForm = () => {
	const [isSucces, setIsSucces] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, seIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const onSubmitHandler = async (data: FormData) => {
		seIsLoading(true);
		const res = await loginWithEmail(data.email, data.password);
		reset();
		seIsLoading(false);
		if (res.error) {
			setError(res.error.message);
			setIsSucces(false);
		} else {
			setError("");
			setIsSucces(true);
		}
	};

	const closeErrorWindow = () => {
		setIsSucces(false);
		setError("");
	};
	return (
		<form
			className="login-form__wrapper"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			{isSucces ? (
				<div onClick={closeErrorWindow} className={`${c.notify} ${c.succes}`}>
					Вы успешно вошли
				</div>
			) : (
				error && (
					<div onClick={closeErrorWindow} className={`${c.notify} ${c.error}`}>
						{error}
					</div>
				)
			)}
			<h2 className="h2">Login</h2>
			<div className="input__wrapper">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="text"
					placeholder="Email"
					{...register("email")}
				/>
				<p>{errors.email?.message}</p>
			</div>
			<div className="input__wrapper">
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					placeholder="Password"
					{...register("password")}
				/>
				<p>{errors.password?.message}</p>
			</div>
			<button disabled={isLoading} className="button" type="submit">
				{isLoading ? "Загрузка..." : "Войти"}
			</button>
			<div>
				<Link to={"/"}>Вернуться в приложение</Link>
				<Link to={"/auth?tab=sign-up"}>Зарегистрироваться</Link>
			</div>
		</form>
	);
};
