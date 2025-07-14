//En este archivo se implementan las funciones de autenticación 
// y se usa localStorage para guardar los datos del usuario autenticado.

//Función importada api.js
import { api } from './api.js';

export const auth = {

    //Función Login para autenticar al usuario.
    login: async (email, password) => {
        const users = await api.get(`/users?email=${email}`);//Se realiza la petición para buscar al usuario por email.
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Datos inválidos'); //Si las crendenciales son inválidas, lanza error.
        }
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user)); //Guarda al usuario en localStorage.
    },

    //Función Register para registrar usuarios.
    register: async  (name,email, password) =>  {
        const existingUser = await api.get(`users?email=${email}`); //Consulta para saber si el email ya está registrado.
        if (existingUser.length > 0) {
            throw new Error('El usuario ya está registrado');
        }
        const newUser = {name, email, password: password}; //En caso de no estarlo, guarda al usuario 
        await api.post('/users', newUser);
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    },

    getUser: () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        } else {
            return null
        }
    }
};