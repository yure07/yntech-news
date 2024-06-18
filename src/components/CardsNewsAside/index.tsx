import { ApiDataEverything } from "../../types"

interface NewsType{
  news: ApiDataEverything[]
}

const CardsNewsAside = ({news}: NewsType) => {
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
    <main className="flex flex-col justify-evenly h-96 xl:h-full xl:justify-evenly md:mt-4 xl:mt-0 xl:ml-4">
      {news.map((data) => (
        <section key={data.publishedAt} className="flex flex-row lg:h-1/2 xl:h-24 cursor-pointer border-b-2 py-1">
          <img src={data.urlToImage} className="w-32 sm:w-40 md:w-48 h-20 sm:h-32 md:h-auto lg:w-60 lg:h-auto xl:w-32 xl:h-20" alt="img-news"/>
          <article className="flex flex-col justify-between py-2 pl-3">
            <p className="text-secondary-light text-small sm:text-xs">{convertData(data.publishedAt)}</p>
            <h3 className="text-black text-xs sm:text-h2 xl:text-h3 font-bold sm:leading-7 xl:leading-4 lg:pb-2">{data.title}</h3>
          </article>
        </section>  
      ))}
    </main>
  )
}

export default CardsNewsAside