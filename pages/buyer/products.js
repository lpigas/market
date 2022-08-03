import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";
import LayoutBuy from "../../components/layout/buyer/LayoutBuy";
import PageLimitBlock from "../../components/moleculs/PageLimitBlock/PageLimitBlock";
import EnterProduct from "../../scenes/buyer/EnterProduct";

export default function products() {
  const [group, setGroup] = useState();
  const [productData, setProductData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [numPage, setNumPage] = useState(router.query._page || 1);
  const [fullLength, setFullLength] = useState(1);
  const [limitPage, setLimitPage] = useState(+router.query._limit || 10);
  const [totalPage, setTotalPage] = useState(Math.ceil(fullLength / limitPage));

  const addLocal = () => {
    if (typeof window !== "undefined") {
      setGroup(JSON.parse(window.localStorage.getItem("Group")));
    }
  };
  useEffect(() => {
    addLocal();
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(fullLength / limitPage));
  }, [fullLength]);

  useEffect(() => {
    if (group) {
      getbuyerGroup();
    }
  }, [group]);

  useEffect(() => {
    getbuyerGroup();
  }, [numPage]);

  useEffect(() => {
    setTotalPage(Math.ceil(fullLength / +router.query._limit));
    if (Math.ceil(fullLength / +router.query._limit) < +router.query._page) {
      router.push(
        `?_limit=${router.query._limit}&_page=${Math.ceil(
          fullLength / +router.query._limit
        )}`
      );
    }
    getbuyerGroup();
  }, [limitPage]);

  useEffect(() => {
    setLimitPage(router.query._limit);
    setNumPage(router.query._page);
  }, [router]);

  const getbuyerGroup = async () => {
    setLoading(true);
    try {
      const get = await fetch(`${process.env.API_HOST}productdata`, {
        method: "GET",
        headers: { infoGroup: group, page: numPage, limit: limitPage },
      });
      const gets = await get.json();
      setProductData(gets.message.data);
      setFullLength(gets.message.fulllength);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <LayoutBuy>
      <h1 className="text-3xl text-center">
        {" "}
        {typeof group === "undefined" ? "Wait" : group.toUpperCase()}{" "}
      </h1>
      {loading ? (
        <div className="text-xl text-center"> Waiting load</div>
      ) : (
        <div>
          {typeof productData !== "undefined" && productData.length > 0 ? (
            <div>
              <PageLimitBlock
                numPage={numPage}
                totalPage={totalPage}
                limitPage={limitPage}
              />
              <EnterProduct data={productData} />
            </div>
          ) : (
            <h2 className="text-xl text-center">
              {" "}
              No product yet in this group
            </h2>
          )}
        </div>
      )}
    </LayoutBuy>
  );
}
