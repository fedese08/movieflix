"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

function Filter({ setFilteredMovies, setFilteredShows }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  async function fetchMovies(url) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setFilteredMovies(data.results);
      console.log("Filtradas: ", data.results);
    } catch (err) {
      console.error("Error fetching movie data: ", err);
    }
  }

  async function fetchShows(url) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setFilteredShows(data.results);
      console.log("Shows filtrados: ", data.results);
    } catch (err) {
      console.error("Error fetching show data: ", err);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      fetchMovies(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          search
        )}&include_adult=false&language=en-US`
      );
      fetchShows(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
          search
        )}&include_adult=false&language=en-US`
      );
    } else {
      fetchMovies(`https://api.themoviedb.org/3/movie/popular?language=en-US`);
      fetchShows(`https://api.themoviedb.org/3/tv/popular?language=en-US`);
    }
  }, [search]);

  return (
    <div className="w-full gap-4 flex-row items-center flex justify-center">
      <input
        className="w-[850px] mt-20 h-[2.5em] bg-[#0000005d] border-[#525252] border-[2px] rounded-md px-4 "
        required
        placeholder={`Search by name`}
        onChange={(e) => handleSearch(e)}
      />
      <FaMagnifyingGlass className="text-white mt-20 text-[3em] md:text-[1.5em]" />
    </div>
  );
}

export default Filter;
