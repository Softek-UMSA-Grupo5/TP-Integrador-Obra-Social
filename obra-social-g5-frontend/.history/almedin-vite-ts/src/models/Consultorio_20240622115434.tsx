export interface Horario {
  id: number;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface Ubicacion {
  id: number;
  direccion: string;
  ciudad: string;
  estaEliminado: boolean;
  // Añadir otros campos relevantes según tu modelo de datos
}

export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
  // Añadir otros campos relevantes según tu modelo de datos
}

export interface Consultorio {
  id: number;
  horarioAtencion: Horario[];
  ubicacion: Ubicacion;
  estaEliminado: boolean;
  codigo: string;
  medico: Medico;
}
