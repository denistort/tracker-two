import { createBrowserRouter } from 'react-router-dom';
import { Auth, loader } from '../pages/Auth/Auth';
import { Home, homeLoader } from '../pages/Home/Home';
import { HabbitDetail, habbitDetailLoader } from '../pages/HabbitDetail/HabbitDetail';
import { Profile, profileLoader } from '../pages/Profile/Profile';
import { withLayout } from '../Hocs/wittLayout';
import { PrivateRoute } from '../components/PrivateRoute';
import { PrivateForAuthentificated } from '../components/PrivateForAuthentificated';

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
		loader: homeLoader,
	},
	{
		path: '/auth',
		element: (
			<PrivateForAuthentificated>
				<Auth></Auth>
			</PrivateForAuthentificated>
		),
		loader: loader,
	},
	{
		path: '/habbit/:id',
		element: (
			<PrivateRoute>
				<HabbitPage />
			</PrivateRoute>
		),
		loader: habbitDetailLoader
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
