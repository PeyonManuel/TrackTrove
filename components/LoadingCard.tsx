import React from "react";

const LoadingCard = () => {
  return (
    <div className="flex flex-col">
      <div className="cover loading rounded" />
      <div className="title loading rounded mt-3" />
    </div>
  );
};

export default LoadingCard;
