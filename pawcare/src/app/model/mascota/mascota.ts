import { cliente } from "../cliente/cliente";
import { tratamiento } from "../tratamiento/tratamiento";

export interface mascota {
    id: number;
    nombre: string;
    peso: string;
    raza: string;
    enfermedad: string;
    estado: string;
    edad: number;
    imagen: string;
    cedulaCliente: number;
    tratamiento?: tratamiento;
  }
  