import { UserContext } from "@/app/(header)/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function SwiperElement({ video }) {
  const router = useRouter();

  const { addToWatchList } = useContext(UserContext);

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
      `https://api.themoviedb.org/3/movie/${video?.id}/images`,

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
    searchTitle();
  }, []);

  return (
    <swiper-slide
      lazy="true"
      className="cursor-pointer"
      onClick={() => router.push(`/video/movie/${video?.id}`)}
    >
      <div className="h-full  group">
        <div className="relative bg-black rounded-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${video?.backdrop_path}`}
            alt=""
            className="w-auto sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[300px] opacity-50 object-cover mx-1 "
          />
          <img
            src={`https://image.tmdb.org/t/p/original/${titlePath}`}
            alt=""
            className="w-full absolute z-40 top-0 h-full object-contain px-10 py-4"
          />
        </div>
      </div>
    </swiper-slide>
  );
}

export default SwiperElement;
