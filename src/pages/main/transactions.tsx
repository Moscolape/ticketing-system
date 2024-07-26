import Wrapper from "@/components/general/wrapper";

import { iconHorizon, noCenter, search } from "@/constants/assets";

import { useEffect, useRef, useState } from "react";

interface Asset {
  type: string; // e.g., "Vehicle" or "Business"
  details: string; // e.g., "Toyota Camry, 2019" or "Dangote Cement"
}

interface Transaction {
  id: string;
  center: string;
  assets: Asset[];
  amount: number;
  paymentDate: string; // ISO 8601 date string
  agent: string;
  referenceNo: string;
  customer: string;
}
const Transactions = () => {
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

  const allTransactions: Transaction[] = [
    {
      id: "t001",
      center: "5 Kwaji close, Maitaima",
      assets: [
        { type: "Vehicle", details: "Toyota Camry, 2019" },
        { type: "Business", details: "Dangote Cement" },
      ],
      amount: 2500.0,
      paymentDate: "2024-07-25",
      agent: "John Doe",
      referenceNo: "ref123456",
      customer: "Jane Smith",
    },
    {
      id: "t002",
      center: "12 Baker Street, London",
      assets: [{ type: "Vehicle", details: "Honda Civic, 2020" }],
      amount: 1500.0,
      paymentDate: "2024-07-24",
      agent: "Alice Johnson",
      referenceNo: "ref123457",
      customer: "Robert Brown",
    },
    {
      id: "t003",
      center: "20 Main St, New York",
      assets: [{ type: "Business", details: "Exxon Mobil" }],
      amount: 3000.0,
      paymentDate: "2024-07-23",
      agent: "Emily Davis",
      referenceNo: "ref123458",
      customer: "Michael Johnson",
    },
    {
      id: "t004",
      center: "45 Elm Street, Seattle",
      assets: [
        { type: "Vehicle", details: "Ford Mustang, 2021" },
        { type: "Business", details: "Coca-Cola" },
      ],
      amount: 3500.0,
      paymentDate: "2024-07-22",
      agent: "Chris Wilson",
      referenceNo: "ref123459",
      customer: "Linda Green",
    },
  ];

  return (
    <Wrapper>
      <div className="p-10 bg-primary-bg min-h-[82vh]">
        {allTransactions.length > 0 ? (
          <div className="p-5 bg-white rounded-md drop-shadow-md">
            <div className="flex items-center justify-start">
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
            </div>
            <div className="w-full mt-10 bg-white m-auto font-Inter border rounded-lg">
              <div className="py-3 px-2 flex items-center rounded-lg border-b">
                <span className="flex w-[15%] text-h12 font-bold">
                  Reference
                </span>
                <span className="flex w-[15%] text-h12 font-bold">
                  Customer
                </span>
                <span className="flex w-[15%] text-h12 font-bold">Asset</span>
                <span className="flex w-[15%] text-h12 font-bold">Agent</span>
                <span className="flex w-[15%] text-h12 font-bold">Center</span>
                <span className="flex w-[8%] text-h12 font-bold">Amount</span>
                <span className="flex w-[10n%] text-h12 font-bold">
                  Payment Date
                </span>
                <span className="block text-center w-[7%] text-h12 font-bold"></span>
              </div>

              <div>
                <div>
                  {allTransactions.map((user, index) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } py-3 px-2 font-DM-Sans`}
                    >
                      <div className="cursor-pointer flex items-center justify-between w-full relative animate-fadeDownFast">
                        <span className="block w-[15%] text-h12 text-[#272525] font-normal">
                          {user.referenceNo}
                        </span>
                        <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                          {user.customer}
                        </span>
                        <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                          {user.assets[0].details}
                        </span>
                        <span className="block w-[15%] text-h12 text-main-4 font-normal">
                          {user.agent}
                        </span>
                        <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                          {user.center}
                        </span>
                        <span className="block w-[8%] text-h12 text-gray-1 font-normal">
                          {user.amount}
                        </span>
                        <span className="block w-[10%] text-h12 text-main-4 font-normal">
                          {user.paymentDate}
                        </span>
                        <span className="flex justify-center w-[7%] text-h12 font-normal">
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
              You do not have any transactions yet!
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Transactions;
