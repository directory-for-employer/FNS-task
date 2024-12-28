import {useParams} from "react-router";
import {useEffect, useState} from "react";
import backendURL from '../../backendURL'


async function fetchNews(id:number, title:string, description:string) {
    const data = fetch(`${backendURL}/articles/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"title":title, "description": description})
    })
        .then(res => res.json())
}


const EditPage = () => {
    let {id} = useParams();
    const [news, setNews] = useState({});
    useEffect(() => {
        async function fetchNews() {
            const data = fetch(`${backendURL}/articles/${id}`, {
                method: "GET",
            })
                .then(res => res.json())
            setNews(await data)
        }
        fetchNews().then()

    });



    const handlesubmin = (event) => {
        event.preventDefault()
        const form = event.target
        const title = form.title.value
        const description = form.description.value
        console.log(title,description)
        fetchNews(id, title, description).then()
    }


    return (
        <>
            <div className="p-8 min-w-3/4 w-96">
                <h1 className="text-2xl">Измениение статьи под id {id}</h1>
                <form onSubmit={handlesubmin} className="mt-6 ">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row">
                            <label className="min-w-24 "> Заголовок:</label>
                            <input className="flex-1" name="title" type="text" defaultValue={news.title}/>
                        </div>
                        <div className="flex flex-row">
                            <label className="min-w-24 ">Описание: </label>
                            <input className="flex-1" name="description" type="text" defaultValue={news.description}/>
                        </div>
                        <div className="flex flex-row-reverse mt-4">
                            <button type="submit" className="border rounded px-2.5 py-1 w-32">
                                Изменить
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditPage;