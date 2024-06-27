import React, { useState } from "react";
import { stateOptions } from "./stateOptions"; // Assuming this is imported from your constant file or above component
import Select from "react-select";
import "react-input-range/lib/css/index.css"; // Import CSS for the slider
import InputRange from "react-input-range"; // Using react-input-range for the slider

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: null,
    sliderValue: 50 // Assuming a range slider out of 100
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStateChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      state: selectedOption
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Implement form submission logic here
  };

  return (
    <form
      className="max-w-4xl w-full p-8 bg-white shadow-2xl rounded-lg border border-gray-200 m-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Complete Payment</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address Line 1
        </label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address Line 2
        </label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          City
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          State
        </label>
        <Select
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          options={stateOptions}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Slider Value
        </label>
        <InputRange
          maxValue={100}
          minValue={0}
          value={formData.sliderValue}
          onChange={(sliderValue) =>
            setFormData((prevState) => ({ ...prevState, sliderValue }))
          }
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
