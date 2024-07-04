import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default styles

function CustomDatePicker({ selectedDate, setSelectedDate, dates }) {
  const formattedDates = dates?.map((dateString) => new Date(dateString));
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

  ///

  return (
    <>
      <style>
        {`
    .react-datepicker__header {
        background-color: transparent !important;
        border: none !important;
    }

    .react-datepicker__current-month {
        margin-top: 40px;
    }

    .react-datepicker__month {
        margin: 2rem;
    }

    .react-datepicker__navigation {
        top: 17px;
        padding: 30px;
    }

    .react-datepicker__day-names {
        margin-bottom: -26px;
    }

    .react-datepicker {
        font-family: 'Inter', sans-serif;
        border: none !important;
        box-shadow: 0 10px 25 atpx -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        width: 2.7rem;
        line-height: 2.7rem;
        color: #4A5568; // Dark gray color for the day names and numbers
    }

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
        width: 6px;
        height: 6px;
        background-color: #4A5568;  // Color of the small circle
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .react-datepicker__day--selected {
        border-radius: 50%;
        background-color: #00c19c !important;  // Full green circle for selected day
        color: white !important;
    }

    .react-datepicker__day--hover,
    .react-datepicker__day:hover {
        background-color: #e2e8f0 !important;  // Lighter gray for hover
        color: #2d3748 !important;  // Darker text color for better visibility
    }

    .react-datepicker__day--included {
        background-color: #4A5568;  // Dark gray background to distinguish included dates
        border-radius: 50%;
        position: relative;
    }

    .react-datepicker__day--highlighted {
        background-color: #f0f0f0;  // Grey background for highlighted days
        color: #333;  // Dark text for better visibility
        position: relative;
        border-radius: 50%;  // Circular cells
    }
  `}
      </style>
      <DatePicker
        selected={selectedDate ? selectedDate : dates?.[0]}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        inline
        highlightDates={formattedDates}
        includeDates={formattedDates}
      />
    </>
  );
}

export default CustomDatePicker;
