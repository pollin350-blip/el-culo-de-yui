// Parallax effect on mouse move for the glass card
const card = document.querySelector('.glass-card');
const heroVisual = document.querySelector('.hero-visual');

if (card && heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
        // Obtenemos los limites del contenedor
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculamos el centro
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculamos la rotación en base a la posición del mouse
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        // Reseteamos a la posición original con una transición suave
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'rotateY(-15deg) rotateX(10deg)';
    });
    
    heroVisual.addEventListener('mouseenter', () => {
        // Quitamos la transición para que siga al mouse inmediatamente
        card.style.transition = 'none';
    });
}
