import React, { useState } from "react";

interface Props {
  library: string;
  operation: string;
}

const UploadAndDisplayImage = ({ library, operation }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [modifiedImage, setModifiedImage] = useState<File | null>(null); // is it a file
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        sendImage(base64Image as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api-dot-imgtest-387100.ew.r.appspot.com"
      : "http://localhost:8080";

  const sendImage = (base64Image: string) => {
    fetch(`${baseUrl}/${library}/${operation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image, operation }), // include operation as param also
    })
      .then((response) => response.json())
      .then((data) => {
        setModifiedImage(data);
      })
      .catch((error) => {
        console.warn(error);
        setErrorMsg(error.name);
      });
  };

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="selectedImage"
          onChange={(event) => {
            if (event.target.files) {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }
          }}
        />
        <br />
        <br />
        <br />
        <button type="submit" className="big-button">
          Submit
        </button>
      </form>
      <br />
      {errorMsg && (
        <span className="error-msg">Failed to upload ({errorMsg})</span>
      )}
    </div>
  );
};

export default UploadAndDisplayImage;
