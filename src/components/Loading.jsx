import React from "react";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-100 z-50">
      <div className="w-48 h-48">
        <Image
          src="/loading.gif"
          width={200}
          height={200}
          priority={true}
          className="w-full h-full"
          alt="Loading GIF"
        />
      </div>
    </div>
  );
};

export default Loading;
