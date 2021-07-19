import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import Navbar from "./parts/Navbar";
import Sidebar from "./parts/Sidebar";

import { refreshToken } from "../../api/auth/refresh_token";

const cookies = new Cookies();

const Layout = ({ children }) => {
  const [nowLogin, setNowLogin] = useState(false);
  useEffect(() => {
    const author = cookies.get("UID");
    const isLogin = cookies.get("NLN");
    setNowLogin(isLogin);
    console.log(isLogin);
    console.log(cookies.get("NLN"));
    refreshToken();
  }, []);

  return (
    <div>
      <Head>
        <title>ちょいたし！</title>
      </Head>
      <header>
        <Navbar nowLogin={nowLogin} />
        <Sidebar nowLogin={nowLogin} />
      </header>

      <div className="flex justify-center items-center flex-col min-h-screen text-black font-mono">
        <main className="flex flex-1 float-right justify-center items-center flex-col w-full mt-20 lg:mt-24 mb-16 lg:mb-3">
          {children}
        </main>
        <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm"></footer>
      </div>
    </div>
  );
};

export default Layout;
