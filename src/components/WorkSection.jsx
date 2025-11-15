import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileContent from "./FileContent";
import RecentBoard from "./RecentBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { uploadFileThunk } from "../store/actions";
import { fetchFilesData } from "../store/actions";

function Worksection(){
       const [filess,setFiles]=useState([]);
      const dispatch=useDispatch();
    
  function handleFileChange(e){
    const selected = Array.from(e.target.files); 
    console.log("selected",selected) 
  setFiles((prevFiles) => [...prevFiles, ...selected]);
  }
  const state=useSelector((state)=>{return state})
    console.log(state)
 async function handleUpload(){
    if (filess.length === 0) return alert("Please select files first.");

  for (const file of filess) {
    await dispatch(uploadFileThunk(file));  
  }
  alert("All files uploaded successfully!");
  }
         const {files}=useSelector((state)=>state.fileMeta)
          console.log(files)
  useEffect(() => {
    dispatch(fetchFilesData());
  }, [dispatch]);

return(
   <>
    <div className="bg-gray-100 w-full  flex  p-6 h-full overflow-hidden ">
        <div className="flex flex-col">
        <h1 className="font-bold text-4xl ">My Drive</h1>
        <p>Upload manage and share your file secuerly</p>
   <div className="h-[150px] w-[450px] rounded-4xl border-4 border-dashed divide-dashed-x bg-white border-blue-500 mt-4 mb-5 shadow-lg flex justify-center items-center">
        <label htmlFor="inp" className="cursor-pointer flex items-center gap-2 text-slate-600 font-semibold text-2xl">
  <FontAwesomeIcon icon={faCloudArrowUp} />
  Upload file here
</label>
        <input type="file" id="inp" className="hidden" multiple onChange={handleFileChange}></input>
   </div>
   <FileContent files={filess} />
   <button  className="w-[450px] h-[40px] mt-5 bg-blue-600 rounded-2xl text-white p-2 shadow-lg " onClick={handleUpload}>Upload</button>
    </div>
    <div className="w-full p-10 flex flex-col justify-center items-center ">
        
    <RecentBoard files={files} />
    </div>
    </div>
    
    </>
)
}
export default Worksection;