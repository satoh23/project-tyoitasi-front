import fetch from "node-fetch";

export async function getAllArticleData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-list-article/`),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const article = await res.json();
    const fillterdArticles = article.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    return fillterdArticles;
}

export async function getAllArticleIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-list-article/`)
    );
    const articles = await res.json();

    return articles.map((article) => {
        return {
            params: {
                id: String(article.id),
            },
        };
    });
}

export async function getArticleData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/v1/get-detail-article/${id}/`)
        );
    const article = await res.json();

    return {
        article,
    };
}
