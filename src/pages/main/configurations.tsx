import ConfigAssets from "@/components/configuration-components/config-assets";
import ConfigOutlets from "@/components/configuration-components/config-outlets";
import ConfigServices from "@/components/configuration-components/config-services";
import Wrapper from "@/components/general/wrapper";
import { useEffect, useState } from "react";

const Configurations = () => {
  const [activeTab, setActiveTab] = useState<"service" | "center" | "asset">(
    () => {
      const storedTab = sessionStorage.getItem("configTab");
      return storedTab === "service"
        ? "service"
        : storedTab === "center"
        ? "center"
        : "asset";
    }
  );
  // const [loading, setLoading] = useState(false);

  const toggleTab = (tab: "service" | "center" | "asset") => {
    setActiveTab(tab);
    sessionStorage.setItem("configTab", tab);
  };

  useEffect(() => {
    setActiveTab("service");
    sessionStorage.setItem("configTab", "service");
  }, []);

  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        <div className="w-full h-[70vh] flex justify-between items-center">
          <div className="bg-white w-[15%] rounded-md mr-10">
            <button
              className={`${
                activeTab === "service"
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "text-main-3 hover:text-primary-dark"
              } rounded-md w-full p-4 font-medium block text-left`}
              onClick={() => toggleTab("service")}
            >
              Services
            </button>
            <button
              className={`${
                activeTab === "center"
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "text-main-3 hover:text-primary-dark"
              } rounded-md w-full p-4 font-medium block text-left`}
              onClick={() => toggleTab("center")}
            >
              Center (Outlet)s
            </button>{" "}
            <button
              className={`${
                activeTab === "asset"
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "text-main-3 hover:text-primary-dark"
              } rounded-md w-full p-4 font-medium block text-left`}
              onClick={() => toggleTab("asset")}
            >
              Assets
            </button>{" "}
          </div>
          <div className="w-[85%] m-auto">
            {activeTab === "service" && <ConfigServices />}
            {activeTab === "center" && <ConfigOutlets />}
            {activeTab === "asset" && <ConfigAssets />}
          </div>
        </div>{" "}
      </div>
    </Wrapper>
  );
};

export default Configurations;