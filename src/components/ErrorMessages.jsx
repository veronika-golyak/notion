import React from 'react';

const ErrorMessages = ({ errors }) => {
  return (
    <div className="text-red-500 mt-4 text-left">
      {errors}
    </div>
  );
};

export default ErrorMessages;