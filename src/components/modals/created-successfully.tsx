import React, { useEffect, useRef, useState } from "react";
import { completed } from "@constants/assets";
import "../../App.css";

type PitchSubmittedModalProps = {
  close: () => void;
};

const CreatedSuccessfully: React.FC<PitchSubmittedModalProps> = ({ close }) => {
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

  const [text, setText] = useState("");

  useEffect(() => {
    const storedTab = sessionStorage.getItem("configTab");
    if (storedTab) {
      setText(storedTab)
    }
  }, [])

  return (
    <div className="w-screen h-screen bg-[#0000008c] flex items-center justify-center z-50 fixed top-0 left-0">
      <div
        ref={modalRef}
        className="bg-white sm:w-[50%] mo:w-full m-auto rounded-lg py-10 animate-fadeDownFast"
      >
        <img src={completed} alt="" className="w-auto m-auto animate-bump" />
        <span className="block text-center font-DM-Sans font-bold text-h8 mt-4">
          Completed!
        </span>
        <div className="my-5">
          <span className="block text-center font-DM-Sans font-normal text-main-2 text-h12 my-1">
            {`You have created ${text === 'asset' ? `an ${text}` : `a ${text}`} successfully`}
          </span>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-primary hover:bg-primary-dark font-Inter text-white text-sub font-medium rounded-lg py-2 px-4"
            onClick={reload}
          >
            View {text}s
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatedSuccessfully;
