document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const bloomButton = document.getElementById('bloomButton');
    const flowerContainer = document.getElementById('flowerContainer');
    
    // Flower colors in soft, pastel shades
    const flowerColors = [
        { petals: '#FF9AA2', center: '#FFB7B2' }, // Pink
        { petals: '#FFDAC1', center: '#E2F0CB' }, // Peach
        { petals: '#B5EAD7', center: '#C7CEEA' }, // Mint
        { petals: '#E2F0CB', center: '#FFDAC1' }, // Light Green
        { petals: '#C7CEEA', center: '#FF9AA2' }  // Lavender
    ];
    
    // Generate random number within a range
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Create SVG flower element
    function createFlower(x, y, size, colorIndex, delay) {
        // Create the SVG element
        const flower = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        flower.setAttribute("class", "flower");
        flower.setAttribute("width", size);
        flower.setAttribute("height", size);
        flower.setAttribute("viewBox", "0 0 100 100");
        flower.style.left = `${x}%`;
        flower.style.top = `${y}%`;
        
        // Add animation style based on position
        const animationType = Math.floor(random(0, 3));
        if (animationType === 0) {
            flower.style.animation = `sway ${random(3, 6)}s ease-in-out infinite`;
        } else if (animationType === 1) {
            flower.style.animation = `float ${random(4, 7)}s ease-in-out infinite`;
        } else {
            flower.style.animation = `sway ${random(4, 6)}s ease-in-out infinite, float ${random(5, 8)}s ease-in-out infinite`;
        }
        
        // Get colors from array
        const colors = flowerColors[colorIndex % flowerColors.length];
        
        // Create petals (using circles for simplicity)
        const petalPositions = [
            {cx: 50, cy: 20}, // top
            {cx: 80, cy: 30}, // top right
            {cx: 85, cy: 65}, // bottom right
            {cx: 50, cy: 85}, // bottom
            {cx: 15, cy: 65}, // bottom left
            {cx: 20, cy: 30}  // top left
        ];
        
        // Add petals to the flower
        petalPositions.forEach(pos => {
            const petal = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            petal.setAttribute("cx", pos.cx);
            petal.setAttribute("cy", pos.cy);
            petal.setAttribute("r", 20);
            petal.setAttribute("fill", colors.petals);
            flower.appendChild(petal);
        });
        
        // Center of the flower
        const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        center.setAttribute("cx", 50);
        center.setAttribute("cy", 50);
        center.setAttribute("r", 15);
        center.setAttribute("fill", colors.center);
        flower.appendChild(center);
        
        // Add to container
        flowerContainer.appendChild(flower);
        
        // Set animation delay for staggered effect
        setTimeout(() => {
            flower.classList.add('bloom');
        }, delay);
        
        return flower;
    }
    
    // Generate multiple flowers with random properties
    function createFlowers() {
        // Clear any existing flowers
        flowerContainer.innerHTML = '';
        
        // Number of flowers based on container width
        const containerWidth = flowerContainer.offsetWidth;
        const flowerCount = Math.max(5, Math.min(12, Math.floor(containerWidth / 80)));
        
        // Create flowers with staggered animation
        const flowers = [];
        for (let i = 0; i < flowerCount; i++) {
            const size = random(60, 100);
            const x = random(5, 90);  // percentage position
            const y = random(5, 85);  // percentage position
            const colorIndex = Math.floor(random(0, flowerColors.length));
            const delay = i * 200; // staggered delay
            
            const flower = createFlower(x, y, size, colorIndex, delay);
            flowers.push(flower);
        }
        
        return flowers;
    }
    
    // Handle button click
    bloomButton.addEventListener('click', () => {
        // Disable button to prevent multiple clicks
        bloomButton.disabled = true;
        bloomButton.textContent = 'Flowers are blooming...';
        
        // Create and animate flowers
        const flowers = createFlowers();
        
        // Change button text after all flowers have bloomed
        const lastFlowerDelay = flowers.length * 200 + 1000;
        setTimeout(() => {
            bloomButton.textContent = 'Flowers have bloomed!';
        }, lastFlowerDelay);
    });
});

