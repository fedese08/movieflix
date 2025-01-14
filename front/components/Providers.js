import React, { useEffect, useState } from "react";

function Providers({ type, id }) {
  const [providers, setProviders] = useState(null);

  async function searchProviders(id) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJkMWYyODI1ZGQ1Zjc0ZjAxYWI2MzYwZmY2ZmFhNSIsInN1YiI6IjYyYjI1MmM2NzUxMTBkMDA1MDllYWRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4bS5LtZJr43TsfGTyi-ykQ1W5Lt1sc77t3pXcsHOX1Y",
      },
    };
    await fetch(
      `    https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("providers: ", response.results);
        let usProviders = response.results["US"];
        console.log("usProviders: ", usProviders);
        setProviders(usProviders.flatrate);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    searchProviders(id);
  }, [id]);

  return (
    <div className="flex gap-4 md:justify-start justify-center ">
      {providers == undefined ? (
        <h1 className="">No providers found.</h1>
      ) : (
        providers?.map((provider, index) => {
          return (
            <div
              key={index}
              className="flex flex-wrap w-24 text-center gap-2 flex-col items-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${provider?.logo_path}`}
                alt="Provider"
                className="w-24 h-24"
              />
              <h2>{provider?.provider_name}</h2>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Providers;
