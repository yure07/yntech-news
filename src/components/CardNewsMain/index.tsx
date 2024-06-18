import { useNavigate } from "react-router-dom";
import { ApiDataEverything } from "../../types"
import { MouseEventHandler } from "react";

interface NewsType{
  news: ApiDataEverything
}

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

const CardNewsMain = ({news}: NewsType) => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLElement>):void => {
    navigate(`/news/${news.title}/Geral=general`)
  }

  return(
  <section className="flex w-full xl:w-custom-image h-full xl:h-96
    px-6 py-6 bg-cover bg-center cursor-pointer"
    style={{ backgroundImage: `url(${news.urlToImage})`}}
    onClick={handleClick}>
    <article className="flex flex-col self-end">
      <h3 className="text-h3 text-[#01EBFA]">Geral</h3>
      <h1 className="text-white sm:text-h1 font-bold">{news.title}</h1>
      <h3 className="text-h3 text-white self-end">{convertData(news.publishedAt)}</h3>
    </article>
  </section>
  )
}

export default CardNewsMain