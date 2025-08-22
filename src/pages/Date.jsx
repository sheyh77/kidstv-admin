import React, { useState } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Oyni chiqarish uchun
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Hafta kunlari
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Haftalik kunlarni olish
  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay() || 7; // Yakshanba = 0 bo‘ladi
    if (day !== 1) d.setHours(-24 * (day - 1));
    return d;
  };

  const getWeekDays = (date) => {
    const start = startOfWeek(date);
    return [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDays(currentDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>Calendar</h3>
        <div>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
      </div>

      <div className="calendar-week">
        {weekDays.map((day, i) => (
          <div key={i} className="calendar-day">
            <div className="day-name">{day}</div>
            <div
              className={`day-number ${
                weekDates[i].toDateString() === new Date().toDateString()
                  ? "active"
                  : ""
              }`}
            >
              {weekDates[i].getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
