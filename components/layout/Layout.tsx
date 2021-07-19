import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import Navbar from "./parts/Navbar";
import Sidebar from "./parts/Sidebar";

import { refreshToken } from "../../api/auth/refresh_token";

const cookie = new Cookies();

const Layout = ({ children }) => {
  const [nowLogin, setNowLogin] = useState(false);
  useEffect(() => {
    const author = cookie.get("UID");
    const isLogin = cookie.get("NLN");
    console.log(cookie.get("NLN"));
    setNowLogin(cookie.get("UID"));
    console.log(author);
    refreshToken();
  }, []);

  const aa = async () => {
    const author = cookie.get("UID");
    console.log(author);
  };

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
          <button onClick={aa}>dfadsgds</button>
        </main>
        <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm"></footer>
      </div>
    </div>
  );
};

export default Layout;
