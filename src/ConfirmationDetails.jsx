import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ConfirmationDetails = ({ user, setform, setSteps }) => {
  if (!user) return <p>User data is not available.</p>;

  return (
    <div className="max-w-4xl w-full sm:p-8 bg-white md:shadow-2xl rounded-lg flex justify-around md:border md:border-gray-200 sm:space-x-4">
      <div className="flex flex-col justify-start items-start p-8">
        <div className="text-2xl text-start  font-bold text-[#00c19c] mb-4">
          Final Step!
        </div>
        <ul className="list-none w-full max-w-md text-lg">
          <li className="flex items-center text-[#00c19c] mb-2">
            <FaCheckCircle className="mr-2" />
            Step 1: Select Date
          </li>
          <li className="flex items-center text-[#00c19c] mb-2">
            <FaCheckCircle className="mr-2" />
            Step 2: Choose Time Slot
          </li>
          <li className="flex items-center text-[#00c19c] mb-2">
            <FaCheckCircle className="mr-2" />
            Step 3: Confirm Details
          </li>
          <li className="flex items-center text-red-600 mb-2">
            <FaTimesCircle className="mr-2" />
            Step 4: Complete Payment
          </li>
        </ul>
        <div className="flex items-center justify-center">
          <button
            // onClick={() => setform(true)}
            onClick={() => setSteps(4)}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded-lg shadow-lg transition duration-300"
          >
            Complete Payment
          </button>
        </div>

        <div className="mt-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-2">
            How can we help? Our team is standing by to assist you with any
            questions:
          </h3>
          <p className="text-gray-800 mb-1">
            <strong>Email:</strong> {"info@liferxtelemd.com"}
          </p>
          <p className="text-gray-800">
            <strong>Phone:</strong> {"(609) 201-0119"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDetails;
