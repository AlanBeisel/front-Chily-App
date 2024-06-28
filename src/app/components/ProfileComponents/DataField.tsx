'use client'
import React from 'react';
import { useState } from 'react';

interface Props {
  label: string,
  value: string,
  editable: boolean,
  type?: string,
}

const DataField: React.FC<Props>= ({ label, value, editable, type= "text"}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value)
  };

  return(
    <div className="flex justify-between items-center w-full border-b border-gray-200 py-2">
      <div className="text-gray-500 font-semibold w-1/3">{label}</div>

      {editable ? (
        <input
        type={type}
        value={currentValue}
        onChange={handleChange}
        className="text-red-500 w-2/3 text-right"
        />
      ):(
        <div className="text-black w-2/3 text-right"> 
        {type === 'pasword' ? '*******' : currentValue}
        </div>
      )}
    </div>
  );
};

export default DataField;