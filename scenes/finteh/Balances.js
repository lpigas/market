import React, { useEffect, useState } from 'react'
import StandButtons from '../../components/atoms/Buttons/standart/StandButtons'

export default function Balances() {
    const[group, setGroup] = useState()
    const[groupFound, setGroupFound] = useState()
    const[productData, setProductData] = useState()

    const getbuyerGroup = async () => {
        try {
          // Delete post
          const get = await fetch(`${process.env.API_HOST}group`, {
            method: "GET",
          });
          // reload the page
          const gets = await get.json();
          setGroup(gets.message);
        } catch (error) {
          alert(error);
        }
      };
      const getProductData = async (groupFound) =>{
        try {
            // Delete post
            const get = await fetch(`${process.env.API_HOST}productdatafin`, {
              method: "GET",
              headers: {infogroup: groupFound}
            });
            // reload the page
            const gets = await get.json();
            setProductData(gets.message.data);
          } catch (error) {
            alert(error);
          }
      }


      useEffect(()=>{
        getbuyerGroup()
      },[])


      useEffect(()=>{
        groupFound && getProductData(groupFound)

      },[groupFound])
      console.log(productData)
  return (
    <div className=' bg-slate-500 h-screen flex justify-center'>
        <div className='bg-green-400 w-10/12 h-5/6'>
            <select onChange={e=> setGroupFound(e.target.value.toLowerCase())}>
                <option>Groupe</option>
                {group &&
                group.map(item =>
                    <option key={item.name} value={item.name}>{item.name}</option>
                    )
                }

            </select>

        </div>

    </div>
  )
}
