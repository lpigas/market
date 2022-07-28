import React, { useEffect, useState } from "react";

export default function Header() {
  const [groupData, setGroupData] = useState()
  const getbuyerGroup = async() => {
    try {
      // Delete post
      const get =  await fetch(`${process.env.API_HOST}group`, {
        method: "GET",
      });
      // reload the page
      const gets = await get.json()
      setGroupData(gets.message)
      } catch (error) {
        // stop deleting state
        // alert(error);
      }
  };
  useEffect(()=>{
    getbuyerGroup()
  },[])
  typeof groupData !== 'undefined' && console.log(groupData)
  return (
    <div className="min-h-56 flex flex-col">
      {(groupData !== undefined )&&
      groupData.map(group =>
      <div className="flex justify-between m-2 flex-wrap">
        <div
          key={Math.random()+ group.img}
          className={`w-4/12 h-56 flex text-2xl justify-center items-center bg-cover opacity-50 hover:opacity-100`}
          style={{backgroundImage: `url(${group.img})`}}
        >
          {group.name}
        </div>
      </div>
      )
      
      }
    </div>
  );
}
