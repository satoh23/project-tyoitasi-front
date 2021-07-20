import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

import { login } from "../../api/auth/login";
import { createUser } from "../../api/auth/createUser";
import Layout from "../../components/layout/Layout";
import Cookie from "universal-cookie";

interface LoginProps<T> {
  email: T;
  setEmail: T;
  password: T;
  setPassword: T;
}

interface CreateProps<T> {
  userName: T;
  setUserName: T;
  email: T;
  setEmail: T;
  password: T;
  setPassword: T;
}

const cookie = new Cookie();

const Auth: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  let loginProps: LoginProps<
    string | React.Dispatch<React.SetStateAction<string>>
  > = {
    email: email,
    setEmail: setEmail,
    password: password,
    setPassword: setPassword,
  };
  let createProps: CreateProps<
    string | React.Dispatch<React.SetStateAction<string>>
  > = {
    userName: userName,
    setUserName: setUserName,
    email: email,
    setEmail: setEmail,
    password: password,
    setPassword: setPassword,
  };

  const authUser = (e) => {
    e.preventDefault();
    if (isLogin === true) {
      login(email, password).then((res) => {
        if (res === false) {
          alert("ログインに失敗しました");
        } else {
          cookie.set("UID", res.user.id);
          window.location.reload();
        }
      });
      router.push("/");
    } else if (isLogin === false) {
      createUser(userName, email, password).then((res) => {
        if (res === true) {
        } else if (res === false) {
          alert("アカウント作成に失敗しました");
        }
      });
      router.push("/auth/confirm");
    }
  };

  return (
    <Layout>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            {isLogin ? "ログイン" : "ユーザー登録"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={authUser} method="post">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {isLogin ? (
              <>
                <div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <input
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="ユーザー名"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span
                onClick={() => setIsLogin(!isLogin)}
                className=" cursor-pointer font-medium text-yellow-500 hover:text-yellow-700"
              >
                {isLogin ? "アカウントの新規作成はこちら" : "ログインはこちら"}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-nav-yellow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-yellow-500 group-hover:text-yellow-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isLogin ? "ログイン" : "登録"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Auth;
