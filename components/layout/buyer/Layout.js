import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { newtitle } from "../../../constants/functions/maketitle";
import Header from "../../../scenes/buyer/Header";

export default function Layout({ children }) {
  const router = useRouter();
  const title = newtitle(router);

  return (
    <div className="m-2">
      <Head>
        <title> {title}</title>
      </Head>

      <Header />
      <div> {children}</div>
    </div>
  );
}
