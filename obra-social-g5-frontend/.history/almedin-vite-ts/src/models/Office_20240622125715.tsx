// models/Office.ts

interface OfficeData {
  horarioAtencion: {
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
    codigo: string;
  }[];
  ubicacion: {
    ciudad: string;
    provincia: string;
    calle: string;
    altura: number;
    codigo: string;
  };
  medico: {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: number;
    fechaNacimiento: string;
    cuil: string;
    especialidad: string;
  };
  codigo: string;
}

export default OfficeData;
