import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import FilterPage from "../pages/FilterPage"

const RoutesApp = () => {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/filter/:name" element={<FilterPage/>}/>
    </Routes>
  )
}

export default RoutesApp