// Inicialización de la variable de página
let pagina = 1; // Número de página inicial

// Seleccionamos los botones de navegación
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Evento para el botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
    // Incrementa la página cuando se hace clic en "Siguiente"
    pagina += 1;
    cargarLibros(); // Llama a la función que carga los libros de la página actual
});

// Evento para el botón "Anterior"
btnAnterior.addEventListener('click', () => {
    // Decrementa la página si es mayor que 1
    if (pagina > 1) {
        pagina -= 1;
        cargarLibros(); // Llama a la función para cargar los libros de la página anterior
    }
});

// Función principal para cargar los libros
const cargarLibros = async () => {
    try {
        // Establece la palabra clave para la búsqueda de libros de H.P. Lovecraft
        const palabraClave = "H.P. Lovecraft"; 

        // Realiza la solicitud a la API de Open Library con la palabra clave y la página actual
        const respuesta = await fetch(`https://openlibrary.org/search.json?author=${encodeURIComponent(palabraClave)}&page=${pagina}`);

        // Verifica si la respuesta es exitosa (código de estado 200)
        if (respuesta.status === 200) {
            const datos = await respuesta.json(); // Convierte la respuesta en formato JSON

            // Procesamos los libros obtenidos
            const libros = datos.docs; // La API devuelve los resultados de la búsqueda en "docs"
            
            // Verifica si hay libros en los resultados
            if (libros.length > 0) {
                let librosHTML = ''; // Variable para almacenar el HTML de los libros

                // Itera sobre cada libro obtenido y genera el HTML
                libros.forEach(libro => {
                    librosHTML += `
                        <div class="pelicula">
                            <h3 class="titulo">${libro.title}</h3>
                            <p><strong>Autor:</strong> ${libro.author_name?.join(", ") || "No disponible"}</p>
                            <p><strong>Año:</strong> ${libro.first_publish_year || "No disponible"}</p>
                        </div>
                    `;
                });

                // Inserta el HTML generado en el contenedor del DOM
                document.getElementById('contenedor').innerHTML = librosHTML;
            } else {
                // Si no se encuentran libros en la página actual, muestra un mensaje
                document.getElementById('contenedor').innerHTML = `<p>No se encontraron libros en la página ${pagina}.</p>`;
            }
        } else {
            // Si la respuesta no es exitosa, muestra un mensaje de error
            console.error(`Error: ${respuesta.status}`);
            document.getElementById('contenedor').innerHTML = `<p>Error al cargar los libros.</p>`;
        }
    } catch (error) {
        // Maneja errores en caso de que la solicitud falle
        console.error("Error al cargar los libros:", error);
        document.getElementById('contenedor').innerHTML = `<p>Error al cargar los libros.</p>`;
    }
};

// Llama a la función para cargar los libros al iniciar la página
cargarLibros();

