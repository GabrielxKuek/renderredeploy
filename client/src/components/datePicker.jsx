// components/datePicker
import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ReactDatePicker({ searchValue, setSearchValue }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const datePickerRef = useRef(null);

    const handleParentClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setFocus();
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(setSelectedDate);
        setSearchValue(date.toISOString());
    };

    return (
        <div className="flex-grow px-4 py-2 w-full bg-white border border-gray-300 rounded-l-md text-black" onClick={handleParentClick}>
            <DatePicker
                ref={datePickerRef}
                selected={searchValue ? new Date(searchValue.replace(' ', 'T')) : null} // Convert string to Date object
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd HH:mm:ss" // Custom date format display
                showTimeSelect
                timeIntervals={60}
                timeFormat="HH:mm:ss"
                className="w-full bg-transparent"
            />
        </div>
    );
}

export default ReactDatePicker;
