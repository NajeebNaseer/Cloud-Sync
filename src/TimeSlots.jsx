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
  const [filteredSlots, setFilteredSlots] = useState(slots);
  useEffect(() => {
    setFilteredSlots(slots);
  }, [slots]);

  // Date change handler
  useEffect(() => {
    setSelectedDate(selectedDate);
    filterSlotsByDate(selectedDate);
  }, [selectedDate]);

  // Filter slots based on selected date
  const filterSlotsByDate = (date) => {
    const selectedDateString = dayjs(date).format("YYYY-MM-DD");
    const filtered = slots?.filter((slot) => {
      return slot.start_time.startsWith(selectedDateString);
    });
    setFilteredSlots(filtered);
  };

  const datesWithSlots = useMemo(() => {
    return slots?.map(
      (slot) => new Date(slot.start_time).toISOString().split("T")[0]
    );
  }, [slots]);
  const [loadingMore, setLoadingMore] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold text-xl mb-4">Select Time</h2>

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
                {slot?.appointmentStart}-{slot?.appointmentEnd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
