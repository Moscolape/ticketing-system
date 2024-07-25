import { goBack, star } from "@/constants/assets";
import { useEffect, useRef, useState } from "react";
import "../../App.css";
import CustomerCreated from "../modals/customer-created-succesfully";
import Wrapper from "../general/wrapper";
import { Link } from "react-router-dom";

const CreateNewCustomer = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const createCenter = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        <div className="bg-white w-[50%] m-auto rounded-lg p-7 relative font-Urbanist">
          <div className="mb-5 pb-5">
            {/* Back button */}
            <Link to='/customers'>
              <div className="cursor-pointer p-3 bg-primary-bg rounded-full hover:bg-[#CDE7D5] absolute top-2 left-2">
                <img
                  src={goBack}
                  alt="cancel"
                  className=""
                  title="Go back"
                />
              </div>
            </Link>
            <span className="block font-Urbanist font-semibold text-h8 mt-10">
              Create Customer
            </span>
          </div>
          <div className="">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Name of Customer
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
              placeholder="Enter the name of the customer"
            />
          </div>
          <div className="mt-5">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Address
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <textarea
              name=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="resize-none w-full hover:border-main-2 text-gray-1 p-3 h-20 outline-none border rounded-md"
              placeholder="Write the address of the customer"
            ></textarea>
          </div>
          <div className="mt-5">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Customer Type
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <select
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter"
            >
              <option value="">--select customer type--</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          <div className="w-full flex sm:flex-row mo:flex-col justify-between">
            <div className="mt-5 sm:w-[48%] mo-w-full">
              <div className="flex items-start">
                <label
                  htmlFor="firstName"
                  className="block font-DM-Sans font-Inter font-medium text-h12 mb-2 text-main-3"
                >
                  Phone Number
                </label>
                <img src={star} alt="asterisk" className="inline-block ml-1" />
              </div>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
                placeholder="0805 111 2347"
              />
            </div>
            <div className="mt-5 sm:w-[48%] mo-w-full">
              <div className="flex items-start">
                <label
                  htmlFor="lastName"
                  className="block font-DM-Sans font-Inter font-medium text-h12 mb-2 text-main-3"
                >
                  Email
                </label>
                <img src={star} alt="asterisk" className="inline-block ml-1" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
                placeholder="e.g sample@gmail.com"
              />
            </div>
          </div>
          <div className="flex justify-start mt-10">
            <button
              className="bg-primary hover:bg-primary-dark text-white text-h12 font-medium rounded py-2 w-1/4"
              onClick={createCenter}
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
              <span>Create</span>
              {/* )} */}
            </button>
          </div>
          {openModal && <CustomerCreated close={() => setOpenModal(false)} />}
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateNewCustomer;
