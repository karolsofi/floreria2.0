// JavaScript Document
        const flores = {
            "A": {
                nombre: "Girasol",
                imagen: "/api/placeholder/400/320",
                descripcion: "El girasol representa alegría, vitalidad y optimismo. Es ideal para personas extrovertidas y llenas de energía que iluminan cualquier espacio con su presencia."
            },
            "B": {
                nombre: "Lavanda",
                imagen: "/api/placeholder/400/320",
                descripcion: "La lavanda simboliza tranquilidad, serenidad y paz interior. Es perfecta para personas reflexivas que valoran la calma y el equilibrio en su vida."
            },
            "C": {
                nombre: "Rosa Roja",
                imagen: "/api/placeholder/400/320",
                descripcion: "La rosa roja es el símbolo universal del amor y la pasión. Representa a personas intensas y románticas que viven sus emociones al máximo."
            },
            "D": {
                nombre: "Orquídea",
                imagen: "/api/placeholder/400/320",
                descripcion: "La orquídea simboliza la elegancia, sofisticación y delicadeza. Es ideal para personas refinadas que aprecian la belleza y los detalles sutiles."
            }
        };

        // Variables para el test
        let preguntaActual = 1;
        const totalPreguntas = 5;
        const respuestas = {};
        let respuestaSeleccionada = false;

        // Elementos del DOM
        const preguntasContainer = document.getElementById('preguntas-container');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const resultado = document.getElementById('resultado');

        // Event Listeners
        document.addEventListener('DOMContentLoaded', iniciarTest);
        prevBtn.addEventListener('click', mostrarPreguntaAnterior);
        nextBtn.addEventListener('click', mostrarSiguientePregunta);

        // Iniciar el test
        function iniciarTest() {
            // Mostrar la primera pregunta
            actualizarNavegacion();
            
            // Agregar event listeners a las opciones
            const opciones = document.querySelectorAll('.opcion');
            opciones.forEach(opcion => {
                opcion.addEventListener('click', seleccionarOpcion);
            });
        }

        // Seleccionar una opción
        function seleccionarOpcion(e) {
            const preguntaId = document.querySelector('.pregunta.active').dataset.id;
            const opcionSeleccionada = e.target;
            
            // Desmarcar otras opciones
            const opciones = document.querySelectorAll('.pregunta.active .opcion');
            opciones.forEach(opcion => opcion.classList.remove('selected'));
            
            // Marcar la opción seleccionada
            opcionSeleccionada.classList.add('selected');
            
            // Guardar la respuesta
            respuestas[preguntaId] = opcionSeleccionada.dataset.valor;
            respuestaSeleccionada = true;
            
            // Habilitar el botón siguiente
            nextBtn.disabled = false;
        }

        // Mostrar la siguiente pregunta
        function mostrarSiguientePregunta() {
            if (preguntaActual < totalPreguntas) {
                // Ocultar pregunta actual
                document.querySelector(`.pregunta[data-id="${preguntaActual}"]`).classList.remove('active');
                
                // Mostrar siguiente pregunta
                preguntaActual++;
                document.querySelector(`.pregunta[data-id="${preguntaActual}"]`).classList.add('active');
                
                // Actualizar navegación
                actualizarNavegacion();
                
                // Verificar si ya hay respuesta seleccionada para esta pregunta
                respuestaSeleccionada = respuestas[preguntaActual] !== undefined;
                nextBtn.disabled = !respuestaSeleccionada;
                
                // Si hay respuesta seleccionada, marcarla
                if (respuestaSeleccionada) {
                    const opcionSeleccionada = document.querySelector(`.pregunta[data-id="${preguntaActual}"] .opcion[data-valor="${respuestas[preguntaActual]}"]`);
                    if (opcionSeleccionada) {
                        opcionSeleccionada.classList.add('selected');
                    }
                }
            } else {
                // Mostrar resultado
                mostrarResultado();
            }
        }

        // Mostrar la pregunta anterior
        function mostrarPreguntaAnterior() {
            if (preguntaActual > 1) {
                // Ocultar pregunta actual
                document.querySelector(`.pregunta[data-id="${preguntaActual}"]`).classList.remove('active');
                
                // Mostrar pregunta anterior
                preguntaActual--;
                document.querySelector(`.pregunta[data-id="${preguntaActual}"]`).classList.add('active');
                
                // Actualizar navegación
                actualizarNavegacion();
                
                // Verificar si ya hay respuesta seleccionada para esta pregunta
                respuestaSeleccionada = respuestas[preguntaActual] !== undefined;
                nextBtn.disabled = !respuestaSeleccionada;
                
                // Si hay respuesta seleccionada, marcarla
                if (respuestaSeleccionada) {
                    const opcionSeleccionada = document.querySelector(`.pregunta[data-id="${preguntaActual}"] .opcion[data-valor="${respuestas[preguntaActual]}"]`);
                    if (opcionSeleccionada) {
                        opcionSeleccionada.classList.add('selected');
                    }
                }
            }
        }

        // Actualizar la navegación
        function actualizarNavegacion() {
            prevBtn.disabled = preguntaActual === 1;
            
            if (preguntaActual === totalPreguntas) {
                nextBtn.textContent = 'Ver resultado';
            } else {
                nextBtn.textContent = 'Siguiente';
            }
        }

        // Mostrar el resultado
        function mostrarResultado() {
            // Ocultar preguntas y navegación
            preguntasContainer.style.display = 'none';
            document.querySelector('.test-navigation').style.display = 'none';
            
            // Calcular resultado
            const flor = calcularFlor();
            
            // Mostrar resultado
            resultado.style.display = 'block';
            document.getElementById('flor-nombre').textContent = flores[flor].nombre;
            document.getElementById('flor-descripcion').textContent = flores[flor].descripcion;
            document.getElementById('flor-img').src = flores[flor].imagen;
            document.getElementById('flor-img').alt = flores[flor].nombre;
        }

        // Calcular la flor según las respuestas
        function calcularFlor() {
            // Contar la frecuencia de cada respuesta
            const conteo = {
                "A": 0,
                "B": 0,
                "C": 0,
                "D": 0
            };
            
            // Contar respuestas
            for (const pregunta in respuestas) {
                conteo[respuestas[pregunta]]++;
            }
            
            // Encontrar la respuesta más frecuente
            let maxConteo = 0;
            let florGanadora = "";
            
            for (const flor in conteo) {
                if (conteo[flor] > maxConteo) {
                    maxConteo = conteo[flor];
                    florGanadora = flor;
                }
            }
            
            return florGanadora;
        }
