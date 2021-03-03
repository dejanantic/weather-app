import React from "react";
import Header from "../Header/Header";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <>
      <Header isHome={false} />
        <main className="not-found">
          <h1 className="not-found__title">404 Page not found🌩️🌩️🌩️</h1>
        </main>
    </>
  );
}