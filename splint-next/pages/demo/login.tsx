import React from "react";
import { AuthButtons } from "../../src/components/shared/auth";

const Login = () => {
  return (
    <div className="v-screen h-screen flex items-center justify-center">
      <h1>Login</h1>
      <AuthButtons />
    </div>
  );
};

export default Login;
