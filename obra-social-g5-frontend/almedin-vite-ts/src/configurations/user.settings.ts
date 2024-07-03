export const settings = {
    ROL_ADMIN: [{ nombre: 'Usuarios', href: '/usuarios' }],
    ROL_SOCIO: [
        { nombre: 'Mis turnos', href: '/turnosMedicos' },
        { nombre: 'Solicitar turno médico', href: '/solicitarTurnomedico'},
        { nombre: 'Especialistas', href: '/especialistas'},
        { nombre: 'Consultorios', href: '/econsultorios'},
    ],
    ROL_MEDICO: [
        { nombre: 'Mis turnos', href: '/turnosMedicos'},
        { nombre: 'Mis consultorios', href: '/consultorios'},
    ],
    ROL_RECEPCIONISTA: [
        { nombre: 'Socios', href: '/socios'},
        { nombre: 'Especialistas', href: '/especialistas'},
        { nombre: 'Consultorios', href: '/consultorios'},
        { nombre: 'Registrar turno médico', href: '/solicitarTurnoMedico'},
    ],
};
