import Head from "next/head";
import React from "react";
import Login from "../scenes/enter/Login";

export default function Home() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <Head>
        {" "}
        <title>Login menu</title>
      </Head>
      <Login />
    </div>
  );
}
