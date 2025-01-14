"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TrailerComponent from "./TrailerComponent";

function PopularPoster(video) {
  const router = useRouter();

  const [titlePath, setTitlePath] = useState(null);

  async function searchTitle() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${video?.video?.id}/images`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTitlePath(
          response.logos.find((title) => title.iso_639_1 === "en").file_path
        );
      })
      .catch((err) => console.error(err));
  }

  const [trailer, setTrailer] = useState();

  async function searchTrailer() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${video?.video?.id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log("trailer: ", response);
        setTrailer(
          response.results.find((vid) => vid.name === "Official Trailer")
        );
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    searchTitle();
    searchTrailer();
  }, [video]);

  const [viewTrailer, setViewTrailer] = useState(false);

  function handleTrailer() {
    setViewTrailer(!viewTrailer);
  }

  return (
    <div className="">
      <img
        className="w-[100vw] h-[700px] object-cover opacity-60 rounded-lg absolute img-grad"
        src={`https://image.tmdb.org/t/p/original/${video?.video?.backdrop_path}`}
        alt={video?.video?.title}
      />
      <div className="relative flex flex-col h-[450px] pt-20 justify-center items-center md:items-start md:pl-[50px] gap-4">
        <img
          src={`https://image.tmdb.org/t/p/original/${titlePath}`}
          alt=""
          className="sm:w-[30em] md:w-[30em] lg:w-[30em] w-fit mb-14"
        />
        {/* <h1 className="text-[35px] font-bold mt-2 ">{video?.video?.title}</h1> */}
        <div className="flex gap-2">
          <button
            onClick={() => handleTrailer()}
            className="flex gap-2 text-black px-5 py-[6px] justify-center items-center  rounded-md border-none bg-[#FFFF] hover:bg-[#cbc9c4ec] duration-100"
          >
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ltr-4z3qvp e1svuwfo1"
                data-name="Play"
                aria-labelledby=":r7b:"
                aria-hidden="true"
              >
                <path
                  d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            Trailer
          </button>
          <button
            onClick={() => router.push(`/video/movie/${video.video.id}`)}
            className="flex gap-2 bg-[#cbc9c48c] hover:bg-[#cbc9c43a] duration-100 px-5 py-[6px] justify-center items-center rounded-md"
          >
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ltr-4z3qvp e1svuwfo1"
                data-name="CircleI"
                aria-labelledby=":r8d:"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            More info
          </button>
        </div>
      </div>
      {viewTrailer && (
        <div className="h-[100vh] w-[100vw] flex flex-col bg-[#000000e8] justify-center items-center z-[70] top-0 fixed">
          <div className="w-[50vw] justify-end flex ">
            <p
              onClick={() => handleTrailer()}
              className="text-[50px] cursor-pointer font-light"
            >
              x
            </p>
          </div>
          <div className="w-full flex justify-center">
            <TrailerComponent trailer={trailer} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularPoster;
