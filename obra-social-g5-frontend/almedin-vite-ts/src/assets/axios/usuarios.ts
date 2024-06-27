import axios from "axios";
import { Usuario } from "../../types";

export async function login(json: Usuario){
    try {
        const response = await axios.post('http://localhost:8080/usuarios/login', json, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error al logear usuario: ', error);
    }
}