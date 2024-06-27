import React from "react";

const Confirmation = ({ setShowConfirmation, setSteps }) => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 bg-gray-700">
      <div className="bg-white p-5 rounded-lg shadow flex flex-col items-center">
        <svg
          className="w-16 h-16 text-[#00c19c]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="text-lg font-bold text-[#00c19c] mt-4">Success!</h3>
        <p className="text-sm text-center">Your booking has been confirmed.</p>
        <button
          // onClick={() => setShowConfirmation(false)}
          onClick={() => setSteps(5)}
          className="mt-4 bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
