// src/components/InputField.tsx
import React from 'react';
import { InputContainer, BooleanInput, LabelWithMandatory } from './StyledComponents.tsx'; // Import the styled component
interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  mandatory?:boolean;
  onChange: (value: string) => void;
  error?: string | null;
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, error, mandatory }) => {
  return (
    <InputContainer>
      <LabelWithMandatory>
      {mandatory? <p>*</p> : <></>}
      <label>{label}</label>
      </LabelWithMandatory>
      {type === 'textarea' ?
                <textarea value={value} onChange={(e) => onChange(e.target.value)}></textarea> :
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />}
      {error && <div className="error">{error}</div>}
    </InputContainer>
  );
};

interface BooleanInputFieldProps {
  label: string;
  type: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string | null;
  mandatory?:boolean;
}

export const BooleanInputField: React.FC<BooleanInputFieldProps> = ({ label, type, value, onChange, error, mandatory }) => {
  return (
    <BooleanInput>
      <LabelWithMandatory>
        {mandatory? <p>*</p> : <></>}
        <input type={type} checked={value} onChange={(e) => onChange(e.target.checked)} />
        <label>{label}</label>
        {error && <div className="error">{error}</div>}
      </LabelWithMandatory>
    </BooleanInput>
  );
};
