import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";

import Layout from "../components/layout/Layout";
import Article from "../components/article/Article";

import { getAllArticleData } from "../lib/article/getList";

const fetcher = (url) => fetch(url, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-list-article/`;

export default function Home({ staticArticles }) {
    const router = useRouter();
    const {data, mutate} = useSWR(apiUrl, fetcher, {
        initialData: staticArticles,
    }); 
    const [mainMaterial, setMainMaterial] = useState("")

    let fillterdArticles = data?.sort(
        (a,b) => new Date(b.created_date) - new Date(a.created_date)
    );

    useEffect(() => {
        mutate();
    }, []);

    const filteringArticle = async(e) => {
        e.preventDefault();
        await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-list-article/?main_material=${mainMaterial}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                alert("検索に失敗しました")
            }
        })
        .then((res) => {
            console.log("aaa")
            fillterdArticles = res.sort(
                (a, b) => new Date(b.created_date) - new Date(a.created_date)
            );
        })
    }

    if (!fillterdArticles) return <div>loading...</div>

    return (
        <Layout>
            <form method="post" onSubmit={filteringArticle}>
                <div className="flex w-full">
                    <span className="w-5/12 md:w-3/12 mt-1 text-sm">検索</span>
                    <input
                    required
                    className="mb-5 mr-6 sm:mr-0 appearance-none rounded-none relative inline-flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                    type="text"
                    placeholder="サッポロ一番"
                    maxLength="50"
                    value={mainMaterial}
                    onChange={(e) => setMainMaterial( e.target.value )}
                    />
                </div>
                <button
                type="submit"
                className="mr-3 ml-5 bg-transparent font-bold bg-yellow-300 hover:bg-white text-white hover:text-yellow-300 hover:text-white py-2 px-3 rounded"
                >
                    検索する
                </button>
            </form>
            <div className="mx-auto justify-center items-center w-full">
                {fillterdArticles &&
                  fillterdArticles.map((article, index) => <Article key={index} article={article}/>)}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const staticArticles = await getAllArticleData();
    return {
        props: { staticArticles },
        revalidate: 10,
    };
}