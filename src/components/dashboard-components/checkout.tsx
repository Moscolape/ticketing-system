import React from "react";
import { Businesses, Vehicles } from "../customers-components/customer-assets";
import { cancel } from "@/constants/assets";

interface CheckoutProps {
  selectedAssets: {
    vehicles: Vehicles[];
    businesses: Businesses[];
  };
  onRemoveAsset: (type: "vehicles" | "businesses", id: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  selectedAssets,
  onRemoveAsset,
}) => {
  const vehicleService = "Vehicle Service";
  const businessService = "Business Service";
  const unitPrice = 100; // Example unit price
  const qty = 1; // Example quantity

  const calculateAmount = (qty: number, price: number) => qty * price;

  // Check if there are no selected assets
  const hasNoAssets =
    selectedAssets.vehicles.length === 0 &&
    selectedAssets.businesses.length === 0;

  return (
    <div className="w-full mt-10 bg-white m-auto font-Inter border rounded-lg">
      {hasNoAssets ? (
        <div className="py-10 px-2 text-center text-h12 text-gray-600">
          No assets selected.
        </div>
      ) : (
        <>
          <div className="py-3 px-2 flex items-center rounded-lg border-b">
            <span className="flex w-[20%] text-h12 font-bold">Service</span>
            <span className="flex w-[20%] text-h12 font-bold">Assets</span>
            <span className="flex w-[20%] text-h12 font-bold">Qty</span>
            <span className="flex w-[20%] text-h12 font-bold">Unit Price</span>
            <span className="flex w-[15%] text-h12 font-bold">Amount</span>
            <span className="flex w-[5%] text-h12 font-bold"></span>
          </div>

          <div>
            {selectedAssets.vehicles.map((vehicle) => (
              <div
                key={vehicle.id} // Assuming `vehicle.id` exists for unique identification
                className={`${
                  selectedAssets.vehicles.indexOf(vehicle) % 2 === 0
                    ? "bg-gray-100"
                    : "bg-white"
                } py-3 px-2 font-DM-Sans`}
              >
                <div className="cursor-pointer flex items-center justify-between w-full relative animate-fadeDownFast">
                  <span className="block w-[20%] text-h12 text-[#272525] font-normal">
                    {vehicleService}
                  </span>
                  <span className="block w-[20%] text-h12 text-gray-1 font-normal">
                    {vehicle.make} {vehicle.model}
                  </span>
                  <span className="block w-[20%] text-h12 text-main-4 font-normal">
                    {qty}
                  </span>
                  <span className="block w-[20%] text-h12 text-[#272525] font-normal">
                    ${unitPrice.toFixed(2)}
                  </span>
                  <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                    ${calculateAmount(qty, unitPrice).toFixed(2)}
                  </span>
                  <span className="block w-[5%] text-h12 font-normal">
                    <img
                      src={cancel}
                      className="scale-90"
                      onClick={() => onRemoveAsset("vehicles", vehicle.id)}
                      title="remove"
                    />
                  </span>
                </div>
              </div>
            ))}

            {selectedAssets.businesses.map((business) => (
              <div
                key={business.id} // Assuming `business.id` exists for unique identification
                className={`${
                  (selectedAssets.businesses.indexOf(business) +
                    selectedAssets.vehicles.length) %
                    2 ===
                  0
                    ? "bg-gray-100"
                    : "bg-white"
                } py-3 px-2 font-DM-Sans`}
              >
                <div className="cursor-pointer flex items-center justify-between w-full relative animate-fadeDownFast">
                  <span className="block w-[20%] text-h12 text-[#272525] font-normal">
                    {businessService}
                  </span>
                  <span className="block w-[20%] text-h12 text-gray-1 font-normal">
                    {business.name}
                  </span>
                  <span className="block w-[20%] text-h12 text-main-4 font-normal">
                    {qty}
                  </span>
                  <span className="block w-[20%] text-h12 text-[#272525] font-normal">
                    ${unitPrice.toFixed(2)}
                  </span>
                  <span className="block w-[15%] text-h12 text-gray-1 font-normal">
                    ${calculateAmount(qty, unitPrice).toFixed(2)}
                  </span>
                  <span className="block w-[5%] text-h12 font-normal">
                    <img
                      src={cancel}
                      className="scale-90"
                      onClick={() => onRemoveAsset("businesses", business.id)}
                      title="remove"
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="py-3 px-2 mt-5 flex items-center rounded-lg border-t">
            <span className="block w-[80%] text-h12 font-bold">TOTAL</span>
            <span className="block w-[20%] text-h12 font-bold">
              $
              {(
                selectedAssets.vehicles.length *
                  calculateAmount(qty, unitPrice) +
                selectedAssets.businesses.length *
                  calculateAmount(qty, unitPrice)
              ).toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
