import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";

import { parseISO, isEqual, format } from "date-fns";

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
  errMSG,
  setERRMSG,
  setSlotError,
  slotError,
  selectedTime,
  selectedDate,
  setSelectedTime,
  slots
}) => {
  const [filteredSlots, setFilteredSlots] = useState();

  const filterSlotsByDate = (date) => {
    let filter = [];

    slots.forEach((slot) => {
      const dateObject = parseISO(slot.start_time);
      const formattedDate = format(dateObject, "yyyy/MM/dd");
      isEqual(formattedDate, date);

      if (isEqual(formattedDate, date)) {
        filter.push(slot);
      }
    });

    setFilteredSlots(filter);
  };
  useEffect(() => {
    if (selectedDate && slots.length > 0) {
      filterSlotsByDate(selectedDate);
    }
  }, [selectedDate, slots]);

  function extractTime(dateTimeString) {
    const parts = dateTimeString.split(",");

    const time = parts[1].trim();

    return time;
  }
  const handleSelect = (slot) => {
    setERRMSG("");
    setSelectedTime(slot);
    setSlotError(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold text-xl mb-4">Select Time</h2>

      <div className="text-center">{selectedTime?.appointmentStart}</div>

      {false ? (
        <SkeletonLoader />
      ) : (
        <>
          <span className="text-center text-red-600">{errMSG}</span>
          <div
            className={`overflow-y-auto scrollbar-thin rounded-lg scrollbar-thumb-[#00c19c] scrollbar-track-gray-100 ${
              slotError ? "border-red-500 border-4" : ""
            }`}
            style={{ height: "250px" }}
          >
            <div className="grid sm:grid-cols-2 gap-2 p-2 ">
              {filteredSlots?.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(slot)}
                  className={`p-2 text-center ${
                    selectedTime?.appointmentStart === slot?.appointmentStart &&
                    selectedTime?.appointmentEnd === slot?.appointmentEnd
                      ? "bg-[#00c19c]"
                      : "bg-gray-200"
                  } rounded-lg transition duration-150 ease-in-out hover:bg-[#bfe2dc]`}
                >
                  {extractTime(slot?.appointmentStart)}-
                  {extractTime(slot?.appointmentEnd)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeSlots;
