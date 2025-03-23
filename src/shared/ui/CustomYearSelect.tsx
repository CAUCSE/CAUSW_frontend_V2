"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import DropdownIcon from "../../../public/icons/dropdown_icon.svg";
import { createPortal } from "react-dom";

interface DropdownItemListProps {
  yearList: number[];
  offsetX: number;
  offsetY: number;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectValue: React.Dispatch<React.SetStateAction<number>>;
}

const DropdownItemList = forwardRef<HTMLDivElement, DropdownItemListProps>(
  (
    { yearList: itemList, offsetX, offsetY, setDropdownOpen, setSelectValue },
    ref,
  ) => {
    const handleSelectItem = (value: number) => {
      setSelectValue(value);
      setDropdownOpen(false);
    };
    return createPortal(
      <div
        ref={ref}
        className="absolute max-h-56 w-28 overflow-auto rounded-md border border-gray-300 bg-white scrollbar-hide"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          willChange: "transform",
        }}
      >
        <ul>
          {itemList.map((item, idx) => {
            return (
              <li
                key={idx}
                className="cursor-pointer p-2 text-center hover:bg-gray-100"
                onClick={() => handleSelectItem(item)}
              >
                {item}년
              </li>
            );
          })}
        </ul>
      </div>,
      document.body,
    );
  },
);

DropdownItemList.displayName = "DropdownItemList";

interface CustomSelectProps {
  initialValue: number;
  setSelectValue: (year: number) => void;
}

export const CustomYearSelect = ({
  initialValue,
  setSelectValue,
}: CustomSelectProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownX, setDropdownX] = useState<number>(0);
  const [dropdownY, setDropdownY] = useState<number>(0);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const yearList: number[] = [];

  for (let i = new Date().getFullYear(); i >= 1972; i--) {
    yearList.push(i);
  }

  const handleClick = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);
    if (!selectRef.current) {
      return;
    }
    const { x, y } = e.currentTarget.getBoundingClientRect();
    setDropdownX(x);
    setDropdownY(y + selectRef.current.clientHeight + 10);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!selectRef.current || !dropdownRef.current) {
        return;
      }
      const { target } = e;
      if (
        !dropdownRef.current.contains(target as Node) &&
        !selectRef.current.contains(target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectValue(selectedYear);
  }, [selectedYear]);

  return (
    <>
      <div
        className="flex w-28 cursor-pointer items-center justify-between rounded-md border border-gray-300 p-2 hover:text-gray-500"
        onClick={handleClick}
        ref={selectRef}
      >
        <p>{selectedYear}년</p>
        <DropdownIcon />
      </div>
      {isOpen && (
        <DropdownItemList
          yearList={yearList}
          ref={dropdownRef}
          offsetX={dropdownX}
          offsetY={dropdownY}
          setDropdownOpen={setIsOpen}
          setSelectValue={setSelectedYear}
        />
      )}
    </>
  );
};
