"use client";
import { UserContext } from "@/app/(header)/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { Toaster, toast } from "sonner";

function Login() {
  const router = useRouter();

  const { login, isLogged } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const handleLogin = () => {
    const log = login({
      email: email,
      password: password,
    });
  };

  if (isLogged) {
    router.push("/");
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Toaster richColors position="top-right" />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/c7f07b68-7989-4ff7-a31e-11c17dcc2fea/ed8587e8-c544-4479-9e51-5547b77f9ff6/AR-es-20240422-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt=""
        className="w-full h-full object-cover opacity-50 absolute"
      />
      <div className="relative justify-between flex flex-col gap-4 h-[55vh] bg-black px-8 py-12 rounded-md bg-opacity-80">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-[2em] mb-4">Login</h2>
          <input
            className="w-[350px] h-[2.5em] bg-[#0000005d] border-[#525252] border-[2px] rounded-md px-4 "
            required
            type="mail"
            placeholder="Email address"
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <input
            className="w-[350px] h-[2.5em] bg-[#0000005d] border-[#525252] border-[2px] rounded-md px-4 "
            required
            type="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="hover:bg-[#c11119] mt-4 duration-300 bg-[#e10a15] py-2 rounded-md font-medium "
          >
            Login
          </button>
          <p className="text-center hover:text-gray-400 hover:underline cursor-pointer">
            Forgot your password?
          </p>
        </div>
        <p className="text-gray-400 text-center">
          First time on Movieflix?{" "}
          <span
            onClick={() => router.replace("/auth/signin")}
            className="text-white font-medium  hover:underline cursor-pointer"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
