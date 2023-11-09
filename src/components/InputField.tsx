// src/components/InputField.tsx
import React from 'react';
import { FormContainer, BooleanInput } from './StyledComponents.tsx'; // Import the styled component


interface InputFieldProps {
  label: string;
  type: string;
  value: string ;
  onChange: (value: string) => void;
  error?: string | null;
}

export const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, error }) => {
  return (
    <FormContainer>
        <label>{label}</label>
        {type === 'textarea' ?
                <textarea value={value} onChange={(e) => onChange(e.target.value)}></textarea> :
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />}
        {error && <div className="error">{error}</div>}
    </FormContainer>
  );
};

interface BooleanInputFieldProps {
  label: string;
  type: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string | null;
}

export const BooleanInputField: React.FC<BooleanInputFieldProps> = ({ label, type, value, onChange, error }) => {
  return (
    <BooleanInput>
        <label>{label}</label>
        <input type={type} checked={value} onChange={(e) => onChange(e.target.checked)} />
        {error && <div className="error">{error}</div>}
    </BooleanInput>
  );
};
