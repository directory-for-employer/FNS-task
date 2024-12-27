import {NavLink, useParams} from "react-router";
import {useEffect, useState} from "react";
import backendURL from "../../backendURL.js";

const NewsPage = () => {
    let {id} = useParams();
    const [news, setNews] = useState([]);
    useEffect(() => {
        async function fetchNews() {
            const data = fetch(`${backendURL}/articles/${id}`, {
                method: "GET",
            })
                .then(res => res.json())
            setNews(await data)
        }
        fetchNews().then()

    }, []);
    return (
        <>
         <div className="flex-1 p-8 w-[350px] justify-items-center">
             <div className=" ">{news.title}</div>
             <div className="py-5">{news.description}</div>
             <NavLink to='/' end>
                 Вернуться на главную
             </NavLink>
         </div>
        </>
    );
};

export default NewsPage;