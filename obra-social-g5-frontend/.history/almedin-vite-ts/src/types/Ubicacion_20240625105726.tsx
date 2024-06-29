export interface Ubicacion {
  id?: number;
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
}
export interface UbicacionResponseDto {
  id: number;
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
  estaEliminado: boolean;
  codigo: string;
}
