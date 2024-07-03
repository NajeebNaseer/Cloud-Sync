import React, { useEffect, useState } from "react";
import CustomDatePicker from "../DatePicker";
import TimeSlots from "../TimeSlots";
import { ThreeDots } from "react-loader-spinner";
import Header from "../Header";
import Footer from "../Footer";
import Select from "react-select";
import ConfirmationDetails from "../ConfirmationDetails";
import { slots } from "../constants/slots";
import { stateOptions } from "../constants/statesLis";
import Confirmation from "../components/confirmation";
import { useParams, useSearchParams } from "react-router-dom";
import { usePaymentInputs } from "react-payment-inputs";
import Input from "../components/Input";
import { url } from "../constants/url";

const Appointment = () => {
  let [searchParams] = useSearchParams();
  let first_name = searchParams.get("first_name");
  let last_name = searchParams.get("last_name");
  let phone = searchParams.get("phone");
  let email = searchParams.get("email");
  let state = searchParams.get("state");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState({});
  const [availableSlots, setAvailableSlots] = useState();
  const [showModal, setShowModal] = useState(true);
  const [selectedState, setSelectedState] = useState(state);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [steps, setSteps] = useState(1);
  const [currentTime, setCurrentTime] = useState("");

  // function getTimeZoneForState(selectedState) {
  //   const state = stateOptions.find((state) => state.value === selectedState);

  //   if (state) {
  //     return state.timeZone;
  //   } else {
  //     return null;
  //   }
  // }

  function getTimeZoneForState(selectedState) {
    const filteredStates = stateOptions.filter(
      (state) => state.value === selectedState
    );
    if (filteredStates.length > 0) {
      return filteredStates[0].timeZone;
    } else {
      return null;
    }
  }

  // useEffect(() => {
  //   let timer = "";
  //   if (selectedState) {
  //     // timer = setInterval(() => {
  //     const newDate = new Date();
  //     const timeFormatter = new Intl.DateTimeFormat("en-US", {
  //       timeZone: getTimeZoneForState(selectedState),
  //       hour: "numeric",
  //       minute: "numeric",
  //       second: "numeric",
  //       hour12: true
  //     });
  //     setCurrentTime(timeFormatter.format(newDate));
  //     // }, 1000);
  //   }

  //   // return () => clearInterval(timer);
  // }, [selectedState]);

  console.log("currentTime", currentTime);

  useEffect(() => {
    // console.log(
    //   " getTimeZoneForState(selectedState)",
    //   getTimeZoneForState(selectedState)
    // );
    localStorage.removeItem("name");
    localStorage.setItem("name", first_name + " " + last_name);
    return () => localStorage.removeItem("name");
  }, [last_name, first_name]);

  function formatTime(date) {
    const dateString = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    });

    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    return `${dateString}, ${timeString}`;
  }

  function formatDate(date) {
    const dateString = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    });

    return `${dateString}`;
  }

  function filterNonOverlappingSlots(appointmentSlots) {
    appointmentSlots.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );

    const nonOverlappingSlots = [];
    let lastEndTime = new Date();
    appointmentSlots.forEach((slot) => {
      const startTime = new Date(slot.start_time);
      const endTime = new Date(slot.end_time);
      if (startTime >= lastEndTime) {
        nonOverlappingSlots.push({
          ...slot,
          appointmentStart: formatTime(startTime),
          appointmentEnd: formatTime(endTime),
          appointmentDate: formatDate(endTime)
        });
        lastEndTime = endTime;
      }
    });

    return nonOverlappingSlots;
  }

  const getUniqueAppointmentDates = (appointmentsArray) => {
    const dates = appointmentsArray.map(
      (appointment) => appointment.appointmentDate
    );
    const uniqueDates = Array.from(new Set(dates));
    return uniqueDates;
  };

  const [data, setData] = useState([]);
  const [UID, setUID] = useState();

  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}api/v1/prognosis/get_free_slots/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          phone_number: phone,
          email: email,
          state: selectedState?.value
        })

        // body: JSON.stringify({
        //   first_name: first_name,
        //   last_name: last_name,
        //   date_of_birth: dob
        // })
      });

      if (!response.ok) {
        throw new Error(`Oops! Something went wrong, Please contact support`);
      }

      const result = await response.json();
      setData(result);
      if (result?.slots.length > 0) {
        setSteps(2);
      } else {
        setNoSlot(true);
      }
    } catch (error) {
      console.log("error.parse", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [dates, setDates] = useState();
  const getDate = () => {
    let date = new Date();

    const options = {
      weekday: "long", // e.g., Monday
      year: "numeric", // e.g., 2024
      month: "long", // e.g., July
      day: "numeric", // e.g., 13
      hour: "2-digit", // e.g., 02 PM
      minute: "2-digit", // e.g., 45
      second: "2-digit", // e.g., 30
      hour12: true // Use 12-hour clock (AM/PM)
    };

    return date.toLocaleString("en-US", options);
  };
  // var date = new Date();

  useEffect(() => {
    if (data?.slots) {
      // if (slots) {
      const filteredSlots = filterNonOverlappingSlots(data?.slots);
      // const filteredSlots = filterNonOverlappingSlots(slots);
      let res = getUniqueAppointmentDates(filteredSlots);
      setDates(res);
      setUID(data?.UID);
      setAvailableSlots(filteredSlots);
    }
  }, [data]);

  const handleConfirmBooking = async () => {
    let body = {
      visit_type: 5,
      reason: "",
      location_id: 3,
      provider_id: selectedTime?.provider_id,
      patient_id: UID,
      start_time: selectedTime?.start_time
    };

    if (true) {
      setLoading(true);
      try {
        const response = await fetch(
          `${url}api/v1/prognosis/set_appointment/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(body)
          }
        );
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
    }
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const [form, setforms] = useState(false);
  const handleConfirm = () => {
    setShowModal(false);
    fetchData();
  };
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();
  const [noSlot, setNoSlot] = useState(false);

  const [forms, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cardExpDate: "",
    cardCVC: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  useEffect(() => {
    let initialStateValue = searchParams.get("state");
    if (initialStateValue) {
      const foundState = stateOptions.find(
        (opt) => opt.value === initialStateValue
      );
      if (foundState) {
        setSelectedState(foundState);
      }
    }
  }, [searchParams]);

  const handleBack = () => {
    setSteps((prev) => (prev === 5 ? prev - 2 : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header userName={first_name + " " + last_name} userImage="" />
      <div
        title="90 Days Recheck Plan"
        className="md:hidden block text-xl sm:text-2xl md:text-4xl text-center text-gray-800 font-bold  "
      >
        90 Days Check Plan
      </div>
      {steps === 4 && (
        <Confirmation setSteps={setSteps} setShowConfirmation={setforms} />
      )}
      <div className="bg-gray-100 flex justify-start">
        <button
          onClick={handleBack}
          className="mx-4 w-[100px] my-4 bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-3xl shadow-lg transition duration-300 ease-in-out"
        >
          Back
        </button>
      </div>
      {steps === 1 && (
        <div className="md:flex-grow flex items-center md:py-20 justify-center md:bg-gray-100">
          <div className="max-w-4xl mx-auto w-full p-4 md:p-8 bg-white md:shadow-2xl rounded-lg flex flex-col md:flex-row justify-around md:border border-gray-200 md:space-x-4">
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
                  value={selectedState}
                  isClearable
                  placeholder="Search and select a state..."
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: 40,
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
                  className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-3xl shadow-lg transition duration-300 ease-in-out"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {
        <div className="md:flex-grow flex items-center justify-center bg-gray-100">
          {steps === 2 && (
            <>
              <div className="max-w-4xl mx-auto w-full p-4 sm:p-0 bg-white shadow-2xl rounded-lg flex flex-col justify-between border border-gray-200 space-y-4 sm:space-y-0 sm:space-x-4 h-full">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col items-center justify-center space-y-4">
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
                    <div className="text-center">
                      Select a time to meet with a licensed provider
                    </div>
                    <TimeSlots
                      setSelectedDate={setSelectedDate}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      slots={availableSlots}
                    />
                    <button
                      onClick={handleConfirmBooking}
                      className="w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-3xl shadow-lg"
                      disabled={isLoading}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
                <div className="text-center text-lg font-medium py-4">
                  {getDate()}
                </div>
              </div>
            </>
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
                  className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-3xl transition-colors duration-300 ease-in-out"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          )}
        </div>
      }

      {isLoading && (
        <div className="absolute bg-black top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-50">
          <style>
            {`
          @keyframes bubble {
              0%, 100% {
                  transform: translateY(0);
              }
              50% {
                  transform: translateY(-20px);
              }
          }
          .bubbling-text span {
              display: inline-block;
              animation: bubble 1.5s ease-in-out infinite;
          }
          .bubbling-text span:nth-child(1) { animation-delay: 0.1s; }
          .bubbling-text span:nth-child(2) { animation-delay: 0.2s; }
          .bubbling-text span:nth-child(3) { animation-delay: 0.3s; }
          .bubbling-text span:nth-child(4) { animation-delay: 0.4s; }
          .bubbling-text span:nth-child(5) { animation-delay: 0.5s; }
          .bubbling-text span:nth-child(6) { animation-delay: 0.6s; }
          .bubbling-text span:nth-child(7) { animation-delay: 0.7s; }
        `}
          </style>
          <div className="p-6 bg-white bg-opacity-100 rounded-lg flex flex-col items-center justify-center">
            <p className="text-[#008a73] mt-3 text-xl bubbling-text">
              {
                "Finding Available Slots and a licensed practitioner in your state"
              }
            </p>
            <ThreeDots color="#008a73" height={80} width={80} />
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-700">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
            <p className="text-lg mb-4 text-gray-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-3xl transition-colors duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {noSlot && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-700">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              No Slots Found Please contact admin
            </h2>
            <button
              onClick={() => setNoSlot(null)}
              className="mt-4 w-full bg-[#00c19c] hover:bg-[#008a73] text-white font-bold py-2 px-4 rounded-3xl transition-colors duration-300 ease-in-out"
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
