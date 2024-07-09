'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';

interface Props {
  label: string,
  value: string,
  editable: boolean,
  type?: string,
  onChange?: (value:string) => void;
}

const DataField: React.FC<Props>= ({ label, value, editable, type= "text", onChange}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(type === 'tel') {
      const phoneRegex = /^[0-9]*$/;
      if(!phoneRegex.test(event.target.value)){
        return;
      }
    }
    setCurrentValue(event.target.value);
    onChange?.(event.target.value);
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