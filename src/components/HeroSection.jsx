
import heroimg from "../assets/heroimg.png";

function HeroSection() {
  return (
    <header className="relative flex justify-center items-center h-[400px] mt-[-5px]">
      <img src={heroimg} alt="hero" className="h-[460px] w-[800px] object-cover z-0"/>
      <div className="absolute top-[50%] -translate-y-[-50%] flex flex-col items-center gap-4 text-center z-10">
        <h1 className="text-5xl font-bold">Store, encrypt, and share securely with</h1>
        <h1 className="text-5xl font-bold text-blue-600">Cypherkeep</h1>
        <p className="max-w-xl text-lg text-gray-600">
          Powered by hybrid cryptography (AES + RSA), Cypherkeep keeps your data private — even from the server itself.
        </p>
      <div className="  flex justify-center items-center ">
        <button className="bg-blue-500 rounded-2xl p-2 w-[130px] h-[50px] text-white mr-[30px]">Get Started</button>
        <button className="bg-blue-300 rounded-2xl p-2 w-[130px] h-[50px] text-white mr-[30px]">Get Started</button>
      </div>
    
      </div>
    </header>
  );
}

export default HeroSection;
