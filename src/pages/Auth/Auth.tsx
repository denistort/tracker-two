import { LoaderFunction, useLoaderData } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const tab = url.searchParams.get("tab");
	return { tab };
};

export type ReturnLoaderAuth = ReturnType<typeof loader>;

export const Auth = () => {
	const { tab } = useLoaderData() as { tab: string };
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
