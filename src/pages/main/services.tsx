import Wrapper from "@/components/general/wrapper";

import { add, noService, plus, serviceIcon } from "@/constants/assets";

import { Link } from "react-router-dom";

export interface Services {
  id: string;
  name: string;
  qty_stock: string;
  qty_sold: string;
  no_of_agents: string;
}

const Services = () => {
  const allServices: Services[] = [
    {
      id: "a09dgyf787392",
      name: "Driver's License",
      qty_stock: "50",
      qty_sold: "17",
      no_of_agents: "33",
    },
    {
      id: "a09dgyf787392",
      name: "Driver's License",
      qty_stock: "50",
      qty_sold: "17",
      no_of_agents: "33",
    },
    {
      id: "a09dgyf787392",
      name: "Driver's License",
      qty_stock: "50",
      qty_sold: "17",
      no_of_agents: "33",
    },
    {
      id: "a09dgyf787392",
      name: "Driver's License",
      qty_stock: "50",
      qty_sold: "17",
      no_of_agents: "33",
    },
  ];

  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        {allServices.length > 0 ? (
          <div className="p-5 bg-white rounded-md drop-shadow-md">
            <div className="flex items-center justify-end">
              <Link to="/services/create-new-service">
                <button className="hover:bg-primary-bg py-2 px-4 rounded-md border-primary border flex items-center">
                  <img src={add} alt="" className="mr-2 scale-90" />
                  <span className="text-primary text-h12 font-Urbanist">
                    Create New Service
                  </span>
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-10">
              {allServices.map((asset, index) => {
                return (
                  <div
                    key={index}
                    className="animate-fadeUp bg-white p-5 rounded-lg border relative"
                  >
                    <div className="flex justify-between mb-3">
                      <span className="block font-Urbanist text-h8 font-semibold">
                        {asset.name}
                      </span>{" "}
                      <img src={serviceIcon} alt="" />
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-5 font-Urbanist">
                      <div className="flex justify-between bg-[#CDE7D5] p-2 rounded-full">
                        <span className="font-semibold text-h13">
                          Qty in Stock:
                        </span>
                        <span className="text-h13">{asset.qty_stock}</span>
                      </div>
                      <div className="flex justify-between bg-[#CDE7D5] p-2 rounded-full">
                        <span className="font-semibold text-h13">
                          Qty Sold:
                        </span>
                        <span className="text-h13">{asset.qty_sold}</span>
                      </div>
                      <div className="flex justify-between bg-[#CDE7D5] p-2 rounded-full">
                        <span className="font-semibold text-h13">
                          No. of Agents:
                        </span>
                        <span className="text-h13">{asset.no_of_agents}</span>
                      </div>
                    </div>

                    <div className="flex justify-end mt-5">
                      <Link to={`/services/${asset.id}`}>
                        <button className="border p-2 rounded-lg font-Urbanist font-semibold hover:bg-primary-bg">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex w-full h-[65vh] flex-col justify-center items-center my-5">
            <img src={noService} alt="no-case" />
            <span className="block my-4 text-h10 text-[#798181] font-Urbanist">
              You have not created any service yet, please create one.
            </span>
            {/* <Link to="/agents/create-new-agent"> */}
            <button
              type="submit"
              className="flex items-center justify-center hover:bg-primary-dark bg-primary text-white py-3 px-4 rounded-md  cursor-pointer"
            >
              <img src={plus} alt="" className="scale-90" />
              <span className="ml-3 font-medium font-Urbanist">
                Create Service
              </span>
            </button>
            {/* </Link> */}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Services;
