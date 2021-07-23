import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Image from 'next/image'

import Layout from "../../../components/layout/Layout";
import { getAllArticleIds, getArticleData } from "../../../lib/article/getList";


const fetcher = (url) => fetch(url).then((res) => res.json());

const displayMaterials = (materials) => {
    const splitWords = / |　/
    const materialList = materials.split(splitWords)
    if (materialList) {
        return (
            <span className="mt-2">
                {materialList.map((material, index) => <div key={index} className="pt-2 border-b border-yellow-400 border-dotted">・{material}</div>)}
            </span>
        )
    }
}

const displayBody = (body) => {
    const splitWords = /;|；/
    const bodyList = body.split(splitWords)
    if (bodyList[bodyList.length-1].length < 1 ) {
        bodyList.pop()
    }
    if (body) {
        return (
            <span>
                {bodyList.map((body, index) => 
                    <div key={index} className="pb-6 border-b border-yellow-400 border-dotted">
                        <span className="text-lg font-bold text-gray-500">
                            {index+1}
                        </span>
                        <span className="ml-5 block">
                            {replaceLF(body, index)}
                        </span>
                    </div>)}
            </span>
        )
    }
}

const replaceLF = (body, index) => {
    if (index === 0) {
        return body
    }
    const replacedBody = body.replace(/\n/, "");
    return replacedBody
}

export default function Article({ staticArticle, id }) {
    const router = useRouter();
    const {data: article, mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-detail-article/${id}/`,
        fetcher, 
        {
          initialData: staticArticle,
        }
    );

    useEffect(() => {
        mutate();
    }, []);

    if (router.isFallback  ||  !article) {
        return <div>Loading...</div>;
    }
    return (
        <Layout>
            <article className="bg-yellow-100 border-border-yellow border w-4/5 lg:w-3/5 rounded-md pb-3">
            <div className="w-5/6 m-auto rounded-md">
                <div className="w-full font-bold m-auto text-md md:text-xl text-center p-3 text-gray-500 border-b border-yellow-300">
                    {article.title}
                </div>
                <div className="flex mt-3 mb-3">
                <Image
                    src={article.thumbnail ? article.thumbnail : "/NoImage.jpg"} 
                    alt="icon" 
                    className="rounded-lg"
                    width={170}
                    height={170}/>
                <div className="w-3/6 ml-3 lg:ml-8 text-xs md:text-base">
                    <div className="font-bold text-gray-500 border-b border-yellow-400 border-dotted pl-2">○材料○</div>
                    <div>{article.material ? displayMaterials(article.material) : ""}</div>
                </div>
                </div>
                <div className="font-bold text-xs md:text-base text-gray-500 border-b border-yellow-300 p-1 mb-5">
                    <span className="ml-3">○作り方○</span>
                </div>
                <div className="px-5 whitespace-pre-wrap">
                    {article.body ? displayBody(article.body) : ""}
                </div>
            </div>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllArticleIds();

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const staticArticle = await getArticleData(params.id);
    return {
        props: {
            id: params.id,
            staticArticle,
        },
        revalidate: 3,
    };
}