import React, { useState,useEffect } from 'react'
import LayoutBuy from '../../components/layout/buyer/LayoutBuy'
export default function products() {
  const [group, setGroup] = useState()
  const [productData, setProductData] = useState()


  const addLocal = () => {
    if (typeof window !== "undefined") {
      setGroup( JSON.parse(window.localStorage.getItem("Group")));
    }
  };
  useEffect(()=>{
    addLocal()

  },[])
  useEffect(() => {
    if(group){
      getbuyerGroup()
    }

  }, [group])
  
  const getbuyerGroup = async () => {
    try {
      // Delete post
      const get = await fetch(`${process.env.API_HOST}productdata`, {
        method: "GET",
        'headers': {'infoGroup': group}
      });
      // reload the page
      const gets = await get.json();
      if (gets.message.length>0){
        setProductData(gets.message)
      }
    } catch (error) {
      alert(error);
    } 
  };

  console.log(productData)
  return (
    <LayoutBuy>
      
      {group}
    </LayoutBuy>
  )
}
