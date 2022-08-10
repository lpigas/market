import React, { useState } from "react";
import { useEffect } from "react";
import StandButtons from "../../components/atoms/Buttons/standart/StandButtons";
import Uploader from "./components/upload";

export default function NewGroup() {
  const [newGroup, setNewGroupe] = useState({ name: "", img: "" });
  const addNewGroup = async () => {
    if (newGroup.name.length > 0 && newGroup.img.length > 0) {
      try {
        await fetch(`${process.env.API_HOST}group`, {
          method: "POST",
          body: JSON.stringify(newGroup),
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    newGroup.name.length > 0 && newGroup.img.length > 0 && addNewGroup();
    console.log("her");
  }, [newGroup]);
  return (
    <div>
      <div>
        <Uploader newGroup={newGroup} setNewGroupe={setNewGroupe} />
      </div>
      <div className="text-right"></div>
    </div>
  );
}
