import { LoaderFunction, useLoaderData } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { useAppSelector } from "../../store/hocs";
import { redirect } from "react-router-dom";

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const tab = url.searchParams.get("tab");
	return { tab };
};

export type ReturnLoaderAuth = ReturnType<typeof loader>;

export const Auth = () => {
	const { tab } = useLoaderData() as { tab: string };
	const { data } = useAppSelector((state) => state.userReducer);
	if (data) {
		redirect("/");
	}
	console.log(tab);
	return (
		<>
			<div className="auth-page__wrapper">
				<img
					className="auth-page__image"
					src="/images/logo.svg"
					alt="логотип habbit"
				/>
				{tab === "sign-in" ? <SignInForm /> : <SignUpForm />}
			</div>
		</>
	);
};
