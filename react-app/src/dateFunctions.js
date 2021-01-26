export const formatTime = (dateToParse) => {

  const dateObj = new Date(dateToParse);

  const hour = dateObj.getHours(); // 2
  const minute = dateObj.getMinutes(); // 58

  let newHour;

  if (minute <= 9) {
    minute = `0${minute}`;
  }

  if (hour === 12) {
    return `${hour}:${minute} PM`;
  } else if (hour > 12) {
    newHour = hour - 12;
    return `${newHour}:${minute} PM`;
  } else if (hour === 0) {
    newHour = 12;
    return `${newHour}:${minute} AM`;
  }

  return `${hour}:${minute} ${hour < 12 ? "AM" : "PM"}`;
};


export const formatDate = (dateToParse, format) => {

  const dateObj = new Date(dateToParse);

  const year = dateObj.getFullYear();
  const date = dateObj.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[dateObj.getMonth()];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[dateObj.getDay()];
  // long
  switch(format) {
      case 'long':
        return `${dayName}, ${monthName} ${date}, ${year}`;
      case 'short':
          return `${dayName.slice(0,3)}, ${monthName}, ${date}` // Wed Jun 21
  }

};
