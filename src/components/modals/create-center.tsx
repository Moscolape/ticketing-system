import { cancel, star } from "@/constants/assets";
import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { statesData } from "@/utils/statesdata";
import CreatedSuccessfully from "./created-successfully";
import { Centers } from "../configuration-components/config-outlets";

type CreateSurveyModalProps = {
  closed: () => void;
  center?: Centers | null;
};

const CreateCenter: React.FC<CreateSurveyModalProps> = ({ closed, center }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<string>(
    center?.state || ""
  );
  const [selectedLGA, setSelectedLGA] = useState<string>(center?.lga || "");
  const [name, setName] = useState<string>(center?.name || "");
  const [address, setAddress] = useState<string>(center?.address || "");
  const [contactPerson, setContactPerson] = useState<string>(
    center?.contactPerson || ""
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    center?.phoneNumber || ""
  );
  const [email, setEmail] = useState<string>(center?.email || "");
  const [openModal, setOpenModal] = useState(false);

  const createCenter = () => {
    setOpenModal(true);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    setSelectedLGA(""); // Reset LGA selection when state changes
  };

  const handleLGAChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLGA(event.target.value);
  };

  const filteredLGAs = selectedState
    ? statesData.find((state) => state.state === selectedState)?.lgas || []
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closed();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closed]);

  return (
    <div className="w-screen h-screen bg-[#0000008c] flex items-center justify-center z-50 fixed top-0 left-0">
      <div
        ref={modalRef}
        className="bg-white w-[40%] m-auto rounded-lg p-7 animate-fadeDownFast relative font-Urbanist"
      >
        <div className="mb-5 border-b pb-5">
          <span className="block font-Urbanist font-semibold text-h8 mt-4">
            {center ? "Edit Center" : "Create Center"}
          </span>
          {/* Close button */}
          <img
            src={cancel}
            alt="cancel"
            className="cursor-pointer p-2 hover:bg-main-6 rounded-full hover:bg-gray-10 absolute top-2 right-2"
            title="close modal"
            onClick={closed}
          />
        </div>
        <div className="">
          <div className="flex items-start">
            <label
              htmlFor="state"
              className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
            >
              Name of Center
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
            placeholder="Enter the name of the center"
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
            className="resize-none w-full hover:border-main-2 text-gray-1 p-3 h-28 outline-none border rounded-md"
            placeholder="Write the address of the center"
          ></textarea>
        </div>
        <div className="w-full flex sm:flex-row mo:flex-col justify-between">
          <div className="mt-5 w-[48%]">
            <label
              htmlFor="state"
              className="block font-Inter font-medium text-h12 mb-2 text-gray-3"
            >
              State
            </label>
            <select
              id="state"
              className="border hover:border-main-2 rounded-lg outline-none w-full p-3 text-h12 font-Inter"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {statesData.map((state) => (
                <option key={state.alias} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 w-[48%]">
            <label
              htmlFor="lga"
              className="block font-Inter font-medium text-h12 mb-2 text-gray-3"
            >
              LGA
            </label>
            <select
              id="lga"
              value={selectedLGA}
              onChange={handleLGAChange}
              className="border hover:border-main-2 rounded-lg outline-none w-full p-3 text-h12 font-Inter"
            >
              <option value="">Select LGA</option>
              {filteredLGAs.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-start">
            <label
              htmlFor="state"
              className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
            >
              Contact Person
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
            placeholder="Enter the name of the contact person"
          />
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
            <span>{center ? "Save" : "Create"}</span>
            {/* )} */}
          </button>
        </div>
      </div>
      {openModal && <CreatedSuccessfully close={() => setOpenModal(false)} />}
    </div>
  );
};

export default CreateCenter;
