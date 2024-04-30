import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/tp/usuarios');
      const data = await response.json();

      const usuario = data.find(user => user.username === username && user.contraseña === password);

      if (usuario) {
        localStorage.setItem('userId', usuario.id);
        localStorage.setItem('localidadRetiro', usuario.localidadRetiro);
        
        if (usuario.rol === 'Transportista') {
          navigate('/transportista');
        } else if (usuario.rol === 'Dador') {
          navigate('/usuarios');
        } else {
          console.log('Rol no reconocido');
        }
      } else {
        console.log('Usuario o contraseña incorrectos');
        setError('Usuario/contraseña incorrectos')
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  return (
    <div className='bg-tp-charcoal'>
        <div className='flex justify-center items-center w-auto h-screen'>
            <div className='bg-tp-oxfordblue flex-col flex p-10 gap-4 rounded-md'>
                <h1 className='font-bold text-center uppercase text-tp-honeydew text-xl'>Inicio de sesion</h1>
                {error && <p className='text-red-600 font-semibold text-center'>{error}</p>}
                <div className='flex flex-col'>
                    <label className='font-bold text-tp-honeydew'>Nombre de usuario</label>
                    <input type="text" className='border-2 border-tp-charcoal p-1' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold text-tp-honeydew'>Contraseña</label>
                    <input type="password" className='border-2 border-tp-charcoal p-1' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-reno-900 p-2 border-2 border-tp-silver rounded-xl mt-4 text-white' onClick={handleLogin}>Iniciar sesión</button>
            </div>
        </div>
    </div>
  );
};

export default Inicio;
