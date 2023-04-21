import { useState } from "react";
import c from "./Home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
 	const [oneCol, setOneCol] = useState(false);
	return (
		<>
			<header>
				<h1 className="h1">Все привычки</h1>
				<button onClick={() => setOneCol(!oneCol)}>setCol</button>
			</header>
			<div className={`${c["all-habbits"]} ${oneCol ? c.oneCol : c.multipleCol}`}>
				<Link to="/habbit/exampleId">
					<div className={c.habbit_item}></div>
				</Link>
				<Link to="/habbit/exampleId">
					<div className={c.habbit_item}></div>
				</Link>
				<Link to="/habbit/exampleId">
					<div className={c.habbit_item}></div>
				</Link>
				<Link to="/habbit/exampleId">
					<div className={c.habbit_item}></div>
				</Link>
				<Link to="/habbit/exampleId">
					<div className={c.habbit_item}></div>
				</Link>
				<Link to="/habbit/exampleId">
					<div className={c.habbit_item}></div>
				</Link>
			</div>
		</>
	);
};
