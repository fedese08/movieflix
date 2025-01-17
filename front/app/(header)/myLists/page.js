"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { UserContext } from "../context/UserContext";
import { Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function MyLists() {
  const [selection, setSelection] = useState("watchlist");

  const [watched, setWatched] = useState([]);
  const [watchList, setWatchList] = useState([]);

  const { isLogged, userLogged, refreshUser } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      // router.push("/login");
    }
  }, []);

  const handleWatchList = (id) => {
    if (watchList.includes(id)) {
      toast.error("Already on the list!");
    } else if (watched.includes(id)) {
      const newWatched = watched.filter((movieId) => movieId !== id);
      const newWatchList = [...watchList, id];
      setWatched(newWatched);
      setWatchList(newWatchList);
      toast.success("Added to Watchlist!");
      updateLists(newWatchList, newWatched);
    } else {
      const newWatchList = [...watchList, id];
      setWatchList(newWatchList);
      toast.success("Added to Watchlist!");
      updateLists(newWatchList, watched);
    }
  };

  const handleWatchedList = (id) => {
    if (watched.includes(id)) {
      toast.error("Already on the list!");
    } else if (watchList.includes(id)) {
      const newWatchList = watchList.filter((movieId) => movieId !== id);
      const newWatched = [...watched, id];
      setWatchList(newWatchList);
      setWatched(newWatched);
      toast.success("Added to Watched!");
      updateLists(newWatchList, newWatched);
    } else {
      const newWatched = [...watched, id];
      setWatched(newWatched);
      toast.success("Added to Watched!");
      updateLists(watchList, newWatched);
    }
  };

  const updateLists = async (watchList, watched) => {
    const options = {
      method: "PUT",
      body: JSON.stringify({
        watchList: watchList,
        watched: watched,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(
      `https://movieflix-gu1i.onrender.com/api/users/${userLogged._id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Lists updated");
        refreshUser();
      })
      .catch((err) => console.error(err));
  };

  async function searchWatchlist(id) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US?video=true&append_to_response=videos&include_video=true'`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setWatchList((prevWatchList) => {
          // Verificar si el elemento ya existe en el array
          const isDuplicate = prevWatchList.some(
            (item) => item.id === response.id
          );
          // Si el elemento no existe, agregarlo al array
          if (!isDuplicate) {
            return [...prevWatchList, response];
          }
          // Si el elemento ya existe, devolver el array original
          return prevWatchList;
        });
      })
      .catch((err) => console.error(err));
  }

  async function searchWatched(id) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US?video=true&append_to_response=videos&include_video=true'`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setWatched((prevWatched) => {
          // Verificar si el elemento ya existe en el array
          const isDuplicate = prevWatched.some(
            (item) => item.id === response.id
          );
          // Si el elemento no existe, agregarlo al array
          if (!isDuplicate) {
            return [...prevWatched, response];
          }
          // Si el elemento ya existe, devolver el array original
          return prevWatched;
        });
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    userLogged?.watchList?.forEach((f) => searchWatchlist(f));
    userLogged?.watched?.forEach((f) => searchWatched(f));
    console.log("cambio");
  }, [userLogged]);

  return (
    <div className="flex w-[100vw] h-[100vh] pt-[15vh] px-[10em] overflow-x-hidden gap-10 flex-col ">
      <Toaster position="top-right" richColors />
      <div className="flex gap-4">
        <h1
          onClick={() => setSelection("watchlist")}
          className={`text-[1.5em]  cursor-pointer font-semibold ${
            selection === "watchlist"
              ? "text-[#de0d18ab] underline"
              : "text-white"
          } duration-300`}
        >
          Watchlist
        </h1>
        <h1
          onClick={() => setSelection("watched")}
          className={`text-[1.5em] cursor-pointer font-semibold ${
            selection === "watched"
              ? "text-[#de0d18ab] underline"
              : "text-white"
          } duration-300`}
        >
          Watched
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {selection === "watchlist" ? (
          watchList?.length > 0 ? (
            watchList?.map((film) => (
              <div key={film?.id} className="h-[16em] w-[10em] group">
                <img
                  src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
                  alt={film.title}
                  className="rounded-md absolute h-[16em] w-[10em] group-hover:opacity-30  duration-300 "
                />
                <div className="flex invisible relative h-[16em] gap-4 justify-center pb-4 group-hover:visible items-end">
                  <Tooltip content="More info">
                    <button
                      // onClick={() => router.push(`/video/movie/${film?.id}`)}
                      className="text-[20px] font-bold border-[2px] border-[#858585] p-1 rounded-full bg-[#5c5c5c9c]"
                    >
                      <svg
                        width="18"
                        height="16"
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
                    </button>
                  </Tooltip>
                  <Tooltip content="Mark as watched">
                    <button
                      onClick={() => handleWatchedList(film?.id)}
                      className="text-[20px] font-bold border-[2px] border-[#858585] p-1 rounded-full bg-[#5c5c5c9c]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        width="18"
                        height="16"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))
          ) : (
            <p>The list is empty</p>
          )
        ) : watched?.length > 0 ? (
          watched?.map((film) => (
            <div key={film?.id} className="h-[16em] w-[10em] group">
              <img
                src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`}
                alt={film?.title}
                className="rounded-md absolute h-[16em] w-[10em] group-hover:opacity-30  duration-300 "
              />
              <div className="flex invisible relative h-[16em] gap-4 justify-center pb-4 group-hover:visible items-end">
                <Tooltip content="More info">
                  <button className="text-[20px] font-bold border-[2px] border-[#858585] p-1 rounded-full bg-[#5c5c5c9c]">
                    <svg
                      width="18"
                      height="16"
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
                  </button>
                </Tooltip>
                <Tooltip content="Add to watchlist">
                  <button
                    onClick={() => handleWatchList(film?.id)}
                    className="text-[20px] font-bold border-[2px] border-[#858585] p-1 rounded-full bg-[#5c5c5c9c]"
                  >
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
                  </button>
                </Tooltip>
              </div>
            </div>
          ))
        ) : (
          <p>The list is empty</p>
        )}
      </div>
    </div>
  );
}
