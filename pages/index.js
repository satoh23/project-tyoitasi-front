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
    const [nowFiltering, setNowFiltering] = useState(false)

    const [filterdArticles, setFilterdArticles] = useState(data?.sort(
        (a,b) => new Date(b.created_date) - new Date(a.created_date)
    ))

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
            setFilterdArticles(res.sort(
                (a, b) => new Date(b.created_date) - new Date(a.created_date)
            ))
            setNowFiltering(true)
        })
    }

    if (!filterdArticles) return <div>loading...</div>

    return (
        <Layout>
            <form onSubmit={filteringArticle} className="flex w-full justify-center justify-items-center pb-6 mb-3 border-b border-yellow-200 border-dotted">
                <span className="mt-1 mr-3 text-sm">検索:</span>
                <input
                required
                className="w-1/2 mr-3 appearance-none rounded-none relative inline-flex px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-sm"
                type="text"
                placeholder="サッポロ一番"
                maxLength="50"
                value={mainMaterial}
                onChange={(e) => setMainMaterial( e.target.value )}
                />
                <button
                type="submit"
                className="bg-transparent bg-yellow-300 hover:bg-white text-white hover:text-yellow-300 rounded px-2"
                >
                    検索
                </button>
                {nowFiltering ? 
                <button
                onClick={() => window.location.reload()}
                className="block bg-transparent bg-indigo-300 hover:bg-white text-white hover:text-indigo-300 rounded px-2 ml-2"
                >
                    リセット
                </button>:
                ""}
            </form>
            <div className="mx-auto justify-center items-center w-full">
                {filterdArticles &&
                  filterdArticles.map((article, index) => <Article key={index} article={article}/>)}
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