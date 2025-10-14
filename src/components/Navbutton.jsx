import "./Navbutton.css"
function Navbutton({name}){
    
  return(
     <div  className="mt-[465px] absolute z-70 ml-[150px]">
    
      <button type="button" >
        <div class="top font-bold">{name}</div>
        <div class="bottom"></div>
    </button>
    </div>
  )
}
export default Navbutton