import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { newtitle } from "../../../../constants/functions/maketitle";

export default function Titels({ children }) {
  const router = useRouter();
  const title = newtitle(router);
  return (
    <div>
      <Head>
        <title> {title}</title>
      </Head>
      <div> {children}</div>
    </div>
  );
}
