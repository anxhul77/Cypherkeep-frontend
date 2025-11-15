import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileContent from "./FileContent";
import Sidebar from "./SideBar";
import Worksection from "./WorkSection";
import { faFileShield } from "@fortawesome/free-solid-svg-icons";

function Dashboard(){
   


 return(
    <>
      <div className="w-full">
         <div className="h-[700px] m-6 border border-slate-300 rounded-2xl flex shadow-lg flex-col ">
          <div className="w-full h-[50px]    flex p-3 text-3xl gap-2 font-bold "> <FontAwesomeIcon icon={faFileShield} /><h1 className="bbh-sans-hegarty-regular text-blue-500">CYPHERKEEP</h1></div>
          <div className="flex overflow-hidden">
         <Sidebar/>
           <Worksection/>
          </div>
         </div>
      
      </div>
    </>
 )
 }
 export default Dashboard;