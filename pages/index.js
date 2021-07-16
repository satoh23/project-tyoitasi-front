import { useRouter } from "next/router";
import { useEffect } from "react";
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
        credentials: "include"
    }).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-list-article/`;

export default function Home({ staticArticles }) {
    const router = useRouter();
    const {data, mutate} = useSWR(apiUrl, fetcher, {
        initialData: staticArticles,
    }); 

    const fillterdArticles = data?.sort(
        (a,b) => new Date(b.created_date) - new Date(a.created_date)
    );

    useEffect(() => {
        mutate();
    }, []);

    if (!data) return <div>loading...</div>

    return (
        <Layout>
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