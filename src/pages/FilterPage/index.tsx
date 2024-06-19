import { useEffect, useState } from "react";
import { Link, Params, useParams, useNavigate } from "react-router-dom"
import { CiSearch } from "react-icons/ci"
import { IoBookOutline } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import { ApiDataEverything } from "../../types";

const UpperFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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

const FilterPage = () => {
  const params:Readonly<Params<string>> = useParams()
  const [data, setData] = useState<ApiDataEverything[] | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [titleFilterPage, setTitleFilterPage] = useState<string>('')
  const [paramsToUrl, setParamsToUrl] = useState<string>('')
  const [companyInput, setCompanyInput] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    let paramsToUrl:string
    if(params && params.name) {
      const divide = params.name.split('=')
      paramsToUrl = divide[0]
      setParamsToUrl(divide[0])
      setTitleFilterPage(UpperFirstLetter(divide[1]))
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${paramsToUrl}&language=pt&pageSize=15&apiKey=7150186ffe9e4f64b960b37a59285c9d`);
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
  },[titleFilterPage, params])

  const handleClickCard = (newsTitle: string) => {
    navigate(`/news/${newsTitle}/${titleFilterPage}=${paramsToUrl}`)
  }

  const handleClickInput = () => {
    navigate(`/filter/${companyInput}=${companyInput}`)
  }

  return(
    <>
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
          text-white px-4 rounded-xl-plus md:block"
          onChange={(e) => setCompanyInput(e.target.value)}
        />
      </section>
      <CiSearch className="text-white md:text-purple md:right-10 text-h1 absolute 
        top-10 right-6 cursor-pointer"
        onClick={handleClickInput}
      />

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

    <article className="flex flex-col mx-auto items-center mt-8 w-4/5">
      {(loading || !data) ? ( 
        <div>Carregando...</div> 
      ) :(
      data?.slice(0, 5).map((news) => (
        (news.urlToImage !== null && !news.title.includes('%') && !news.title.includes('?')) &&
        <section key={news.url} 
          className="flex flex-col md:flex-row lg:w-max-desktop lg:justify-between px-5 py-5 
            mb-5 shadow-2xl cursor-pointer"
          onClick={() => handleClickCard(news.title)}>
          <article className="flex flex-col md:flex-col-reverse mb-5 md:mb-0 md:mr-4 md:self-center 
            lg:w-custom-image lg:h-48 lg:justify-between">
            <p className="text-h3 text-secondary-light">{convertData(news.publishedAt)}</p>
            <h3 className="text-2xl leading-6 font-bold mt-4 md:mt-0 md:mb-4 lg:mb-0 lg:text-3xl">{news.title}</h3>
          </article>
          <img src={news.urlToImage} alt="img-news" className="w-full md:w-72 lg:w-80 lg:h-56"/>
        </section>
      )))}
    </article>
    </>
  )
}

export default FilterPage