import { gridMenuIcon, iconHorizon, premise } from "@/constants/assets";

import { useEffect, useRef, useState } from "react";

import { Businesses } from "./customer-assets";

interface VehicleProps {
  data: Businesses[];
  view: string;
}

const BusinessAssets: React.FC<VehicleProps> = ({ data, view }) => {
  const [showDropdownIndex, setShowDropdownIndex] = useState(-1);

  const handleShow = (index: number) => {
    setShowDropdownIndex(index === showDropdownIndex ? -1 : index);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const modalIcons = Array.from(document.querySelectorAll(`.more`));

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !modalIcons.some((icon) => icon.contains(event.target as Node))
      ) {
        setShowDropdownIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {view === "list" && (
        <div className="w-full mt-10 bg-white m-auto font-Inter border rounded-lg">
          <div className="py-3 px-2 flex items-center rounded-lg border-b">
            <span className="flex w-[20%] text-h12 font-bold">
              Business Name
            </span>
            <span className="flex w-[35%] text-h12 font-bold">Address</span>
            <span className="flex w-[20%] text-h12 font-bold">
              Contact Phone Number
            </span>
            <span className="flex w-[15%] text-h12 font-bold">
              Contact Email
            </span>
            <span className="block text-center w-[10%] text-h12 font-bold"></span>
          </div>
          <div>
            {data.map((asset, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } py-3 px-2 font-DM-Sans`}
              >
                <div className="cursor-pointer flex items-center justify-between w-full relative animate-fadeDownFast">
                  <span className="block w-[20%] text-h12 text-[#272525] font-normal">
                    {asset.name}
                  </span>
                  <span className="block w-[35%] text-h12 text-gray-1 font-normal">
                    {asset.address}
                  </span>
                  <span className="block w-[20%] text-h12 text-[#272525] font-normal">
                    {asset.phone_number}
                  </span>
                  <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                    {asset.email}
                  </span>
                  <span className="flex justify-center w-[10%] text-h12 font-normal">
                    <img
                      src={iconHorizon}
                      alt=""
                      className="p-2 bg-gray-50 more"
                      onClick={() => handleShow(index)}
                    />
                  </span>
                  {showDropdownIndex === index && (
                    <div
                      ref={modalRef}
                      className="font-Inter bg-white p-2 w-32 absolute top-14 right-6 flex flex-col rounded-lg drop-shadow-md z-30 animate-fadeDownFast"
                    >
                      <span className="text-h13 text-main-3 p-2 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center">
                        Edit
                      </span>
                      <span className="text-h13 text-red-600 p-2 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center">
                        Delete
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "grid" && (
        <div className="grid grid-cols-3 gap-3 mt-10">
          {data.map((asset, index) => {
            return (
              <div
                key={index}
                className="animate-fadeUp bg-white p-3 rounded-lg border relative"
              >
                <div className="flex justify-between mb-3">
                  <input type="checkbox" className="accent-primary-dark" />
                  <img src={gridMenuIcon} alt="" />
                </div>
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-[#FFBDAB]">
                    <img src={premise} alt="car" className="" />
                  </div>
                  <div className="ml-3">
                    <span className="block font-Urbanist text-h8 font-semibold">
                      {asset.name}
                    </span>
                    <span className="font-Urbanist text-h12 text-main-3">
                      {asset.address}
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3 font-Urbanist">
                  <div className="flex justify-between bg-[#CDE7D5] p-2 rounded-full">
                    <span className="font-semibold text-h13">
                      Contact Phone
                    </span>
                    <span className="text-h13">{asset.phone_number}</span>
                  </div>
                  <div className="flex justify-between bg-[#CDE7D5] p-2 rounded-full">
                    <span className="font-semibold text-h13">
                      Contact Email
                    </span>
                    <span className="text-h13">{asset.email}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BusinessAssets;
