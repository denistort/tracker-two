import { HabbitHeader } from "../../components/HabbitHeader/HabbitHeader";

export const HabbitDetail = () => {
	return (
		<>
			<HabbitHeader></HabbitHeader>
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
		</>
	);
};
