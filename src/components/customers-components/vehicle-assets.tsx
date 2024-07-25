import { car, gridMenuIcon, iconHorizon } from "@/constants/assets";

import { useEffect, useRef, useState } from "react";

import { Vehicles } from "./customer-assets";

interface VehicleProps {
  data: Vehicles[];
  view: string;
}

const VehicleAssets: React.FC<VehicleProps> = ({ data, view }) => {
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
            <span className="flex w-[10%] text-h12 font-bold">Class</span>
            <span className="flex w-[10%] text-h12 font-bold">Make</span>
            <span className="flex w-[15%] text-h12 font-bold">Model</span>
            <span className="flex w-[15%] text-h12 font-bold">
              Registration
            </span>
            <span className="flex w-[10%] text-h12 font-bold">Colour</span>
            <span className="flex w-[10%] text-h12 font-bold">Eng. No.</span>
            <span className="flex w-[10%] text-h12 font-bold">VIN</span>
            <span className="flex w-[10%] text-h12 font-bold">Reg No</span>
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
                  <span className="block w-[10%] text-h12 text-[#272525] font-normal">
                    {asset.class}
                  </span>
                  <span className="block w-[10%] text-h12 text-gray-1 font-normal">
                    {asset.make}
                  </span>
                  <span className="block w-[15%] text-h12 text-[#272525] font-normal">
                    {asset.model}
                  </span>
                  <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                    {asset.registration}
                  </span>
                  <span className="block w-[10%] text-h12 text-[#272525] font-normal">
                    {asset.color}
                  </span>
                  <span className="block w-[10%] text-h12 text-gray-1 font-normal">
                    {asset.engineNo}
                  </span>
                  <span className="block w-[10%] text-h12 text-[#272525] font-normal">
                    {asset.vin}
                  </span>
                  <span className="block w-[10%] text-h12 text-gray-1 font-normal">
                    {asset.regNo}
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
                  <div className="p-2 rounded-full bg-[#DDCFFF]">
                    <img src={car} alt="car" className="" />
                  </div>
                  <div className="ml-3">
                    <span className="block font-Urbanist text-h8 font-semibold">
                      Vehicle
                    </span>
                    <span className="font-Urbanist text-h12 text-main-3">
                      {asset.class}
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-1 font-Urbanist">
                  <div className="flex justify-between bg-[#CDE7D5] px-2 py-1 rounded-full">
                    <span className="font-semibold text-h13">Vehicle Make</span>
                    <span className="text-h13">{asset.make}</span>
                  </div>
                  <div className="flex justify-between bg-[#CDE7D5] px-2 py-1 rounded-full">
                    <span className="font-semibold text-h13">Model</span>
                    <span className="text-h13">{asset.model}</span>
                  </div>
                  <div className="flex justify-between bg-[#CDE7D5] px-2 py-1 rounded-full">
                    <span className="font-semibold text-h13">Registration</span>
                    <span className="text-h13">{asset.registration}</span>
                  </div>
                  <div className="flex justify-between bg-[#CDE7D5] px-2 py-1 rounded-full">
                    <span className="font-semibold text-h13">Colour</span>
                    <span className="text-h13">{asset.color}</span>
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

export default VehicleAssets;
