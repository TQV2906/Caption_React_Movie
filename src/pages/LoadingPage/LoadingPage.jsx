import React from "react";
import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";

export default function LoadingPage() {
  let { isLoading } = useSelector((state) => {
    return state.loadingSlice;
  });
  console.log("isLoading: ", isLoading);

  if (!isLoading) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClockLoader color="#FFB8E0" size={200} speedMultiplier={3} />
    </div>
  );
}
