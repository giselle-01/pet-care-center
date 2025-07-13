
import { auth } from './auth.js';

export function notFound() {
    document.getElementById('app'). innerHTML = '<h2>La página que busca no existe</h2>';
};

export async function showLogin() {
    document.getElementById('app').innerHTML = `
    <section id="login" class="hidden">
        <div class="login-container">
            <h2>Iniciar sesión</h2>

            <form id="login-form">
                <input type="text" id="login-username" placeholder="Usuario" autocomplete="username" required />
                <input type="password" id="login-password" placeholder="Contraseña" autocomplete="current-password"
                    required />
                <button type="submit">Entrar</button>
            </form>

            <p class="login-switch">
                ¿No tienes cuenta?
                <a href="#" id="login-go-register">Regístrate aquí</a>
            </p>
        </div>
    </section>`;
    document.getElementById('form').onsubmit =async e => {
        e.preventDefault();
        try {
            await auth.login(e.target.e.value, e.target.p.value);
            location.hash = '#/dashboard';
            router();
        } catch (err) {
            alert (err.mesage);
        };
    };
};

export async function showRegister() {
    document.getElementById('app').innerHTML = `
    <section id="register" class="hidden">
        <div class="register-container">
            <h2>Crear cuenta</h2>

            <form id="r-form">
                <input type="text" id="rn" placeholder="Nombre completo" required />
                <input type="text" id="ru" placeholder="Nombre de usuario" required />
                <input type="email" id="re" placeholder="Correo electrónico" required />
                <input type="tel" id="rp" placeholder="Número de teléfono" required />
                <input type="password" id="rpsw" placeholder="Contraseña" required />
                <button type="submit" id="btnr">Registrarse</button>
            </form>

            <p class="register-switch">
                ¿Ya tienes cuenta?
                <a href="#" id="register-go-login">Inicia sesión</a>
            </p>
        </div>
    </section>`;
    document.getElementById('r-form').onsubmit = async e => {
        e.preventDefault();
        try{
            await auth.resgister(e.target.rn.value, e.target.ru.value, e.target.re.value, e.target.rp.value, e.target.rpsw.value);
            location.hash = '#/dashboard';
            router();
        } catch (err) {
            alert (err.message);
        }
    };
};

export async function showDashboard() {
    const u = auth.getUser();
    document.getElementById('app').innerHTML = `
    <section id="dashboard" class="hidden">
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
    document.getElementById('add-pet-btn').onclick = auth.logout;
    };
}

