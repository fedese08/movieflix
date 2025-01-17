"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaRegBell, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/(header)/context/UserContext";

export const Navbar = () => {
  const router = useRouter();

  const { isLogged, logout } = useContext(UserContext);

  const [toggle, setToggle] = useState(false);

  const [change, setChange] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  function handleToggle() {
    setToggle(!toggle);
  }

  const [menuToggle, setMenuToggle] = useState(true);
  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <nav
      className={`flex netf-sans px-12 py-4 w-full bg-[#0b0b0b] items-center fixed z-[99] top-0 duration-500 ${
        isTop && "md:bg-transparent"
      } ${isTop && menuToggle && "bg-transparent"} `}
    >
      <div
        className={`flex md:flex-row flex-col  gap-10 items-center w-full justify-between`}
      >
        <div
          onClick={() => router.push("/")}
          className="flex w-full md:w-fit justify-between cursor-pointer text-[28px] font-bold"
        >
          <h1 className="text-[#de0d16]">MOVIEFLIX</h1>
          <div
            className="md:hidden flex items-center"
            onClick={() => handleMenuToggle()}
          >
            <GiHamburgerMenu />
          </div>
        </div>
        <div
          className={`${
            menuToggle ? "hidden" : "flex flex-col"
          } md:flex md:flex-row gap-2 font-light w-full text-[18px]`}
        >
          <p
            className="cursor-pointer py-4 px-2 md:hover:bg-transparent  hover:bg-[#1f1f1f]"
            onClick={() => {
              router.push("/"), handleMenuToggle();
            }}
          >
            Home
          </p>
          <p
            className="cursor-pointer py-4 px-2 md:hover:bg-transparent  hover:bg-[#1f1f1f]"
            onClick={() => {
              router.push("/TVshows"), handleMenuToggle();
            }}
          >
            TV Shows
          </p>
          <p
            className="cursor-pointer py-4 px-2  md:hover:bg-transparent hover:bg-[#1f1f1f]"
            onClick={() => {
              router.push("/movies"), handleMenuToggle();
            }}
          >
            Movies
          </p>
          {isLogged ? (
            <div className="flex gap-2 text-center">
              <p
                className="cursor-pointer  w-full py-4 px-2 md:hover:bg-transparent  hover:bg-[#1f1f1f]"
                onClick={() => {
                  router.push("/watchList"), handleMenuToggle();
                }}
              >
                My List
              </p>
              <p
                className="cursor-pointer md:hidden flex w-full py-4 px-2 md:hover:bg-transparent md:hover:bg-transparent hover:bg-[#1f1f1f]"
                onClick={() => logout()}
              >
                Log out
              </p>
            </div>
          ) : (
            <div className="flex md:hidden gap-2 text-center">
              <p
                className="cursor-pointer w-full py-4 px-2 md:hover:bg-transparent hover:bg-[#1f1f1f]"
                onClick={() => {
                  router.push("/login"), handleMenuToggle();
                }}
              >
                Login
              </p>
              <p
                className="cursor-pointer w-full py-4 px-2 md:hover:bg-transparent hover:bg-[#1f1f1f]"
                onClick={() => {
                  router.push("/signin"), handleMenuToggle();
                }}
              >
                Register
              </p>
            </div>
          )}
        </div>
        <div className="hidden gap-6 md:flex items-center">
          <div className="flex flex-col justify-center">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleToggle()}
            >
              {isLogged ? (
                <img
                  src="/images/red-profile.png"
                  alt="Profile"
                  className="w-[2.5em] h-[2.5em] rounded-md"
                />
              ) : (
                <FaUserCircle size={30} />
              )}
              {toggle ? <BsCaretDown /> : <BsCaretUp />}
            </div>
            <div
              className={`absolute right-8 rounded-md   mt-36 text-black ${
                toggle ? "flex" : "hidden"
              }`}
            >
              {isLogged ? (
                <ul className="flex flex-col gap-2 bg-white items-center rounded-md">
                  <li
                    onClick={() => {
                      router.push("/login", handleToggle());
                    }}
                    className="hover:bg-slate-200 px-4 py-2 w-full cursor-pointer text-center rounded-md"
                  >
                    <p>Profile</p>
                  </li>
                  <li
                    onClick={() => {
                      logout(), handleToggle();
                    }}
                    className="hover:bg-slate-200 px-4 py-2 w-full cursor-pointer text-center rounded-md"
                  >
                    <p>Logout</p>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col gap-2 bg-white items-center rounded-md">
                  <li
                    onClick={() => {
                      router.push("/login"), handleToggle();
                    }}
                    className="hover:bg-slate-200 px-4 py-2 w-full cursor-pointer text-center rounded-md"
                  >
                    <p>Login</p>
                  </li>
                  <li
                    onClick={() => {
                      router.push("/signin"), handleToggle();
                    }}
                    className="hover:bg-slate-200 px-4 py-2 w-full cursor-pointer text-center rounded-md"
                  >
                    <p>Register</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
