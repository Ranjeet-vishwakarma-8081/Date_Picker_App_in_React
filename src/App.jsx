import DatePicker from "../src/components/DatePicker";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Ranjeet Vishwakarma <br /> Recurring Date Picker App
        </h1>
        <DatePicker />
      </div>
    </div>
  );
}
