import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import NotificationsSystem, { wyboTheme,useNotifications } from "reapop";

function App() {
	const { notifications, dismissNotification } = useNotifications();

	return (
		<div className="app">
			<NotificationsSystem
				// 2. Pass the notifications you want Reapop to display.
				notifications={notifications}
				// 3. Pass the function used to dismiss a notification.
				dismissNotification={(id) => dismissNotification(id)}
				// 4. Pass a builtIn theme or a custom theme.
				theme={wyboTheme}
			/>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
