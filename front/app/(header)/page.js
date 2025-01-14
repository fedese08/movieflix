"use client";

import { Navbar } from "@/components/Navbar";
import PopularPoster from "@/components/PopularPoster";
import VideoSwiper from "@/components/swiper/VideoSwiper";
import { useEffect, useState } from "react";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

import "@/components/swiper/swiper.css";
import Section from "@/components/VideoSection/Section";
import Filter from "@/components/filter-search/Filter";

export default function Home() {
  const [highlight, setHighlight] = useState(null);

  const [cinema, setCinema] = useState(null);

  const [popularMovies, setPopularMovies] = useState(null);

  const [popularSeries, setPopularSeries] = useState(null);

  const [filteredMovies, setFilteredMovies] = useState(null);
  const [filteredShows, setFilteredShows] = useState(null);

  async function fetchNowPlaying() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch("https://api.themoviedb.org/3/movie/now_playing", options)
      .then((response) => response.json())
      .then((response) => {
        setHighlight(
          response.results[Math.floor(Math.random() * response.results.length)]
        );
        setCinema(response.results);
        // setSearch(response.results);
      })
      .catch((err) => console.error(err));
  }

  async function fetchPopular() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch("https://api.themoviedb.org/3/movie/popular", options)
      .then((response) => response.json())
      .then((response) => {
        // setHighlight(
        //   response.results[Math.floor(Math.random() * response.results.length)]
        // );
        setPopularMovies(response.results);
        // setSearch(response.results);
      })
      .catch((err) => console.error(err));
  }

  async function fetchPopularSeries() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPopularSeries(response.results);
      })
      .catch((err) => console.error(err));
  }

  const handleFiltredMovies = (data) => {
    setFilteredMovies(data);
  };

  useEffect(() => {
    fetchNowPlaying();
    fetchPopular();
    fetchPopularSeries();
  }, []);

  return (
    <main className="flex min-h-[100vh] flex-col overflow-x-hidden pb-20">
      <PopularPoster video={highlight} />
      {popularMovies && popularSeries && (
        <div className="px-10 mt-12">
          <VideoSwiper videos={cinema} title={"Now in cinemas"} />
          <Filter
            setFilteredMovies={setFilteredMovies}
            setFilteredShows={setFilteredShows}
          />
          <div className="mt-10">
            <h1 className="text-center text-[55px] font-bold">Movies</h1>
            {filteredMovies != null ? (
              <Section
                videos={filteredMovies}
                title={"Movies"}
                type={"movie"}
              />
            ) : (
              <Section
                videos={popularMovies}
                title={"Popular Movies"}
                type={"movie"}
              />
            )}
          </div>
          <div className="mt-20">
            <h1 className="text-center text-[55px] font-bold">Series</h1>
            {filteredShows != null ? (
              <Section videos={filteredShows} title={"TV shows"} type={"TV"} />
            ) : (
              <Section
                videos={popularSeries}
                title={"Popular Series"}
                type={"TV"}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
