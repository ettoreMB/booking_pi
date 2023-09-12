import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const Calendario = () => {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const handleValueChange = newValue => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    return (
        <div>
            <Datepicker value={value} 
            minDate={Date}
            onChange={handleValueChange}
            placeholder={"Check-in Check-out"}
            
            />
        </div>
    );
};

export default Calendario;