"use client";

import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

type ImageProp = {
  src: string;
  alt: string;
  classNames?: string;
  priority?: boolean;
};

const ImageComponent: React.FC<ImageProp> = ({ src, alt, classNames = "", priority = false }) => {
  const [loading, setLoading] = useState(true);

  if (!src) {
    return (
      <div className="w-full h-full bg-gray-300 flex justify-center items-center">
        <PhotoIcon className="h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-gray-100">
          <CircularProgress color="primary" />
        </div>
      )}
      <Image
        src={src}
        alt={alt || "Image"}
        className={classNames}
        fill
        priority={priority}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default ImageComponent;
