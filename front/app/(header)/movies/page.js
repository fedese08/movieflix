"use client";
import Section from "@/components/VideoSection/Section";
import React, { useEffect, useState } from "react";

export default function MoviesPage() {
  const [categories, setCategories] = useState(null);

  const [genre, setGenre] = useState(null);

  const handleGenre = (gen) => {
    setGenre(gen);
  };

  const [activePage, setActivePage] = useState(1);

  // getCategories
  const getCategories = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list`,
        options
      );
      const data = await response.json();
      console.log(data.genres);
      setCategories(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  const [movies, setMovies] = useState(null);

  // get movies
  const getMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?&page=${activePage}${
          genre ? `&with_genres=${genre.id}` : ""
        }`,
        options
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getMovies();
  }, [activePage, genre]);

  return (
    <div className="min-h-[100vh] px-[5vw] flex flex-col pt-[7em] md:gap-8 w-[100vw] pb-20 relative bg-[#171717] overflow-x-hidden">
      <h1 className="text-center text-[55px]  font-bold">Movies</h1>
      <div className="">
        <h1 className="font-semibold text-[36px] ml-4">Genres</h1>
        {categories && (
          <div className="flex gap-4 mt-4 px-2 flex-wrap justify-center md:justify-start">
            {categories.map((category) => (
              <h2
                key={category.id}
                onClick={() =>
                  handleGenre({ id: category.id, name: category.name })
                }
                className="py-2 px-4 text-white bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-md"
              >
                {category.name}
              </h2>
            ))}
          </div>
        )}
      </div>
      <div className="">
        <Section
          title={genre ? genre.name + " Movies" : "Movies"}
          type={"movie"}
          videos={movies}
          pagination={activePage}
          handlePage={setActivePage}
        />
      </div>
    </div>
  );
}
