"use client";

import { useState } from "react";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  maxDate?: Date;
  minDate?: Date;
}

export function Calendar({ selectedDate, onDateSelect, onClose, maxDate, minDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(selectedDate);
    onClose();
  };
  
  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (maxDate && date > maxDate) return true;
    if (minDate && date < minDate) return true;
    return false;
  };
  
  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.calendar}>
        <div style={styles.header}>
          <button onClick={handlePrevMonth} style={styles.navButton}>
            ◀
          </button>
          <span style={styles.monthYear}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button onClick={handleNextMonth} style={styles.navButton}>
            ▶
          </button>
        </div>
        
        <div style={styles.daysHeader}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
            <div key={day} style={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>
        
        <div style={styles.daysGrid}>
          {days.map((day, index) => (
            <div key={index} style={styles.dayCell}>
              {day && (
                <button
                  onClick={() => handleDateClick(day)}
                  disabled={isDateDisabled(day)}
                  style={{
                    ...styles.dayButton,
                    ...(isDateSelected(day) && styles.selectedDay),
                    ...(isToday(day) && !isDateSelected(day) && styles.todayDay),
                    ...(isDateDisabled(day) && styles.disabledDay)
                  }}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  calendar: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    minWidth: "320px",
    maxWidth: "400px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  navButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "6px",
    color: "#4f8ef7",
  },
  monthYear: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },
  daysHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
    marginBottom: "8px",
  },
  dayHeader: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    padding: "8px 0",
  },
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  },
  dayCell: {
    aspectRatio: "1",
  },
  dayButton: {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    background: "transparent",
    color: "#111827",
    transition: "all 0.2s",
  },
  selectedDay: {
    backgroundColor: "#4f8ef7",
    color: "white",
    fontWeight: "600",
  },
  todayDay: {
    backgroundColor: "#f3f4f6",
    fontWeight: "500",
  },
  disabledDay: {
    color: "#d1d5db",
    cursor: "not-allowed",
  },
};
