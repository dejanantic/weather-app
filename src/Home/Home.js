import React, { useEffect, useState, useMemo, useRef } from "react";
import Header from "../Header/Header";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import LastUpdate from "./LastUpdate/LastUpdate";
import Loading from '../Loading/Loading'
import { toast } from "react-toastify";
import { getCities, saveCity } from "../utils/api";
import { firestore } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { useCollection } from "../hooks/useCollection"

export default function Home() {
  console.log('Home rendered')
  const [cityList, setCityList] = useState([]);
  const { currentUser: { uid } } = useAuth()
  const citiesRef = firestore.collection("cities")
  const query = citiesRef.where("owner", "==", uid)
  // let [value, loading, error] = useCollection(query)

  useEffect(() => {
    async function fetchCitiesFromFirestore() {
      try {
        const cities = [];

        queryRef.
      } catch (error) {

      }
    }
  }, [])

  const handleCityListUpdate = (city) => {
    saveCity(city)
      .then(() => setCityList(getCities()))
      .catch((error) => toast.error(error.message));
  };

  const isCityListEmpty = cityList.length === 0 ? true : false;

  return (
    <>
      <Header handleCityListUpdate={handleCityListUpdate} />
      {/* {isCityListEmpty ? (
        <Welcome />
      ) : (
        <>
          <Cities cityList={cityList} />
          <LastUpdate />
        </>
      )} */}
    </>
  );
}
