import React, { useState } from "react";
import Header from "../Header/Header";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import "./Settings.css";
import ManageCities from "./ManageCities/ManageCities";

// TODO: remove settings and add city icons
// TODO: manage cities section

export default function Settings() {
  return (
    <>
      <Header />
      <main className="settings">
        <div className="settings__title-container">
          <h1 className="settings__title">account settings</h1>
        </div>
        <div className="settings__sections">
          <section className="settings__update-profile">
            <h2 className="settings__setting-title">update profile</h2>
            <div className="settings__section">
              <UpdateProfile />
            </div>
          </section>
          <section className="settings__manage-cities">
            <h2 className="settings__setting-title">manage cities</h2>
            <div className="settings__section">
              <ManageCities />
            </div>
          </section>
          <section className="settings__delete-account">
            <h2 className="settings__setting-title">delete account</h2>
            <DeleteAccount />
          </section>
        </div>
      </main>
    </>
  );
}
