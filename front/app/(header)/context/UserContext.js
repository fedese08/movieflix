"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
import { toast } from "sonner";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);

  const [userLogged, setUserLogged] = useState(null);

  async function register(user) {
    console.log(user);
    const options = {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:5000/api/users/register", options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "An error occurred");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsLogged(true);
        setUserLogged(data);
        router.push("/");
      })
      .catch((err) => console.error(err));
  }

  async function login(user) {
    console.log(user);

    const options = {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch("http://localhost:5000/api/users/login", options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "An error occurred");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsLogged(true);
        setUserLogged(data);
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message || "An error occurred");
      });
  }

  const logout = () => {
    setIsLogged(false);
    setUserLogged(null);
  };

  async function addToWatchList(id) {
    if (!userLogged.watchList.includes(id)) {
      userLogged.watchList.push(id);
    } else {
      return;
    }
    const options = {
      method: "PUT",
      body: JSON.stringify({
        watchList: userLogged.watchList,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`http://localhost:5000/api/users/${userLogged._id}`, options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "An error occurred");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("The movie was added to your watch list");
      })
      .catch((err) => console.error(err));
  }

  async function addToWatchedList(id) {
    const updatedWatchList = userLogged.watchList.filter((item) => item != id);
    setUserLogged({
      ...userLogged,
      watchList: updatedWatchList,
    });
    if (!userLogged.watched.includes(id)) {
      userLogged.watched.push(id);
    } else {
      return;
    }
    console.log(updatedWatchList);
    const options = {
      method: "PUT",
      body: JSON.stringify({
        watchList: updatedWatchList,
        watched: userLogged.watched,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`http://localhost:5000/api/users/${userLogged._id}`, options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "An error occurred");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("The movie was added to your watch list");
      })
      .catch((err) => console.error(err));
  }

  return (
    <UserContext.Provider
      value={{
        register,
        login,
        userLogged,
        logout,
        isLogged,
        addToWatchList,
        addToWatchedList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
