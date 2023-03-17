import { configureStore } from "@reduxjs/toolkit";
import ComponentSlice from "./slices/ComponentSlice";

const store = configureStore({
  reducer: {
    component: ComponentSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
