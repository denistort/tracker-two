import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import c from './style.module.css';
import { useNotifications } from 'reapop';

import useNProgress from '../../Hooks/UseNProgress';

import { useAppDispatch, useAppSelector } from '../../store/hocs';
import { signInEmailProviderAction } from '../../store/reducers/userSlice/actionCreator';
import { motion } from 'framer-motion';

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

export type LoginType = 'byEmailAndPasswod' | 'byNumber';

export const SignInForm = () => {
	const [type, setType] = useState<LoginType>('byNumber');

	const { notify } = useNotifications();
	const dispatch = useAppDispatch();

	const { error, isLoading, userCredentials } = useAppSelector(
		(state) => state.userReducer
	);

	const navigate = useNavigate();
	//
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	//

	useNProgress({}, isLoading);
	useEffect(() => {
		if (!userCredentials && !isLoading && error) {
			notify('Произошла ошибка: ' + error, 'error');
		}
		if (userCredentials && !isLoading && !error) {
			notify('Вы успешно вошли в приложение добро пожаловать', 'success');
			navigate('/');
		}
	}, [error, isLoading]);

	const onSubmitHandler = (data: FormData) => {
		dispatch(
			signInEmailProviderAction({
				email: data.email,
				password: data.password,
			})
		);
		reset();
	};
	return (
		<motion.form
			initial={{ opacity: 0, x: '200px' }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: '200px' }}
			className="login-form__wrapper"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<h2 className="h2">Login</h2>
			<div className="input__wrapper">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="text"
					placeholder="Email"
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
				<label htmlFor="password">Password</label>
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
			<button disabled={isLoading} className="button" type="submit">
				{isLoading ? 'Загрузка...' : 'Войти'}
			</button>
			<div className={c.footer}>
				<Link to={'/'}>Вернуться в приложение</Link>
				<Link to={'/auth?tab=sign-up'}>Зарегистрироваться</Link>
			</div>
		</motion.form>
	);
};
