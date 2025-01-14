"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Section({ videos, title, type, pagination, handlePage }) {
  const router = useRouter();

  return (
    <div className="flex flex-col px-2 mt-2">
      <h2 className="font-semibold text-[36px] ml-2">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5 min-h-fit w-full">
        {videos?.map((video, index) => {
          return (
            <div
              key={index}
              className="p-2 cursor-pointer"
              onClick={() =>
                router.push(
                  `/video/${type === "tv" ? "TV" : type}/${video?.id}`
                )
              }
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${video?.poster_path}`}
                alt={video?.title}
                className="rounded-md h-full hover:scale-[1.03] hover:opacity-30 duration-300 "
              />
            </div>
          );
        })}
      </div>
      {pagination ? (
        <div className="flex justify-center gap-8 pt-10 overflow-x-auto sm:justify-center">
          <h2
            onClick={() => handlePage(pagination - 1)}
            className="text-[15px] cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold"
          >{`< Prev`}</h2>
          <h2 className="pt-4 text-[15px]">...</h2>
          <h2
            onClick={() => handlePage(pagination + 1)}
            className="text-[15px] cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold"
          >{`Next >`}</h2>
        </div>
      ) : (
        <button
          onClick={() =>
            router.push(`/${type === "TV" ? "TVshows" : "movies"}`)
          }
          className="flex gap-2 font-semibold mx-auto mt-10 w-fit bg-[#4b4b4b8c] hover:bg-[#cbc9c43a] duration-200  px-20  py-4 justify-center items-center rounded-xl "
        >
          All {title}
        </button>
      )}
    </div>
  );
}

export default Section;
