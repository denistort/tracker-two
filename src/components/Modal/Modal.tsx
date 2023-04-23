import { FC, useEffect, useState } from 'react';
import { ReactPortal } from '../ReactPortal/ReactPortal';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateRange } from 'react-date-range';
import useNProgress from '../../Hooks/UseNProgress';
import { useAppSelector } from '../../store/hocs/index';
import style from './Modal.module.css';
import { useNotifications } from 'reapop';
import { createHabbit } from '../../api/habbit/habbit.api';

import { useRevalidator } from 'react-router-dom';
export interface ModalProps {
	isOpen: boolean;
	handleClose: () => void;
}

const schema = yup
	.object({
		title: yup.string().required(),
		description: yup.string().required(),
	})
	.required();
type FormData = yup.InferType<typeof schema>;

export const Modal: FC<ModalProps> = ({ isOpen, handleClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const [isLoading, setIsLoading] = useState(false);
	const [dateStart, setDateStart] = useState<Date>(new Date());
	const [dateEnd, setDateEnd] = useState<Date>(new Date());
	const revalidate = useRevalidator();
	useNProgress({}, isLoading);
	const { notify } = useNotifications();
	const { userCredentials } = useAppSelector((state) => state.userReducer);
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
		if (userCredentials?.id) {
			try {
				console.log(userCredentials.id);
				await createHabbit({
					'date-end': dateEnd.toDateString(),
					'date-start': dateStart.toDateString(),
					title: data.title,
					description: data.description,
				});
				notify('Привычка успешно создана', 'success');
				revalidate.revalidate();
				handleClose();
			} catch (error) {
				notify(
					'Привычка не создана произошла ошибка: ' + error,
					'error'
				);
			} finally {
				setIsLoading(false);
			}
		}
		reset();
	};
	if (!isOpen) return null;
	return (
		<ReactPortal wrapperId="modal-root">
			<div className="cover" id="add-habbit-popup">
				<div className="popup">
					<h2>Новая привычка</h2>
					<div className="icon-label">Иконка</div>
					<div className="icon-select">
						<button
							className="icon icon_active"
							// onclick="setIcon(this, 'sport')"
						>
							<img src="/images/sport.svg" alt="Спорт" />
						</button>
						<button className="icon">
							<img src="/images/water.svg" alt="Напитки" />
						</button>
						<button className="icon">
							<img src="/images/food.svg" alt="Еда" />
						</button>
					</div>
					<form
						onSubmit={handleSubmit(onSubmitHandler)}
						className="popup__form"
					>
						<div className="input__wrapper">
							<label htmlFor="title">Название</label>
							<input
								id="title"
								type="text"
								placeholder="Название"
								className={errors.title ? 'error' : ''}
								aria-invalid={errors.title ? 'true' : 'false'}
								{...register('title')}
							/>
							{errors.title && (
								<div
									role="alert"
									className={style['validation-error']}
								>
									*{errors.title.message}
								</div>
							)}
						</div>

						<div className="input__wrapper">
							<label htmlFor="description">Описание</label>
							<textarea
								id="description"
								placeholder="Название"
								className={errors.description ? 'error' : ''}
								aria-invalid={
									errors.description ? 'true' : 'false'
								}
								{...register('description')}
							/>
							{errors.description && (
								<div
									role="alert"
									className={style['validation-error']}
								>
									*{errors.description.message}
								</div>
							)}
						</div>
						<div>
							<DateRange
								startDatePlaceholder={dateStart?.toLocaleDateString()}
								minDate={new Date()}
								ranges={[
									{
										startDate: dateStart,
										endDate: dateEnd,
										key: 'selection',
									},
								]}
								onChange={(r) => {
									setDateStart(r.selection.startDate);
									setDateEnd(r.selection.endDate);
								}}
							></DateRange>
						</div>
						<button className="button" type="submit">
							{isLoading ? 'Загрузка...' : 'Добавить'}
						</button>
					</form>
					<button
						className="popup__close"
						onClick={() => handleClose()}
					>
						<img src="/images/close.svg" alt="Закрыть попап" />
					</button>
				</div>
			</div>
		</ReactPortal>
	);
};
