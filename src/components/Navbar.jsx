import { Link, useLocation } from "react-router-dom"
function Navbar(){
     const path=useLocation().pathname;
     console.log(path)
         const location=useLocation()

return(
  <div>
  {path!="/dashboard"&& <div className="flex justify-center items-center h-[90px] w-full  z-20 fixed  ">
   <h1 className="font-bold text-lg text-blue-500 bbh-sans-hegarty-regular  justify-self-start italic ml-8 ">CypherKeep</h1>
  <nav className=" flex  items-center justify-center h-[90px]  w-full ">
   
    <ul className="flex   gap-16 mr-40 ">
 <Link to="/">      <li className={`flex justify-center items-center    ${path== '/'? "text-black" : "" }`}><h1>Home</h1></li></Link>
<Link to="/dashboard">      <li className={`flex justify-center items-center    ${path== '/dashboard'? "text-black" : "" }`}><h1>Dashboard</h1></li></Link>
  <Link to="/aboutus">       <li className={`flex justify-center items-center    ${path== '/aboutus'? "" : "" }`}><h1>About us</h1></li></Link>
   <Link to="/features">      <li className={`flex justify-center items-center   ${path== '/features'? "" : "" }`}><h1>Features</h1></li></Link>
   <Link to="/login" state={{background:location}}>       <li className={`flex justify-center items-center    ${path== '/login'? "" : "" }`}><h1>Login</h1></li></Link>
    </ul>
  </nav>
  </div>}
  </div>
)
}
export default Navbar