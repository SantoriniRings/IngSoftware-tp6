import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { mappedCargas, pedidoSchema,  } from "../../validations/pedidoSchema"
import Select from "react-select"
import axios from "axios"
import  Swal  from "sweetalert2"


type Inputs = {
  tipoCarga: string,
  calleRetiro: string,
  provinciaRetiro: string;
  localidadRetiro: string;
  referenciaRetiro: string,
  fechaRetiro: string,
  calleEntrega: string,
  provinciaEntrega: string,
  localidadEntrega: string,
  referenciaEntrega: string,
  fechaEntrega: string,
  fotos: string,
}


const Formulario = () => {

  const { register, handleSubmit, control, watch, formState: {errors},} = useForm<Inputs>({
    resolver: zodResolver(pedidoSchema)
  })

  const cargasOptions = Object.entries(mappedCargas).map(([key, value]) => ({
    value: key,
    labeL: value
  }))

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);  // Solo para desarrollo, muestra los datos enviados en la consola
    Swal.fire({
        title: 'Éxito',
        text: 'Pedido creado con éxito',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
};

  const valoresForm = watch()

  return (
    <section className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} >

            <h1>Crear Pedido</h1>

            <label htmlFor="tipoCarga">Tipo de Carga</label>
            <Controller name="tipoCarga" control={control} render={({field}) => (
              <Select name="tipoCarga" options={cargasOptions} getOptionLabel={(options) => options.labeL} getOptionValue={(options) => options.value} isClearable={true} isSearchable={true} onChange={selectedOption => {field.onChange(selectedOption ? selectedOption.value : selectedOption)}}/>
            )}>

            </Controller>
            
            {errors.tipoCarga?.message && <p className="error">{errors.tipoCarga?.message}</p> }

                          {/* Retiro */}
            <h2>Datos de Retiro</h2>

            <label htmlFor="calleRetiro"> Calle de Retiro</label>
            <input type="text" id="calleRetiro" {...register("calleRetiro")} />
            {errors.calleRetiro?.message && <p className="error">{errors.calleRetiro?.message}</p> }

            <label htmlFor="provinciaRetiro">Provincia de Retiro</label>
            <input type="text" id="provinciaRetiro" {...register("provinciaRetiro")}/>
            {errors.provinciaRetiro?.message && <p className="error">{errors.provinciaRetiro?.message}</p> }

            <label htmlFor="localidadRetiro">Localidad de Retiro</label>
            <input type="text" id="localidadRetiro" {...register("localidadRetiro")}/>
            {errors.localidadRetiro?.message && <p className="error">{errors.localidadRetiro?.message}</p> }

            <label htmlFor="referenciaRetiro">Referencia del retiro(Opcional)</label>
            <input type="text"  id="referenciaRetiro" {...register("referenciaRetiro")}/>
            {errors.referenciaRetiro?.message && <p className="error">{errors.referenciaRetiro?.message}</p> }

            <label htmlFor="fechaRetiro">Fecha de Retiro</label>
            <input type="date" id="fechaRetiro" {...register("fechaRetiro")} />
            {errors.fechaRetiro?.message && <p className="error">{errors.fechaRetiro?.message}</p> }


                            {/* Entrega */}
            <h2>Datos de Entrega</h2>

            <label htmlFor="calleEntrega"> Calle de Entrega</label>
            <input type="text" id="calleEntrega" {...register("calleEntrega")} />
            {errors.calleEntrega?.message && <p className="error">{errors.calleEntrega?.message}</p> }

            <label htmlFor="provinciaEntrega">Provincia de Entrega</label>
            <input type="text" id="provinciaEntrega" {...register("provinciaEntrega")} />
            {errors.provinciaEntrega?.message && <p className="error">{errors.provinciaEntrega?.message}</p> }

            <label htmlFor="localidadEntrega">Localidad de Entrega</label>
            <input type="text" id="localidadEntrega" {...register("localidadEntrega")} />
            {errors.localidadEntrega?.message && <p className="error">{errors.localidadEntrega?.message}</p> }

            <label htmlFor="referenciaEntrega">Referencia del Entrega(Opcional)</label>
            <input type="text" id="referenciaEntrega" {...register("referenciaEntrega")} />
            {errors.referenciaEntrega?.message && <p className="error">{errors.referenciaEntrega?.message}</p> }

            <label htmlFor="fechaEntrega">Fecha de Entrega</label>
            <input type="date" id="fechaEntrega" {...register("fechaEntrega")} />
            {errors.fechaEntrega?.message && <p className="error">{errors.fechaEntrega?.message}</p> }


                            {/* Foto */}
            <label htmlFor="fotos">Fotos</label>
            <input type="file" id="fotos" multiple {...register("fotos")} style={{ display: "none"}} />
            <label htmlFor="fotos" className="upload-button" >Cargar archivo</label>
            {errors.fotos?.message && <p className="error">{errors.fotos?.message}</p> }

            <button type="submit">Enviar</button>
        </form>

        <h1>Visualizador de lo que se envía (Solo para desarrollo)</h1>
        <div className="visualizer">{JSON.stringify(valoresForm, null, 2)}</div>
    </section>
  )
}

export default Formulario