import { FunctionComponent } from "react";
import { useAppSelector } from "../store/hocs";

export const withRequiredAuth = (Component: FunctionComponent) => {
	const { data } = useAppSelector(state => state.userReducer);
	if (data) {

	}
	return (...args: any) => {
		return (
			<Component {...args}/>
		)
	}
}