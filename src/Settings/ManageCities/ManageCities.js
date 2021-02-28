import React, { useState, useEffect } from "react";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa"
import { useAuth } from "../../contexts/AuthContext";
import { streamCities, deleteCity } from "../../utils/databaseService";
import "./ManageCities.css";

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
      error: (error) => {
        if (isMounted) {
          toast.error(error.message);
          setError(error.message);
          setLoading(false);
        }
      }
    });

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [uid]);

  if (error) {
    <p>{error}. Try refreshing the page.</p>
  }

  return (
    <ul className="manage-cities">
      {loading ? (
        <Loading loadingMessage="Loading cities" />
      ) : (
        cities.length === 0 ? (
          <li className="manage-cities__empty">No cities</li>
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
                <FaTrashAlt />
              </button>
            </li>
          );
        })
        )
      )}
    </ul>
  );
}
