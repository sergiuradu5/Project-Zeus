import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BE_getChats } from "./backend/chat-queries";
import ProtectedRoute from "./components/Utility/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import ChatPage from "./pages/ChatPage";
import Layout from "./pages/Layout";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      BE_getChats(dispatch);
    }
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Allowed only if not authenticated*/}
          <Route
            path="/auth"
            element={
              <ProtectedRoute
                redirectPath="/dashboard"
                isAllowed={!isAuthenticated}
              >
                <LoginPage />
              </ProtectedRoute>
            }
          />
          {/* Allowed only if authenticated*/}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectPath="/auth" isAllowed={isAuthenticated}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ListPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
