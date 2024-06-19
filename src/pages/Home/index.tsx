import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiDataEverything } from "../../types"
import HeaderHome from "../../components/HeaderHome"
import CardNewsMain from "../../components/CardNewsMain"
import CardsNewsAside from "../../components/CardsNewsAside"

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

const Home = () => {
  const [data, setData] = useState<ApiDataEverything[] | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=general&language=pt&pageSize=15&apiKey=7150186ffe9e4f64b960b37a59285c9d`);
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

  const handleClick = (newsTitle: string) => {
    navigate(`/news/${newsTitle}/Geral=general`)
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
            <CardsNewsAside news={data.slice(1, 4)}/>
          </section>
          <section className="flex flex-col w-4/5 lg:mt-20">
            <h1 className="text-xl font-bold">Mais lidas da semana:</h1>
            {data.slice(1, 4).map((news) => (
              <section key={news.title} className="flex flex-col md:flex-row xl:justify-between 
                md:h-72 my-4 py-4 md:py-12 px-4 md:px-8 shadow-2xl cursor-pointer"
                onClick={() => handleClick(news.title)}>
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