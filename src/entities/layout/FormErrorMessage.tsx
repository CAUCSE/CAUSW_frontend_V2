import React from 'react';

interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1 mb-4">{message}</p>;
};

export default FormErrorMessage;