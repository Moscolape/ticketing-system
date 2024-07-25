import { cancel, star } from "@/constants/assets";
import React, { useEffect, useRef, useState } from "react";
import "../../App.css";

import CreatedSuccessfully from "./created-successfully";
import { Centers } from "../configuration-components/config-outlets";

type AddVehicleAssetModalProps = {
  closed: () => void;
  center: Centers | null;
};

const AddVehicleAsset: React.FC<AddVehicleAssetModalProps> = ({
  closed,
  center,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    center?.phoneNumber || ""
  );
  const [email, setEmail] = useState<string>(center?.email || "");
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
        className="bg-white w-[50%] m-auto rounded-lg p-7 animate-fadeDownFast relative font-Urbanist"
      >
        <div className="mb-5">
          <span className="block font-Urbanist font-semibold text-h8 mt-4">
            {center ? "Edit Vehicle" : "Add Vehicle Asset"}
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
              Vehicle Class
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <select
            name="duration"
            // value={duration}
            // onChange={(e) => setDuration(e.target.value)}
            className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter hover:border-main-2"
          >
            <option value="">--select customer type--</option>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <div className="w-full flex sm:flex-row mo:flex-col justify-between">
          <div className="mt-5 w-[48%]">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Vehicle Make
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <select
              name="duration"
              // value={duration}
              // onChange={(e) => setDuration(e.target.value)}
              className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter hover:border-main-2"
            >
              <option value="">--select customer type--</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          <div className="mt-5 w-[48%]">
            <div className="flex items-start">
              <label
                htmlFor="state"
                className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
              >
                Vehicle Model
              </label>
              <img src={star} alt="asterisk" className="inline-block ml-1" />
            </div>
            <select
              name="duration"
              // value={duration}
              // onChange={(e) => setDuration(e.target.value)}
              className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter hover:border-main-2"
            >
              <option value="">--select customer type--</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-start">
            <label
              htmlFor="state"
              className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
            >
              Registration Type
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <select
            name="duration"
            // value={duration}
            // onChange={(e) => setDuration(e.target.value)}
            className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter hover:border-main-2"
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
                Vehicle Colour
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
                Vehicle Engine Number
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
        <div className="w-full flex sm:flex-row mo:flex-col justify-between">
          <div className="mt-5 sm:w-[48%] mo-w-full">
            <div className="flex items-start">
              <label
                htmlFor="firstName"
                className="block font-DM-Sans font-Inter font-medium text-h12 mb-2 text-main-3"
              >
                VIN
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
                Vehicle Registration Number
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
            <span>{center ? "Save Changes" : "Add"}</span>
            {/* )} */}
          </button>
        </div>
      </div>
      {openModal && <CreatedSuccessfully close={() => setOpenModal(false)} />}
    </div>
  );
};

export default AddVehicleAsset;
