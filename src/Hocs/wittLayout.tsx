import { Panel } from "../components/Panel/Panel";

export const withLayout = (Component: any) => () =>
	(
		<>
			<Panel></Panel>
			<div className="content">
				<Component></Component>
			</div>
		</>
	);
