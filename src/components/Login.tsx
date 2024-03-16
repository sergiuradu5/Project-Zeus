import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BE_signIn, BE_signUp } from "../backend/queries";
import { useAppDispatch } from "../hooks/redux-hooks";
import Button from "./UI/Button";
import Input from "./UI/Input";

type LoginProps = {};
const Login = (props: LoginProps) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useAppDispatch();

  async function handleSignup() {
    const data = { email, password, confirmPassword };
    BE_signUp(data, setSignUpLoading, goTo, dispatch, resetForm);
  }

  async function handleSignin() {
    const data = { email, password };
    BE_signIn(data, setSignInLoading, goTo, dispatch, resetForm);
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  function handleToggleMode() {
    setLogin((prevState) => !prevState);
  }
  return (
    <div className="w-full md:w-[500px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-5 md:mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="flex flex-col gap-3 bg-white p-6 rounded-xl drop-shadow-xl">
        <Input
          type="email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        {!login && (
          <Input
            type="password"
            placeholder="Confirm password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
          />
        )}
        {login ? (
          <>
            <Button loading={signInLoading} onClick={handleSignin}>
              Login
            </Button>
            <Button secondary onClick={() => handleToggleMode()}>
              Switch to Register
            </Button>
          </>
        ) : (
          <>
            <Button loading={signUpLoading} onClick={handleSignup}>
              Register
            </Button>
            <Button secondary onClick={() => handleToggleMode()}>
              Switch to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
