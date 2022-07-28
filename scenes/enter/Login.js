import { useRouter } from "next/router";
import React, { useState } from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";

export default function login() {
  const [showPass, setShowPass] = useState(false);
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const router = useRouter();
  const test = () => {
    router.push("/buyer");
  };
  return (
    <div>
      <div className="min-w-min min-h-min p-4 bg-blue-600 flex flex-col rounded-3xl border-black border-2 drop-shadow-[0_35px_35px_rgba(0,5,0,0.6)]">
        <p className="m-auto">Enter in base</p>
        <div>
          <input
            className="m-2"
            onChange={(e) =>
              setLoginData({ ...loginData, login: e.target.value })
            }
          ></input>{" "}
          Enter your login
        </div>
        <div>
          <input
            type={`${showPass ? "text" : "password"}`}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="m-2"
          ></input>{" "}
          Enter your password
        </div>
        <label htmlFor="showPass">
          <input
            id="showPass"
            type={`checkbox`}
            onChange={(e) => setShowPass(e.target.checked)}
          />{" "}
          Show password
        </label>
        <div className="m-2 text-right">
          <StandButtons value={"Enter"} size="xl" color="lime" onClick={test} />
        </div>
      </div>
    </div>
  );
}
