import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { NotificationsProvider } from "reapop";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<NotificationsProvider>
			<App />
		</NotificationsProvider>
	</React.StrictMode>
);
