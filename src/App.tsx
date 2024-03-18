import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Utility/ProtectedRoute";
import { useAppSelector } from "./hooks/redux-hooks";
import ChatPage from "./pages/ChatPage";
import Layout from "./pages/Layout";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const isAuthenticated = useAppSelector(
    (state) => !!state.user.currentUser.id
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Allowed only if authenticated*/}
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
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                redirectPath="/auth"
              />
            }
          >
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<ListPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
