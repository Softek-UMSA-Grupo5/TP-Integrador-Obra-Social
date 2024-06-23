interface Consultorio {
  id: number;
  horarioAtencion: Horario[];
  ubicacion: Ubicacion;
  estaEliminado: boolean;
  codigo: string;
  medico: Medico;
}

interface Horario {
  id: number;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  consultorio: Consultorio; // Relación bidireccional
}

interface Ubicacion {
  id: number;
  ciudad: string;
  provincia: string;
  calle: string;
  altura: number;
  consultorios: Consultorio[]; // Relación bidireccional
}

interface Medico {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: number;
  fechaNacimiento: string; // Considerar utilizar Date en lugar de string si se necesita manipular fechas
  cuil: string;
  especialidad: string;
  consultorios: Consultorio[]; // Relación bidireccional
}
