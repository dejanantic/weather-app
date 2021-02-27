import React, { useState, useEffect } from "react";
import Loading from "../../Loading/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { streamCities, deleteCity } from "../../utils/databaseService";
import "./ManageCities.css";

// 1. Get cities from database

export default function ManageCities() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
      setError(null);
    }

    const unsubscribe = streamCities(uid, {
      next: (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((documentSnapshot) => {
          cities.push({
            docId: documentSnapshot.id,
            name: documentSnapshot.data().name,
          });
        });

        if (isMounted) {
          setCities(cities);
          setLoading(false);
        }
      },
    });

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [uid]);

  return (
    <ul className="manage-cities">
      {loading && <Loading loadingMessage="Fetching cities" />}
      {cities.length === 0 ? (
        <li>No cities.</li>
      ) : (
        cities.map((city) => {
          return (
            <li className="manage-cities__city" key={city.docId}>
              <span className="manage-cities__city-name">{city.name}</span>
              <button
                className="manage-cities__delete-city"
                onClick={() => {
                  deleteCity(city.docId);
                }}
              >
                &times;
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
}
