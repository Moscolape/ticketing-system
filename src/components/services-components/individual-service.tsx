import Wrapper from "@/components/general/wrapper";
import { useState } from "react";
import ServiceDetails from "./service-details";


const IndividualService = () => {
  const [customerTab, setCustomerTab] = useState<"details" | "assets">(
    () => {
      const storedTab = sessionStorage.getItem("serviceTab");
      return storedTab === "details"
        ? "details"
        : "assets";
    }
  );

  const toggleTab = (tab: "details" | "assets") => {
    setCustomerTab(tab);
    sessionStorage.setItem("serviceTab", tab);
  };


  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        <div className="w-full h-[70vh] flex justify-between items-center">
          <div className="bg-white w-[15%] rounded-md mr-10">
            <button
              className={`${
                customerTab === "details"
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "text-main-3 hover:text-primary-dark"
              } rounded-md w-full p-4 font-medium block text-left`}
              onClick={() => toggleTab("details")}
            >
              Details
            </button>
            <button
              className={`${
                customerTab === "assets"
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "text-main-3 hover:text-primary-dark"
              } rounded-md w-full p-4 font-medium block text-left`}
              onClick={() => toggleTab("assets")}
            >
              Assets
            </button>{" "}
          </div>
          <div className="w-[85%] m-auto">
            {customerTab === "details" && <ServiceDetails />}
            {customerTab === "assets" && <div></div>}
          </div>
        </div>{" "}
      </div>
    </Wrapper>
  );
};

export default IndividualService;