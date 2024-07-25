import React, { useEffect, useRef } from "react";
import { completed } from "@constants/assets";
import "../../App.css";
import { Link } from "react-router-dom";

type CustomerCreatedModalProps = {
  close: () => void;
};

const CustomerCreated: React.FC<CustomerCreatedModalProps> = ({ close }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
  }, [close]);

  const reload = () => {
    close();
    location.reload();
  };

  return (
    <div className="w-screen h-screen bg-[#0000008c] flex items-center justify-center z-50 fixed top-0 left-0">
      <div
        ref={modalRef}
        className="bg-white sm:w-[50%] mo:w-full m-auto rounded-lg py-10 animate-fadeDownFast"
      >
        <img src={completed} alt="" className="w-auto m-auto animate-bump" />
        <span className="block text-center font-DM-Sans font-bold text-h8 mt-4">
          Successful!
        </span>
        <div className="my-5">
          <span className="block text-center font-DM-Sans font-normal text-main-2 text-h12 my-1 w-4/5 m-auto">
            You have created this customer successfully, you can proceed to add
            assets for this customer or skip for now
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
          <button
            className="bg-primary hover:bg-primary-dark font-Inter text-white text-sub font-medium rounded-lg py-2 px-4 bloack"
            onClick={reload}
          >
            Add Assets
          </button>
          <Link to="/customers">
            <span className="text-primary font-medium text-h12 block mt-4">
              Skip for Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreated;
