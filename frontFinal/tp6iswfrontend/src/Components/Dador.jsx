import React, { useState } from 'react';
import axios from 'axios';
import LogoutButton from './Logout'; 
import { uploadFile } from '../firebase/config';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FaCloudUploadAlt, FaTruckLoading } from "react-icons/fa";
import DialogActions from '@mui/material/DialogActions';
import { formatISO } from 'date-fns';
import { TfiBackLeft } from "react-icons/tfi";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const InputField = ({ label, name, type, min, value, onChange, error }) => (
  <label className='flex flex-col gap-1'>
    {label}:
    <input className='text-tp-oxfordblue' type={type} name={name} value={value} onChange={onChange} min={min} />
    {error && <span className="text-red-500 font-semibold text-center">{error}</span>}
  </label>
);

const SelectField = ({ label, name, options, value, onChange, error }) => (
  <label className='flex justify-center flex-col text-center gap-1'>
    {label}: <br />
    <select className='text-tp-oxfordblue' name={name} value={value} onChange={onChange}>
      <option value="">Seleccione una opción</option>
      {options.map(option => (
        <option key={option.id} value={option.nombre}>{option.nombre}</option>
      ))}
    </select>
    {error && <span className="text-red-500">{error}</span>}
  </label>
);

const Dador = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [previewImage2, setPreviewImage2] = useState(null);
  const [file2, setFile2] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [formData, setFormData] = useState({
    tipo_carga: '',
    localidadRetiro: '',
    provinciaRetiro: '',
    calleRetiro: '',
    numRetiro: '',
    referenciaRetiro: '',
    fechaRetiro: '',
    localidadEntrega: '',
    provinciaEntrega: '',
    calleEntrega: '',
    numEntrega: '',
    referenciaEntrega: '',
    fechaEntrega: '',
    imagen: '',
    imagen2: '',
    id_usuario: localStorage.getItem('userId')
  });

  const [tiposCarga] = useState([
    { id: 1, nombre: 'Documentacion' },
    { id: 2, nombre: 'Paquete' },
    { id: 3, nombre: 'Granos' },
    { id: 4, nombre: 'Hacienda' }
  ]);

  const [errors, setErrors] = useState({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFile(null);
    setPreviewImage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        setFileError('Error en el formato de la imagen solo con (jpg/jpeg o png)');
      } else if (file.size > 5 * 1024 * 1024) { // Verificar el tamaño en bytes (5 MB)
        setFileError('El tamaño de la imagen no puede ser mayor a 5 MB');
      } else {
        setFile(file);
        setPreviewImage(URL.createObjectURL(file));
        setFileError('');
      }
    }
  };
  
  const handleImageUpload = async () => {
    try {
      if (file) {
        const imageUrl = await uploadFile(file);
        setFormData({ ...formData, imagen: imageUrl });
        console.log(imageUrl);
      } else {
        setFileError('Debe ingresar la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
  
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        setFileError('Error en el formato de la imagen solo con (jpg/jpeg o png)');
      } else if (file.size > 5 * 1024 * 1024) { // Verificar el tamaño en bytes (5 MB)
        setFileError('El tamaño de la imagen no puede ser mayor a 5 MB');
      } else {
        setFile2(file);
        setPreviewImage2(URL.createObjectURL(file));
        setFileError('');
      }
    }
  };
  
  const handleImageUpload2 = async () => {
    try {
      if (file2) {
        const imageUrl = await uploadFile(file2);
        setFormData({ ...formData, imagen2: imageUrl });
        console.log(imageUrl);
      } else {
        setFileError('Debe ingresar la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen 2:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['tipo_carga', 'localidadRetiro', 'provinciaRetiro', 'calleRetiro', 'numRetiro', 'fechaRetiro', 'localidadEntrega', 'provinciaEntrega', 'calleEntrega', 'numEntrega', 'fechaEntrega'];
    const newErrors = {};
  
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });
  
    var fechaRetiro = formData.fechaRetiro;
    var fechaEntrega = formData.fechaEntrega;
    var fechaActual = formatISO(new Date(), { representation: 'date' });
    
    if (!fechaRetiro) {
      newErrors.fechaRetiro = 'Fecha vacía';
    } else if (fechaRetiro < fechaActual) {
      newErrors.fechaRetiro = 'La fecha de retiro debe ser igual o posterior a la fecha actual';
    }

    if (!fechaEntrega) {
      newErrors.fechaEntrega = 'Fecha vacía';
    } else if (fechaEntrega < fechaRetiro ) {
      newErrors.fechaEntrega = 'La fecha de entrega debe ser igual o posterior a la fecha de retiro';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await axios.post('http://localhost:3001/tp/pedido', formData);
      setOpen(true);
      setFormData({
        tipo_carga: '',
        localidadRetiro: '',
        provinciaRetiro: '',
        calleRetiro: '',
        numRetiro: '',
        referenciaRetiro: '',
        fechaRetiro: '',
        localidadEntrega: '',
        provinciaEntrega: '',
        calleEntrega: '',
        numEntrega: '',
        referenciaEntrega: '',
        fechaEntrega: '',
        imagen: '',
        imagen2: '',
        id_usuario: localStorage.getItem('userId')
      });
      setErrors({});

    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      alert('Error al enviar el pedido');
    }
  };

  const today = formatISO(new Date(), { representation: 'date' });
  
  return (
    <div className='w-full bg-tp-charcoal text-tp-silver flex justify-center flex-col gap-4'>
        <h2 className='flex justify-center py-4 uppercase font-bold bg-tp-oxfordblue xs:mx-6 md:mx-96 rounded-xl mt-4'>Formulario de Pedido</h2>
        <div className='pb-10 md:mx-96'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-3 bg-tp-oxfordblue py-2 mx-6 rounded-xl px-10'>
            <SelectField label="Tipo de Carga" name="tipo_carga" value={formData.tipo_carga} options={tiposCarga} onChange={handleChange} error={errors.tipo_carga} />
            <div className='grid xs:grid-cols-1 md:grid-cols-2 gap-6 xs:divide-y md:divide-y-0 divide-solid '>
                <div className='flex flex-col gap-4'>
                    <InputField label="Localidad de Retiro" name="localidadRetiro" type="text" value={formData.localidadRetiro} onChange={handleChange} error={errors.localidadRetiro} />
                    <InputField label="Provincia de Retiro" name="provinciaRetiro" type="text" value={formData.provinciaRetiro} onChange={handleChange} error={errors.provinciaRetiro} />
                    <InputField label="Calle de Retiro" name="calleRetiro" type="text" value={formData.calleRetiro} onChange={handleChange} error={errors.calleRetiro} />
                    <InputField label="Número de Retiro" name="numRetiro" type="number" min="0" value={formData.numRetiro} onChange={handleChange} error={errors.numRetiro} />
                    <InputField label="Referencia de Retiro" name="referenciaRetiro" type="text" value={formData.referenciaRetiro} onChange={handleChange} error={errors.referenciaRetiro} />
                    <InputField label="Fecha de Retiro" name="fechaRetiro" type="date" value={formData.fechaRetiro} onChange={handleChange} error={errors.fechaRetiro} min={today}/>
                </div>
                <div className='flex flex-col gap-4'>
                    <InputField label="Localidad de Entrega" name="localidadEntrega" type="text" value={formData.localidadEntrega} onChange={handleChange} error={errors.localidadEntrega} />
                    <InputField label="Provincia de Entrega" name="provinciaEntrega" type="text" value={formData.provinciaEntrega} onChange={handleChange} error={errors.provinciaEntrega} />
                    <InputField label="Calle de Entrega" name="calleEntrega" type="text" value={formData.calleEntrega} onChange={handleChange} error={errors.calleEntrega} />
                    <InputField label="Número de Entrega" name="numEntrega" type="number" min="0" value={formData.numEntrega} onChange={handleChange} error={errors.numEntrega} />
                    <InputField label="Referencia de Entrega" name="referenciaEntrega" type="text" value={formData.referenciaEntrega} onChange={handleChange} error={errors.referenciaEntrega} />
                    <InputField label="Fecha de Entrega" name="fechaEntrega" type="date" value={formData.fechaEntrega} onChange={handleChange} error={errors.fechaEntrega} min={today}/>
                </div>
            </div>
            <div className='flex flex-col pt-2'>
              <span className='flex flex-row justify-center items-center gap-2 bg-tp-calgreen text-tp-silver border-2 border-tp-silver p-2 rounded-xl hover:cursor-pointer' onClick={() => openModal()}>
                <FaCloudUploadAlt className='h-6 w-6'/>
                Cargar Imágenes
              </span>
              <Dialog open={modalOpen} onClose={() => closeModal()}>
                <DialogTitle className='bg-tp-oxfordblue text-tp-silver'>Seleccion de imagenes *</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'col', justifyContent: 'center' }}>
                  <label className='flex justify-center flex-col items-center gap-4 mt-4'>
                    <input type='file' name='imagen' onChange={handleFileChange} />
                    {previewImage && <img src={previewImage} alt='Preview' style={{ maxWidth: '200px' }} />}
                    <button type='button' onClick={handleImageUpload} className='bg-tp-oxfordblue text-tp-silver rounded-xl p-2'>
                      Subir Imagen
                    </button>
                    <input type='file' name='imagen2' onChange={handleFileChange2} />
                    {previewImage2 && <img src={previewImage2} alt='Preview' style={{ maxWidth: '200px' }} />}
                    <button type='button' onClick={handleImageUpload2} className='bg-tp-oxfordblue text-tp-silver rounded-xl p-2'>
                      Subir Imagen 2
                    </button>
                    {fileError && <p className='text-red-600 font-semibold text-center'>{fileError}</p>}
                  </label>
                </DialogContent>
                <DialogActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <button onClick={() => closeModal()} className='bg-tp-oxfordblue text-tp-silver rounded-lg p-2'>
                    <TfiBackLeft className='w-6 h-6'/>
                  </button>
                </DialogActions>
              </Dialog>
            </div>
            <button type="submit" className='bg-tp-charcoal text-tp-silver rounded-xl m-auto mt-4 p-3 flex flex-row justify-center items-center gap-2 border-2'>
              <FaTruckLoading className='h-6 w-6'/>
              Enviar Pedido
            </button>
            <LogoutButton/>
          </form>
        </div>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" severity="success" sx={{backgroundColor:"#214E34", color:"#CDCDCD"}}>
            ¡Pedido enviado correctamente!
          </Alert>        
        </Snackbar>
    </div>
  );
};

export default Dador;
