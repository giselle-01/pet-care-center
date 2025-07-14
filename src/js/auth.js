import { api } from './api.js';

export const auth = {
    login: async (email, password) => {
        const users = await api.get (`users?email=${email}`);
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Datos inválidos');
        }
        const user = users[0];
        localStorage.setItem('users', JSON.stringify(user));
    },

    register: async  (name,email, password) =>  {
        const existingUser = await api.get(`users?email=${email}`);
        if (existingUser.length > 0) {
            throw new Error('El usuario ya está registrado');
        }
        const newUser = {name, email, password: password};
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