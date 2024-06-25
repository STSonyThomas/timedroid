"use client"
import { useAuthStore } from "@/store/UserAuthStore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

export default function UserHome() {
  const userLogin = useAuthStore((state)=>state.user);
  const Router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [weekDates,setWeekDates]=useState(["1","2","3"]);
  const weekValues= {};
  const [weekStore,setWeekStore]= useState({})
  const today = new Date();
  // let monthNumber = today.getMonth() + 1;
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'][today.getMonth()];

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    timeOptions.push(`${hour}:00`);
  }

  //start of functions
  const handleStartTimeChange = (event) => setStartTime(event.target.value);
  const handleEndTimeChange = (event) => setEndTime(event.target.value);
  const calWeek = (dateString)=>{
    // const parts = dateString.split('/');
    // console.log(parts)
    // const date = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    const date =  dateString;

    // Get the day of the week (0 for Sunday)
    const dayOfWeek = date.getDay();
    console.log(dayOfWeek);
    // Calculate the number of days to subtract to get the previous Sunday
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    console.log(daysToSubtract)
    // Create the date for the nearest Sunday
    const sunday = new Date(date.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);
    console.log(sunday);
    // Array to store all week dates
    const newWeekDays = []
    // Loop through all 7 days of the week
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(sunday.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = `${currentDay.getDate()}/${currentDay.getMonth() + 1}/${currentDay.getFullYear()}`;
      newWeekDays.push(formattedDate);
    }
    setWeekDates(newWeekDays)
    console.log(newWeekDays)
  }
  const handleWeekChange = (date,value)=>{
    setWeekStore(prev=>(
      {...prev,[date]:value}
    ))
  };
  useEffect(()=>{
    calWeek(selectedDate);
  },[selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    calWeek(selectedDate);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    //get year month and date
    // console.log(weekValues[weekDates[0]]);
    const attendanceData = {
      date:weekDates[0],
      month:monthName,
      year:today.getFullYear(),
      monday:weekStore[weekDates[0]],
      tuesday:weekStore[weekDates[1]],
      wednesday:weekStore[weekDates[2]],
      thursday:weekStore[weekDates[3]],
      friday:weekStore[weekDates[4]],
      saturday:weekStore[weekDates[5]],
      sunday:weekStore[weekDates[6]],

    }
    console.log("from user side",attendanceData);
    try {
      const response = await axios.post("/api/users/attendance",attendanceData);
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    // Implement your form submission logic here (e.g., send data to server)
  };

  return (
    
    <div className="flex min-h-screen flex-col items-center justify-between md:p-24 text-black w-[100%]">
      {/* Date picker starts here */}
      <div className="flex flex-col w-full h-full space-y-4 px-4 py-8  bg-white rounded-lg shadow-md ">
      <h1 className="text-xl font-medium text-gray-800">Attendance</h1>
      <hr className='border-t border-black my-4'/>
      <div className="flex flex-col space-y-2">
        <label htmlFor="date" className="text-sm text-gray-700">Date of week:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="border w-full border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500" // Custom class
          portalId="root-portal" // Add this line
        />
      </div>
      {/* time options start here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="startTime" className="text-sm text-gray-700">Start Time:</label>
          <select
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="endTime" className="text-sm text-gray-700">End Time:</label>
          <select
            id="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
            className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Day of the week mapper here */}
      <div className="flex flex-col space-y-2 ">
        <h4> Enter no of hours</h4>
            <div className="flex flex-col space-y-1 md:flex-row md:space-x-2">
            {weekDates.map((option) => (
              <div key={`${option} div`}>

                <label 
                htmlFor={`${option} day`} 
                key={`${option} label`} 
                className="text-sm text-gray-700 pr-2" 
                value={option}>
                {option}
              </label>

              <input
              key={`${option} input`} 
              type="text" 
              id ={`${option} day`}
              onChange={(e)=>(handleWeekChange(option,e.target.value))}
              value={weekStore[option] || ""}
              className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 w-[50%]" 
              >
                
              </input>
              </div>
            ))}
            </div>
        </div>
            {/* submit button here */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleSubmit}
      >
        Submit
      </button>

    </div>
    <Toaster/>
    </div>
  );
}
