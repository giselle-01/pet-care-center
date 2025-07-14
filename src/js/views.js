

import { auth } from './auth.js';
import { router } from './router.js';


export function notFound() {
    document.getElementById('main').innerHTML = `
    <div class="container">
    <h1>404</h1>
    <p>Página no encontrada</p>
    <a href="/">Volver al inicio</a>
    </div>`;
};

export async function showLanding() {
    document.getElementById('main').innerHTML = `
    <section id="landing">
    <header class="landing-header">
      <h1>🐾 PetCare Center</h1>
      <nav>
        <button id="goToLogin">Iniciar sesión</button>
        <button id="goToRegister">Registrarse</button>
      </nav>
    </header>

    <main class="landing-main">
      <section class="landing-text">
        <h2>Tu mascota merece vacaciones también</h2>
        <p>En <strong>PetCare Center</strong> cuidamos de tu peludo amigo como si fuera nuestro. Mientras tú te relajas,
          nosotros nos encargamos de su felicidad, comodidad y bienestar.</p>
        <div class="landing-cta">
          <button id="cta-login">Ya tengo cuenta</button>
          <button id="cta-register">Quiero registrarme</button>
        </div>
      </section>

      <div class="landing-image">
        <img src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg" alt="Perro feliz en cuidado" />
      </div>
    </main>

    <footer class="landing-footer">
      <p>&copy; 2025 PetCare Center. Todos los derechos reservados.</p>
    </footer>
  </section>`;

    document.getElementById('goToLogin').onclick = async e => {
        e.preventDefault();
        location.hash = '#/login';
        router();
    };

    document.getElementById('goToRegister').onclick = async e => {
        e.preventDefault();
        location.hash = '#/register';
        router();
    };

    document.getElementById('cta-login').onclick = async e => {
        e.preventDefault();
        location.hash = '#/login';
        router();
    };

    document.getElementById('cta-register').onclick = async e => {
        e.preventDefault();
        location.hash = '#/register';
        router();
    };
};


export async function showLogin() {
    document.getElementById('main').innerHTML = `
    <section id="login" class="hidden">
        <div class="login-container">
            <h2>Iniciar sesión</h2>

            <form id="lgForm">
                <input type="text" id="lgUsername" placeholder="Usuario" autocomplete="username" required />
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

    document.getElementById('lgForm').onsubmit = async e => {
        e.preventDefault();
        try {
            await auth.login(e.target.lgUsername.value, e.target.lgPassword.value);
            location.hash = '#/dashboard';
            router();
        } catch (err) {
            alert(err.mesage);            
        };
    };

    document.getElementById('login-go-register').onclick = async e => {
        e.preventDefault();
        location.hash = '#/register';
        router();
    }
};

export async function showRegister() {
    document.getElementById('main').innerHTML = `
    <section id="register" class="hidden">
        <div class="register-container">
            <h2>Crear cuenta</h2>

            <form id="register-form">
                <input type="text" id="register-name" placeholder="Nombre completo" required />
                <input type="text" id="register-user" placeholder="Nombre de usuario" required />
                <input type="email" id="register-email" placeholder="Correo electrónico" required />
                <input type="tel" id="register-phone" placeholder="Número de teléfono" required />
                <input type="password" id="register-password" placeholder="Contraseña" required />
                <button type="submit" id="btnr">Registrarse</button>
            </form>

            <p class="register-switch">
                ¿Ya tienes cuenta?
                <a href="#" id="register-go-login">Inicia sesión</a>
            </p>
        </div>
    </section>`;

    const name = document.getElementById("register-name");
    const user = document.getElementById('register-user');
    const email = document.getElementById("register-email");
    const phone = document.getElementById('register-phone');
    const password = document.getElementById("register-password");

    document.getElementById('register-form').onsubmit = async e => {
        e.preventDefault();
        try {
            await auth.resgister(e.target.name.value, e.target.user.value, e.target.email.value, e.target.phone.value, e.target.password.value);
            location.hash = '#/dashboard';
            router();
        } catch (err) {
            alert(err.message);
        }
    };

    document.getElementById('btnr').onclick = async e => {
        e.preventDefault();
        alert('Su registro ha sido exitoso')
    };
};

export async function showDashboard() {
    const u = auth.getUser();
    document.getElementById('main').innerHTML = `
    <section id="dashboard">
        <div class="dashboard-header">
            <h2>Mis Mascotas</h2>
            <div>
                <button id="add-pet-btn">Agregar Mascota</button>
                <button id="logout-btn">Cerrar sesión</button>
            </div>
        </div>

        <div id="pet-form-modal" class="modal hidden">
            <div class="modal-content">
                <h3>Agregar Nueva Mascota</h3>
                <form id="pet-form">
                    <input type="text" id="pet-name" placeholder="Nombre de la mascota" required />
                    <input type="text" id="pet-type" placeholder="Tipo (Ej: Perro, Gato...)" required />
                    <input type="number" id="pet-age" placeholder="Edad (años)" required min="0" />
                    <input type="url" id="pet-image" placeholder="URL de imagen (opcional)" />

                    <div class="form-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" id="cancel-pet-form">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="pets-container" id="pets-container">
            <!-- Aquí se insertarán dinámicamente las mascotas -->
            <div class="pet-card">
                <img src="https://imgs.search.brave.com/lGlVwCbvNihLLhJlK9b7Ij8tskbkngfVZFobZewtlXI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA0/MTk4NzQ4OC9lcy9m/b3RvL2xpbmRvLXBl/cnJvLWRlLXBvbmVy/LXN1LWNhcmEtZW4t/c3VzLXJvZGlsbGFz/LXktZWwtaG9tYnJl/LXNvbnJpZW50ZS1k/ZS1sYXMtbWFub3Mt/cmFzY2Fyc2UtZWwu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PV8tUXJHMVFpbXRY/UHR0dWVIZ1BTa2hj/aHdVY244RE50RWNs/VXBWOTkxQ2c9"
                    alt="Foto de la mascota" />
                <h3>Rocky</h3>
                <p><strong>Tipo:</strong> Perro</p>
                <p><strong>Edad:</strong> 3 años</p>

                <div class="card-buttons">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            </div>
        </div>
    </section>`;

    document.getElementById('add-pet-btn').onclick = async e => {
        e.preventDefault();
        document.getElementById("pet-form-modal").classList.remove("hidden");
    };

    document.getElementById('cancel-pet-form').onclick = async e => {
        e.preventDefault();
        document.getElementById("pet-form-modal").classList.add("hidden");
    }

    document.getElementById('logout-btn').onclick = async e => {
        e.preventDefault();
        auth.logout();
        location.hash = '#/landing';
        router();
    };
};


