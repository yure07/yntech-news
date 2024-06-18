import { useEffect, useState } from "react"
import { ApiDataEverything } from "../../types"
import HeaderHome from "../../components/HeaderHome"
import CardNewsMain from "../../components/CardNewsMain"
import CardsNewsAside from "../../components/CardsNewsAside"

const Home = () => {
  const [data, setData] = useState<ApiDataEverything[] | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=keyword&language=pt&pageSize=5&apiKey=70e9af5b0a974ff9ab5d5eba4f2419a4');
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const result = await response.json();
        setData(result.articles);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])

  const convertData = (isoDate: string) => {
    const date = new Date(isoDate);

    const months = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month}, ${day}, ${year}`;
  }

 return(
  <main>
    <HeaderHome/>

    <section>
      {(loading || !data) ? (
        <div>Carregando...</div>
      ) : (
        <section className="flex flex-col items-center mt-8 xl:h-screen mb-24">
          <section className="flex flex-col xl:flex-row w-4/5 h-screen border-b-2 pb-12">
            <CardNewsMain news={data[0]}/> 
            <CardsNewsAside news={data.slice(1)}/>
          </section>
          <section className="flex flex-col w-4/5 lg:mt-20">
            <h1 className="text-xl font-bold">Mais lidas da semana:</h1>
            {data.slice(1).map((news) => (
              <section className="flex flex-col md:flex-row xl:justify-between md:h-72 my-4 py-4 md:py-12 px-4 md:px-8 shadow-2xl">
                <article className="flex flex-col md:flex-col-reverse md:justify-between md:py-3">
                  <p className="text-h3 text-secondary-light">{convertData(news.publishedAt)}</p>
                  <h1 className="text-2xl font-bold">{news.title}</h1>
                </article>
                <img className="md:w-72 md:h-auto mt-4 md:mt-0 md:ml-2" src={news.urlToImage} alt="img-news"/>
              </section>
            ))}
          </section>
        </section>
      )}
    </section>
  </main>
 )
}

export default Home