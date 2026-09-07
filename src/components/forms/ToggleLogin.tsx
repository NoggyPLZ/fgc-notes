"use client";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Button from "../ui/Button";
import { useState } from "react";
import ConfirmEmail from "./pwreset/ConfirmEmail";

type ToggleFormType = "signup" | "login" | "forgot";

export default function ToggleLogin() {
  const [toggleForm, setToggleForm] = useState<ToggleFormType>("signup");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as ToggleFormType;
    setToggleForm(value);
  };

  return (
    <div className="bg-neutral-900 md:max-w-[600px] mx-auto text-gray-100 relative outer-clip">
      <div className="clip"></div>
      {!toggleForm && (
        <div className="flex flex-col p-2 md:p-5 rounded-2xl mx-auto gap-5">
          <Button onClick={handleClick} value="login" style="primary">
            Log in
          </Button>
          <Button onClick={handleClick} value="signup" style="secondary">
            Sign Up
          </Button>
          {/* <Button onClick={handleClick} value="forgot" style="secondary">
            Forgot password ?
          </Button> */}
        </div>
      )}

      {toggleForm === "login" && <Login handleClick={handleClick} />}
      {toggleForm === "signup" && <Signup handleClick={handleClick} />}
      {toggleForm === "forgot" && <ConfirmEmail handleClick={handleClick} />}
    </div>
  );
}
