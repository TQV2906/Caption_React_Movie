import React from "react";
import Header from "../components/Header/Header";

export default function Template({ content }) {
  return (
    <div>
      <Header />
      <div>{content}</div>
    </div>
  );
}
