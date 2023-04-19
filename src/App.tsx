import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// onclick="togglePopup()"
function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="app">
			<div className="panel">
				<img tabIndex={0} className="logo" src="/images/logo.svg" alt="Логотип Habbit App" />
				<nav className="menu">
					<div className="menu__list"></div>
					<button className="menu__add">
						<img src="/images/add.svg" alt="Добавить привычку" />
					</button>
				</nav>
			</div>
			<div className="content">
				<header>
					<h1 className="h1">Подрочить</h1>
					<div className="progress">
						<div className="progress__text">
							<div className="progress__name">Прогресс</div>
							<div className="progress__percent">%</div>
						</div>
						<div className="progress__bar">
							<div className="progress__cover-bar"></div>
						</div>
					</div>
				</header>
				<main>
					<div id="days"></div>
					<div className="habbit">
						<div className="habbit__day">День _</div>
						<form className="habbit__form" onsubmit="addDays(event)">
							<input
								name="comment"
								className="input_icon"
								type="text"
								placeholder="Комментарий"
							/>
							<img
								className="input__icon"
								src="/images/comment.svg"
								alt="Иконка комментария"
							/>
							<button className="button" type="submit">
								Готово
							</button>
						</form>
					</div>
				</main>
			</div>
			<div className="cover cover_hidden" id="add-habbit-popup">
				<div className="popup">
					<h2>Новая привычка</h2>
					<div className="icon-label">Иконка</div>
					<div className="icon-select">
						<button
							className="icon icon_active"
							onclick="setIcon(this, 'sport')"
						>
							<img src="./images/sport.svg" alt="Спорт" />
						</button>
						<button className="icon" onclick="setIcon(this, 'water')">
							<img src="./images/water.svg" alt="Напитки" />
						</button>
						<button className="icon" onclick="setIcon(this, 'food')">
							<img src="./images/food.svg" alt="Еда" />
						</button>
					</div>
					<form className="popup__form" onsubmit="addHabbit(event)">
						<input type="text" name="name" placeholder="Название" />
						<input
							type="text"
							name="icon"
							hidden
							placeholder="Иконка"
							value="sport"
						/>
						<input type="number" name="target" placeholder="Цель" />
						<button className="button" type="submit">
							Добавить
						</button>
					</form>
					<button className="popup__close" onclick="togglePopup()">
						<img src="./images/close.svg" alt="Закрыть попап" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
