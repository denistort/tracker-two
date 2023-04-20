import { createBrowserRouter } from "react-router-dom";
import { Auth, loader } from "../pages/Auth/Auth";
import { Home } from "../pages/Home/Home";
import { HabbitDetail } from "../pages/HabbitDetail/HabbitDetail";
import { Profile } from "../pages/Profile/Profile";
import { withLayout } from "../Hocs/wittLayout";

const HomePage = withLayout(Home);
const HabbitPage = withLayout(HabbitDetail);
const ProfilePage = withLayout(Profile);

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/auth",
		element: <Auth />,
		loader: loader
	},
	{
		path: "/habbit/:id",
		element: <HabbitPage />,
	},
	{
		path: "/profile",
		element: <ProfilePage />,
	},
]);
