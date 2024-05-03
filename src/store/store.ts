import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chats/chat-slice";
import { taskListSlice } from "./tasks/task-list-slice";
import { userSlice } from "./user/user-slice";
import { authSlice } from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    taskList: taskListSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
