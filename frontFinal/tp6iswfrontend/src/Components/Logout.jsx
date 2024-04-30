import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
      <button onClick={handleLogout} className='bg-tp-charcoal text-tp-silver rounded-xl m-auto p-3 flex flex-row justify-center items-center gap-2 border-tp-silver border-2 my-6'>
        <HiOutlineLogout className='h-6 w-6'/>
        Cerrar sesión</button>
  );
};

export default LogoutButton;
