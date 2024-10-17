"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface Props {
  setFile: (file: File) => void;
}

export default function ImagePicker({ setFile }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [pickedImage, setPickedImage] = useState<string | null>();
  function handleImageClick() {
    if (imageRef.current !== null) {
      imageRef.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setPickedImage(fileReader.result);
      setFile(file);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="">
        {!pickedImage && <p>No image picked yet</p>}
        {pickedImage && (
          <Image
            src={pickedImage}
            alt="Image selected by the user"
            width={500}
            height={500}
          />
        )}
      </div>
      <input
        className="hidden"
        type="file"
        id="image"
        accept="image/jpeg, image/png"
        name="image"
        ref={imageRef}
        onChange={handleImageChange}
      />
      <button
        className="px-5 py-2 bg-slate-500 text-white rounded-md"
        type="button"
        onClick={handleImageClick}
      >
        Pick an image
      </button>
    </div>
  );
}
