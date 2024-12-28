import backendURL from '../../backendURL'


async function sendArticle(title: string, description: string) {
    const data = fetch(`${backendURL}/articles/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"title":title, "description": description})
    })
        .then(res => res.json())
}

const NewsAddPage = () => {
    const handleSignin = (event) => {
        event.preventDefault()
        const form = event.target
        const title = form.title.value
        const description = form.description.value
        sendArticle(title, description).then()
    }

    return (
        <>
            <>
                <div className="p-8 min-w-3/4 w-96">
                    <h1 className="text-2xl">Добавление новой статьи</h1>
                    <form onSubmit={handleSignin} className="mt-6 ">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row">
                                <label className="min-w-24 ">Заголовок:</label>
                                <input className="flex-1" type="text" name="title"/>
                            </div>
                            <div className="flex flex-row">
                                <label className="min-w-24 ">Описание:</label>
                                <input className="flex-1" type="text" name="description"/>
                            </div>
                            <div className="flex flex-row-reverse mt-4">
                                <button type="submit" className="border rounded px-2.5 py-1 w-32">
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </>
    );
};

export default NewsAddPage;