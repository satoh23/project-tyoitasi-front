import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Cookie from "universal-cookie";

import Layout from "../../components/layout/Layout";

const cookie = new Cookie();

const fetcher = (url) => fetch(url, 
  {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include"
  }).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-list-category/`;

const Create = () => {
  const router = useRouter();
  const author = cookie.get("UID")
  const [article, setArticle] = useState({author: "", thumbnail: null, title: "", body: "", material: "", category: ""})
  const [previwThumbnail, setPreviwThumbnail] = useState("")
  const [isChangeFile, setIsChangeFile] = useState(false);

  const {data, mutate} = useSWR(apiUrl, fetcher); 

  const createarticle = async (e) => {
    e.preventDefault();
    let haveValidToken = false
    let wasGetNewToken = false
    if (article.category.length < 5) {
      alert("カテゴリを選択してください")
      return
    }
    if (isChangeFile) {
        await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-article/`,
            {
            method: "POST",
            body: JSON.stringify({author_id: author, thumbnail: article.thumbnail, encoded_thumbnail: article.thumbnail, title: article.title,
                                  body: article.body, material: article.material, category: article.category}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
            }
        ).then((res) => {
            if (res.status === 401) {
            haveValidToken = false
        } else {
            haveValidToken = true
            router.push("/")
        }
        });
        if (!haveValidToken) {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            .then((res) => {
                if (res.ok) {
                    wasGetNewToken = true
                } else {
                    alert("先にログインしてください")
                    router.push("/")
                }
            })
        }
        if (wasGetNewToken) {
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-article/`,
                {
                method: "POST",
                body: JSON.stringify({author_id: author, thumbnail: article.thumbnail, encoded_thumbnail: article.thumbnail, title: article.title,
                                      body: article.body, material: article.material, category: article.category}),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            router.push("/")
        }
    } else {
        await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-article-not-thumbnail/`,
            {
              method: "POST",
              body: JSON.stringify({author_id: author, title: article.title, body: article.body, material: article.material, category: article.category}),
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include"
            }
          ).then((res) => {
            if (res.status === 401) {
              haveValidToken = false
          } else {
              haveValidToken = true
              router.push("/")
          }
          });
          if (!haveValidToken) {
              await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/token-refresh/`,{
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  credentials: "include"
              })
              .then((res) => {
                  if (res.ok) {
                      wasGetNewToken = true
                  } else {
                      alert("先にログインしてください")
                      router.push("/")
                  }
              })
          }
          if (wasGetNewToken) {
            await fetch(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/create-article-not-thumbnail/`,
                {
                  method: "POST",
                  body: JSON.stringify({author_id: author, title: article.title, body: article.body, material: article.material, category: article.category}),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include"
            })
            router.push("/")
          }
    }}
  const encodeFile = (e) => {
      if (e.target.files[0]) {
          setPreviwThumbnail(window.URL.createObjectURL(e.target.files[0]));
          let file_reader = new FileReader();
          file_reader.readAsDataURL(e.target.files[0]);
          file_reader.addEventListener('load', function(e) {
          let encodedFile = e.target.result
          encodedFile = encodedFile.replace(/^data:\w+\/\w+;base64,/, "")
          setArticle({...article, thumbnail: encodedFile})
          })
          setIsChangeFile(true)
      }
  };
  return (
    <form method="post" onSubmit={createarticle}>
      <Layout>
        <div className="w-full sm:w-3/4 lg:w-2/4 mb-10 md:mb-0 text-center">
          <div>
            <img
              src={previwThumbnail ? previwThumbnail : "/NoImage.jpg"}
              alt="icon"
              className="w-auto h-64 md:h-96 container mx-auto border-yellow-300 border shadow-md"
            />
          </div>
          <div className="mt-6">
            <input type="file" onChange={encodeFile} />
          </div>

          <div className="flex w-full mt-12">
            <span className="w-5/12 md:w-3/12 mt-2 text-sm">タイトル：</span>
            <input
              required
              className="mb-5 mr-6 sm:mr-0 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
              type="text"
              placeholder="タイトル"
              maxLength="50"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
            />
          </div>

          <div className="flex w-full">
            <span className="w-5/12 md:w-3/12 mt-4 text-sm">本文：</span>
            <textarea
              required
              className="resize-none mr-6 sm:mr-0 mb-5 appearance-none rounded-none relative inline-flex w-full h-80 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
              type="text"
              placeholder={`1. 〇〇をする\n\n2. 〇〇をする....`}
              value={article.body}
              onChange={(e) => setArticle({ ...article, body: e.target.value })}
            />
          </div>

          <div className="flex w-full">
            <span className="w-5/12 md:w-3/12 mt-1 text-sm">材料：</span>
            <input
              required
              className="mb-5 mr-6 sm:mr-0 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
              type="text"
              placeholder="半角スペースを挟むことで複数登録できます(例：生卵 袋麺 ねぎ)"
              maxLength="50"
              value={article.material}
              onChange={(e) => setArticle({ ...article, material: e.target.value })}
            />
          </div>

          <div className="w-full flex">
            <span className="w-5/12 md:w-3/12 mt-1 text-sm">カテゴリ：</span>
            <select
              className="w-full p-1 mb-5 mr-6 sm:mr-0 rounded border border-gray-300 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 text-sm pr-10"
              onChange={(e) => setArticle({ ...article, category: e.target.value })}
            >
              <option value={null}>----- 選択してください -----</option>
              {data &&
                data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
            </select>
          </div>
          <div className='flex w-full overflow-hidden flex-row h-auto content-center pb-3 hidden lg:block text-right'>
            <button
              type="submit"
              className="mt-6 ml-4 bg-transparent hover:bg-yellow-200 text-yellow-300 hover:text-white py-1 px-3 border border-yellow-300 hover:border-transparent rounded">
                公開する
            </button> 
          </div>
        </div>
      </Layout>
      <nav className="w-full flex bg-opacity-80 items-center flex-wrap bg-yellow-200 font-nav z-10 fixed bottom-0 lg:hidden block border-t border-border-yellow">
        <div className="flex justify-end w-full overflow-hidden flex-row h-auto content-center p-2">
          <button
            type="submit"
            className="mr-3 ml-5 bg-transparent font-bold bg-yellow-300 hover:bg-white text-white hover:text-yellow-300 hover:text-white py-2 px-3 rounded"
          >
            公開する
          </button>
        </div>
      </nav>
    </form>
  );
};

export default Create;
