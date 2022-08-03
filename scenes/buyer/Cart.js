import React from "react";
import Close from "../../components/atoms/Buttons/close/Close";

export default function Cart({ data, change, deleteProdCart, setVisible, focus }) {
  return (
    <div>
      <div>
        <div className="text-right">
          <Close setVisible={setVisible} />
        </div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={Math.random() + index} className="flex w-full">
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
          ))
        ) : (
          <h1 className="text-center"> Cart is Empty</h1>
        )}
      </div>
    </div>
  );
}
