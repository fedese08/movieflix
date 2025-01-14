"use client";
import React, { useEffect, useState } from "react";

function CastList({ video, type }) {
  const [cast, setCast] = useState();

  async function searchCast() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `https://api.themoviedb.org/3/${type}/${video?.id}/credits`,

      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("credits: ", response.cast);
        console.log("datos: ", type, video);
        setCast(response.cast);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    searchCast();
  }, [video]);

  return (
    <swiper-container
      breakpoints={JSON.stringify({
        320: {
          slidesPerView: 2,
          spaceBetween: 2,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 4,
        },

        768: {
          slidesPerView: 4,
          spaceBetween: 6,
        },

        1024: {
          slidesPerView: 5,
          spaceBetween: 6,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 6,
        },
      })}
      autoplay={{
        disableOnInteractoin: false,
        delay: 1000,
      }}
      // loop="true"
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      className=""
    >
      {cast
        ? cast.map((actor) => {
            return (
              <swiper-slide key={actor.id} lazy="true" className="min-h-fit ">
                <div className="flex  gap-4 w-[full]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt=""
                    className="md:w-[10em] w-[40vw] h-fit rounded-md"
                  />
                  <p className="text-center mt-2 text-[20px] md:text-[12px] font-medium">
                    {actor.name}
                  </p>
                </div>
              </swiper-slide>
            );
          })
        : "cargando..."}
    </swiper-container>
  );
}

export default CastList;
