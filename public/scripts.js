document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const productSection = document.getElementById('product-section');
    const productList = document.getElementById('product-list');

    // Manejar el envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token en localStorage
                localStorage.setItem('token', data.token);

                // Ocultar el formulario de inicio de sesión y mostrar la sección de productos
                loginForm.style.display = 'none';
                productSection.style.display = 'block';

                // Obtener y mostrar productos
                fetchProducts();
            } else {
                loginMessage.textContent = data.message || 'Login failed';
                loginMessage.style.display = 'block';
            }
        } catch (error) {
            loginMessage.textContent = 'An error occurred. Please try again.';
            loginMessage.style.display = 'block';
        }
    });

    // Obtener y mostrar productos
    async function fetchProducts() {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const products = await response.json();

            if (response.ok) {
                // Mostrar productos en la lista
                productList.innerHTML = products
                    .map(product => `<li>${product.name} - $${product.price.toFixed(2)}</li>`)
                    .join('');
            } else {
                productList.innerHTML = '<li>Failed to load products.</li>';
            }
        } catch (error) {
            productList.innerHTML = '<li>An error occurred. Please try again.</li>';
        }
    }
});
