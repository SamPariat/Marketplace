import { FormEvent, useState } from "react";

import InputWithLabel from "../components/inputs/InputWithLabel";
import { login } from "../api/auth-api";

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signIn, setSignIn] = useState<boolean>(true);

  const toggleMode = (): void => setSignIn(!signIn);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login({
      email,
      password,
    });
  };

  return (
    <div className="font-exo w-3/4 h-full m-auto">
      <form
        method="post"
        className="flex flex-col h-full items-center justify-center"
        onSubmit={handleFormSubmit}
      >
        {!signIn && (
          <InputWithLabel
            name="name"
            type="text"
            placeholder="Name"
            text="Name"
            value={name}
            changeHandler={setName}
          />
        )}
        <InputWithLabel
          name="email"
          type="email"
          placeholder="Email"
          text="Email"
          value={email}
          changeHandler={setEmail}
        />
        <InputWithLabel
          name="password"
          type="password"
          placeholder="Password"
          text="Password"
          value={password}
          changeHandler={setPassword}
        />
        <button
          className="text-slate-900 dark:text-slate-200 font-semibold bg-blue-300 hover:bg-blue-500 dark:bg-blue-400 dark:hover:bg-blue-400 transition duration-300 ease-out hover:ease-in py-1 px-4 rounded-md w-1/3 my-4"
          type="submit"
        >
          {signIn ? "Sign In" : "Create Account"}
        </button>
        <span className="flex flex-row text-xs">
          {signIn ? (
            <>
              <p className="text-slate-900 dark:text-slate-200">
                Don't have an account?
              </p>
              <p
                onClick={toggleMode}
                className="underline hover:cursor-pointer ml-2 text-slate-900 dark:text-slate-200"
              >
                Create account
              </p>
            </>
          ) : (
            <>
              <p className="text-slate-900 dark:text-slate-200">
                Already have an account?
              </p>
              <p
                onClick={toggleMode}
                className="underline hover:cursor-pointer ml-2 text-slate-900 dark:text-slate-200"
              >
                Sign in
              </p>
            </>
          )}
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
