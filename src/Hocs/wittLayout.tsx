import { Panel } from "../components/Panel/Panel";
import { setUpNotifications } from "reapop";

// run this function when your application starts before creating any notifications
setUpNotifications({
	defaultProps: {
		position: "top-right",
		dismissible: true,
	},
});
export const withLayout = (Component: any) => () =>
	(
		<>
			<Panel></Panel>
			<div className="content">
				<Component></Component>
			</div>
		</>
	);
