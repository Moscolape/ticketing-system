import CustomOtpInput from "@/components/auth-components/otp-fields";
import { Logo } from "@/constants/assets";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EnterOtp = () => {
  const initialCountdown = 600;
  const [countdown, setCountdown] = useState(initialCountdown);
  const [resendClickable, setResendClickable] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [otpEmail, setOtpEmail] = useState<string | null>("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendClickable(true);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const otpEmailFromSession = sessionStorage.getItem("email");

  useEffect(() => {
    setOtpEmail(otpEmailFromSession);
  }, [otpEmailFromSession]);

  const storedOtp = sessionStorage.getItem("otp");

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
  };

  const handleResendClick = () => {
    setCountdown(initialCountdown);
    setResendClickable(false);
  };

  const isOtpFilled = otp.every((value) => value !== "");
  const enteredOtp = otp.join("");

  const isOtpMatched = enteredOtp === storedOtp;

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="sm:p-10 mo:p-5 bg-white sm:rounded-2xl mo:rounded-lg flex flex-col sm:w-[35%] mo:w-[90%]">
        <div>
          <img src={Logo} alt="logo" className="w-auto m-auto" />
          <span className="block font-Urbanist text-h8 font-semibold text-center mt-10">
            Reset code sent
          </span>{" "}
          <span className="text-main-2 text-h12 font-DM-Sans m-auto text-center block mt-3">
            If we found an account associated with that email, you’ll receive a
            6-digit code. Please enter the code sent to {otpEmail} below
          </span>
        </div>
        <form className="">
          <div className="my-10">
            <CustomOtpInput numInputs={6} otp={otp} setOtp={setOtp} />
          </div>
          <div className="text-center">
            {resendClickable ? (
              <span
                className="text-primary font-Urbanist font-semibold text-sub cursor-pointer"
                onClick={handleResendClick}
              >
                Resend code
              </span>
            ) : (
              <>
                <span className="text-gray-1 font-Urbanist font-normal text-sub">
                  Code will expire in{" "}
                </span>
                <span className="text-primary font-Urbanist font-medium text-sub">
                  {formatTime(countdown)}
                </span>
              </>
            )}
          </div>
          <div className="">
            <Link to="/reset-password">
              <input
                type="submit"
                className={`block hover:bg-primary-dark bg-primary text-white h-12 text-center py-3 w-full rounded-md mt-5 cursor-pointer font-Inter font-medium ${
                  !isOtpFilled || !isOtpMatched
                    ? "disabled:cursor-not-allowed disabled:bg-gray-1"
                    : ""
                }`}
                value="Continue"
                // disabled={!isOtpFilled || !isOtpMatched}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterOtp;
