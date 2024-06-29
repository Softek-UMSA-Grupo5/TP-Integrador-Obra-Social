interface HorarioAtencion {
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  codigo: string;
}

interface Ubicacion {
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
  codigo: string;
}

interface Medico {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string;
  cuil: string;
  especialidad: string;
}

interface OfficeData {
  horarioAtencion: HorarioAtencion[];
  ubicacion: Ubicacion;
  medico: Medico;
  codigo: string;
}

export default OfficeData;