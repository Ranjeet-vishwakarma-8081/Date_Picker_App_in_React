import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  eachDayOfInterval,
  getDay,
  getDate,
  startOfMonth,
  endOfMonth,
  setDate,
} from "date-fns";

const MiniCalendar = ({
  startDate,
  endDate = null,
  recurrenceType,
  interval,
  specificDays = [],
  nthDayOfMonth = null,
}) => {
  const [recurringDates, setRecurringDates] = useState([]);

  const calculateNthDayOfMonth = (nth, dayOfWeek, current) => {
    const start = startOfMonth(current);
    const end = endOfMonth(current);

    let nthDay = null;
    let count = 0;

    for (let date = start; date <= end; date = addDays(date, 1)) {
      if (getDay(date) === dayOfWeek) {
        count++;
        if (count === nth) {
          nthDay = date;
          break;
        }
      }
    }

    return nthDay ? setDate(current, getDate(nthDay)) : null;
  };

  const calculateRecurringDates = useCallback(() => {
    if (!startDate) return;

    let dates = [];
    let current = new Date(startDate);

    while (endDate ? current <= new Date(endDate) : dates.length < 30) {
      if (recurrenceType === "monthly" && nthDayOfMonth) {
        const nthDay = calculateNthDayOfMonth(
          nthDayOfMonth.nth,
          nthDayOfMonth.dayOfWeek,
          current
        );
        if (nthDay) dates.push(new Date(nthDay));
        current = addMonths(current, interval);
      } else {
        dates.push(new Date(current));

        switch (recurrenceType) {
          case "daily":
            current = addDays(current, interval); // Every X days
            break;
          case "weekly":
            current = addWeeks(current, interval); // Every X weeks
            break;
          case "monthly":
            current = addMonths(current, interval); // Every X months
            break;
          case "yearly":
            current = addYears(current, interval); // Every X years
            break;
          default:
            return;
        }
      }
    }

    // Handle specific days of the week for weekly recurrence
    if (recurrenceType === "weekly" && specificDays.length > 0) {
      dates = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      }).filter((date) => specificDays.includes(getDay(date)));
    }

    setRecurringDates(dates);
  }, [
    startDate,
    endDate,
    recurrenceType,
    interval,
    specificDays,
    nthDayOfMonth,
  ]);

  useEffect(() => {
    calculateRecurringDates();
  }, [calculateRecurringDates]);

  return (
    <div className="calendar p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Mini Calendar
      </h3>
      {recurringDates.map((date, index) => (
        <div
          key={index}
          className="calendar-date text-center py-2 border border-gray-200 rounded-md hover:bg-blue-100 transition duration-200"
        >
          {format(new Date(date), "MM/dd/yyyy")}
        </div>
      ))}
    </div>
  );
};

MiniCalendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  recurrenceType: PropTypes.oneOf(["daily", "weekly", "monthly", "yearly"])
    .isRequired,
  interval: PropTypes.number.isRequired,
  specificDays: PropTypes.arrayOf(PropTypes.number),
  nthDayOfMonth: PropTypes.shape({
    nth: PropTypes.number.isRequired,
    dayOfWeek: PropTypes.number.isRequired,
  }),
};

export default MiniCalendar;
