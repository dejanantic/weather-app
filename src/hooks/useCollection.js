import { useReducer, useEffect } from "react";

async function collectionFetcReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        value: action.payload
      }
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      throw new Error("Action type not supported")
  }
}

export function useCollection(query) {
  const [{ value, loading, error }, dispatch] = useReducer(collectionFetcReducer, {
    value: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchCollection() {
      dispatch({ type: "FETCH_INIT" })

      try {
        const querySnapshot = await query.get()
        
        if (isMounted) dispatch({
          type: "FETCH_SUCCESS",
          payload: querySnapshot,
        })
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          error: error,
        })
      }
    }

    fetchCollection();

    return () => {
      isMounted = false;
    }
  }, [query])

  console.log(value, loading, error);

  return [value, loading, error];
}
