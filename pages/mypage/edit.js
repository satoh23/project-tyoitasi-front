import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';

import Layout from "../../components/layout/Layout";


const Edit = () => {
  const router = useRouter();
  const [reFetch, setReFetch] = useState(false);
  const [previwIcon, setPreviwIcon] = useState("");
  const [isChangeFile, setIsChangeFile] = useState(false);
  const [nowChanging, setNowChanging] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    profile: "",
    icon: "",
    encodedIcon: "",
  });
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    profile: "",
    icon: "",
    encodedIcon: "",
  });
  useEffect(() => {
    const getUserDetail = () => {
      fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          setUser({
            id: res.id,
            name: res.username,
            profile: res.user_profile,
            icon: res.user_icon,
            encodedIcon: res.encoded_icon,
          });
          setNewUser({
            id: res.id,
            name: res.username,
            profile: res.user_profile,
            icon: res.user_icon,
            encodedIcon: res.encoded_icon,
          });
          console.log(res.user_icon)
        });
    };
    getUserDetail();
  }, [reFetch]);

  const update = async (e) => {
    e.preventDefault();
    let haveValidToken = false;
    let wasGetNewToken = false;
    if (isChangeFile) {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`, {
        method: "PATCH",
        body: JSON.stringify({
          user_id: user.id,
          user_name: newUser.name,
          user_profile: newUser.profile,
          user_icon: newUser.icon,
          encoded_icon: newUser.encodedIcon,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.status === 401) {
          haveValidToken = false;
        } else {
          haveValidToken = true;
        }
      });
      if (!haveValidToken) {
        await fetch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ).then((res) => {
          if (res.ok) {
            wasGetNewToken = true;
          } else {
            alert("先にログインしてください");
            router.push("/");
          }
        });
      }
      if (wasGetNewToken) {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user/`, {
          method: "PATCH",
          body: JSON.stringify({
            user_id: user.id,
            user_name: newUser.name,
            user_icon: newUser.icon,
            user_profile: newUser.profile,
            encoded_icon: newUser.encodedIcon,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      }
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user-not-icon/`, {
        method: "PATCH",
        body: JSON.stringify({
          user_id: user.id,
          user_name: newUser.name,
          user_profile: newUser.profile,
          user_icon: newUser.encodedIcon,
          encoded_icon: newUser.encodedIcon,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.status === 401) {
          haveValidToken = false;
        } else {
          haveValidToken = true;
        }
      });
      if (!haveValidToken) {
        await fetch(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ).then((res) => {
          if (res.ok) {
            wasGetNewToken = true;
          } else {
            alert("先にログインしてください");
            router.push("/");
          }
        });
      }
      if (wasGetNewToken) {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/edit-user-not-icon/`, {
          method: "PATCH",
          body: JSON.stringify({
            user_id: user.id,
            user_name: newUser.name,
            user_profile: newUser.profile,
            user_icon: newUser.encodedIcon,
            encoded_icon: newUser.encodedIcon,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      }
    }
    setReFetch(!reFetch);
    setNowChanging(!nowChanging);
  };

  const encodeFile = (e) => {
    if (e.target.files[0]) {
      let file_reader = new FileReader();
      file_reader.readAsDataURL(e.target.files[0]);
      file_reader.addEventListener("load", function (e) {
        let encodedFile = e.target.result;
        setPreviwIcon(encodedFile)
        encodedFile = encodedFile.replace(/^data:\w+\/\w+;base64,/, "");
        setNewUser({ ...newUser, icon: encodedFile, encodedIcon: encodedFile });
      });
      setIsChangeFile(true);
    }
  };

  const canselChangeUser = (e) => {
    e.preventDefault();
    setNewUser({
      id: user.id,
      name: user.name,
      profile: user.profile,
      icon: user.icon,
      encodedIcon: user.encodedIcon,
    });
    setNowChanging(!nowChanging);
    setIsChangeFile(false);
  };

  return (
    <Layout>
      <div className="w-full sm:w-3/4 lg:w-2/4 mb-10 md:mb-0">
        {nowChanging ? (
          <form onSubmit={update} method="post">
            <div className="text-center">
              <div>
                <Image
                  className="rounded-full"
                  src={isChangeFile ? previwIcon : user.icon ? user.icon : "/anonymous.jpg"}
                  alt="icon"
                  width={400}
                  height={350}
                />
              </div>
              <div className="mt-6">
                <input type="file" onChange={encodeFile} />
              </div>
              <br />

              <div className="flex w-full mt-12">
                <span className="w-3/12 mt-2 ml-2 text-sm">{"　　"}名前：</span>
                <input
                  required
                  className="mb-5 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>

              <div className="flex w-full">
                <span className="w-3/12 mt-4 ml-2 text-sm">自己紹介：</span>
                <textarea
                  required
                  className="resize-none mb-5 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                  type="text"
                  placeholder="500文字以内"
                  value={newUser.profile}
                  onChange={(e) =>
                    setNewUser({ ...newUser, profile: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              onClick={canselChangeUser}
              className="absolute right-1/4 mt-6 bg-transparent hover:bg-indigo-200 text-indigo-300 hover:text-white py-1 px-3 border border-indigo-300 hover:border-transparent rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="absolute left-3/4 mt-6 ml-4 bg-transparent hover:bg-yellow-200 text-yellow-300 hover:text-white py-1 px-3 border border-yellow-300 hover:border-transparent rounded"
            >
              変更
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div>
              <Image
                className="rounded-lg"
                src={user.icon ? user.icon : "/anonymous.jpg"}
                alt="icon"
                width={400}
                height={350}
              />
              <h2 className="w-3/4 m-auto pb-4 text-xl md:text-2xl font-semibold mt-6 border-yellow-200 border-b border-dashed">
                {user.name}
              </h2>
              <p className="w-3/4 m-auto px-2 py-10 border-yellow-200 border-b border-dashed whitespace-pre-wrap">
                {user.profile}
              </p>
            </div>
            <button
              onClick={(e) => setNowChanging(!nowChanging)}
              className="mt-6 bg-transparent hover:bg-yellow-200 text-yellow-300 font-semibold hover:text-white py-2 px-4 border border-yellow-300 hover:border-transparent rounded-full"
            >
              変更する
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Edit;
