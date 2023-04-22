import { createBrowserRouter } from 'react-router-dom';
import { Auth, loader } from '../pages/Auth/Auth';
import { Home } from '../pages/Home/Home';
import { HabbitDetail } from '../pages/HabbitDetail/HabbitDetail';
import { Profile, profileLoader } from '../pages/Profile/Profile';
import { withLayout } from '../Hocs/wittLayout';
import { PrivateRoute } from '../components/PrivateRoute';

const HomePage = withLayout(Home);
const HabbitPage = withLayout(HabbitDetail);
const ProfilePage = withLayout(Profile);

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<PrivateRoute>
				<HomePage />,
			</PrivateRoute>
		),
	},
	{
		path: '/auth',
		element: <Auth />,
		loader: loader,
	},
	{
		path: '/habbit/:id',
		element: (
			<PrivateRoute>
				<HabbitPage />
			</PrivateRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<PrivateRoute>
				<ProfilePage />
			</PrivateRoute>
		),
		loader: profileLoader,
	},
]);
