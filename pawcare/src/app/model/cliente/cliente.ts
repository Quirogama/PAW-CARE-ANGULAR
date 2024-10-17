import { OperatorFunction } from "rxjs";
import { mascota } from "../mascota/mascota";

export interface cliente {
    id: number;
    nombre: string;
    correo: string;
    clave: string;
    cedula: number;
    celular: number;
    mascotas?: mascota[];
}