"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import DropdownIcon from "../../../public/icons/dropdown_icon.svg";
import { createPortal } from "react-dom";

interface DropdownItemListProps<T> {
  itemList: T[];
  suffix: string;
  offsetX: number;
  offsetY: number;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectValue: React.Dispatch<React.SetStateAction<T>>;
}

function DropdownItemListWithRef<T>(
  {
    itemList,
    suffix,
    offsetX,
    offsetY,
    setDropdownOpen,
    setSelectValue,
  }: DropdownItemListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleSelectItem = (value: any) => {
    setSelectValue(value);
    setDropdownOpen(false);
  };
  return createPortal(
    <div
      ref={ref}
      className="absolute max-h-32 w-28 overflow-auto rounded-md border border-gray-300 bg-white scrollbar-hide md:scrollbar-default lg:max-h-56"
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
              {`${item}${suffix}`}
            </li>
          );
        })}
      </ul>
    </div>,
    document.body,
  );
}

const DropdownItemList = forwardRef(DropdownItemListWithRef) as any;

interface CustomSelectProps<T> {
  itemList: T[];
  setSelectValue: (value: T) => void;
  suffix: string;
}

export const CustomSelect = <T extends {}>({
  itemList,
  setSelectValue,
  suffix,
}: CustomSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(itemList[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownX, setDropdownX] = useState<number>(0);
  const [dropdownY, setDropdownY] = useState<number>(0);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setSelectValue(selectedValue);
  }, [selectedValue]);

  return (
    <>
      <div
        className="flex w-28 cursor-pointer items-center justify-between rounded-md border border-gray-300 p-2 hover:text-gray-500"
        onClick={handleClick}
        ref={selectRef}
      >
        <p>{`${selectedValue}${suffix}`}</p>
        <DropdownIcon />
      </div>
      {isOpen && (
        <DropdownItemList<T>
          itemList={itemList}
          suffix={suffix}
          ref={dropdownRef}
          offsetX={dropdownX}
          offsetY={dropdownY}
          setDropdownOpen={setIsOpen}
          setSelectValue={setSelectedValue}
        />
      )}
    </>
  );
};
