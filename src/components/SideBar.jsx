import { faFileArrowDown, faHouse, faQrcode, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import defaultimg from "../assets/default.png"
function Sidebar(){
    const path=useLocation().pathname;
    const username="Anshul"
return(
    <>
    <div className="w-[260px]  flex flex-col h-full  items-center p-8 border-t-1 border-slate-300">
     <div className="flex flex-col h-full  items-center p-10 gap-10">
     <div className="border circle border-slate-300 shadow-lg h-30 w-30 overflow-hidden">
        <img src={defaultimg} className="cover"></img>
     </div>
   <h1 className="font-bold">{username}</h1>
     <ul className="flex flex-col items-center gap-8">
        <Link to="/"><li className={`flex justify-center items-center  w-[230px] h-[40px] gap-2 rounded-lg  ${path== '/'? "text-black bg-blue-500 shadow-lg" : "" }`}><FontAwesomeIcon icon={faHouse} /><h1>Home</h1></li></Link>
         <Link><li className={`flex justify-center items-center w-[230px] h-[40px] gap-2 rounded-lg ${path=='/dashboard'?" text-white bg-blue-500 shadow-lg ":" "}`}> <FontAwesomeIcon icon={faQrcode} /><h1>Dashboard</h1></li></Link>
         <Link><li className={`flex justify-center items-center w-[230px] h-[40px] gap-2 rounded-lg ${path==''?"shadow-lg text-white ":" "}`}> <FontAwesomeIcon icon={faShare} /><h1>Share</h1></li></Link>
                  <Link><li className={`flex justify-center items-center w-[230px] h-[40px] gap-2 rounded-lg ${path==''?" shadow-lg text-white":" "}`}> <FontAwesomeIcon icon={faFileArrowDown} /><h1>Download</h1></li></Link>
                           
     </ul>
     </div>
    </div>
    </>
)
}
export default Sidebar;