import { create } from "zustand";

export const useDatePickerStore = create((set) => ({
  recurrenceType: "daily",
  startDate: null,
  endDate: null,
  interval: 1, // For "every X days/weeks/etc."
  specificDays: [], // Ensure specificDays is initialized as an array
  nthDayOfMonth: null, // Nth day of the month (for example, "2nd Tuesday")
  selectedDates: [],

  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setInterval: (interval) => set({ interval }), // Set interval for recurrence
  setSpecificDays: (days) => set({ specificDays: days }), // Set specific days for weekly recurrence
  // setNthDayOfMonth: (nthDay) => set({ nthDayOfMonth: nthDay }), // Set nth day for monthly recurrence
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}));
