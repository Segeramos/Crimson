import React from 'react';

const Toast = ({ message, type }) => {
  const color = type === 'success' ? 'bg-red-500' : 'bg-red-500';

  return (
     <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-white rounded shadow-lg ${color} z-50`}>
      {message}
    </div>
  );
};

export default Toast;
