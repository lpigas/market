import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [groupData, setGroupData] = useState();
  const getbuyerGroup = async () => {
    try {
      // Delete post
      const get = await fetch(`${process.env.API_HOST}group`, {
        method: "GET",
      });
      // reload the page
      const gets = await get.json();
      setGroupData(gets.message);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getbuyerGroup();
  }, []);
  const routGroup = (groupName) => {
    const group = groupName.toLowerCase();
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem('Group', JSON.stringify(group));
    }
    router.push(`${router.asPath}/products`);
  };
  
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/b-letter-boutique-logo-design-159417325.jpg')",
      }}
    >
      <div className="flex justify-between m-2 flex-wrap">
        { typeof groupData !== 'undefined' &&
          groupData.map((group) => (
            <div
              key={Math.random()}
              className={`m-2 w-3/12 text-white h-56 flex text-4xl justify-center items-center bg-cover opacity-50 hover:opacity-100`}
              style={{ backgroundImage: `url(${group.img})` }}
              onClick={() => routGroup(group.name)}
            >
              {group.name}
            </div>
          ))}
      </div>
    </div>
  );
}
