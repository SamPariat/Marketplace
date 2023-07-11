import { useState } from "react";
import InputWithLabel from "../components/inputs/InputWithLabel";

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  const [signIn, setSignIn] = useState<boolean>(true);

  const toggleMode = (): void => setSignIn(!signIn);

  return (
    <div className="font-exo w-3/4 m-auto">
      <form method="post" className="flex flex-col items-center">
        {!signIn && (
          <InputWithLabel
            name="name"
            type="text"
            placeholder="Name"
            text="Name"
          />
        )}
        <InputWithLabel
          name="email"
          type="email"
          placeholder="Email"
          text="Email"
        />
        <InputWithLabel
          name="password"
          type="password"
          placeholder="Password"
          text="Password"
        />
        <button className="text-slate-200 dark:text-slate-900 bg-slate-900 dark:bg-slate-200 py-1 px-4 rounded-md w-1/3 my-4">
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
