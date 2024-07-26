import { goBack, star } from "@/constants/assets";
import { useEffect, useRef, useState } from "react";
import "../../App.css";

import Wrapper from "@/components/general/wrapper";
import CustomerAssets, { Businesses, Vehicles } from "@/components/customers-components/customer-assets";
import Checkout from "@/components/dashboard-components/checkout";

const Dashboard = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<string>("");
  const [currentStage, setCurrentStage] = useState<number>(1);

  const stages = 4;
  const progressPercentage = (currentStage / stages) * 100;

  const [selectedAssets, setSelectedAssets] = useState<{
    vehicles: Vehicles[];
    businesses: Businesses[];
  }>({
    vehicles: [],
    businesses: [],
  });

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

  const handleNextClick = () => {
    if (currentStage < stages) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentStage !== 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleComplete = (assets: {
    vehicles: Vehicles[];
    businesses: Businesses[];
  }) => {
    setSelectedAssets(assets);
    setCurrentStage(currentStage + 1);
  };

  const handleRemoveAsset = (type: "vehicles" | "businesses", id: string) => {
    setSelectedAssets((prevAssets) => ({
      ...prevAssets,
      [type]: prevAssets[type].filter((asset) => asset.id !== id),
    }));
  };

  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        <div
          className={`${
            currentStage === 3 || currentStage === 4 ? "w-full" : "w-[50%]"
          } m-auto`}
        >
          <div className="mb-5 pb-5 flex items-center">
            <div
              className="cursor-pointer p-4 shadow-md bg-white rounded-full hover:bg-gray-100"
              onClick={handlePrevClick}
            >
              <img src={goBack} alt="cancel" className="" title="Go back" />
            </div>
            <span className="ml-4 block font-Urbanist font-bold text-h8">
              Pay for a service
            </span>
          </div>
          <div className="flex items-center mb-5 w-full justify-between font-Urbanist">
            <div className="w-[82%] bg-[#CDE7D5] rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-h12 text-right block w-[18%]">
              {progressPercentage}% complete
            </span>
          </div>
          <div className="bg-white rounded-lg p-7 relative font-Urbanist">
            {currentStage === 1 && (
              <div className="mt-5">
                <div className="flex items-start">
                  <label
                    htmlFor="state"
                    className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
                  >
                    Service Type
                  </label>
                  <img
                    src={star}
                    alt="asterisk"
                    className="inline-block ml-1"
                  />
                </div>
                <select
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter"
                >
                  <option value="">Select service</option>
                  <option value="individual">Individual</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            )}
            {currentStage === 2 && (
              <div className="mt-5">
                <div className="flex items-start">
                  <label
                    htmlFor="state"
                    className="block font-Urbanist font-medium text-h12 mb-2 text-main-3"
                  >
                    Recipient Customer
                  </label>
                  <img
                    src={star}
                    alt="asterisk"
                    className="inline-block ml-1"
                  />
                </div>
                <select
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border rounded-lg outline-none w-full p-3 text-h12 font-Inter"
                >
                  <option value="">Select customer</option>
                  <option value="individual">Individual</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            )}
            {currentStage === 3 && (
              <CustomerAssets onComplete={handleComplete} />
            )}
            {currentStage === 4 && (
              <Checkout
                selectedAssets={selectedAssets}
                onRemoveAsset={handleRemoveAsset}
              />
            )}
            {(currentStage === 1 || currentStage === 2) && (
              <div className="flex justify-end mt-10">
                <button
                  className="bg-primary hover:bg-primary-dark text-white text-h12 font-medium rounded py-2 w-1/5"
                  onClick={handleNextClick}
                >
                  <span>Next</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;