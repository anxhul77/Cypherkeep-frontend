import Navbutton from "./Navbutton"


function Grid(){
return(    
             <div className="relavtive">
           <Navbutton name="Get Started"/>
          <div className="r grid grid-cols-40 gap-0 border-[0.1px] border-black  rounded-lg ">
                <div className=" border-[0.1px] border-black h-[70px] w-[35px] border-t-0 border-l-0 border-b-0"></div> 
    <div className=" col-span-39 border-[0.1px] border-black h-[70px] border-b-0 border-t-0 border-l-0 border-r-0"></div>
        <div  className="row-span-4 border-[0.1px] w-[35px] h-[600px] border-black border-l-0 border-b-0"></div>
        <div  className="col-span-39 border-[0.1px] border-black border-l-0 border-r-0 h-[430px]">
                <div className=" col-span-11 border-[0.1px] border-black h-[70px] border-l-0 border-r-0 border-t-0 "></div>
            <div className="flex flex-col mb-40 w-[730px] p-10  ">
   <h1 className="font-bold text-9xl ">Cypherkeep</h1>
   <p   className="mt-10 font-semibold p-6 ">Powered by hybrid cryptography (AES + RSA), CipherKeep keeps your data private — even from the server itself.</p>
    
    </div></div>
   
        <div  className="border-[0.3px] border-black col-span-39  h-[30px] border-t-0"></div>
        
    </div>

</div>
    

)
}
export default Grid