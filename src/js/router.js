
import { auth } from  './auth.js';

import {
    showLogin,
    showRegister,
    showDashboard,
} from './views.js';

const routes = {
    '#/login': showLogin,
    '#/register': showRegister,
    '#/dashboard': showDashboard
};

export function router() {
    const path = location.hash || '#/login';
    const user = auth.getUser();

    if (path.startsWith ('#/dashboard') && !Authenticated()) {
        location.hash = '#/login';
        return;
    }

    if ((path ==='#/login' || path === '#/register') && auth.isAuthenticated()) {
        location.hash = '#/dashboard';
        return;
    }
};
