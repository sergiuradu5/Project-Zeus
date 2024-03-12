import Login from "../components/Login";
import Background from "../components/UI/Background";

type LoginPageProps = {};
const LoginPage = (props: LoginPageProps) => {
  return (
    <div className="h-[100vh] flex items-center justify-center p-6">
      <Login />
      <Background />
    </div>
  );
};
export default LoginPage;
