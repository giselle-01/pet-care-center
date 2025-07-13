import { api } from './api.js';

export const auth = {
    login: async (email, pass) => {
        const users = await api.get (`/users?email=${email}`);
        if (users.length === 0 || users[0] .password !== pass) {
            throw new Error('Credenciales inválidas');
        }
        const user = users[0];
        localStorage.setItem('users', JSON.stringify(user));
    },

    register: async  (name,email,pass) =>  {
        const existingUser = await api.get(`/users?email=${email}`);
        if (existingUser.length > 0) {
            throw new Error('El email ya está registrado');
        }
        const newUser = {name, email, password: pass};
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
        return user ? JSON.parse(user): null;
    }
};