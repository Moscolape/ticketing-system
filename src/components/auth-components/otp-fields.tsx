import React, { useState, useRef } from 'react';

// Define props for the CustomOtpInput component
type CustomOtpInputProps = {
  numInputs: number;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const CustomOtpInput: React.FC<CustomOtpInputProps> = ({ numInputs, otp, setOtp }) => {
  const [showValues, setShowValues] = useState<boolean[]>(Array(numInputs).fill(false));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setShowValues((prev) => {
      const newShowValues = [...prev];
      newShowValues[index] = true;
      return newShowValues;
    });

    if (value && index < numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const toggleShowValue = (index: number) => {
    setShowValues((prev) => {
      const newShowValues = [...prev];
      newShowValues[index] = false;
      return newShowValues;
    });
  };

  return (
    <div className="flex justify-between">
      {Array.from({ length: numInputs }, (_, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref!)}
          type={showValues[index] ? 'text' : 'password'}
          maxLength={1}
          value={otp[index]}
          onInput={() => toggleShowValue(index)}
          onChange={(e) => {
            handleChange(index, e.target.value);
            setTimeout(() => toggleShowValue(index), 300);
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="otp-input"
          style={{
            width: '55px',
            height: '55px',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            textAlign: 'center',
            fontFamily: 'Urbanist',
            fontSize: '20px',
            outline: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default CustomOtpInput;