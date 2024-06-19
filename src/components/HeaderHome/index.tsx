import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";

const UpperFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const HeaderHome = () => {
  const [company, setCompany] = useState<string>('')
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/filter/${UpperFirstLetter(company)}=${company}`)
  }

  return(
    <article className="flex flex-col w-screen h-56 md:h-38 bg-purple">
      <section className="flex flex-row items-center justify-center self-center 
        mr-2 w-4/5 md:w-screen h-28">
        <Link to='/' className="font-bold font-montagu text-h2 text-white 
          ml-12 md:ml-0 md:abosolute left-1/2">YnTech News</Link>
        <input type="text" 
          className="hidden w-57.5 h-9.5 px-4 ml-8 md:ml-16 bg-purple-dark 
          text-white rounded-xl-plus md:flex absolute right-8"
          onChange={(e) => setCompany(e.target.value)}/>
        <CiSearch className="text-white text-h2 ml-8 md:absolute right-12 cursor-pointer"
          onClick={handleClick}/>
      </section>

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
      
      {/* <nav className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col items-center justify-center 
        bg-primary-light w-auto xl:h-11.5 lg:h-11.5 md:h-28 sm:h-28 md:gap-y-4 sm:gap-y-4">
        <div className="flex flex-row items-center">
          <IoBookOutline className="xl:text-h2 lg:text-h2 md:text-h3 text-purple"/>
          <h3 className="xl:mx-10 lg:mx-10 md:ml-2 sm:ml-2 font-montserrat font-bold text-secondary-light 
            xl:text-h3 lg:text-h3 md:text-xs sm:text-xs">Selecione um filtro:</h3>
        </div>
        <div className="flex flex-row items-center lg:text-h3 md:text-xs">
          <Link to="/" className="text-[#9F1515] cursor-pointer">Negócios</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/" className="text-[#BF9B1A] cursor-pointer">Entretenimento</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/" className="text-[#820475] cursor-pointer">Saúde</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/" className="text-[#01EBFA] cursor-pointer">Geral</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/" className="text-[#0B07D2] cursor-pointer">Ciência</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/" className="text-[#0CC508] cursor-pointer">Esportes</Link>
          <div className="w-px h-4 mx-3 bg-secondary-light"></div>
          <Link to="/" className="text-[#8F0479] cursor-pointer">Tecnologia</Link>
        </div>
      </nav> */}
    </article>
  )
}
export default HeaderHome