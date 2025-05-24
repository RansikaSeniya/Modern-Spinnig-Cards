document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const pauseBtn = document.getElementById('pauseBtn');
    const speedUpBtn = document.getElementById('speedUpBtn');
    const slowDownBtn = document.getElementById('slowDownBtn');
    
    // Create cards dynamically
    const cardData = [
        { front: '🌟', back: 'Sparkle', color1: '#f6d365', color2: '#fda085' },
        { front: '💎', back: 'Diamond', color1: '#a18cd1', color2: '#fbc2eb' },
        { front: '🚀', back: 'Rocket', color1: '#5ee7df', color2: '#b490ca' },
        { front: '🌊', back: 'Ocean', color1: '#4facfe', color2: '#00f2fe' },
        { front: '🔥', back: 'Flame', color1: '#f78ca0', color2: '#fe9a8b' },
        { front: '🌙', back: 'Moon', color1: '#a1c4fd', color2: '#c2e9fb' }
    ];
    
    cardData.forEach((card, i) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.setProperty('--i', i);
        
        const frontFace = document.createElement('div');
        frontFace.className = 'card-face front';
        frontFace.textContent = card.front;
        frontFace.style.background = `linear-gradient(135deg, ${card.color1}, ${card.color2})`;
        
        const backFace = document.createElement('div');
        backFace.className = 'card-face back';
        backFace.textContent = card.back;
        backFace.style.background = `linear-gradient(135deg, ${card.color2}, ${card.color1})`;
        
        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        carousel.appendChild(cardElement);
        
        // Position cards in a circle
        const angle = (i * 360) / cardData.length;
        cardElement.style.transform = `rotateY(${angle}deg) translateZ(350px)`;
    });
    
    // Control buttons functionality
    let isPaused = false;
    
    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            carousel.style.animationPlayState = 'paused';
            pauseBtn.textContent = '▶️ Play';
        } else {
            carousel.style.animationPlayState = 'running';
            pauseBtn.textContent = '⏸️ Pause';
        }
    });
    
    speedUpBtn.addEventListener('click', function() {
        const currentSpeed = parseFloat(getComputedStyle(carousel).animationDuration);
        const newSpeed = Math.max(5, currentSpeed * 0.8);
        carousel.style.animationDuration = `${newSpeed}s`;
    });
    
    slowDownBtn.addEventListener('click', function() {
        const currentSpeed = parseFloat(getComputedStyle(carousel).animationDuration);
        const newSpeed = Math.min(60, currentSpeed * 1.2);
        carousel.style.animationDuration = `${newSpeed}s`;
    });
    
    // Add mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
        if (isPaused) return;
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        carousel.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});