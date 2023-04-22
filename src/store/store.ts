import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userSlice/userSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const rootReducer = combineReducers({
	userReducer,
});
const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const setupStore = () => {
	return configureStore({
		reducer: persistedReducer,
		devTools: true,
		middleware: [logger, thunk],
	});
};

// dispatch(createBoom({ name: 'wewe' }))
// actionCreator -> action -> reducer -> store //
// const reducer => (state, action) => {
//
// dispatch(() => {});
export type RootState = ReturnType<typeof rootReducer>;
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];