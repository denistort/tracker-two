import { FC, useEffect, useState } from 'react';
import { ReactPortal } from '../ReactPortal/ReactPortal';
import { motion, AnimatePresence } from 'framer-motion';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useNProgress from '../../Hooks/UseNProgress';
import style from './Modal.module.css';
import { useNotifications } from 'reapop';

import { useRevalidator } from 'react-router-dom';
import { BaseModal, BaseModalProps } from '../BaseModal/BaseModa';
import { trackDay } from '../../api/habbit/habbit.api';

export interface TrackHabbitModalProps extends BaseModalProps {
	day: string;
	id: string;
}

const schema = yup
	.object({
		result: yup.string().required(),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

export const TrackHabbitModal: FC<TrackHabbitModalProps> = ({
	isOpen,
	handleClose,
	day,
	id
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const [isLoading, setIsLoading] = useState(false);
	const revalidate = useRevalidator();
	useNProgress({}, isLoading);
	const { notify } = useNotifications();

	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null;

		document.body.addEventListener('keydown', closeOnEscapeKey);
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [handleClose]);
	const onSubmitHandler = async (data: FormData) => {
		setIsLoading(true);
		try {
			await trackDay(id);
			notify('Привычка успешно создана', 'success');
			revalidate.revalidate();
			handleClose();
		} catch (error) {
			notify('Привычка не создана произошла ошибка: ' + error, 'error');
		} finally {
			setIsLoading(false);
		}
		reset();
	};
	return (
		<BaseModal isOpen={isOpen} handleClose={handleClose}>
			<h2>Отметка</h2>
			<p>Выбрана дата {day}</p>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="popup__form"
			>
				<div className="input__wrapper">
					<label htmlFor="title">Результат</label>
					<input
						id="title"
						type="text"
						placeholder="Результат"
						className={errors.result ? 'error' : ''}
						aria-invalid={errors.result ? 'true' : 'false'}
						{...register('result')}
					/>
					{errors.result && (
						<div role="alert" className={style['validation-error']}>
							*{errors.result.message}
						</div>
					)}
				</div>

				<button className="button" type="submit">
					{isLoading ? 'Загрузка...' : 'Добавить'}
				</button>
			</form>
		</BaseModal>
	);
};
