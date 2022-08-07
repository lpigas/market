import React, { useEffect, useState } from "react";
import StandButtons from "../../../components/atoms/Buttons/standart/StandButtons";
import MyModal from "../../../components/atoms/Modals/modal/MyModal";



export default function AddMany({
  setArrayallProduct,
  oneData,
  group,
  onClick,
}) {
  const [full, setFull] = useState([]);
  const [display, setDisplay] = useState("flex");
  const [arrLength, setArrLength] = useState(0);
  const [valid, setValid] = useState(false)
  const [modalError, setModalError] = useState(false)

  const chageHowmany = () => {
    setDisplay("hidden");
    const x =[]
    for (let i = 0; i < arrLength; i++) {
      x.push({...oneData})
    }
    setFull(x)
  };
  const changeData = (index,e,type)=>{
    const fulls = full;
    fulls[index][type] = e;
    setFull(fulls)
  }
  const added = () =>{
    const test = full;
    let v = false
    
    for(let i = 0; i< test.length; i++){
      v = test[i].id.length >0 && test[i].leftovers > 0 && test[i].name.length > 0 && test[i].price > 0 && test[i].group.length > 0 && test[i].measurement.length > 0
      if (v=== false){
        setModalError(true)
        setTimeout(()=>{
          setModalError(false)
        }, 1500)
        return v
      }   
    }
    setValid(v)
    if (v){
      setArrayallProduct(full)
    } 
  }
  const reset = () =>{
    setFull([])
    setValid(false)
    setDisplay('flex')
    setArrayallProduct()
  }

  return (
    <div className="text-left m-5">
      <div disabled={true} className={`m-3 ${display} justify-center`}>
        <div>How many products add</div>
        <input
          onChange={(e) => setArrLength(+e.target.value)}
          type={`number`}
          className="w-12 mx-2"
        ></input>
        <button
          onClick={chageHowmany}
          className="mx-2 border-2 border-white w-10 bg-green-600 rounded-lg"
        >
          {" "}
          Ok
        </button>
      </div>
      {full.length > 0 && (
        <table className="w-full border-2 bg-gray-500">
          <thead className="p-2">
            <tr className="text-center">
              <td className="border-2 w-1/12">Id</td>
              <td className="border-2 w-4/12">Name</td>
              <td className="border-2 w-1/12">Price</td>
              <td className="border-2 w-1/12">Measurement</td>
              <td className="border-2 w-1/12">Leftovers</td>
              <td className="border-2 w-3/12">Group</td>
            </tr>
          </thead>
          <tbody className="m-2">
            {!valid ?
            full.map((item, index) => (
              <tr key={Math.random()}>
                <td className={`w-1/12 border-2 my-2 `}>
                <input placeholder="Id" disabled={valid} className={`w-full`} type={'text'} required onChange={e=> changeData(index, e.target.value, 'id')}/>
                </td>
                <td className="border-2 w-4/12">
                  <input placeholder="Name" disabled={valid} className="w-full" onChange={e=> changeData(index, e.target.value, 'name')}/>
                </td>
                <td className="border-2 w-1/12">
                  <input type={`number`} disabled={valid} placeholder="Price" className="w-full"  onChange={e=> changeData(index, +e.target.value, 'price')}/>
                </td>
                <td className="border-2 w-1/12">
                  <input placeholder="Measurement" disabled={valid} className="w-full" onChange={e=> changeData(index, e.target.value, 'measurement')}/></td>
                <td className="border-2 w-1/12">
                  <input type={'number'}  disabled={valid} placeholder="Leftovers"  className="w-full" onChange={e=> changeData(index, e.target.value, 'leftovers')}/>
                </td>
                <td className="border-2 w-3/12">
                  <select  className="w-full" disabled={valid} onChange={e=> changeData(index, e.target.value, 'group')}>
                    <option>Change group</option>
                    {group.map((item) => (
                      <option key={item.name} value={item.name.toLowerCase()}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
            : full.map((item, index) => (
              <tr key={Math.random()}>
                <td className="border-2 w-1/12">
                <input placeholder="Name" disabled={valid} className="w-full" value={item.id}/>
                </td>
                <td className="border-2 w-4/12">
                  <input placeholder="Name" disabled={valid} className="w-full" value={item.name}/>
                </td>
                <td className="border-2 w-1/12">
                  <input type={`number`} disabled={valid} placeholder="Price" className="w-full" value={item.price}/>
                </td>
                <td className="border-2 w-1/12">
                  <input placeholder="Measurement" disabled={valid} className="w-full" value={item.measurement}/></td>
                <td className="border-2 w-1/12">
                  <input type={'number'}  disabled={valid} placeholder="Leftovers"  className="w-full" value={item.leftovers}/>
                </td>
                <td className="border-2 w-3/12">
                  <select  className="w-full" disabled={valid} value={item.group}>
                    <option>Change group</option>
                    {group.map((item) => (
                      <option key={item.name} value={item.name.toLowerCase()}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          }
            
          </tbody>
        </table>
      )}
      <div className="m-2 text-right">
      <StandButtons size="xxl" color="lime" onClick={added} value={"Test all aded"}></StandButtons>
      </div>
      <div className="m-2 flex justify-end">

      <StandButtons size="xl" color={'amber'} value={'Reset'} onClick={reset}/>
      <StandButtons size="xl" color={valid ? 'amber' : 'dark'} disabled={!valid} value={'Add'} onClick={onClick}/>
      </div>
      <MyModal visible={modalError} setVisible={setModalError} width={500}>
          <div className="flex justify-center items-center text-3xl h-24"> Error, please fill in all fields </div>
      </MyModal>
    </div>
  );
}
