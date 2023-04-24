import { Link, useNavigate } from 'react-router-dom';
import c from './style.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNotifications } from 'reapop';
import useNProgress from '../../Hooks/UseNProgress';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hocs';
import { signUpEmailProviderAction } from '../../store/reducers/userSlice/actionCreator';
import { motion } from 'framer-motion';

const schema = yup
	.object({
		first_name: yup.string().required(),
		last_name: yup.string().required(),
		login: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().required(),
		confirm_password: yup
			.string()
			.test('confirm_password-match', function (value) {
				return value === this.parent.password;
			})
			.required(),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

export const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const { error, isLoading, userCredentials } = useAppSelector(
		(state) => state.userReducer
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { notify } = useNotifications();

	useNProgress({}, isLoading);

	useEffect(() => {
		if (!userCredentials && !isLoading && error) {
			notify('Произошла ошибка: ' + error, 'error');
		}
		if (userCredentials && !isLoading && !error) {
			notify('Вы успешно вошли в приложение добро пожаловать', 'success');
			navigate('/');
		}
	}, [error]);

	const onSubmitHandler = async (data: FormData) => {
		dispatch(
			signUpEmailProviderAction({
				email: data.email,
				password: data.password,
				first_name: data.first_name,
				last_name: data.last_name,
				login: data.login,
			})
		);
		reset();
	};

	return (
		<motion.form
			initial={{ opacity: 0, x: '5000px' }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: '5000px' }}
			className="login-form__wrapper"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<h2 className="h2">Зарегистрироваться</h2>

			<div className="input__wrapper">
				<label htmlFor="first_name">Имя</label>
				<input
					id="first_name"
					type="text"
					placeholder="Имя"
					className={errors.first_name ? 'error' : ''}
					aria-invalid={errors.first_name ? 'true' : 'false'}
					{...register('first_name')}
				/>
				{errors.first_name && (
					<div role="alert" className={c['validation-error']}>
						*{errors.first_name.message}
					</div>
				)}
			</div>

			<div className="input__wrapper">
				<label htmlFor="last_name">Фамилия</label>
				<input
					id="last_name"
					type="text"
					placeholder="Фамилия"
					className={errors.last_name ? 'error' : ''}
					aria-invalid={errors.last_name ? 'true' : 'false'}
					{...register('last_name')}
				/>
				{errors.last_name && (
					<div role="alert" className={c['validation-error']}>
						*{errors.last_name.message}
					</div>
				)}
			</div>

			<div className="input__wrapper">
				<label htmlFor="login">Логин</label>
				<input
					id="login"
					type="text"
					placeholder="Логин"
					className={errors.login ? 'error' : ''}
					aria-invalid={errors.login ? 'true' : 'false'}
					{...register('login')}
				/>
				{errors.login && (
					<div role="alert" className={c['validation-error']}>
						*{errors.login.message}
					</div>
				)}
			</div>

			<div className="input__wrapper">
				<label htmlFor="email">Почта</label>
				<input
					id="email"
					type="text"
					placeholder="Почта"
					className={errors.email ? 'error' : ''}
					aria-invalid={errors.email ? 'true' : 'false'}
					{...register('email')}
				/>
				{errors.email && (
					<div role="alert" className={c['validation-error']}>
						*{errors.email.message}
					</div>
				)}
			</div>

			<div className="input__wrapper">
				<label htmlFor="password">Пароль</label>
				<input
					id="password"
					type="password"
					placeholder="Password"
					className={errors.password ? 'error' : ''}
					aria-invalid={errors.password ? 'true' : 'false'}
					{...register('password')}
				/>
				{errors.password && (
					<div role="alert" className={c['validation-error']}>
						*{errors.password.message}
					</div>
				)}
			</div>

			<div className="input__wrapper">
				<label htmlFor="password">Подтвердите Пароль</label>
				<input
					id="password_confirm"
					type="password"
					className={errors.confirm_password ? 'error' : ''}
					placeholder="Password"
					{...register('confirm_password')}
					aria-invalid={errors.confirm_password ? 'true' : 'false'}
				/>
				{errors.confirm_password && (
					<div role="alert" className={c['validation-error']}>
						*{errors.confirm_password.message}
					</div>
				)}
			</div>

			<button disabled={isLoading} className="button" type="submit">
				{isLoading ? 'Загрузка...' : 'Войти'}
			</button>
			<div className={c.footer}>
				<Link to={'/'}>Вернуться в приложение</Link>
				<Link to={'/auth?tab=sign-in'}>Войти</Link>
			</div>
		</motion.form>
	);
};
