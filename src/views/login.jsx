import React, { useEffect, useState } from "react";
import LoginBackground from "../externals/login.jpg";
import { Link } from "react-router-dom";
import { ReactComponent as Email } from "../externals/account.svg";
import { ReactComponent as Key } from "../externals/Key.svg";
import {
  auth,
  signInWithGoogle,
  loginWithEmailAndPassword,
} from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const signInWithFacebook = () => {};

  const handleAuth = async (email, password) => {
    try {
      await loginWithEmailAndPassword(email, password);
      navigate("/home");
    } catch (err) {
      setOpen(true);
    }
  };

  const handleAuthWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigate("/home");
      }
    } catch (err) {
      setOpen(true);
    }
  };

  return (
    <div className="w-full flex overflow-auto min-h-screen items-center flex-col">
      <div className="w-full h-[100vh] flex overflow-hidden relative items-start flex-shrink-0 ">
        <img
          src={LoginBackground}
          className="absolute top-0 left-0 w-full h-[100vh]"
        />
        <div className="absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-b from-black opacity-40" />
        <div className="absolute top-[125px] left-[756px] w-[625px] h-[157.60498046875px] flex items-start flex-shrink-0">
          <div className="relative mx-40 w-[597px] h-[124px] flex flex-col items-end flex-shrink-0">
            <span className="text-[#28201F] font-normal text-[32px] leading-[44px] font-poppins">
              <span className="font-normal">
                Come with us and embark in majestic{" "}
              </span>
              <span className="text-[rgba(217,237,130,1)]  font-semibold">
                journeys{" "}
              </span>
              <span className="font-normal"> in the </span>
              <span className="text-[rgba(217,237,130,1)] font-semibold">
                beauty of this world.
              </span>
            </span>
          </div>
        </div>
        <div className="relative px-40 h-full flex flex-col items-start justify-center gap-10 p-[128px] bg-white">
          <span className="text-[rgba(23,23,37,1)] text-[30px] font-semibold text-center font-poppins">
            Log In
          </span>
          {open ? (
            <span className="text-[#a93f3f] text-[15px] font-semibold text-center font-poppins">
              Invalid email or password. Try again!
            </span>
          ) : null}
          <div className="flex flex-col items-start justify-center gap-10">
            <div className="flex flex-col items-end gap-8">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-center self-stretch gap-6">
                  <form className="flex flex-col items-start self-stretch gap-4">
                    <div className="flex items-center self-stretch gap-4 p-3 border-[1.6037530899047852px] border-[rgba(224,226,233,1)] rounded-lg bg-white">
                      <div className="relative w-[22px] h-[17.200050354003906px] flex items-start flex-shrink-1">
                        <Email />
                      </div>
                      <input
                        className="text-rgba(23,23,37,1) text-[14px] font-medium leading-normal font-poppins focus:outline-none"
                        placeholder="Your email"
                        onChange={(e) => {
                          setOpen(false);
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="flex items-center self-stretch gap-4 p-3 border-[1.6037530899047852px] border-[rgba(224,226,233,1)] rounded-lg bg-white">
                      <div className="relative w-[19px] h-[18.999996185302734px] flex items-start flex-shrink-1">
                        <Key />
                      </div>
                      <input
                        className="text-rgba(23,23,37,1) text-[14px] font-medium leading-normal font-poppins focus:outline-none"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          setOpen(false);
                          setPassword(e.target.value);
                        }}
                      ></input>
                    </div>
                  </form>

                  <button
                    onClick={() => handleAuth(email, password)}
                    className="flex items-center justify-center gap-2.5 p-3 self-stretch bg-[rgba(16,46,56,1)] rounded-lg"
                  >
                    <span className="text-white text-[15px] font-semibold text-center font-poppins">
                      Log In
                    </span>
                  </button>
                  <div className="flex items-center justify-end self-stretch gap-2.5 w-[403px]">
                    <span className="text-[rgba(16,46,56,1)] text-[15px] font-semibold text-center leading-6 font-poppins">
                      Forgot password?
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-5">
                    <div className="flex items-center self-stretch gap-5 w-[401px]">
                      <div className="bg-slate-300 w-44 h-[1px]"></div>

                      <span className="text-[rgba(150,153,183,1)] text-[14px] font-medium text-center font-poppins">
                        or
                      </span>
                      <div className="bg-slate-300 w-44 h-[1px]"></div>
                    </div>
                  </div>
                </div>

                <div className="flex self-stretch flex-col gap-5 items-start flex-shrink-0">
                  <button
                    onClick={() => {
                      handleAuthWithGoogle()
                    }}
                    className="flex gap-3.75 p-2 self-stretch items-center border-[1.6037530899047852px] border-[rgba(224,226,233,1)] rounded-lg justify-center bg-white"
                  >
                    <div className="relative w-[27px] h-[27.55061912536621px]flex flex-col flex-shrink-1">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="relative right-32"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <a className="text-[rgba(23,23,37,1)] text-[14px] font-semibold font-poppins">
                      Google
                    </a>
                  </button>
                  <button
                    onClick={signInWithFacebook}
                    className="flex gap-3.75 p-2 self-stretch items-center border-[1.6037530899047852px] border-[rgba(224,226,233,1)] rounded-lg justify-center bg-white"
                  >
                    <div className="relative w-[36px] h-[27px] flex items-start flex-shrink-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 48 48"
                        className="relative top bottom-9 right-[122px]"
                      >
                        <path
                          fill="#3F51B5"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                        ></path>
                      </svg>
                    </div>
                    <a className="text-[rgba(23,23,37,1)] text-[14px] font-semibold font-poppins">
                      Facebook
                    </a>
                  </button>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <span className="text-[rgba(150,154,184,1)] text-[15px] font-normal text-center font-poppins leading-6">
                    Don’t have an account?
                  </span>
                  <Link
                    to="/sign-up"
                    className="text-[rgba(16,46,56,1)] text-[15px] font-semibold text-center font-poppins leading-6"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
