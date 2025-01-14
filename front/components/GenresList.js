"use client";
import React, { useEffect, useState } from "react";

function GenresList(genres) {
  const [genresList, setGenresList] = useState();

  async function searchGenre() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log("GenList: ", response.genres);
        setGenresList(response.genres);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    searchGenre();
  }, [genres]);
  //   console.log(genres.video?.genres);

  return (
    <div className="flex gap-4 mb-6">
      {genres.video?.genres?.map((gen) => {
        let name = genresList?.find((genre) => genre.id === gen.id);

        return (
          <div
            key={gen.id}
            className="rounded-full flex items-center justify-center border-none font-medium px-4 py-1 bg-[#f2f2f257] text-white"
          >
            <p>{name?.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default GenresList;
