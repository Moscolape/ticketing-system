import { eye, eyeSlash, Logo, star } from "@/constants/assets";
// import { Spinner } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  // const [loading, isLoading] = useState<boolean>(false);
  // const [error, setError] = useState("");


  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the email state with the new value from the input
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the password state with the new value from the input
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    sessionStorage.removeItem("navbarText")
  })
  
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="sm:p-10 mo:p-5 bg-white sm:rounded-2xl mo:rounded-lg flex flex-col sm:w-[40%] mo:w-[90%]">
        <div>
          <img src={Logo} alt="logo" className="w-auto m-auto"/>
          <span className="block font-Urbanist text-h8 font-semibold text-center mt-10">
            Sign In
          </span>
        </div>
        {/* {error && (
          <div className="text-[#620613] bg-[#FAC7A7] py-3 text-h13 font-Inter text-center rounded-md mt-5 font-medium">
            {error}
          </div>
        )} */}
        <div className="my-5">
          {/* Email input */}
          <div className="mt-5">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Email
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <input
              type="email"
              className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
              placeholder="Your email address"
              onChange={handleEmailChange}
              value={email}
              // disabled={loading}
            />
          </div>
          {/* Password input */}
          <div className="mt-5">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Password
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
                placeholder="***********"
                onChange={handlePasswordChange}
                value={password}
                // disabled={loading}
              />
              {/* Toggle password visibility */}
              <img
                onClick={() => setPasswordVisible(!passwordVisible)}
                src={passwordVisible ? eye : eyeSlash}
                className="absolute sm:right-3 mo:right-3 bottom-3 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center hover:bg-primary-dark bg-primary text-white py-3 w-full rounded-md mt-5 text-h11 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handleLogin}
          // disabled={loading}
        >
          {/* {loading ? (
            <Spinner
              size="md"
              color="white"
              mr={2}
              thickness="3px"
              speed="0.8s"
            />
          ) : ( */}
            <>
              <span className="mr-3 font-medium font-DM-Sans">Login</span>
            </>
          {/* )} */}
        </button>
        <div className="flex justify-center mt-5">
          <Link to="/forgot-password">
            <span className="text-main-1 font-medium text-h12">
              Forgot your password?
            </span>
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default Signin;
