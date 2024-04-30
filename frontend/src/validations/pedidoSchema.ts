import { z } from "zod";

const cargas = ["documentación","paquete","grano","hacienda"] as const

export type Cargas = (typeof cargas)[number]

export const mappedCargas: {[key in Cargas]: string} = {
    documentación: "Documentación",
    paquete: "Paquete",
    grano: "Grano",
    hacienda: "Hacienda"
}

export const pedidoSchema = z.object({
    tipoCarga: z
        .enum(cargas, {
            errorMap: () => ({ message: "Por favor seleccione un Plan"})
        }),
    calleRetiro: z.
                string()
                .min(3, {message: "la calle de Retiro debe tener al menos 3 caracteres"})
                .max(50, {
                    message: "La calle de Retiro debe ser como máximo de 50 caracteres"
                }),
    provinciaRetiro: z.
                    string()
                    .min(3, {message: "la Provincia de Retiro debe tener al menos 3 caracteres"})
                    .max(50, {
                        message: "La Provincia de Retiro debe ser como máximo de 50 caracteres"
                    }),
    localidadRetiro: z.
                string()
                .min(3, {message: "la localidad de Retiro debe tener al menos 3 caracteres"})
                .max(50, {
                    message: "La localidad de Retiro debe ser como máximo de 50 caracteres"
                }),
    referenciaRetiro: z.
                    string()
                    .min(3, {message: "la Referencia de Retiro debe tener al menos 3 caracteres"})
                    .max(50, {
                        message: "La Referencia de Retiro debe ser como máximo de 50 caracteres"
                    })
                    .optional(),
    fechaRetiro: z
                .string().refine(fechaRetiro => new Date(fechaRetiro).toString() !== "Invalid Date", {
                    message: "Por favor ingrese una fecha de Retiro válida"
                  })
                  .refine(fechaRetiro => {
                    const fechaIngresada = new Date(fechaRetiro)
                    const fechaActual = new Date()

                    return fechaIngresada >= fechaActual

                  }, {
                    message: "La fecha de retiro no puede ser anterior a la fecha actual"
                  }),
    calleEntrega: z.
                    string()
                  .min(3, {message: "la calle de Entrega debe tener al menos 3 caracteres"})
                  .max(50, {
                      message: "La calle de Entrega debe ser como máximo de 50 caracteres"
                  }),
    provinciaEntrega: z.
                      string()
                      .min(3, {message: "la Provincia de Entrega debe tener al menos 3 caracteres"})
                      .max(50, {
                          message: "La Provincia de Entrega debe ser como máximo de 50 caracteres"
                      }),
    localidadEntrega: z.
                  string()
                  .min(3, {message: "la localidad de Entrega debe tener al menos 3 caracteres"})
                  .max(50, {
                      message: "La localidad de Entrega debe ser como máximo de 50 caracteres"
                  }),
    referenciaEntrega: z.
                      string()
                      .min(3, {message: "la Referencia de Entrega debe tener al menos 3 caracteres"})
                      .max(50, {
                          message: "La Referencia de Entrega debe ser como máximo de 50 caracteres"
                      })
                      .optional(),
    fechaEntrega: z
                .string().refine(fechaEntrega => new Date(fechaEntrega).toString() !== "Invalid Date", {
                    message: "Por favor ingresar una fecha de Entrega válida"}),
    fotos: z.
            instanceof(FileList).refine( 
                fileList => fileList.length > 0, { message: "Debes seleccionar al menos un archivo"},
            ).refine(fileList => Array.from(fileList).every(file => file.size <= 5000000), {
                message: "Cada archivo debe ser menor de 5MB."
              })
            
    
}).refine(data => data.fechaEntrega >= data.fechaRetiro, {
    message: "La fecha de Entrega tiene que ser igual o posterior a la fecha de Retiro",
    path:["fechaEntrega"]
})