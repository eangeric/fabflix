import React from "react";
import { LoginForm } from "../components/Login/LoginForm";
import {BgMain} from "../components/Assets/BgMain.jsx";

export default function Login() {
  return (
    <BgMain>
      <div className="flex justify-center items-center text-white text-2xl text-center">
        <LoginForm />
      </div>
    </BgMain>
  );
}
