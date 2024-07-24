import { Logo, star } from "@/constants/assets";
// import { Spinner } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgottenPassword = () => {
  const [email, setEmail] = useState<string>("");
  // const [loading, isLoading] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the email state with the new value from the input
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/enter-otp')
  }

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="sm:p-10 mo:p-5 bg-white sm:rounded-2xl mo:rounded-lg flex flex-col sm:w-[40%] mo:w-[90%]">
        <div>
          <img src={Logo} alt="logo" className="w-auto m-auto" />
          <span className="block font-Urbanist text-h8 font-semibold text-center mt-10">
            Reset your password
          </span>
          <span className="text-main-2 text-h12 font-DM-Sans w-4/5 m-auto text-center block mt-3">
            Provide the email on your account and we’ll send details to reset
            your password
          </span>
        </div>
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
            <span className="mr-3 font-medium font-DM-Sans">
              Receive OTP
            </span>
          </>
          {/* )} */}
        </button>
        <div className="flex justify-center mt-5">
          <Link to="/">
            <span className="text-primary font-medium ml-1 text-h12">
              Return to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
