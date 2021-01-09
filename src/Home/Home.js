import React, { useState } from "react";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import Form from "../Form/Form";
import LastUpdate from "./LastUpdate/LastUpdate";
import { ToastContainer, toast } from "react-toastify";
import { getCities, saveCity } from "../utils/api";
import "./Home.css";
import "./CustomToast.css";

export default function Home() {
  const [cityList, setCityList] = useState(() => getCities());

  const handleCityListUpdate = (city) => {
    saveCity(city)
      .then(() => setCityList(getCities()))
      .catch(error => toast.info(error.message))
  };

  const isCityListEmpty = cityList.length === 0 ? true : false;

  return (
    <div className="container">
      <Form handleCityListUpdate={handleCityListUpdate} />
      {isCityListEmpty ? (
        <Welcome />
      ) : (
        <>
          <Cities cityList={cityList} />
          <LastUpdate />
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
