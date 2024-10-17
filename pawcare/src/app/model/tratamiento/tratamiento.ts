import { droga } from "../droga/droga"
import { veterinario } from "../veterinario/veterinario"

export interface tratamiento {
    id: number
    descripcion: string
    fecha: string
    Droga?: droga
    Veterinario?: veterinario
}