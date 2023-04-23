import ReactDOM from 'react-dom/client';
import App from './App';

import 'nprogress/nprogress.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './index.css';

import { NotificationsProvider } from 'reapop';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const store = setupStore();
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<NotificationsProvider>
					<App />
			</NotificationsProvider>
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
