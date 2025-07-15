//En este archivo están las vistas que se implementarán en el HTML.

//Se importan las funciones de autenticación y del rotulador.
import { auth } from './auth.js';
import { router } from './router.js';

//Función de  la página Not Found (404).
export function notFound() {
    document.getElementById('main').innerHTML = `
    <div class="container">
    <h1>404</h1>
    <p>Página no encontrada</p>
    <a href="/">Volver al inicio</a>
    </div>`;
};

//Función de la página del Login.
export async function loginPage() {
    document.getElementById('main').innerHTML = `
    <section id="login" class="hidden">
        <div class="login-container">
            <h2>Iniciar sesión</h2>

            <form id="lgForm">
                <input type="email" id="lgEmail" placeholder="Email" autocomplete="email" required />
                <input type="password" id="lgPassword" placeholder="Contraseña" autocomplete="current-password"
                    required />
                <button type="submit">Entrar</button>
            </form>

            <p class="login-switch">
                ¿No tienes cuenta?
                <a href="#" id="login-go-register">Regístrate aquí</a>
            </p>
        </div>
    </section>`;

    //Se le da funcionalidad a los botones para que se autentique el ingreso con los datos del usuario y una vez dentro, se redirige al dashboard.
    document.getElementById('lgForm').onsubmit = async e => {
        e.preventDefault();
        try {
            await auth.login(e.target.lgEmail.value, e.target.lgPassword.value);
            location.hash = '#/dashboard';
            router();
        } catch (err) {
            alert(err.mesage);            
        };
    };

    //Botón para redirigir al usuario a la página de registro, en caso de que no se haya registrado.
    document.getElementById('login-go-register').onclick = async e => {
        e.preventDefault();
        location.hash = '#/register';
        router();
    }
};

//Función de la página de Registro.
export async function registerPage() {
    document.getElementById('main').innerHTML = `
    <section id="register" class="hidden">
        <div class="register-container">
            <h2>Crear cuenta</h2>

            <form id="register-form">
                <input type="text" id="register-name" placeholder="Nombre completo" required />
                <input type="email" id="register-email" placeholder="Correo electrónico" required />
                <input type="password" id="confirm-password" placeholder="Confirmar contraseña" required />
                <input type="password" id="register-password" placeholder="Contraseña" required />
                <button type="submit" id="btnr">Registrarse</button>
            </form>

            <p class="register-switch">
                ¿Ya tienes cuenta?
                <a href="#" id="register-go-login">Inicia sesión</a>
            </p>
        </div>
    </section>`;

    //Funcionalidad de los botones para guardar los datos del usuario que se registra, y una vez hecho lo redirige al dashboard.
    document.getElementById('register-form').onsubmit = async e => {
        e.preventDefault();
        alert('Su registro ha sido exitoso')
        try {
            await auth.resgister(e.target.name.value, e.target.user.value, e.target.email.value, e.target.phone.value, e.target.password.value);
            location.hash = '#/dashboard';
            router();
        } catch (err) {
            alert(err.message);
        }
    };

};

//Función de la página del Dashboard (o panel).
export async function dashboardPage() {
    const user = auth.getUser();
    document.getElementById('main').innerHTML = `
    <section id="dashboard">
        <div class="dashboard-header">
            <h2>Eventos</h2>
            <div>
                <button id="add-event-btn">Agregar Evento</button>
                <button id="logout-btn">Cerrar sesión</button>
            </div>
        </div>

        <div id="event-form-modal" class="modal hidden">
            <div class="modal-content">
                <h3>Agregar Nuevo Evento</h3>
                <form id="event-form">
                    <input type="text" id="title" placeholder="nombre" required />
                    <input type="text" id="description" placeholder="descripción" required />
                    <input type="number" id="date" placeholder="fecha" required min="0" />
                    <input type="number" id="capacity" placeholder="capacidad" />

                    <div class="form-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" id="cancel-events-form">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="events-container" id="events-container">
            <div class="events-card">
                <h3>Karthi</h3>
                <p><strong>Descripción:</strong>Galería de arte, escultura y pinturas</p>
                <p><strong>Capacidad:<strong/>12</p>
                <p><strong>Fecha:</strong>19-Abril, 2025</p>

                <div class="card-buttons">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            </div>
        </div>
    </section>`;

    //Funcionalidad de los botones para cuando quiera agregar, eliminar, cancelar eventos y cerrar sesión.
    document.getElementById('add-events-btn').onclick = async e => {
        e.preventDefault();
        document.getElementById("events-form-modal").classList.remove("hidden");
    };

    document.getElementById('cancel-events-form').onclick = async e => {
        e.preventDefault();
        document.getElementById("events-form-modal").classList.add("hidden");
    }

    document.querySelector('delete-btn').onclick = async e => {
        e.preventDefault();

        document.getElementById("event-form-model").classList.add("hidden");
    }

    document.getElementById('logout-btn').onclick = async e => {
        e.preventDefault();
        auth.logout();
        location.hash = '#/landing';
        router();
    };
};



