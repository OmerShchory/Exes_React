import React from "react";
import { notFound } from "../Assets/images";

export default function NotFound() {
  return (
    <div className="notfound">
      <h2 style={{ fontWeight: "bold" }}>404 Error</h2>
      <h3 style={{ fontWeight: "bold" }}>Its seems you have been lost...</h3>
      <img src={notFound} alt="page not found 404" width="300" height="300" />
    </div>
  );
}
