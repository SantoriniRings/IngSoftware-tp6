import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './Logout'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Transportista = () => {
  const [pedidos, setPedidos] = useState([]);
  const [tamañoAnterior, setTamañoAnterior] = useState(0);
  const [primeraCarga, setPrimeraCarga] = useState(true);
  const id_usuario = localStorage.getItem('userId');
  const localidadRet = localStorage.getItem('localidadRetiro');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tp/pedidos_transportista?id=${id_usuario}`, {
          params: {
            id_usuario: id_usuario
          }
        });
        const nuevosPedidos = response.data;
        if (!primeraCarga) {
          if (nuevosPedidos.length > tamañoAnterior) {
            setOpen(true);
            setTamañoAnterior(nuevosPedidos.length);
          }
        } else {
          setTamañoAnterior(nuevosPedidos.length);
          setPrimeraCarga(false);
        }

        setPedidos(nuevosPedidos);
        console.log("Consulta realizada")
        console.log("anterior", tamañoAnterior)
        console.log("actual", nuevosPedidos.length)

      } catch (error) {
        console.error('Error al obtener los pedidos del transportista:', error);
      }
    };

    fetchPedidos();

    //cambiar despues el tiempo para que parezca mas real xd 
    const intervalId = setInterval(fetchPedidos, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id_usuario, tamañoAnterior, primeraCarga]); 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className='w-full h-screen bg-tp-charcoal'>
        <h1 className='font-bold text-center text-tp-silver bg-tp-charcoal py-6'>Transportista visualización</h1>
        <div className='text-tp-honeydew flex justify-center items-start flex-col'>
          <h1 className='font-semibold mb-4 text-tp-silver'>Tu localidad de retiro es: {localidadRet}</h1>
          <div className='w-full overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='bg-tp-oxfordblue text-tp-silver'>
                  <th className='px-6 py-3 text-left'>ID</th>
                  <th className='px-6 py-3 text-left'>Tipo de carga</th>
                  <th className='px-6 py-3 text-left'>Localidad de retiro</th>
                  <th className='px-6 py-3 text-left'>Provincia de retiro</th>
                  <th className='px-6 py-3 text-left'>Calle de retiro</th>
                  <th className='px-6 py-3 text-left'>Número de retiro</th>
                  <th className='px-6 py-3 text-left'>Referencia de retiro</th>
                  <th className='px-6 py-3 text-left'>Fecha de retiro</th>
                  <th className='px-6 py-3 text-left'>Localidad de entrega</th>
                  <th className='px-6 py-3 text-left'>Provincia de entrega</th>
                  <th className='px-6 py-3 text-left'>Calle de entrega</th>
                  <th className='px-6 py-3 text-left'>Número de entrega</th>
                  <th className='px-6 py-3 text-left'>Referencia de entrega</th>
                  <th className='px-6 py-3 text-left'>Fecha de entrega</th>
                  <th className='px-6 py-3 text-left'>Imagenes</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 text-reno-900'>
                {pedidos.map(pedido => (
                  <tr key={pedido.idpedidos}>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.idpedidos}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.tipo_carga}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.localidadRetiro}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.provinciaRetiro}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.calleRetiro}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.numRetiro}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.referenciaRetiro}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.fechaRetiro}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.localidadEntrega}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.provinciaEntrega}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.calleEntrega}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.numEntrega}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.referenciaEntrega}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{pedido.fechaEntrega}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <img src={pedido.imagen} alt="Imagen del pedido" className='h-10 w-10 object-cover' />
                      <img src={pedido.imagen2} alt="Imagen del pedido" className='h-10 w-10 object-cover' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> 
        <div className='flex justify-center'>
          <LogoutButton />       
        </div>
        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" severity="info" sx={{backgroundColor:"#011638", color:"#CDCDCD"}}>
            ¡Nuevo pedido en tu zona de cobertura!
          </Alert>        
        </Snackbar>

      </div>
    </>
  )
}

export default Transportista;
