"use client";
import { UserContext } from "@/app/(header)/context/UserContext";
import CastList from "@/components/CastList";
import GenresList from "@/components/GenresList";
import Providers from "@/components/Providers";
import TrailerComponent from "@/components/TrailerComponent";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function VideoDetails() {
  const router = useRouter();

  const { addToWatchList, isLogged, userLogged } = useContext(UserContext);

  const { id } = useParams();

  const [video, setVideo] = useState(null);

  const [trailer, setTrailer] = useState(null);

  const [titlePath, setTitlePath] = useState(null);

  const [similarListing, setSimilarListing] = useState(null);

  async function similarList(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(`https://api.themoviedb.org/3/tv/${id}/similar`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log("searched: ", response);
        setSimilarListing(response);
      })
      .catch((err) => console.error(err));
  }

  async function searchVideo(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US?video=true&append_to_response=videos&include_video=true'`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("searched: ", response);
        setVideo(response);
      })
      .catch((err) => console.error(err));
  }

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
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("trailer: ", response);
        let searchTrailer = response.results.find((vid) =>
          vid.name.includes("Official Trailer")
        );
        setTrailer(searchTrailer);
      })
      .catch((err) => console.error(err));
  }

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
      `https://api.themoviedb.org/3/tv/${id}/images`,

      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log("credits: ", response);
        setTitlePath(
          response.logos.find((title) => title.iso_639_1 === "en").file_path
        );
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    searchVideo(id);
    searchTrailer();
    searchTitle();
    similarList(id);
  }, [id]);

  const [viewTrailer, setViewTrailer] = useState(false);

  function handleTrailer() {
    setViewTrailer(!viewTrailer);
  }

  return (
    <div className="min-h-[100vh]  flex-col gap-10 md:gap-20 w-[100vw] pb-20 relative bg-[#171717] overflow-x-hidden">
      <Toaster position="top-right" richColors />

      <img
        src={`https://image.tmdb.org/t/p/original/${video?.backdrop_path}`}
        alt=""
        className="absolute h-[100vh]  w-[100vw] img-grad object-cover opacity-45"
      />
      <div className="flex h-[100vh] W-[100vw] ml-20 relative pt-[20vh] gap-10 justify-center ">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${video?.poster_path}`}
            alt=""
            className="w-[25em] rounded-xl"
          />
        </div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${titlePath}`}
            alt=""
            className="max-w-[40vw] max-h-[240px] object-contain mb-14"
          />
          <GenresList video={video} />
          <p className="w-[40vw] mt-6">{video?.overview}</p>

          <div className="flex gap-2 mt-6 ">
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
              onClick={() => {
                if (!isLogged) {
                  router.push("/auth/login");
                } else {
                  if (userLogged.watchList.includes(id)) {
                    toast.warning("Is already in your Watchlist!");
                  } else {
                    addToWatchList(id);
                    toast.success("Added to Watchlist!");
                  }
                }
              }}
              className="flex gap-4 text-black px-5 py-[6px] justify-center items-center  rounded-md border-none bg-[#FFFF] hover:bg-[#cbc9c4ec] duration-100"
            >
              <span>
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="ltr-4z3qvp e1svuwfo1"
                  data-name="Plus"
                  aria-labelledby=":r6b:"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              Add To Watchlist
            </button>
          </div>
          {video && (
            <div className="w-[35vw] z-10 mt-6">
              <CastList video={video} type={"tv"} />
            </div>
          )}
        </div>
      </div>
      <div className="pb-6 mt-20 mx-auto w-[70vw] bg-[#171717] flex flex-col gap-4">
        <h1 className="text-[32px] font-bold mt-10">Providers</h1>
        <Providers id={id} type="tv" />
      </div>
      <div className="pb-6 mx-auto w-[70vw] bg-[#171717] ">
        <h1 className="text-[32px] font-bold mt-10 mb-4">Similar TV shows</h1>
        {similarListing && (
          <swiper-container
            breakpoints={JSON.stringify({
              640: {
                slidesPerView: 1,
                spaceBetween: 4,
              },

              768: {
                slidesPerView: 4,
                spaceBetween: 4,
              },

              1024: {
                slidesPerView: 6,
                spaceBetween: 4,
              },
              1280: {
                slidesPerView: 8,
                spaceBetween: 4,
              },
            })}
            navigation="true"
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
          >
            {similarListing?.results?.map((video, index) => {
              return (
                <swiper-slide
                  lazy="true"
                  key={index}
                  onClick={() => router.push(`/video/TV/${video.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${video.poster_path}`}
                    alt=""
                    className="rounded-md h-[15em] hover:scale-[1.03] hover:opacity-40 cursor-pointer duration-300 "
                  />
                </swiper-slide>
              );
            })}
          </swiper-container>
        )}
      </div>
      {viewTrailer && (
        <div className="h-[100vh] w-[100vw] flex flex-col bg-[#000000e8] justify-center items-center z-50 top-0 fixed">
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

export default VideoDetails;
