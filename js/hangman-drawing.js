function drawHangman(stage) {
    const canvas = document.getElementById('hangman-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing styles
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Gallows
    ctx.beginPath();
    ctx.moveTo(50, 350);  // Ground
    ctx.lineTo(250, 350);
    ctx.moveTo(100, 350); // Post
    ctx.lineTo(100, 50);
    ctx.lineTo(200, 50);  // Top beam
    ctx.lineTo(200, 80);  // Rope
    ctx.stroke();

    if (stage >= 1) {  // Head
        ctx.beginPath();
        ctx.arc(200, 110, 30, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    if (stage >= 2) {  // Body
        ctx.beginPath();
        ctx.moveTo(200, 140);
        ctx.lineTo(200, 240);
        ctx.stroke();
    }
    
    if (stage >= 3) {  // Left arm
        ctx.beginPath();
        ctx.moveTo(200, 160);
        ctx.lineTo(160, 200);
        ctx.stroke();
    }
    
    if (stage >= 4) {  // Right arm
        ctx.beginPath();
        ctx.moveTo(200, 160);
        ctx.lineTo(240, 200);
        ctx.stroke();
    }
    
    if (stage >= 5) {  // Left leg
        ctx.beginPath();
        ctx.moveTo(200, 240);
        ctx.lineTo(170, 300);
        ctx.stroke();
    }
    
    if (stage >= 6) {  // Right leg
        ctx.beginPath();
        ctx.moveTo(200, 240);
        ctx.lineTo(230, 300);
        ctx.stroke();
        
        // Face details when dead
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(190, 100);  // Left X eye
        ctx.lineTo(200, 110);
        ctx.moveTo(200, 100);
        ctx.lineTo(190, 110);
        ctx.moveTo(210, 100);  // Right X eye
        ctx.lineTo(220, 110);
        ctx.moveTo(220, 100);
        ctx.lineTo(210, 110);
        ctx.stroke();
    }
}
