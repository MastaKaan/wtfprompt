// Optimized Loading Handler
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after content loads
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
  }, 800);
  
  // Detect if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Only run intensive animations if user doesn't prefer reduced motion
  if (!prefersReducedMotion) {
    // Create an immersive star background with optimized canvas rendering
    (function() {
      const canvas = document.getElementById('stars-canvas');
      const ctx = canvas.getContext('2d');
      
      // Optimized canvas sizing with device pixel ratio
      function setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        // Set canvas dimensions properly for sharp rendering
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        // Reset CSS dimensions to match viewport
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
      
      // Handle resizing
      window.addEventListener('resize', debounce(setupCanvas, 200));
      setupCanvas();
      
      // Star generation with different sizes for depth perception
      const stars = [];
      const starCount = Math.min(window.innerWidth / 2, 800); // Adaptive star count based on screen width
      const maxDepth = 300;
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * maxDepth,
          r: Math.random() * 1.5,
          color: Math.random() > 0.9 ? getRandomStarColor() : '#FFFFFF'
        });
      }
      
      function getRandomStarColor() {
        const colors = ['#F9F9F9', '#E6F6FF', '#B5E8FF', '#FFF9C4', '#FFF0C2'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      // Animation loop with optimized frame handling
      let lastTime = 0;
      const fps = 30;
      const interval = 1000 / fps;
      
      function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        
        if (deltaTime > interval) {
          lastTime = timestamp - (deltaTime % interval);
          
          // Clear canvas with better performance
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Update and draw stars
          for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            
            // Slowly rotate stars
            star.z -= 0.05;
            
            // Reset stars that go too far
            if (star.z <= 0) {
              star.z = maxDepth;
              star.x = Math.random() * canvas.width;
              star.y = Math.random() * canvas.height;
            }
            
            // Calculate position with perspective
            const scale = maxDepth / (maxDepth + star.z);
            const x = star.x * scale;
            const y = star.y * scale;
            const r = star.r * scale;
            
            // Draw star with optimized approach
            if (r > 0.1) {
              ctx.beginPath();
              ctx.fillStyle = star.color;
              ctx.globalAlpha = scale;
              ctx.arc(x, y, r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        
        requestAnimationFrame(animate);
      }
      
      requestAnimationFrame(animate);
    })();
    
    // Parallax effect for cosmic elements
    document.addEventListener('mousemove', debounce((e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      const nebula = document.querySelector('.nebula');
      const cosmicHalo = document.querySelector('.cosmic-halo');
      
      if (nebula) nebula.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px) scale(1.1)`;
      if (cosmicHalo) cosmicHalo.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px) rotate(${mouseX * 10}deg)`;
    }, 10));
  }
  
  // Image lazy loading with Intersection Observer
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src') || img.src;
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      img.setAttribute('data-src', img.src);
      imageObserver.observe(img);
    });
  }
});

// Utility for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
