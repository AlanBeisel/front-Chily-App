'use client';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

interface Props {
  label: string;
  value: string;
  editable: boolean;
  type?: string;
  onEdit?: () => void;
}

const DataField: React.FC<Props> = ({
  label,
  value,
  editable,
  type = 'text',
  onEdit,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [, setOriginalValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalValue(currentValue);
    if (onEdit) {
      onEdit();
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };


  return (
    <div className="flex justify-between items-center w-full border-b border-gray-200 py-2">
      <div className="text-gray-500 font-semibold w-1/3">{label}</div>

      {isEditing ? (
        <div className="w-2/3 flex justify-end items-center">
          <input
            type={type}
            value={currentValue}
            onChange={handleChange}
            className="text-red-500 w-full text-right border-b border-gray-200"
          />
        </div>
      ) : (
        <div className="text-black w-2/3 text-right">
          {type === 'pasword' ? '*******' : currentValue}
          {editable && (
            <button
              onClick={handleEditClick}
              className="ml-2 text-red-500 underline hover:text-red-700 focus:outline-none"
            >
              <FaRegEdit />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DataField;
