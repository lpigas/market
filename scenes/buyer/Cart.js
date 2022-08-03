import React from "react";
import Close from "../../components/atoms/Buttons/close/Close";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";

export default function Cart({ data, change, deleteProdCart, setVisible, focus, agree, totalOrder}) {
    const valid = data.findIndex(item => item.pcs > item.leftovers) === -1
    console.log(valid)
  return (
    <div>
      <div>
        <div className="text-right">
          <Close setVisible={setVisible} />
        </div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div  key={Math.random() + index}>
            <div className="flex w-full">
              <div className="border-2 w-1/12">{index + 1} </div>
              <div className="border-2 w-6/12">{item.name} </div>
              <div className="border-2 w-2/12">{item.price} USD </div>
              <div className="border-2 w-2/12">
                <input
                  type={"number"}
                  onChange={(e) => change(item, +e.target.value)}
                  value={item.pcs}
                  className="w-1/2"
                  autoFocus={focus?focus._id === item._id : false}
                ></input>
                pcs
              </div>
              <button
                onClick={() => deleteProdCart(item)}
                className="border-2 w-1/12 text-red-600 text-center"
              >
                X
              </button>
            </div>
            {item.pcs > item.leftovers &&
            <div className="text-red-600 text-center"> more items in the order than in stock </div>
            }
            </div>
          ))
        ) : (
          <h1 className="text-center"> Cart is Empty</h1>
        )}
      </div>
      <div className="text-right text-2xl m-4">
        Total: {totalOrder}
      </div>
      <div className="text-right" >
      <StandButtons onClick={agree} value='Agree' size="xl" color="red" disabled={(data.length>0 && valid)?false: true}/>

      </div>
    </div>
  );
}
