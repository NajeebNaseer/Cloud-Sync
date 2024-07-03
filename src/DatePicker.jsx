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

  ///
  //   .react-datepicker {
  //     font-family: 'Inter', sans-serif;
  //     border: none !important;
  //     box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  // }

  // .react-datepicker__header {
  //     background-color: transparent !important;
  //     border: none !important;
  // }

  // .react-datepicker__current-month,
  // .react-datepicker-time__header,
  // .react-datepicker-year-header {
  //     color: #333; // Adjust color as needed for visibility
  // }

  // .react-datepicker__navigation {
  //     color: #333; // Adjust navigation arrow color for visibility
  // }

  // .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
  //     color: #4A5568; // Dark gray color for the day names and numbers
  // }

  // .react-datepicker__day--selected {
  //     border-radius: 50%;
  //     background-color: #10B981 !important; // Example: green color for selected day
  //     color: white !important;
  // }

  // .react-datepicker__day--keyboard-selected {
  //     background-color: #9CA3AF !important; // Example: gray color for keyboard selected day
  // }

  // .react-datepicker__day:hover {
  //     background-color: #E5E7EB !important; // Light gray for hover
  // }

  // .highlighted-day-circle .react-datepicker__day--highlighted {
  //     color: red !important;  // Red text for highlighted days
  // }
  // `}

  // let date=['2025 11 30','2025 12 01','2025 12 02','2025 12 03','2025 12 04','2025 12 05',]

  return (
    <>
      <style>
        {`

          .react-datepicker__header {
            background-color: transparent !important;
            border: none !important;
            }

          .react-datepicker {
            font-family: 'Inter', sans-serif;
            border: none !important;
            
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                 }
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
