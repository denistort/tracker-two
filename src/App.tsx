import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import NotificationsSystem, { wyboTheme, useNotifications } from 'reapop';
import { TopNotification } from './components/TopNotification/TopNotification';
import { useAppSelector } from './store/hocs';

function App() {
	const { notifications, dismissNotification } = useNotifications();
	const { userCredentials } = useAppSelector((state) => state.userReducer);
	return (
		<div className="app">
			<TopNotification
				type={'error'}
				parentId={'notification'}
				isOpen={
					userCredentials
						? userCredentials.email_confirmed === 'not'
						: false
				}
			>
				<span>
					На почту <b>{userCredentials?.email}</b>
					было выслано письмо с подтверждение перейдите по ссылке и
					активируйте аккаунт
				</span>
			</TopNotification>
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
