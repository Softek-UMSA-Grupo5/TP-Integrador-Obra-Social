export function formatearFecha(fecha: Date){
    let año = fecha.getFullYear();
    let mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    let dia = String(fecha.getDate()).padStart(2, '0');

    // Formatear la fecha en el formato deseado "YYYY-MM-DD"
    return `${año}-${mes}-${dia}`;
};