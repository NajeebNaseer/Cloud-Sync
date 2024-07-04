export const formatTime = (date) => {
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
};

export const formatDate = (date) => {
  const dateString = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  return `${dateString}`;
};

export const getDate = (selectedState, currentTime) => {
    return selectedState.timeZone + " " + currentTime;
  };

export const getUniqueAppointmentDates = (appointmentsArray) => {
    const dates = appointmentsArray.map(
      (appointment) => appointment.appointmentDate
    );
    const uniqueDates = Array.from(new Set(dates));
    return uniqueDates;
  };
