import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// onclick="togglePopup()"
function App() {
	const [anim, setAnim] = useState(true);

	return (
		<div className="app">
			<div
				className={`panel transition ${anim ? "animate-in" : "animate-out"}`}
			>
				<img
					onClick={() => setAnim(!anim)}
					tabIndex={0}
					className="logo"
					src="/images/logo.svg"
					alt="Логотип Habbit App"
				/>
				<nav className="menu">
					<div className="menu__list"></div>
					<div className={"nav__buttons"}>
						<button className="menu__add">
							<img src="/images/add.svg" alt="Добавить привычку" />
						</button>

						<button className="menu__add">
							<svg
								width="24px"
								height="24px"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								fill="none"
								stroke="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								color="#000000"
							>
								<path
									d="M10 18v-3a2 2 0 012-2v0a2 2 0 012 2v3M2 8l9.732-4.866a.6.6 0 01.536 0L22 8"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M20 11v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
						</button>
					</div>
				</nav>
			</div>
			<div className="content">
				<header>
					<h1 className="h1">Подрочить</h1>
					<div className="progress">
						<div className="progress__text">
							<div className="progress__name">Прогресс</div>
							<div className="progress__percent">0%</div>
						</div>
						<div className="progress__bar">
							<div className="progress__cover-bar"></div>
						</div>
					</div>
				</header>
				<main>
					<div id="days"></div>
					<div>
						<h3>April</h3>
						<div className="habbit__calendar">
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">20</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">21</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">22</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">23</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">24</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">25</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">26</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">27</h4>
							</div>
						</div>
					</div>
					<div>
						<h3>May</h3>
						<div className="habbit__calendar">
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">1</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">2</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">3</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">4</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">5</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">6</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">7</h4>
							</div>
							<div tabIndex={0} className="habbit__calendar_day">
								<h4 className="habbit__calendar_day__item-num">8</h4>
							</div>
						</div>
					</div>
					{/* <div className="habbit">
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
					</div> */}
					<footer className="footer">
						<h3>Footer</h3>
					</footer>
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
