import { useState } from "react";
import Head from "next/head";
import StandButton from "../../../components/atoms/Buttons/standart/StandButtons";

export default function upload({ newGroup, setNewGroupe }) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dzix3j1li/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const datas = await data.json();

    setImageSrc(datas.secure_url);
    setUploadData(datas);
    setNewGroupe({ ...newGroup, img: datas.secure_url });
  }
  // console.log(newGroup)
  return (
    <div>
      <Head>
        <meta name="description" content="Upload your image to Cloudinary!" />
      </Head>

      <main>
        <div>
          {" "}
          <input
            className="border-2 w-4/6 m-4"
            type={"text"}
            placeholder="Enter name Group"
            onChange={(e) =>
              setNewGroupe({ ...newGroup, name: e.target.value })
            }
          ></input>{" "}
          Enter name{" "}
        </div>
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input className="w-4/6 m-4" type="file" name="file" />
          </p>

          {imageSrc && !uploadData && newGroup.name.length > 0 && (
            <StandButton value={"Add group"} />
          )}
        </form>
      </main>
    </div>
  );
}
