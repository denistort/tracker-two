import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Modal/Modal";
export const Panel = () => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className={`panel transition`}>
			<Link to={"/"}>
				<img
					tabIndex={0}
					className="logo"
					src="/images/logo.svg"
					alt="Логотип Habbit App"
				/>
			</Link>
			<nav className="menu">
				<div className="menu__list"></div>
				<div className={"nav__buttons"}>
					<button className="menu__add" onClick={() => setModalOpen(true)}>
						<img src="/images/add.svg" alt="Добавить привычку" />
					</button>

					<Link to={"/profile"}>
						<button className="menu__add">
							<svg
								width="24px"
								height="24px"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								fill="none"
								stroke="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								color="#000000"
							>
								<path
									d="M10 18v-3a2 2 0 012-2v0a2 2 0 012 2v3M2 8l9.732-4.866a.6.6 0 01.536 0L22 8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
								<path
									d="M20 11v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
						</button>
					</Link>
				</div>
			</nav>
			<Modal isOpen={modalOpen} handleClose={() => setModalOpen(false)}></Modal>
		</div>
	);
};
