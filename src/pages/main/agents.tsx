import Wrapper from "@/components/general/wrapper";

import { add, iconHorizon, noCenter, plus, search } from "@/constants/assets";

import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

export interface Customers {
  id: string;
  name: string;
  center: string;
  email: string;
  phoneNumber: string;
}

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdownIndex, setShowDropdownIndex] = useState(-1);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleShow = (index: number) => {
    setShowDropdownIndex(index === showDropdownIndex ? -1 : index);
  };

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

  const allAgents = [
    {
      id: "a09dgyf787392",
      name: "John Doe",
      center: "5 Kwaji close, Maitaima",
      email: "john@gmail.com",
      phoneNumber: "09063718365",
    },
    {
      id: "a09dgyf787392",
      name: "John Doe",
      center: "5 Kwaji close, Maitaima",
      email: "john@gmail.com",
      phoneNumber: "09063718365",
    },
    {
      id: "a09dgyf787392",
      name: "John Doe",
      center: "5 Kwaji close, Maitaima",
      email: "john@gmail.com",
      phoneNumber: "09063718365",
    },
    {
      id: "a09dgyf787392",
      name: "John Doe",
      center: "5 Kwaji close, Maitaima",
      email: "john@gmail.com",
      phoneNumber: "09063718365",
    },
  ];

  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        {allAgents.length > 0 ? (
          <div className="p-5 bg-white rounded-md drop-shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex p-2 rounded-md border group w-1/3">
                <img
                  src={search}
                  alt="search"
                  className="mr-4 group-hover:scale-125 group-hover:rotate-[360deg]"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="outline-none w-full"
                  placeholder="Search"
                />
              </div>
              <Link to="/agents/create-new-agent">
                <button className="hover:bg-primary-bg py-2 px-4 rounded-md border-primary border flex items-center">
                  <img src={add} alt="" className="mr-2 scale-90" />
                  <span className="text-primary text-h12 font-Urbanist">
                    Add New Agent
                  </span>
                </button>
              </Link>
            </div>
            <div className="w-full mt-10 bg-white m-auto font-Inter border rounded-lg">
              <div className="py-3 px-2 flex items-center rounded-lg border-b">
                <span className="flex w-[25%] text-h12 font-bold">
                  Agent Name
                </span>
                <span className="flex w-[25%] text-h12 font-bold">Center</span>
                <span className="flex w-[20%] text-h12 font-bold">Email</span>
                <span className="flex w-[20%] text-h12 font-bold">
                  Phone Number
                </span>
                <span className="block text-center w-[10%] text-h12 font-bold"></span>
              </div>

              <div>
                <div>
                  {allAgents.map((user, index) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } py-3 px-2 font-DM-Sans`}
                    >
                      <div className="cursor-pointer flex items-center justify-between w-full relative animate-fadeDownFast">
                        <span className="block w-[25%] text-h12 text-[#272525] font-normal">
                          {user.name}
                        </span>
                        <span className="block w-[25%] text-h12 text-gray-1 font-normal">
                          {user.center}
                        </span>
                        <span className="block w-[20%] text-h12 text-gray-1 font-normal">
                          {user.email}
                        </span>
                        <span className="block w-[20%] text-h12 text-main-4 font-normal">
                          {user.phoneNumber}
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
                            className="font-Inter bg-white p-2 w-32 absolute top-14 right-6 flex flex-col rounded-lg drop-shadow-md z-30"
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
            </div>
          </div>
        ) : (
          <div className="flex w-full h-[65vh] flex-col justify-center items-center my-5">
            <img src={noCenter} alt="no-case" />
            <span className="block my-4 text-h10 text-[#798181] font-Urbanist">
              You have not created any agent yet, please create one.
            </span>
            <Link to="/agents/create-new-agent">
              <button
                type="submit"
                className="flex items-center justify-center hover:bg-primary-dark bg-primary text-white py-3 px-4 rounded-md  cursor-pointer"
              >
                <img src={plus} alt="" className="scale-90" />
                <span className="ml-3 font-medium font-Urbanist">
                  Create Agent
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Agents;
