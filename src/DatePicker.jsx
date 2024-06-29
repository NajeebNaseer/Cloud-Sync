import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles

function CustomDatePicker({ selectedDate, setSelectedDate, dates }) {
  // const availableDates = dates?.map((dateString) => new Date(dateString));
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(dates?.[0]);
    }
  }, [dates]);

  // const highlightWithCircle = dates?.reduce((acc, date) => {
  //   const dateString = date?.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  //   acc[dateString] = {
  //     customStyles: {
  //       classNames: ["highlighted-day-circle"],
  //       style: {
  //         color: "white" // Text color inside the circle
  //       }
  //     }
  //   };
  //   return acc;
  // }, {});

  return (
    <>
      <style>
        {`
          // Style for days that are available but not selected
          .react-datepicker__day--highlighted.highlighted-day-circle {
            border-radius: 50%;
            background-color: transparent !important;  // Make background transparent
            position: relative;
          }

          .react-datepicker__day--highlighted.highlighted-day-circle::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;   // Small circle size
            height: 6px;  // Small circle size
            background-color: green;  // Color of the small circle
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }

          .react-datepicker__day--selected {
            border-radius: 50%;
            background-color: #00c19c !important;  // Full green circle for selected day
            color: white !important;
          }
        `}
      </style>
      <DatePicker
        selected={selectedDate ? selectedDate : dates?.[0]}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        inline
        highlightDates={dates}
        includeDates={dates}
      />
    </>
  );
}

export default CustomDatePicker;
