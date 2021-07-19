import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
              <>
                <Link href="/article/create">
                  <a className="border-b border-border-yellow w-full px-3 py-2 mb-4 mt-4 ml-2 rounded text-yellow-600 hover:bg-hover-yellow hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block pb-1 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    記事作成
                  </a>
                </Link>
                <Link href="/mypage/edit">
                  <a className="border-b border-border-yellow w-full px-5 py-2 mb-4 rounded text-yellow-600 hover:bg-hover-yellow hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block pb-1 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    マイページ
                  </a>
                </Link>
                <button
                  className="min-w-max hover:bg-nav-yellow mb-4"
                  onClick={() => {
                    logout();
                  }}
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
              </>
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
