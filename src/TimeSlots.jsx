import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-10 bg-gray-300 rounded animate-pulse">
          <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="w-full h-full bg-gray-300 rounded animate-pulse"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                animation: "skeleton 1.5s infinite linear"
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TimeSlots = ({
  selectedTime,
  setSelectedDate,
  selectedDate,
  setSelectedTime,
  slots,
  loadMoreSlots
}) => {
  const [filteredSlots, setFilteredSlots] = useState();

  const filterSlotsByDate = (date) => {
    const selectedDateString = dayjs(date).format("YYYY-MM-DD");
    const filteredSlots = slots?.filter((slot) => {
      let slotDate = slot.start_time.split("T")[0];
      return slotDate === selectedDateString;
    });

    setFilteredSlots(filteredSlots);
  };
  useEffect(() => {
    console.log("Selected Date:", selectedDate); // Debugging
    console.log("Slots available:", slots); // Debugging
    if (selectedDate && slots.length > 0) {
      filterSlotsByDate(selectedDate);
    }
  }, [selectedDate, slots]);

  const [loadingMore, setLoadingMore] = useState(false);

  function extractTime(dateTimeString) {
    const parts = dateTimeString.split(",");

    const time = parts[1].trim();

    return time;
  }

  console.log("selectedDate", selectedTime);

  function getTime(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toString();

    return formattedDate;
  }
  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold text-xl mb-4">Select Time</h2>

      <div className="text-center">{selectedTime?.appointmentStart}</div>

      {loadingMore ? (
        <SkeletonLoader />
      ) : (
        <div
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#00c19c] scrollbar-track-gray-100"
          style={{ height: "250px" }}
        >
          <div className="grid sm:grid-cols-2 gap-2 p-2">
            {filteredSlots?.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(slot)}
                className={`p-2 text-center ${
                  selectedTime?.appointmentStart === slot?.appointmentStart &&
                  selectedTime?.appointmentEnd === slot?.appointmentEnd
                    ? "bg-[#bfe2dc]"
                    : "bg-gray-200"
                } rounded-lg transition duration-150 ease-in-out hover:bg-[#00c19c]`}
              >
                {extractTime(slot?.appointmentStart)}-
                {extractTime(slot?.appointmentEnd)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
