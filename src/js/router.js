
import { auth } from './auth.js';

import {
    showLanding,
    showLogin,
    showRegister,
    showDashboard,
} from './views.js';

const routes = {
    '#/landing': showLanding,
    '#/login': showLogin,
    '#/register': showRegister,
    '#/dashboard': showDashboard
};

export function router() {
    const path = location.hash || '#/landing';
    const user = auth.getUser();

    if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
        location.hash = '#/login';
        return;
    }

    if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
        location.hash = '#/dashboard';
        return;
    }

   
    const view = routes[path];
    if (view) {
        view();
    } else {
        notFound();
    }
};
