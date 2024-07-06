export const settings = {
    ROL_ADMIN: [{ nombre: 'Agregar funcionario', href: '/funcionarios' },
    ],
    ROL_SOCIO: [
        { nombre: 'Mis turnos', href: '/turnos' },
        { nombre: 'Solicitar turno médico', href: '/solicitarTurnomedico'},
        { nombre: 'Especialistas', href: '/listamedicos'},
    ],
    ROL_MEDICO: [
        { nombre: 'Mis turnos', href: '/turnos'}
    ],
    ROL_RECEPCIONISTA: [
        { nombre: 'Socios', href: '/turnos'},
        { nombre: 'Especialistas', href: '/turnos'},
        { nombre: 'Turnos médicos', href: '/turnos' },
        { nombre: 'Agregar Medicos', href: '/medicos' },
        {nombre: 'Agregar consultorio', href: '/consultorios'}
    ],
};
