import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IoArrowBackCircle, IoBookOutline } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import { ApiDataEverything } from "../../types"

const convertData = (isoDate: string) => {
  const date = new Date(isoDate);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

const News = () => {
  const params = useParams()

  const [data, setData] = useState<ApiDataEverything | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [titleFilterPage, setTitleFilterPage] = useState<string>('')

  useEffect(() => {
    let paramsToUrl:string
    if(params && params.filter_name){
      const divide = params.filter_name.split('=')
      paramsToUrl = divide[1]
      setTitleFilterPage(divide[0])
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${paramsToUrl}&language=pt&pageSize=15&apiKey=7150186ffe9e4f64b960b37a59285c9d`);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const result = await response.json();
        console.log(paramsToUrl)
        result.articles.map((news: ApiDataEverything) => {
          if(news.title === params.title) setData(news)
        })
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])

 return(
  <main className="flex flex-col">
    <article className="flex flex-col w-screen h-56 md:h-38 bg-purple">
      <section className="flex flex-row items-center justify-center md:justify-between self-center 
        w-4/5 md:w-screen md:px-8 h-28">
        <Link to='/' className="hidden md:flex flex-row items-center text-h2 text-white font-bold font-montagu"> 
          <IoArrowBackCircle className="text-white mr-4"/> 
          YnTech News
        </Link>
        <h2 className="font-bold font-montagu text-h2 text-white md:mr-12">{titleFilterPage}</h2>
        <input type="text" 
          className="hidden w-48 h-9.5 bg-purple-dark 
          text-white px-2 rounded-xl-plus md:block"/>
      </section>
      <CiSearch className="text-white md:text-purple md:right-10 text-h1 absolute top-10 right-6"/>

      <nav className="flex flex-col md:flex-row items-center justify-between md:justify-center sm:justify-evenly
        w-screen h-28 md:h-11.5 py-4 bg-primary-light">
        <p className="flex text-xs lg:text-h3 text-secondary-light font-bold"> <IoBookOutline className="text-xl text-purple mr-2 md:mr-4 xl:mr-8"/> Selecione um filtro:</p>
        <ul className="flex flex-row flex-wrap w-3/4 md:w-auto xl:w-1/2 md:mb-1
          md:ml-4 xl:ml-8 gap-y-3 text-xs lg:text-h3 justify-center md:justify-normal xl:justify-between">
          <Link to="/filter/business=negócios" className="text-[#9F1515] cursor-pointer">Negócios</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/filter/entertainment=entretenimento" className="text-[#BF9B1A] cursor-pointer">Entretenimento</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/filter/health=saúde" className="text-[#820475] cursor-pointer">Saúde</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/filter/general=geral" className="text-[#01EBFA] cursor-pointer">Geral</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/filter/science=ciência" className="text-[#0B07D2] cursor-pointer">Ciência</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/filter/sports=esportes" className="text-[#0CC508] cursor-pointer">Esportes</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/filter/technology=tecnologia" className="text-[#8F0479] cursor-pointer">Tecnologia</Link>
        </ul>
      </nav>
    </article>

    <section className="flex flex-col self-center w-4/5 sm:w-1/2 my-8 
      ">
      
        {(!data || loading) ? (
          <div> Carregando... </div>
        ) : (
          <section className="flex flex-col items-center font-montserrat">
            <article className="flex flex-col px-4 sm:px-8 pb-4 md:pb-7 mb-4 border-b">
              <h1 className="text-xl sm:text-h2 font-bold">{data?.title}</h1>
              <p className="text-small sm:text-xs text-secondary-light 
                font-medium leading-3 my-2 md:my-6">
                {data?.description}
              </p>
              <h3 className="text-extra-small sm:text-small font-bold">
                Por {data?.author}
                <p className="text-secondary-light font-medium">{convertData(data?.publishedAt)}</p>
              </h3>
            </article>
            <img src={data?.urlToImage}
              className="w-full h-auto sm:px-8" 
              alt="img-news"/>
            <p className="text-extra-small sm:text-xs font-medium
            mt-6 px-4 sm:px-8 leading-5 md:leading-8">{data?.content}</p>
          </section>
        )}
        
      </section>

  </main>
  )
}

export default News