import "../styles/index.css";
import {useEffect, useState} from "react";
import backendURL from "../../backendURL";

export default function App() {
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
  console.log(news)
  return (
    <>
      <div className="text-3xl font-bold underline">Страница для новостей</div>
      {news && news.map(article => (
          <div key={article.id} className='p-8'>
            <div>{article.title}</div>
            <div>{article.description}</div>
          </div>

      ))}
    </>
  );
}
