import { ChangeEvent, useState } from "react";
import { edit } from "@/constants/assets";
import "../../App.css";

const CustomerDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "James Makinde",
    address: "Belair avenue",
    customerType: "Individual",
    phoneNumber: "08115456386",
    email: "james@gmail.com",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Here you can handle the save logic (e.g., send the updated details to the server)
    setIsEditing(false);
  };

  return (
    <div className="p-5 bg-white rounded-md drop-shadow-md font-Urbanist">
      <div className="mb-5 pb-5 flex justify-between items-center">
        <span className="block font-Urbanist font-semibold text-h8 mt-10">
          Michael Johnson
        </span>
        <button
          className="hover:bg-primary-bg py-2 px-4 rounded-md border-primary border flex items-center"
          onClick={handleEditToggle}
        >
          <img src={edit} alt="" className="mr-2 scale-90" />
          <span className="text-primary text-h12 font-Urbanist">
            {isEditing ? "Cancel" : "Edit"}
          </span>
        </button>
      </div>
      <div>
        <div className="flex items-start">
          <span className="block font-Urbanist font-medium text-h12 mb-2 text-main-3">
            Name of Customer
          </span>
        </div>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleInputChange}
            className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
          />
        ) : (
          <span className="block font-Urbanist font-medium text-h12 mb-2 text-gray-400">
            {customerDetails.name}
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="flex items-start">
          <span className="block font-Urbanist font-medium text-h12 mb-2 text-main-3">
            Address
          </span>
        </div>
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
          />
        ) : (
          <span className="block font-Urbanist font-medium text-h12 mb-2 text-gray-400">
            {customerDetails.address}
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="flex items-start">
          <span className="block font-Urbanist font-medium text-h12 mb-2 text-main-3">
            Customer Type
          </span>
        </div>
        {isEditing ? (
          <select
            name="customerType"
            value={customerDetails.customerType}
            onChange={handleInputChange}
            className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
          >
            <option value="Individual">Individual</option>
            <option value="Corporate">Corporate</option>
          </select>
        ) : (
          <span className="block font-Urbanist font-medium text-h12 mb-2 text-gray-400">
            {customerDetails.customerType}
          </span>
        )}
      </div>
      <div className="w-full flex sm:flex-row mo:flex-col justify-between">
        <div className="mt-5 sm:w-[48%] mo-w-full">
          <div className="flex items-start">
            <span className="block font-Urbanist font-medium text-h12 mb-2 text-main-3">
              Phone Number
            </span>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={customerDetails.phoneNumber}
              onChange={handleInputChange}
              className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
            />
          ) : (
            <span className="block font-Urbanist font-medium text-h12 mb-2 text-gray-400">
              {customerDetails.phoneNumber}
            </span>
          )}
        </div>
        <div className="mt-5 sm:w-[48%] mo-w-full">
          <div className="flex items-start">
            <span className="block font-Urbanist font-medium text-h12 mb-2 text-main-3">
              Email
            </span>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              className="px-4 py-2 border hover:border-main-2 rounded-md outline-none w-full"
            />
          ) : (
            <span className="block font-Urbanist font-medium text-h12 mb-2 text-gray-400">
              {customerDetails.email}
            </span>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end mt-10">
          <button
            className="bg-primary hover:bg-primary-dark text-white text-h12 font-medium rounded-md py-2 w-1/5"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;