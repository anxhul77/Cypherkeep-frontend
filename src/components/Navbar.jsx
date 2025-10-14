import { Link, useLocation } from "react-router-dom"
function Navbar(){
     const path=useLocation().pathname;
     console.log(path)
return(
  <nav className=" flex flex-col items-center justify-between w-full px-8 py-4 z-50 absolute mt-6">
    <ul className="flex self-end items-center space-x-8 text-gray-700 font-medium mb-4 pr-10 gap-3">
        <li className={`flex justify-center items-center py-3 px-4  rounded-4xl  ${path== '/'? "bg-black text-white" : "bg-white" }`}><h1>Home</h1></li>
         <li className={`flex justify-center items-center py-3 px-4  rounded-4xl  ${path== '/dashboard'? "bg-black text-white" : "bg-white" }`}><h1>Dashboard</h1></li>
         <li className={`flex justify-center items-center py-3 px-4  rounded-4xl  ${path== '/aboutus'? "bg-black text-white" : "bg-white" }`}><h1>About us</h1></li>
         <li className={`flex justify-center items-center py-3 px-4  rounded-4xl  ${path== '/features'? "bg-black text-white" : "bg-white" }`}><h1>Features</h1></li>
          <li className={`flex justify-center items-center py-3 px-4  rounded-4xl  ${path== '/login'? "bg-black text-white" : "bg-white" }`}><h1>Login</h1></li>
    </ul>
  </nav>
)
}
export default Navbar