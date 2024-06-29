import React, { useState } from 'react';
import { UsuarioRequestDto, UsuarioRolesEnum } from '../../types/Usuario';
import { registrarUsuario } from '../../axios/UsuarioApi';

const UsuarioForm: React.FC = () => {
    const [usuarioData, setUsuarioData] = useState<UsuarioRequestDto>({
        username: '',
        password: '',
        email: ''
    });
    const [selectedRol, setSelectedRol] = useState<UsuarioRolesEnum>(UsuarioRolesEnum.ROL_SOCIO);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsuarioData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await registrarUsuario(usuarioData, selectedRol);
            setSuccess(true);
            // Lógica adicional después del registro exitoso
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={usuarioData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={usuarioData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={usuarioData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="rol">Rol:</label>
                <select id="rol" name="rol" value={selectedRol} onChange={(e) => setSelectedRol(e.target.value as UsuarioRolesEnum)}>
                    <option value={UsuarioRolesEnum.ROL_SOCIO}>Socio</option>
                    <option value={UsuarioRolesEnum.ROL_ADMIN}>Admin</option>
                    <option value={UsuarioRolesEnum.ROL_RECEPCIONISTA}>Recepcionista</option>
                    <option value={UsuarioRolesEnum.ROL_MEDICO}>Médico</option>
                </select>
            </div>
            <button type="submit">Registrar Usuario</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Usuario registrado con éxito</p>}
        </form>
    );
};

export default UsuarioForm;
