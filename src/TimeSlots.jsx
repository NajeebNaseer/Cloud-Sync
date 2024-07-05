import React, { useEffect, useState, useCallback } from "react";
import { parseISO, isEqual, format } from "date-fns";

const TimeSlots = ({
  errMSG,
  setERRMSG,
  setSlotError,
  slotError,
  selectedTime,
  setSelectedTime,
  slots,
  selectedDate
}) => {
  const [filteredSlots, setFilteredSlots] = useState([]);

  useEffect(() => {
    if (selectedDate && slots?.length > 0) {
      const newFilteredSlots = slots?.filter((slot) => {
        const dateObject = parseISO(slot?.start_time);
        return isEqual(format(dateObject, "yyyy/MM/dd"), selectedDate);
      });
      setFilteredSlots(newFilteredSlots);
    }
  }, [selectedDate, slots]);

  const handleSelect = useCallback(
    (slot) => {
      setERRMSG("");
      setSelectedTime(slot);
      setSlotError(false);
    },
    [setERRMSG, setSelectedTime, setSlotError]
  );

  function extractTime(dateTimeString) {
    console.log("dateTimeString", dateTimeString);
    // const time = dateTimeString.split("T")[1].slice(0, 5);
    return dateTimeString;
  }

  console.log("selectedTime", selectedTime);

  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold text-xl mb-4">Select Time</h2>
      <div className="text-center">{selectedTime?.appointmentStart}</div>
      <div
        className={`relative rounded-lg ${
          slotError ? "border-red-500 border-4" : ""
        }`}
        style={{ height: "250px" }}
      >
        <div className="grid sm:grid-cols-2 gap-2 p-2 h-80 md:h-60 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#00c19c]">
          {filteredSlots.map((slot, index) => (
            <button
              key={index}
              onTouchStart={() => handleSelect(slot)}
              onClick={() => handleSelect(slot)}
              className={`p-2 h-12 text-center ${
                selectedTime.start_time === slot.start_time
                  ? "bg-[#00c19c]"
                  : "bg-gray-200"
              } rounded-lg hover:bg-[#bfe2dc] transition-colors duration-300 ease-in-out`}
            >
              {slot.appointmentStart.split(",")[1]} -{" "}
              {slot.appointmentEnd.split(",")[1]}
            </button>
          ))}
        </div>
      </div>
      {errMSG && (
        <div className="text-center text-lg text-red-600">{errMSG}</div>
      )}
    </div>
  );
};

export default TimeSlots;
