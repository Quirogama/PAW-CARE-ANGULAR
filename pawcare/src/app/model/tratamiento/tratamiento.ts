import { droga } from "../droga/droga"
import { veterinario } from "../veterinario/veterinario"

export interface tratamiento {
    id: number
    descripcion: string
    fecha: Date
    nombredroga: string
    nombremascota: string
    idmascota: number
    cedulaVeterinario: number
    Droga?: droga
    Veterinario?: veterinario
}