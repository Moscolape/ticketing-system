import {
  addAsset,
  chevronDown,
  grid,
  list,
  plus,
  search,
} from "@/constants/assets";
import { useEffect, useRef, useState } from "react";
import VehicleAssets from "./vehicle-assets";
import BusinessAssets from "./business-assets";
import AddBusinessAsset from "../modals/add-business-asset";
import AddVehicleAsset from "../modals/add-vehicle-asset";

export interface Vehicles {
  id: string;
  class: string;
  make: string;
  model: string;
  registration: string;
  color: string;
  engineNo: string;
  vin: string;
  regNo: string;
}

export interface Businesses {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
}

interface OnCompleteProps {
  onComplete: (assets: {
    vehicles: Vehicles[];
    businesses: Businesses[];
  }) => void;
}

const CustomerAssets: React.FC<OnCompleteProps> = ({ onComplete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [viewTab, setViewTab] = useState<"list" | "grid">(
    // Initialize with the value retrieved from sessionStorage, defaulting to "grid" if not present
    () => (sessionStorage.getItem("viewTab") as "list" | "grid") || "grid"
  );

  const [assetTypeTab, setAssetTypeTab] = useState<"vehicles" | "business">(
    // Initialize with the value retrieved from sessionStorage, defaulting to "grid" if not present
    () =>
      (sessionStorage.getItem("assetTypeTab") as "vehicles" | "business") ||
      "vehicles"
  );

  const toggleTab = (tab: "list" | "grid") => {
    setViewTab(tab);
    sessionStorage.setItem("viewTab", tab);
  };

  const changeTab = (tab: "vehicles" | "business") => {
    setAssetTypeTab(tab);
    sessionStorage.setItem("assetTypeTab", tab);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const allBusinesses: Businesses[] = [
    {
      id: "101",
      name: "Tech Innovations Inc.",
      address: "123 Silicon Valley, CA",
      phone_number: "415-555-1234",
      email: "info@techinnovations.com",
    },
    {
      id: "102",
      name: "Green Earth Enterprises",
      address: "456 Elm Street, Chicago, IL",
      phone_number: "312-555-5678",
      email: "contact@greenearth.com",
    },
    {
      id: "103",
      name: "Global Foods Ltd.",
      address: "789 Maple Avenue, New York, NY",
      phone_number: "212-555-9876",
      email: "support@globalfoods.com",
    },
    {
      id: "104",
      name: "Bright Future Consultancy",
      address: "101 Pine Road, Austin, TX",
      phone_number: "512-555-3456",
      email: "info@brightfuture.com",
    },
  ];
  

  const allVehicles: Vehicles[] = [
    {
      id: "V001",
      class: "Sedan",
      make: "Honda",
      model: "Civic",
      registration: "public",
      color: "blue",
      engineNo: "XYZ123456",
      vin: "1HGBH41JXMN109186",
      regNo: "TX1234AB",
    },
    {
      id: "V002",
      class: "SUV",
      make: "Ford",
      model: "Explorer",
      registration: "public",
      color: "black",
      engineNo: "ABC987654",
      vin: "1FMEU7E83JUA65712",
      regNo: "CA5678CD",
    },
    {
      id: "V003",
      class: "Convertible",
      make: "BMW",
      model: "Z4",
      registration: "private",
      color: "white",
      engineNo: "LMN456789",
      vin: "WBA3A9C55FNN12345",
      regNo: "FL9012EF",
    },
    {
      id: "V004",
      class: "Pickup Truck",
      make: "Chevrolet",
      model: "Silverado",
      registration: "public",
      color: "red",
      engineNo: "JKL345678",
      vin: "1GCNCPEH2GZ120345",
      regNo: "NY3456GH",
    },
  ];
  

  const [showDropdown, setShowDropdown] = useState(false);
  const [openVehicle, setOpenVehicle] = useState(false);
  const [openBusiness, setOpenBusiness] = useState(false);

  const [selectedVehiclePitches, setSelectedVehiclePitches] = useState<
    string[]
  >([]);
  const [isAllVehiclesSelected, setIsAllVehiclesSelected] = useState(false);

  const [selectedBusinessPitches, setSelectedBusinessPitches] = useState<
    string[]
  >([]);
  const [isAllBusinessesSelected, setIsAllBusinessesSelected] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
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
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectPitch = (pitchId: string) => {
    if (assetTypeTab === "vehicles") {
      setSelectedVehiclePitches((prevSelected) =>
        prevSelected.includes(pitchId)
          ? prevSelected.filter((id) => id !== pitchId)
          : [...prevSelected, pitchId]
      );
    } else {
      setSelectedBusinessPitches((prevSelected) =>
        prevSelected.includes(pitchId)
          ? prevSelected.filter((id) => id !== pitchId)
          : [...prevSelected, pitchId]
      );
    }
  };

  useEffect(() => {
    if (assetTypeTab === "vehicles") {
      setIsAllVehiclesSelected(
        selectedVehiclePitches.length === allVehicles.length
      );
    } else {
      setIsAllBusinessesSelected(
        selectedBusinessPitches.length === allBusinesses.length
      );
    }
  }, [
    selectedVehiclePitches,
    selectedBusinessPitches,
    allVehicles.length,
    allBusinesses.length,
    assetTypeTab,
  ]);

  const handleBulkSelect = (selected: boolean) => {
    if (assetTypeTab === "vehicles") {
      setIsAllVehiclesSelected(selected);
      if (selected) {
        setSelectedVehiclePitches(allVehicles.map((pitch) => pitch.id));
      } else {
        setSelectedVehiclePitches([]);
      }
    } else {
      setIsAllBusinessesSelected(selected);
      if (selected) {
        setSelectedBusinessPitches(allBusinesses.map((pitch) => pitch.id));
      } else {
        setSelectedBusinessPitches([]);
      }
    }
  };

  const handleComplete = () => {
    const selectedAssets = {
      vehicles: allVehicles.filter((vehicle) =>
        selectedVehiclePitches.includes(vehicle.id)
      ),
      businesses: allBusinesses.filter((business) =>
        selectedBusinessPitches.includes(business.id)
      ),
    };
    onComplete(selectedAssets);
  };

  const totalSelected = selectedBusinessPitches.length + selectedVehiclePitches.length

  return (
    <>
      {allVehicles.length > 0 && allBusinesses.length > 0 ? (
        <div className="p-5 bg-white rounded-md drop-shadow-md">
          <div className="mb-5 flex justify-between items-center">
            <span className="block font-Urbanist font-semibold text-h8 mt-10">
              Michael Johnson
            </span>
            {location.pathname.includes("dashboard") ? (
              <span className="text-[#FF7650] font-semibold text-h12 cursor-pointer">
                Skip and proceed without asset
              </span>
            ) : (
              <button
                className="py-2 px-4 rounded-md bg-primary hover:bg-primary-dark flex items-center more"
                onClick={handleShowDropdown}
              >
                <img src={plus} alt="" className="mr-2 scale-75" />
                <span className="text-white text-h12 font-Urbanist">
                  Add Asset
                </span>
                <img
                  src={chevronDown}
                  alt=""
                  className="ml-3 scale-90 -rotate-90"
                />
              </button>
            )}
            {showDropdown && (
              <div
                ref={modalRef}
                className="font-Inter bg-white p-2 w-40 absolute top-24 right-6 flex flex-col rounded-lg drop-shadow-md z-30 animate-fadeDownFast"
              >
                <span
                  className="text-h13 text-main-3 p-2 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center"
                  onClick={() => setOpenVehicle(true)}
                >
                  Vehicle
                </span>
                <span
                  className="text-h13 text-main-3 p-2 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center"
                  onClick={() => setOpenBusiness(true)}
                >
                  Business Premise
                </span>
              </div>
            )}
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center w-[70%]">
                <div className="flex p-2 rounded-md border group w-1/2 mr-5">
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
                <div className="flex items-center">
                  <button
                    className={`${
                      assetTypeTab === "vehicles"
                        ? "bg-[#a2beaa]"
                        : "bg-[#EFF7F2]"
                    } rounded-full px-4 py-2 font-medium block mr-3`}
                    onClick={() => changeTab("vehicles")}
                  >
                    Vehicles
                  </button>
                  <button
                    className={`${
                      assetTypeTab === "business"
                        ? "bg-[#a2beaa]"
                        : "bg-[#EFF7F2]"
                    } rounded-full px-4 py-2 font-medium block `}
                    onClick={() => changeTab("business")}
                  >
                    Business Premises
                  </button>
                </div>
              </div>
              <div className="flex rounded-md bg-white animate-fadeLeft">
                <img
                  src={list}
                  alt="list"
                  className={`${
                    viewTab === "list" ? "bg-[#CDE7D5] rounded-md" : ""
                  } p-2 mr-2 cursor-pointer`}
                  title="List view"
                  onClick={() => toggleTab("list")}
                />
                <img
                  src={grid}
                  alt="grid"
                  className={`${
                    viewTab === "grid" ? "bg-[#CDE7D5] rounded-md" : ""
                  } p-2 cursor-pointer`}
                  title="Grid view"
                  onClick={() => toggleTab("grid")}
                />
              </div>
            </div>
            {assetTypeTab === "vehicles" && (
              <VehicleAssets
                data={allVehicles}
                view={viewTab}
                onPitchSelect={handleSelectPitch}
                onBulkSelect={handleBulkSelect}
                isAllSelected={isAllVehiclesSelected}
                selectedPitches={selectedVehiclePitches}
              />
            )}
            {assetTypeTab === "business" && (
              <BusinessAssets
                data={allBusinesses}
                view={viewTab}
                onPitchSelect={handleSelectPitch}
                onBulkSelect={handleBulkSelect}
                isAllSelected={isAllBusinessesSelected}
                selectedPitches={selectedBusinessPitches}
              />
            )}
          </div>
          {location.pathname.includes("dashboard") && (
            <div className="mt-5 p-3 flex items-center justify-end text-white bg-primary rounded-lg shadow-md text-h12 font-Urbanist">
              <span className="mr-5">{totalSelected} assets selected</span>
              <button className="bg-white text-main-3 p-2" onClick={handleComplete} title="Proceed for payment">
                Continue to checkout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-full h-[65vh] flex-col justify-center items-center my-5">
          <img src={addAsset} alt="no-case" />
          <span className="block my-4 text-h10 text-[#798181] font-Urbanist">
            You have not created any asset yet, please create one.
          </span>
          <button className="py-2 px-4 rounded-md bg-primary hover:bg-primary-dark flex items-center">
            <img src={plus} alt="" className="mr-2 scale-75" />
            <span className="text-white text-h12 font-Urbanist">Add Asset</span>
            <img
              src={chevronDown}
              alt=""
              className="ml-3 scale-90 -rotate-90"
            />
          </button>
        </div>
      )}
      {openBusiness && (
        <AddBusinessAsset asset={null} closed={() => setOpenBusiness(false)} />
      )}
      {openVehicle && (
        <AddVehicleAsset center={null} closed={() => setOpenVehicle(false)} />
      )}
    </>
  );
};

export default CustomerAssets;
