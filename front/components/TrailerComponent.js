import React from "react";
import YouTube from "react-youtube";

function TrailerComponent({ trailer }) {
  console.log(trailer?.key);
  return <YouTube videoId={trailer?.key} />;
}

export default TrailerComponent;
