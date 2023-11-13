import { useEffect, useState } from "react";

const APIKey = "a9cd3773";
const APIURL = `https://www.omdbapi.com/?apikey=${APIKey}&`;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // callback?.();
    // API to abort last fetch if a new one is made.
    const controller = new AbortController();

    // eslint-disable-next-line
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${APIURL}s=${query}`, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error(
            "The silly internet was acting up. Could not fetch these movies."
          );

        const data = await res.json();

        if (data.Response === "False")
          throw new Error(
            "Could not fetch these movies. The silly query returned nothing."
          );

        setMovies(data.Search);
        setIsLoading(false);
        setError("");
      } catch (err) {
        console.error(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }

      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }
    }

    fetchMovies();

    // Clean  Up Function
    return () => {
      // Aborts last fetch.
      controller.abort();
    };
    // In strict mode (development) effects will run twice.
  }, [query]);

  // Re-renders will occur based on [].
  // This will keep to component syrnchronized with the OMDB-API.

  return { movies, isLoading, error };
}
