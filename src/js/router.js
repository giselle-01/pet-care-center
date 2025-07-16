//En esta página se encuentran las funcionalidades de los routers, lo que permite el dinanismo entre páginas.

//Importación de las autenticaciones.
import { auth } from './auth.js';

//Importaciones de las vistas (páginas).
import {
    notFound,    loginPage,
    registerPage,
    dashboardPage,
} from './views.js';

//Colección que contiene las redirecciones entre páginas.
const routes = {
    '#/notFound': notFound,
    '#/login': loginPage,
    '#/register': registerPage,
    '#/dashboard': dashboardPage
};

//Función de Router, que le da funcionalidad a las redirecciones.
export function router() {
    const path = location.hash || '#/login';
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
