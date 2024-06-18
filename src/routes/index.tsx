import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import FilterPage from "../pages/FilterPage"
import News from "../pages/News"

const RoutesApp = () => {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/filter/:name" element={<FilterPage/>}/>
      <Route path="/news/:title/:filter_name" element={<News/>}/>
    </Routes>
  )
}

export default RoutesApp