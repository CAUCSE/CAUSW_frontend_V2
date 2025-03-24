"use client";
import React, { useState } from "react";

const dateFormat = {
  0: "년 ",
  1: "월 ",
  2: "일 ",
};

interface OccasionDateProps {
  title: string;
  initialDate: string;
  onDateChange: (newDate: string) => void;
}

export const OccasionDateInput = ({
  title,
  initialDate,
  onDateChange,
}: OccasionDateProps) => {
  const [formattedDate, setFormattedDate] = useState<string[]>(
    initialDate.split("-")
  );

  const handleInputChange = (value: string, idx: number) => {
    const updatedDate = [...formattedDate];
    updatedDate[idx] = value;
    setFormattedDate(updatedDate);

    // Join the updated date array and send it to the parent component
    onDateChange(updatedDate.join("-"));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-md md:text-md font-medium">{title}</h1>
      <div className="flex gap-2 text-lg md:text-lg">
        {formattedDate.map((number, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <input
              type="number"
              value={number}
              onChange={(e) => handleInputChange(e.target.value, idx)}
              className="w-16 bg-[#F8F8F8] border-b-2 border-gray-300 text-center focus:outline-none"
            />
            <span>{dateFormat[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
