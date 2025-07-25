// Selecciona todos los botones dentro de la sidebar
const botones = document.querySelectorAll('.sidebar button');

// Agrega un evento de click a cada botón
botones.forEach((boton) => {
    boton.addEventListener('click', () => {
    // Quita la clase active de todos los botones
    botones.forEach((b) => b.classList.remove('active'));
    
    // Agrega la clase active al botón clickeado
    boton.classList.add('active');
    
    // Muestra en consola el texto del botón clickeado
    const textoBotón = boton.querySelector('span').textContent;
    console.log(`Se ha clickeado el botón: ${textoBotón}`);
    });
});