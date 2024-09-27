import { useState } from "react";
import MiniCalendar from "./MiniCalendar";
import { useDatePickerStore } from "./store";

const DatePicker = () => {
  const {
    recurrenceType,
    setRecurrenceType,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    interval,
    setInterval,
    specificDays,
    // setSpecificDays,
    nthDayOfMonth,
    // setNthDayOfMonth,
  } = useDatePickerStore();

  const [startInputDate, setStartInputDate] = useState("");

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    setStartInputDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    setEndDate(date);
  };

  return (
    <div className="date-picker p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Date Picker</h2>

      <div className="mb-5">
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          id="start-date"
          value={startInputDate}
          onChange={handleStartDateChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-700"
        >
          End Date (Optional)
        </label>
        <input
          type="date"
          id="end-date"
          onChange={handleEndDateChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="recurrence-type"
          className="block text-sm font-medium text-gray-700"
        >
          Recurrence Type
        </label>
        <select
          id="recurrence-type"
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="interval"
          className="block text-sm font-medium text-gray-700"
        >
          Every X {recurrenceType}
        </label>
        <input
          type="number"
          id="interval"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          min={1}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <MiniCalendar
        startDate={startDate}
        endDate={endDate}
        recurrenceType={recurrenceType}
        interval={interval}
        specificDays={specificDays}
        nthDayOfMonth={nthDayOfMonth}
      />
    </div>
  );
};

export default DatePicker;
