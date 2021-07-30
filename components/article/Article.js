import Link from "next/link";
import Image from 'next/image'


export default function Article({ article }) {

    return (
        <div className="mb-2 mt-2 mr-1 ml-1">
            <div className="my-1 px-1 lg:my-4 lg:px-4">
            <Link href={`/article/detail/${article.id}`}>
                <article className="flex cursor-pointer overflow-hidden border rounded-lg w-full sm:w-3/4 lg:w-3/5 sm:m-auto mb-3">
                    <Image
                        src={article.thumbnail ? article.thumbnail : "/NoImage.jpg"} 
                        alt="icon" 
                        className="border rounded-lg"
                        width={190}
                        height={160}/>
                    <div className="items-center justify-between leading-tight w-full relative">
                        <div className="pl-3 pr-3 pt-1 pb-1 border-b border-yellow-200 font-semibold border-dashed">
                            {article.title}
                        </div>
                        <div className="pl-3 pr-3 pt-1 text-xs sm:text-sm line-clamp-3 text-gray-800">
                            {article.body}
                        </div>
                        <div className="absolute left-1 bottom-1 text-yellow-600 w-32 sm:w-auto truncate">
                            <span className="text-xs">{article.category_name}/{article.main_material}</span>
                        </div>
                        <div className="absolute right-3 bottom-1 text-gray-600">
                            <span className="text-xs">作者: {article.author}</span>
                        </div>
                    </div>
                </article>
            </Link>
            </div>
        </div>
    );
}