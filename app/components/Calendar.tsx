import { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get dates for the current month view
  const getMonthDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const dates = [];
    
    // Add previous month's dates
    const daysFromPrevMonth = firstDay.getDay();
    const prevMonth = new Date(year, month - 1);
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      dates.push({
        date: prevMonthLastDay - i,
        month: 'prev',
        fullDate: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthLastDay - i)
      });
    }
    
    // Add current month's dates
    for (let date = 1; date <= lastDay.getDate(); date++) {
      dates.push({
        date,
        month: 'current',
        fullDate: new Date(year, month, date)
      });
    }
    
    // Add next month's dates
    const remainingDays = 42 - dates.length; // Always show 6 weeks
    for (let date = 1; date <= remainingDays; date++) {
      dates.push({
        date,
        month: 'next',
        fullDate: new Date(year, month + 1, date)
      });
    }
    
    return dates;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const handleDateClick = (fullDate: Date) => {
    setSelectedDate(fullDate);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="w-full min-w-[300px] max-w-md bg-white/25 dark:bg-gray-800/50 rounded-lg shadow p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-lg font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}
        
        {/* Date cells */}
        {getMonthDates().map(({ date, month, fullDate }, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(fullDate)}
            className={`
              relative p-2 w-full w-min-100 text-sm leading-none
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors rounded-lg
              ${month !== 'current' ? 'text-gray-400 dark:text-gray-500' : ''}
              ${isSelected(fullDate) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
              ${isToday(fullDate) ? 'font-bold' : ''}
            `}
          >
            <span className="relative z-10">{date}</span>
            {isToday(fullDate) && !isSelected(fullDate) && (
              <div className="absolute inset-1 border-2 border-blue-500 rounded-lg"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;