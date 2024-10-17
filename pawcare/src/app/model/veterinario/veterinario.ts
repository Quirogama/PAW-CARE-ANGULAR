import { tratamiento } from "../tratamiento/tratamiento";

export interface veterinario {
    id: number;
    cedula: number;
    nombre: string;
    clave: string;
    especialidad: string;
    numAtenciones: number;
    imagen: string;
    tratamientos?: tratamiento[]
}