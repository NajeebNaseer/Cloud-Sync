import React, { useEffect, useState } from "react";
import CustomDatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";
import { ThreeDots } from "react-loader-spinner";
import Header from "./Header";
import Footer from "./Footer";
import Select from "react-select";
import ConfirmationDetails from "./ConfirmationDetails";
import { slots } from "./constants/slots";
import { stateOptions } from "./constants/statesLis";
import Confirmation from "./components/confirmation";
import { useParams } from "react-router-dom";
import { usePaymentInputs } from "react-payment-inputs";
import Input from "./components/Input";
import { url } from "./constants/url";

const Appointment = () => {
  const { name, first_name, last_name, dob } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState({});
  const [availableSlots, setAvailableSlots] = useState();
  const [showModal, setShowModal] = useState(true);
  const [selectedState, setSelectedState] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("name", first_name + " " + last_name);
    return () => localStorage.clear();
  }, [last_name, first_name]);

  const centsToDollars = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  function formatTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  function filterNonOverlappingSlots(appointmentSlots) {
    appointmentSlots.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );

    const nonOverlappingSlots = [];
    let lastEndTime = new Date(0);

    appointmentSlots.forEach((slot) => {
      const startTime = new Date(slot.start_time);
      const endTime = new Date(slot.end_time);
      if (startTime >= lastEndTime) {
        nonOverlappingSlots.push({
          ...slot,
          appointmentStart: formatTime(startTime),
          appointmentEnd: formatTime(endTime)
        });
        lastEndTime = endTime;
      }
    });

    return nonOverlappingSlots;
  }

  function extractAvailableDates(appointmentSlots) {
    const dateSet = new Set();

    appointmentSlots.forEach((slot) => {
      const date = new Date(slot.start_time).toLocaleDateString("en-US");
      dateSet.add(date);
    });

    return Array.from(dateSet);
  }

  const [data, setData] = useState([]);
  const [UID, setUID] = useState();

  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}api/v1/prognosis/get_free_slots/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          date_of_birth: dob
        })
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setSteps(2);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [dates, setDates] = useState();

  useEffect(() => {
    if (data?.slots) {
      const filteredSlots = filterNonOverlappingSlots(data?.slots);
      const availableDates = extractAvailableDates(data?.slots);
      setDates(availableDates);
      setUID(data?.UID);

      setAvailableSlots(filteredSlots);
    }
  }, [data]);

  const handleConfirmBooking = async () => {
    // setSteps(3);

    setLoading(true);
    try {
      const response = await fetch(`${url}api/v1/prognosis/set_appointment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          visit_type: 5,
          reason: "Test Reason",
          location_id: "",
          provider_id: selectedDate?.provider_id,
          patient_id: UID,
          start_time: selectedDate?.start_time
        })
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setSteps(3);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    ////

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPaymentForm(true);
    }, 2000);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const loadMoreSlots = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAvailableSlots((prevSlots) => [
          ...prevSlots,
          "12:00 PM",
          "01:00 PM",
          "02:00 PM"
        ]);
        resolve();
      }, 1500);
    });
  };

  const [form, setforms] = useState(false);
  const handleConfirm = () => {
    setShowModal(false);
    fetchData();
  };
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardValid, setCardValid] = useState(undefined);

  const validateCardNumber = (number) => {
    const regex = /^(?:3[47][0-9]{13})$/;
    return regex.test(number);
  };

  const [forms, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cardExpDate: "",
    cardCVC: ""
  });

  const price = 1999; // $19.99

  const handleSubmit = async (e) => {
    e.preventDefault();
    // onNext(form);
  };

  const handleChange = () => {};
  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    setCardNumber(number);
    if (number.length === 0) {
      setCardValid(undefined);
      return;
    }
    setCardValid(validateCardNumber(number));
  };

  console.log("error", error);
  return (
    <div className="flex container mx-auto flex-col min-h-screen">
      <Header userName={name} userImage="" />

      {steps === 4 && (
        <Confirmation setSteps={setSteps} setShowConfirmation={setforms} />
      )}

      {steps === 1 && (
        <div className="flex-grow flex items-center md:py-20 justify-center bg-gray-100">
          <div className="max-w-4xl mx-auto w-full p-4 md:p-8 bg-white shadow-2xl rounded-lg flex flex-col md:flex-row justify-around border border-gray-200 md:space-x-4">
            <div className="flex-1 flex flex-col md:py-10 items-center justify-center space-y-4 p-4">
              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800">
                  Schedule your Appointment!
                </h1>
                <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800">
                  What state do you live in?
                </h3>
                <h4 className="text-sm md:text-md italic text-center text-gray-500">
                  This helps us connect you with a licensed provider in your
                  state.
                </h4>
              </div>

              <div className="w-full px-4 md:w-96">
                <Select
                  options={stateOptions}
                  onChange={handleStateChange}
                  isClearable
                  placeholder="Search and select a state..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: 50,
                      borderColor: "rgba(0, 123, 255, 0.2)",
                      boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        borderColor: "rgba(0, 123, 255, 0.3)"
                      }
                    }),
                    option: (provided) => ({
                      ...provided,
                      height: "30px",
                      display: "flex",
                      alignItems: "center"
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "120px",
                      overflowY: "auto"
                    })
                  }}
                />
              </div>
              <div className="w-full px-4 md:w-96">
                <button
                  onClick={handleConfirm}
                  className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        <div className="flex-grow flex items-center justify-center bg-gray-100">
          {steps === 2 && (
            // <div>Select a time to meet with a licensed provider</div>
            <div className="max-w-4xl mx-auto w-full p-4 sm:p-8 bg-white shadow-2xl rounded-lg flex flex-col sm:flex-row justify-around border border-gray-200 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col items-center justify-center space-y-4 px-4 py-8">
                <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
                  Select Date
                </h2>
                <CustomDatePicker
                  dates={dates}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="flex flex-col space-y-4 px-4 py-8">
                <TimeSlots
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  slots={availableSlots}
                  loadMoreSlots={loadMoreSlots}
                />
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                  disabled={isLoading}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
          {steps === 3 && (
            <ConfirmationDetails
              setSteps={setSteps}
              setform={setforms}
              user={{ email: "email@example.com", phone: "+1234567890" }}
            />
          )}
          {steps === 5 && (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl p-4 md:p-8 bg-white rounded-lg border border-gray-200 md:space-x-4"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8">
                  Add Payment Method
                </h2>

                <div className="mb-4">
                  <div>
                    <Input
                      {...getCardNumberProps({ onChange: handleChange })}
                      id="cardNumber"
                      required
                      label="Card number"
                      value={form.cardNumber}
                      className="w-full p-2 m-2 rounded-lg border border-gray-300"
                    />
                  </div>

                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                      <Input
                        {...getExpiryDateProps({ onChange: handleChange })}
                        id="cardExpDate"
                        required
                        label="Exp. Date"
                        value={form.cardExpDate}
                        className="w-full p-2 rounded-lg border border-gray-300"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <Input
                        {...getCVCProps({ onChange: handleChange })}
                        id="cardCVC"
                        required
                        label="Security Code"
                        value={form.cardCVC}
                        className="w-full p-2 rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSteps(5)}
                  className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          )}
        </div>
      }

      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-700">
          <ThreeDots color="#FFFFFF" height={80} width={80} />
        </div>
      )}

      {error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-700">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
            <p className="text-lg mb-4 text-gray-700">{error?.msg}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Appointment;
