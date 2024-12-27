import {Link, NavLink} from "react-router";
import {useEffect, useState} from "react";
import backendURL from '../../backendURL'

const HomePage = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        async function fetchNews() {
            const data = fetch(`${backendURL}/articles`, {
                method: "GET",
            })
                .then(res => res.json())
            setNews(await data)
        }
        fetchNews().then()

    }, []);
    return (
        <>
            <h1 className="text-3xl font-bold underline">Страница для новостей</h1>

            <Link to="news/add">Add new News</Link>

            {news && news.map(article => (
                <div key={article.id} className='p-8'>
                    <div>{article.title}</div>
                    <div>{article.description}</div>
                    <NavLink to={`/news/${article.id}`} end>
                        Подробнее
                    </NavLink>
                </div>
            ))}
        </>
    );
};

export default HomePage;