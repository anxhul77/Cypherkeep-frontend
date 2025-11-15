import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";

import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { FaRegWindowClose } from "react-icons/fa";
import { authenticateSignInUser } from "../../store/actions";
import { Inputfield } from "../shared/Inputfield";

const Register = ({ isModal }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  
  const originalBackground=location.state?.background || location
  const loginHandler = async (data) => {
    console.log(data)
    dispatch(authenticateSignInUser(data, reset, toast, navigate, setLoading));
  };

  const handleCloseClick = () => {
    if(location.state?.background){
   navigate(-1)
    }else{
      navigate("/")
    }
  };
  
  const ifModal="fixed inset-0 bg-white/30  flex justify-center items-center z-50 "
  return (
   <div className={isModal ? ifModal :"flex flex-col  items-center justify-center"}>
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-lg py-8 sm:px-8 px-4 rounded-md bg-white"
      >
       { isModal && <div className="flex justify-end items-center cursor-pointer" onClick={handleCloseClick}>
          <FaRegWindowClose size={20} className="text-gray-500 hover:text-slate-800" />
        </div>}
        <div className="flex flex-col justify-center w-full">
          <AiOutlineLogin className="text-slate-800 text-5xl self-center mb-2" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Register
          </h1>
          <hr className="mt-2 mb-5 border-black" />
          <div className="flex flex-col gap-3 w-full">
            <Inputfield
              label="Username"
              required
              id="register-username"
              type="text"
              message="Username is required"
              placeholder="Enter Username"
              register={register}
              error={errors}
            />
            <Inputfield
              label="Email"
              required
              id="register-email"
              type="email"
              message="Email is required"
              placeholder="Enter Email"
              register={register}
              error={errors}
            />


            <Inputfield
              label="Password"
              required
              id="register-password"
              type="password"
              message="Password is required"
              placeholder="Enter Password"
              register={register}
              error={errors}
            />

            <button
              className="bg-purple-500 flex gap-2 items-center justify-center font-semibold
                text-white w-full py-2 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition-colors duration-100 rounded-md my-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <>Loading...</> : <>Login</>}
            </button>

            <p className="text-center text-sm text-slate-700 mt-3">
              Already have an account?{" "}
              <Link className="font-semibold underline hover:text-black" to="/login" state={{background:originalBackground}} >
                <span>SignUp</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;