import { cancel, star } from "@/constants/assets";
import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import CreatedSuccessfully from "./created-successfully";
import { Asset } from "../configuration-components/config-assets";

type CreateAssetProps = {
  closed: () => void;
  asset: Asset | null;
};

const CreateAsset: React.FC<CreateAssetProps> = ({ closed, asset }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [openModal, setOpenModal] = useState(false);
  const [assetName, setAssetName] = useState(asset ? asset.name : "");
  const [description, setDescription] = useState(asset ? asset.description : "");

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
        className="bg-white w-[40%] m-auto rounded-lg p-7 animate-fadeDownFast relative font-Urbanist"
      >
        <div className="mb-5 border-b pb-5">
          <span className="block font-Urbanist font-semibold text-h8 mt-4">
            {asset ? "Edit Asset" : "Create Asset"}
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
              htmlFor="name"
              className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
            >
              Name of Asset
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
            placeholder="Enter the name of the asset"
          />
        </div>
        <div className="mt-5">
          <div className="flex items-start">
            <label
              htmlFor="description"
              className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
            >
              Description
            </label>
            <img src={star} alt="asterisk" className="inline-block ml-1" />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none w-full hover:border-main-2 text-gray-1 p-3 h-28 outline-none border rounded-md"
            placeholder="Write a description of the asset"
          ></textarea>
        </div>
        <div className="flex justify-start mt-10">
          <button
            className="bg-primary hover:bg-primary-dark text-white text-h12 font-medium rounded py-2 w-1/4"
            onClick={createCenter}
          >
            <span>{asset ? "Save" : "Create"}</span>
          </button>
        </div>
      </div>
      {openModal && <CreatedSuccessfully close={() => setOpenModal(false)} />}
    </div>
  );
};

export default CreateAsset;
