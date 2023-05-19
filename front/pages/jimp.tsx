import React from "react";
import Link from "next/link";
import "./globals.css";
import UploadAndDisplayImage from "@/components/uploader";

function Jimp() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <h1>Select an operation and a file to submit for processing</h1>
      <select defaultValue="gaussian">
        <option value="gaussian">
          Gaussian Blur
        </option>
        <option value="fastblur" disabled>Fast Blur</option>
        <option value="option3" disabled>Resize (longest side 500px)</option>
      </select>
      <UploadAndDisplayImage library="jimp" operation="gaussian"/>
    </>
  );
}

export default Jimp;
