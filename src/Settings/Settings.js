import React, { useState } from "react";
import Header from "../Header/Header";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import './Settings.css'

export default function Settings() {
  return (
    <>
      <Header />
      <main className="settings">
        <div className="settings__title-container">
          <h1 className="settings__title">account settings</h1>
        </div>
        <section className="settings__update-profile">
          <h2 className="settings__setting-title">update profile</h2>
          {/* Placeholder */}
          <div className="settings__placeholder">
            <p className="settings__placeholder-text">
              Placeholder for profile info
            </p>
          </div>
        </section>
        <section className="settings__manage-cities">
          <h2 className="settings__setting-title">manage cities</h2>
          {/* Placeholder */}
          <div className="settings__placeholder">
            <p className="settings__placeholder-text">
              Placeholder for cities
            </p>
          </div>
        </section>
        <section className="settings__delete-account">
          <h2 className="settings__setting-title">delete account</h2>
          <DeleteAccount />
        </section>
      </main>
    </>
  );
}
