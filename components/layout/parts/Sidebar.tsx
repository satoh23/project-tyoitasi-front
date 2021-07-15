import React from "react";
import { useRouter } from "next/router";

import { logout } from "../../../api/auth/logout";

const Sidebar = ({ nowLogin }) => {
  const router = useRouter();
  return (
    <div>
      <div className="h-screen w-1/6 float-left hidden lg:block"></div>
      <div className="fixed h-full bg-side-yellow w-1/6 hidden lg:block border-r border-border-yellow">
        <aside className="">
          <div className="lg:ml-auto min-w-full w-max flex flex-col lg:h-auto mt-16">
            {nowLogin ? (
              <button
                className="min-w-max hover:bg-hover-yellow mb-6"
                onClick={() => logout()}
              >
                <div className="border-b border-border-yellow ml-2 px-3 py-2 rounded text-yellow-600 hover:text-white text-left">
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
            ) : (
              <button
                className="min-w-max hover:bg-hover-yellow mb-6"
                onClick={() => router.push("/auth/auth")}
              >
                <div className="border-b border-border-yellow ml-2 px-3 py-2 rounded text-yellow-600 hover:text-white text-left">
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
                  ログイン
                </div>
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
