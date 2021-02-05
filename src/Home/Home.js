import React, { useState } from "react";
import Header from "../Header/Header";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import LastUpdate from "./LastUpdate/LastUpdate";
import { toast } from "react-toastify";
import { getCities, saveCity } from "../utils/api";
// import "./Home.css";

export default function Home() {
  const [cityList, setCityList] = useState(() => getCities());

  const handleCityListUpdate = (city) => {
    saveCity(city)
      .then(() => setCityList(getCities()))
      .catch((error) => toast.error(error.message));
  };

  const isCityListEmpty = cityList.length === 0 ? true : false;

  return (
    <>
      <Header handleCityListUpdate={handleCityListUpdate} />
      {isCityListEmpty ? (
        <Welcome />
      ) : (
        <>
          <Cities cityList={cityList} />
          <LastUpdate />
        </>
      )}
    </>
  );
}
