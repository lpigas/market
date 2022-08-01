import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'
import LayoutBuy from '../../components/layout/buyer/LayoutBuy'
import EnterProduct from '../../scenes/buyer/EnterProduct'


export default function products() {
  const [group, setGroup] = useState()
  const [productData, setProductData] = useState([])
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(+router.query._page || 2)
  const [limit, setLimit] = useState(+router.query._limit || 10)
  


  const addLocal = () => {
    if (typeof window !== "undefined") {
      setGroup( JSON.parse(window.localStorage.getItem("Group")));
    }
  };
  useEffect(()=>{
    addLocal()
    router.push(
      `?_limit=${+router.query._limit || 10}&_page=${+router.query._page || 1}`
    );
  },[])

  useEffect(() => {
    if(group){
      getbuyerGroup()
    }
  }, [group])
  
  const getbuyerGroup = async () => {
    setLoading(true)
    try {
      // Delete post
      const get = await fetch(`${process.env.API_HOST}productdata`, {
        method: "GET",
        'headers': {'infoGroup': group, page: page, limit: limit}
      });
      // reload the page
      const gets = await get.json();
        setProductData(gets.message)

    } catch (error) {
      console.log(error);
    } 
    setLoading(false)
  };
  console.log(productData)

  return (
    <LayoutBuy>
      <h1 className='text-3xl text-center'> {typeof group === 'undefined' ? 'Wait' : group.toUpperCase()} </h1>
      {
        loading ? 
          <div className='text-xl text-center'> Waiting load</div>
          : <div> 
            {productData.length > 0 ?
              <EnterProduct data={productData}/>
              : <h2 className='text-xl text-center'> No product yet in this group</h2>
            }
          </div>
      }

    </LayoutBuy>
  )
}
