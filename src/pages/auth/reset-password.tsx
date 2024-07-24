import { eye, eyeSlash, Logo, star } from "@/constants/assets";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // const [loading, isLoading] = useState<boolean>(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the password state with the new value from the input
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // Update the password state with the new value from the input
    const newPassword = event.target.value;
    setConfirmPassword(newPassword);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="sm:p-10 mo:p-5 bg-white sm:rounded-2xl mo:rounded-lg flex flex-col sm:w-[40%] mo:w-[90%]">
        <div>
          <img src={Logo} alt="logo" className="w-auto m-auto" />
          <span className="block font-Urbanist text-h8 font-semibold text-center mt-10">
            Change your password
          </span>
          <span className="text-main-2 text-h12 font-DM-Sans w-4/5 m-auto text-center block mt-3">
            Create a new password for your account
          </span>
        </div>
        <div className="mt-5">
          <div className="flex items-start">
            <label
              htmlFor="state"
              className="block font-DM-Sans font-Inter font-medium text-h12 mb-2 text-main-3"
            >
              New Password
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
        <div className="mt-5">
          <div className="flex items-start">
            <label
              htmlFor="state"
              className="block font-DM-Sans font-Inter font-medium text-h12 mb-2 text-main-3"
            >
              Confirm Password
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
              placeholder="***********"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              // disabled={loading}
            />
            {/* Toggle password visibility */}
            <img
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              src={passwordVisible ? eye : eyeSlash}
              className="absolute sm:right-3 mo:right-3 bottom-3 cursor-pointer"
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
              Change password
            </span>
          </>
          {/* )} */}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
