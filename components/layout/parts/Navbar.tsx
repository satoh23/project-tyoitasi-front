import React from "react";
import Link from "next/link";
import { useState, useRef } from "react";

const Navbar = () => {
  const menuContentEl = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <nav
        className={`w-full flex items-center flex-wrap bg-nav-yellow font-nav lg:p-2 z-40 fixed pb-1 lg:border-b lg:border-border-yellow ${
          isActive ? "" : "border-b border-boder-yellow"
        }`}
      >
        <Link href="/">
          <a className="inline-flex items-center p-1 mr-4 ml-2">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            <span className="text-xl text-white tracking-wide">
              ちょいたし！
            </span>
          </a>
        </Link>
        <button
          className="inline-flex p-2 rounded lg:hidden text-white ml-auto mr-2 outline-none focus:outline-none"
          onClick={handleActive}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      <div
        className={`bg-side-yellow transition-all duration-500 lg:flex-grow overflow-hidden h-full fixed lg:mt-12 z-30 border-r border-border-yellow rounded-r ${
          isActive ? "lg:hidden" : ""
        }`}
        ref={menuContentEl}
        style={{
          width: isActive ? `60%` : "0",
        }}
      >
        <button
          className={`${isActive ? "block" : "hidden"} float-right mt-11`}
          onClick={handleActive}
        >
          <div className="rounded text-white bg-opacity-0 fixed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </button>
        <aside className="">
          <div className="lg:ml-auto min-w-full w-max flex flex-col lg:h-auto mt-12 lg:mt-14 z-30">
            <button
              className="min-w-max hover:bg-nav-yellow mb-6"
              onClick={() => console.log("aa")}
            >
              <div className="border-b border-border-yellow ml-2 px-3 py-2 rounded text-yellow-600 hover:text-white hover:bg-nav-yellow text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block pb-1 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                ログアウト
              </div>
            </button>
          </div>
        </aside>
      </div>
      <div
        className="bg-black lg:hidden overflow-hidden h-full fixed lg:mt-12 fixed right-0 bg-opacity-40 z-20"
        onClick={handleActive}
        style={{
          width: isActive ? `100%` : "0",
        }}
      ></div>
    </div>
  );
};

export default Navbar;
