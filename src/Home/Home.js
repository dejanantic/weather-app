import React, { useState } from "react";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import Form from "../Form/Form";
import LastUpdate from "./LastUpdate/LastUpdate";
import { getCities } from "../utils/api";
import "./Home.css";

export default function Home() {
  const [cityList, setCityList] = useState(() => getCities());

  const handleCityListUpdate = () => {
    setCityList(getCities());
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
    </div>
  );
}
